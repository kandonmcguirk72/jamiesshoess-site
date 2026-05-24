require('dotenv').config();
const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const {
  CLOVER_MERCHANT_ID: MID,
  CLOVER_API_TOKEN: TOKEN,
  CLOVER_ECOM_SECRET_KEY: ECOM_SECRET,
  CLOVER_ENV = 'production',
  PORT = 3001,
} = process.env;

const CLOVER_BASE = CLOVER_ENV === 'sandbox'
  ? 'https://apisandbox.dev.clover.com'
  : 'https://api.clover.com';

const ECOM_BASE = CLOVER_ENV === 'sandbox'
  ? 'https://scl-sandbox.dev.clover.com'
  : 'https://scl.clover.com';

const DATA_DIR  = path.join(__dirname, 'data');
const INV_FILE  = path.join(DATA_DIR, 'inventory.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// ── CATEGORY MAP ──────────────────────────────────────────────────────────────
const CAT_KEYWORDS = {
  shoes: ['shoe', 'sneaker', 'boot', 'sandal', 'jordan', 'nike', 'adidas', 'dunk'],
  hats:  ['hat', 'beanie', 'cap', 'snapback', 'fitted'],
  bags:  ['bag', 'backpack', 'tote', 'purse'],
  pokemon: ['pokemon', 'pokémon', 'card'],
  kids:  ['kid', 'youth', 'toddler', 'children'],
  clothing: [
    'shirt', 'tee', 'hoodie', 'jacket', 'vest', 'pullover',
    'thermal', 'crewneck', 'sweater', 'jersey', 'denim', 'top',
    'graphic', 'vintage', 'vtg',
  ],
};

function mapCategory(cloverCatName = '', itemName = '') {
  const text = (cloverCatName + ' ' + itemName).toLowerCase();
  for (const [cat, keywords] of Object.entries(CAT_KEYWORDS)) {
    if (keywords.some(k => text.includes(k))) return cat;
  }
  return 'clothing';
}

function assignBadge(name = '') {
  const n = name.toUpperCase();
  if (/1\/1|JNCO|GRATEFUL|JERRY RICE|NOTRE DAME|1985|1996|1998/.test(n)) return 'RARE';
  if (/\bVTG\b|VINTAGE/.test(n)) return 'VINTAGE';
  if (/CARHARTT|COLLAB|NEW DROP/.test(n)) return 'NEW';
  return '';
}

// ── CLOVER API HELPER ─────────────────────────────────────────────────────────
async function cloverGet(endpoint) {
  const res = await fetch(`${CLOVER_BASE}${endpoint}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Clover API ${res.status} at ${endpoint}: ${body}`);
  }
  return res.json();
}

// ── INVENTORY SYNC ────────────────────────────────────────────────────────────
async function syncInventory() {
  if (!MID || !TOKEN) {
    console.warn('[SYNC] Skipped — CLOVER_MERCHANT_ID or CLOVER_API_TOKEN not set in .env');
    return;
  }

  try {
    const [itemsRes, stocksRes] = await Promise.all([
      cloverGet(`/v3/merchants/${MID}/items?expand=categories&limit=500`),
      cloverGet(`/v3/merchants/${MID}/item_stocks?limit=500`),
    ]);

    // Build stock map: itemId → quantity
    const stockMap = {};
    for (const s of (stocksRes.elements || [])) {
      if (s.item?.id != null) stockMap[s.item.id] = s.quantity ?? 0;
    }

    const items = (itemsRes.elements || [])
      .filter(item => item.hidden !== true)
      .map(item => {
        const priceRaw = item.price || 0;
        const qty      = stockMap[item.id] ?? 1;
        const catName  = item.categories?.elements?.[0]?.name || '';
        return {
          id:           item.id,
          name:         item.name || 'Untitled',
          price:        priceRaw,
          priceDisplay: `$${(priceRaw / 100).toFixed(2)}`,
          category:     mapCategory(catName, item.name),
          inStock:      qty > 0,
          quantity:     qty,
          imageUrl:     item.imageUrl || '',
          badge:        assignBadge(item.name),
        };
      });

    const payload = {
      lastUpdated: new Date().toISOString(),
      items,
    };

    fs.writeFileSync(INV_FILE, JSON.stringify(payload, null, 2));
    console.log(`[SYNCED] ${items.length} items pulled from Clover at ${new Date().toLocaleTimeString()}`);
  } catch (err) {
    console.error('[SYNC ERROR]', err.message);
  }
}

// Run once at startup, then every 15 minutes
syncInventory();
setInterval(syncInventory, 15 * 60 * 1000);

// ── CHECKOUT SERVER ───────────────────────────────────────────────────────────
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// POST /checkout — charge card via Clover ecommerce API
app.post('/checkout', async (req, res) => {
  const { token, amount, itemIds } = req.body;

  if (!token || !amount) {
    return res.status(400).json({ error: 'Missing token or amount' });
  }
  if (!ECOM_SECRET) {
    return res.status(500).json({ error: 'CLOVER_ECOM_SECRET_KEY not set on server' });
  }

  try {
    // 1. Charge via Clover ecommerce API
    const chargeRes = await fetch(`${ECOM_BASE}/v1/charges`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ECOM_SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, currency: 'usd', source: token }),
    });

    const charge = await chargeRes.json();
    if (!chargeRes.ok || charge.error) {
      const msg = charge.error?.message || charge.message || 'Payment declined';
      return res.status(402).json({ error: msg });
    }

    // 2. Decrement stock in local inventory.json
    const ids = Array.isArray(itemIds) ? itemIds : [itemIds].filter(Boolean);
    if (ids.length && fs.existsSync(INV_FILE)) {
      try {
        const inv = JSON.parse(fs.readFileSync(INV_FILE, 'utf8'));
        for (const id of ids) {
          const item = inv.items.find(i => String(i.id) === String(id));
          if (item) {
            item.quantity = Math.max(0, (item.quantity || 1) - 1);
            item.inStock  = item.quantity > 0;
          }
        }
        fs.writeFileSync(INV_FILE, JSON.stringify(inv, null, 2));
      } catch (e) {
        console.warn('[STOCK UPDATE] Could not update inventory.json:', e.message);
      }
    }

    // 3. Fire-and-forget: decrement stock in Clover so POS stays in sync
    if (ids.length && MID && TOKEN) {
      Promise.all(ids.map(async id => {
        try {
          const stockRes = await cloverGet(`/v3/merchants/${MID}/item_stocks/${id}`);
          const current  = stockRes.quantity ?? 1;
          await fetch(`${CLOVER_BASE}/v3/merchants/${MID}/item_stocks/${id}`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item: { id }, quantity: Math.max(0, current - 1) }),
          });
        } catch (e) {
          console.warn(`[STOCK SYNC] Could not update Clover stock for ${id}:`, e.message);
        }
      })).catch(() => {});
    }

    console.log(`[SOLD] Charge ${charge.id} — $${(amount / 100).toFixed(2)}`);
    res.json({ success: true, chargeId: charge.id });

  } catch (err) {
    console.error('[CHECKOUT ERROR]', err.message);
    res.status(500).json({ error: 'Server error — try again' });
  }
});

app.listen(PORT, () => {
  console.log(`[SERVER] JAMIESSHOESS backend running on port ${PORT}`);
  console.log(`[SERVER] Clover env: ${CLOVER_ENV}`);
});
