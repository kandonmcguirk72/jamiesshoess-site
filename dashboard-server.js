const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
const path    = require('path');
const { exec, spawn } = require('child_process');

const PORT    = 3002;
const ROOT    = __dirname;
const IMAGES  = path.join(ROOT, 'images');
const CUST    = path.join(IMAGES, 'customers');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(ROOT));

// ── HEALTH ────────────────────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ ok: true, cwd: ROOT }));

// ── RUN COMMAND ───────────────────────────────────────────────────────────────
// Streams output via SSE: GET /run-command-stream?cmd=...
app.get('/run-command-stream', (req, res) => {
  const cmd = req.query.cmd;
  if (!cmd) return res.status(400).json({ error: 'no cmd' });

  const ALLOWED = [
    /^npx serve/,
    /^node /,
    /^python /,
    /^python3 /,
    /^git (add|commit|push|status|log)/,
    /^npm (install|run)/,
    /^node dashboard-server\.js/,
  ];
  if (!ALLOWED.some(r => r.test(cmd))) {
    return res.status(403).json({ error: 'Command not allowed: ' + cmd });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const child = exec(cmd, { cwd: ROOT, shell: true });

  child.stdout.on('data', d => res.write(`data: ${JSON.stringify({ out: d.toString() })}\n\n`));
  child.stderr.on('data', d => res.write(`data: ${JSON.stringify({ err: d.toString() })}\n\n`));
  child.on('close', code => {
    res.write(`data: ${JSON.stringify({ done: true, code })}\n\n`);
    res.end();
  });

  req.on('close', () => { try { child.kill(); } catch(e){} });
});

// ── FILE LIST ─────────────────────────────────────────────────────────────────
app.get('/files', (req, res) => {
  const dir = req.query.dir || 'images';
  const abs = path.resolve(ROOT, dir);
  if (!abs.startsWith(ROOT)) return res.status(403).json({ error: 'Out of bounds' });
  if (!fs.existsSync(abs))   return res.json([]);

  try {
    const entries = fs.readdirSync(abs)
      .filter(f => !f.startsWith('.'))
      .map(f => {
        const fp   = path.join(abs, f);
        const stat = fs.statSync(fp);
        return {
          name: f,
          size: stat.size,
          isDir: stat.isDirectory(),
          mtime: stat.mtime,
        };
      });
    res.json(entries);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── READ FILE ─────────────────────────────────────────────────────────────────
app.get('/read-file', (req, res) => {
  const rel = req.query.file;
  if (!rel) return res.status(400).json({ error: 'no file param' });
  const abs = path.resolve(ROOT, rel);
  if (!abs.startsWith(ROOT)) return res.status(403).json({ error: 'Out of bounds' });
  if (!fs.existsSync(abs))   return res.status(404).json({ error: 'Not found' });
  try {
    res.json({ content: fs.readFileSync(abs, 'utf8') });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── WRITE FILE ────────────────────────────────────────────────────────────────
app.post('/write-file', (req, res) => {
  const { file, content } = req.body;
  if (!file || content == null) return res.status(400).json({ error: 'Missing file or content' });
  const abs = path.resolve(ROOT, file);
  if (!abs.startsWith(ROOT)) return res.status(403).json({ error: 'Out of bounds' });
  try {
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, content, 'utf8');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── IMAGE UPLOAD (base64) ────────────────────────────────────────────────────
app.post('/upload', (req, res) => {
  const { dir = 'images', name, data } = req.body;
  if (!name || !data) return res.status(400).json({ error: 'Missing name or data' });
  const absDir = path.resolve(ROOT, dir);
  if (!absDir.startsWith(ROOT)) return res.status(403).json({ error: 'Out of bounds' });

  try {
    fs.mkdirSync(absDir, { recursive: true });
    const base64 = data.replace(/^data:image\/\w+;base64,/, '');
    const buf    = Buffer.from(base64, 'base64');
    const dest   = path.join(absDir, name);
    fs.writeFileSync(dest, buf);
    res.json({ ok: true, path: path.join(dir, name) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── DELETE FILE ───────────────────────────────────────────────────────────────
app.delete('/file', (req, res) => {
  const rel = req.query.file;
  if (!rel) return res.status(400).json({ error: 'no file param' });
  const abs = path.resolve(ROOT, rel);
  if (!abs.startsWith(ROOT)) return res.status(403).json({ error: 'Out of bounds' });
  if (!abs.startsWith(IMAGES)) return res.status(403).json({ error: 'Can only delete images' });
  try {
    if (fs.existsSync(abs)) fs.unlinkSync(abs);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── BACKUP PROJECT ────────────────────────────────────────────────────────────
app.post('/backup', (req, res) => {
  const desktop = path.join(require('os').homedir(), 'Desktop');
  const date    = new Date().toISOString().slice(0,10);
  const out     = path.join(desktop, `jamiesshoess-backup-${date}.zip`);

  const args = ['-r', out, '.', '-x', '.git/*', 'node_modules/*', '*.zip'];
  const zip  = spawn('zip', args, { cwd: ROOT });

  let log = '';
  zip.stdout.on('data', d => log += d);
  zip.stderr.on('data', d => log += d);
  zip.on('close', code => {
    if (code === 0) res.json({ ok: true, path: out });
    else res.status(500).json({ error: 'zip failed', log });
  });
  zip.on('error', err => {
    // zip may not be available on Windows — fallback message
    res.status(500).json({ error: 'zip not available. Install 7-Zip or use File Explorer to compress the folder.', log: err.message });
  });
});

// ── SITE HEALTH CHECK ─────────────────────────────────────────────────────────
app.get('/health-check', async (req, res) => {
  const results = [];

  const check = (label, pass, detail) => results.push({ label, pass: !!pass, detail: detail || '' });

  // File checks
  const files = [
    ['index.html', 'index.html'],
    ['admin.html', 'admin.html'],
    ['dashboard.html', 'dashboard.html'],
    ['images/logo-graffiti.png', 'images/logo-graffiti.png'],
    ['images/logo-circle-blue.png', 'images/logo-circle-blue.png'],
    ['videos/store-reel.mp4', 'videos/store-reel.mp4'],
  ];
  for (const [label, rel] of files) {
    check(label, fs.existsSync(path.join(ROOT, rel)));
  }

  // Customer photos folder
  const custExists = fs.existsSync(CUST);
  check('images/customers/ folder', custExists);
  if (custExists) {
    const custFiles = fs.readdirSync(CUST).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
    check(`Customer photos (${custFiles.length} found)`, custFiles.length > 0, custFiles.length + ' photos');
  }

  // Parse index.html
  let html = '';
  try { html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8'); } catch(e){}

  if (html) {
    check('Google Fonts <link> in <head>', html.includes('fonts.googleapis.com'));
    check('Clover SDK <script> tag', html.includes('checkout.clover.com'));
    check('scroll-padding-top on html', html.includes('scroll-padding-top'));
    check('Meta description present', html.includes('<meta name="description"'));
    check('Logo mix-blend-mode:screen', html.includes('mix-blend-mode'));

    // Strip @media print {...} blocks AND inline button backgrounds (legit white buttons)
    // before checking for stray white/cream section backgrounds.
    const htmlNoPrint = html.replace(/@media\s+print\s*\{[\s\S]*?\n\s*\}/g, '');
    // Match section/body/.card-style white bg, NOT button bg (which is legit)
    const whiteSectionBg = /\.(hero|section|page|card|panel|sec|main|body|wrap)[^{]*\{[^}]*background:\s*(white|#fff|#FFF)/i;
    check('No hardcoded white/cream section backgrounds', !whiteSectionBg.test(htmlNoPrint));

    // Check image src paths in HTML — but ignore JS template strings (contain + or ${)
    const imgSrcs = [...html.matchAll(/src="(images\/[^"]+)"/g)]
      .map(m => m[1])
      .filter(s => !s.includes("' +") && !s.includes('${') && !s.includes('" +'));
    const uniqueSrcs = [...new Set(imgSrcs)];
    const missingImgs = uniqueSrcs.filter(s => !fs.existsSync(path.join(ROOT, s)));
    check(`Local image srcs resolve (${uniqueSrcs.length} checked)`, missingImgs.length === 0,
      missingImgs.length ? 'Missing: ' + missingImgs.slice(0,3).join(', ') : '');
  }

  // Image size check
  const imgDir = IMAGES;
  let largeMsgs = [];
  if (fs.existsSync(imgDir)) {
    const walk = (d) => {
      for (const f of fs.readdirSync(d)) {
        const fp = path.join(d, f);
        if (fs.statSync(fp).isDirectory()) { walk(fp); continue; }
        if (/\.(jpg|jpeg|png|webp)$/i.test(f)) {
          const sz = fs.statSync(fp).size;
          if (sz > 2 * 1024 * 1024) largeMsgs.push(`${f} (${(sz/1024/1024).toFixed(1)}MB)`);
        }
      }
    };
    walk(imgDir);
  }
  check(`No images over 2MB`, largeMsgs.length === 0, largeMsgs.join(', '));

  const passed = results.filter(r => r.pass).length;
  res.json({ results, passed, total: results.length });
});

// ── IMAGE DIMENSIONS ──────────────────────────────────────────────────────────
app.get('/image-info', (req, res) => {
  const dir = req.query.dir || 'images';
  const abs = path.resolve(ROOT, dir);
  if (!abs.startsWith(ROOT)) return res.status(403).json({ error: 'Out of bounds' });
  if (!fs.existsSync(abs))   return res.json([]);

  const exts = /\.(jpg|jpeg|png|webp|gif|svg)$/i;
  try {
    const files = fs.readdirSync(abs).filter(f => exts.test(f) && !f.startsWith('.'));
    const infos = files.map(f => {
      const fp   = path.join(abs, f);
      const stat = fs.statSync(fp);
      return { name: f, size: stat.size, rel: path.join(dir, f).replace(/\\/g, '/') };
    });
    res.json(infos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── INVENTORY SUMMARY ─────────────────────────────────────────────────────────
app.get('/inventory-summary', (req, res) => {
  const summary = {
    source: 'starter',
    total: 0,
    inStock: 0,
    outOfStock: 0,
    lowStock: 0,
    totalValue: 0,
    lastUpdated: null,
    categories: {},
    topItems: [],
  };

  const invPath = path.join(ROOT, 'data', 'inventory.json');
  let items = [];
  if (fs.existsSync(invPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(invPath, 'utf8'));
      if (data.items && data.items.length > 0) {
        summary.source = 'clover';
        summary.lastUpdated = data.lastUpdated;
        items = data.items;
      }
    } catch (e) {}
  }

  if (items.length === 0) {
    // Fall back to localStorage starter — read from app.js source
    try {
      const appJs = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
      const match = appJs.match(/const STARTER\s*=\s*(\[[\s\S]*?\n\];)/m);
      if (match) {
        items = eval(match[1]);
      }
    } catch (e) {}
  }

  summary.total = items.length;
  items.forEach(it => {
    const stock = it.quantity != null ? it.quantity : (it.stock != null ? it.stock : 1);
    const price = it.priceDisplay ? (it.price / 100) : (it.price || 0);
    if (stock > 0) summary.inStock++;
    if (stock === 0) summary.outOfStock++;
    if (stock > 0 && stock <= 3) summary.lowStock++;
    summary.totalValue += price * stock;
    const cat = it.category || 'other';
    summary.categories[cat] = (summary.categories[cat] || 0) + 1;
  });

  summary.topItems = items
    .filter(it => {
      const stock = it.quantity != null ? it.quantity : (it.stock != null ? it.stock : 1);
      return stock > 0;
    })
    .sort((a, b) => {
      const pa = a.priceDisplay ? a.price/100 : (a.price || 0);
      const pb = b.priceDisplay ? b.price/100 : (b.price || 0);
      return pb - pa;
    })
    .slice(0, 5)
    .map(it => ({
      name: it.name,
      price: it.priceDisplay || ('$' + (it.price || 0).toFixed(2)),
      category: it.category,
      stock: it.quantity != null ? it.quantity : (it.stock != null ? it.stock : 1),
    }));

  res.json(summary);
});

// ── STRATEGIC AUDIT ──────────────────────────────────────────────────────────
app.get('/audit', (req, res) => {
  const audit = { categories: {} };

  function addCheck(category, severity, label, pass, detail, impact) {
    audit.categories[category] = audit.categories[category] || [];
    audit.categories[category].push({
      severity,                    // 'critical', 'warn', 'info'
      label,
      pass: !!pass,
      detail: detail || '',
      impact: impact || '',
    });
  }

  let html = '';
  try { html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8'); } catch(e){}

  // ── UX / Mobile ────────────────────────────────────────
  addCheck('UX', 'critical',
    'Mobile viewport-fit=cover',
    html.includes('viewport-fit=cover'),
    'Required for iPhone notch handling',
    'Site looks cut off on iPhone X+ in landscape');
  addCheck('UX', 'warn',
    'Touch targets >= 44px on mobile',
    !html.match(/width:36px;height:36px/),
    'Apple HIG minimum',
    'Buttons feel cramped on small screens');
  addCheck('UX', 'warn',
    'Hero scroll works on touch devices',
    html.includes('touch-action:pan-y'),
    'Particle canvas should not block scroll',
    'Mobile users cannot scroll past hero');
  addCheck('UX', 'info',
    'Reduced motion support',
    html.includes('prefers-reduced-motion'),
    'Respect OS motion preferences',
    'Accessibility points');

  // ── SEO ────────────────────────────────────────────────
  addCheck('SEO', 'critical',
    'Meta description present',
    html.match(/<meta\s+name="description"/i),
    'Shown in Google snippets',
    'Without it, Google picks random text');
  addCheck('SEO', 'critical',
    'Structured data (schema.org)',
    html.includes('application/ld+json'),
    'Tells Google business hours, address, reviews',
    'Critical for local SEO');
  addCheck('SEO', 'warn',
    'Canonical URL set',
    html.includes('<link rel="canonical"'),
    'Prevents duplicate-content penalties',
    'Avoids SEO confusion');
  addCheck('SEO', 'warn',
    'Open Graph tags (social sharing)',
    html.match(/<meta\s+property="og:/i),
    'Pretty link previews on Facebook, Slack, iMessage',
    'Shares look broken without this');
  addCheck('SEO', 'info',
    'Sitemap exists',
    fs.existsSync(path.join(ROOT, 'sitemap.xml')),
    'Helps Google crawl all pages',
    'Faster indexing of new products');

  // ── CONVERSION ─────────────────────────────────────────
  addCheck('Conversion', 'critical',
    'Clear call-to-action above the fold',
    html.includes('btn-hero-p') || html.includes('btn-p'),
    'Visitors should know what to do',
    'Lowers bounce rate');
  addCheck('Conversion', 'critical',
    'Cart functionality exists',
    fs.existsSync(path.join(ROOT, 'app.js')) && fs.readFileSync(path.join(ROOT, 'app.js'),'utf8').includes('addToCart'),
    'Users can save items to buy',
    'Critical for ecom');
  addCheck('Conversion', 'warn',
    'Social proof visible (reviews/testimonials)',
    html.includes('reviews-sec') || html.includes('customers-section'),
    'Builds trust',
    'Direct lift on conversion');
  addCheck('Conversion', 'warn',
    'Email capture form',
    html.includes('email-form') || html.includes('emailPopup'),
    'List building for repeat customers',
    'Returning customers = 3x value');
  addCheck('Conversion', 'info',
    'Multiple checkout paths (Clover + Instagram DM)',
    html.includes('checkout.clover.com') && html.includes('instagram'),
    'Reduces friction',
    'Lower abandonment');

  // ── INVENTORY / BACKEND ────────────────────────────────
  addCheck('Inventory', 'critical',
    'Clover backend script exists',
    fs.existsSync(path.join(ROOT, 'clover-sync.js')),
    'Live inventory sync engine',
    'Without this, manual data entry');
  addCheck('Inventory', 'critical',
    'Clover .env configured',
    (() => {
      try {
        const env = fs.readFileSync(path.join(ROOT, '.env'), 'utf8');
        return env.includes('CLOVER_MERCHANT_ID=') &&
               !env.match(/CLOVER_MERCHANT_ID=\s*$/m) &&
               !env.match(/CLOVER_MERCHANT_ID=A1B2C3D4E5/);
      } catch(e) { return false; }
    })(),
    'API keys not filled in',
    'Site falls back to starter catalog');
  addCheck('Inventory', 'warn',
    'inventory.json populated',
    (() => {
      try {
        const inv = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'inventory.json'), 'utf8'));
        return inv.items && inv.items.length > 0;
      } catch(e){ return false; }
    })(),
    'Live data file empty',
    'Site shows starter catalog, not real stock');
  addCheck('Inventory', 'info',
    'Admin panel for manual updates',
    fs.existsSync(path.join(ROOT, 'admin.html')),
    'Backup to Clover',
    'Use when Clover sync is down');

  // ── PERFORMANCE ────────────────────────────────────────
  let largeImgs = 0;
  const imgDir = path.join(ROOT, 'images');
  if (fs.existsSync(imgDir)) {
    const walk = (d) => {
      for (const f of fs.readdirSync(d)) {
        const fp = path.join(d, f);
        if (fs.statSync(fp).isDirectory()) { walk(fp); continue; }
        if (/\.(jpg|jpeg|png|webp)$/i.test(f) && fs.statSync(fp).size > 2*1024*1024) largeImgs++;
      }
    };
    walk(imgDir);
  }
  addCheck('Performance', 'warn',
    `No oversized images`,
    largeImgs === 0,
    largeImgs > 0 ? `${largeImgs} image(s) over 2MB` : 'All images optimized',
    'Slow loads cost conversions');
  addCheck('Performance', 'info',
    'Image lazy-loading',
    html.includes('loading="lazy"'),
    'Defers off-screen images',
    'Faster initial paint');
  addCheck('Performance', 'info',
    'Font preconnect',
    html.includes('preconnect') && html.includes('fonts.gstatic'),
    'Speeds Google Fonts',
    'Smaller layout shift');

  // ── BUSINESS OPERATIONS ────────────────────────────────
  addCheck('Operations', 'critical',
    'Hours displayed prominently',
    html.match(/Wed.{0,5}Thu|Fri.{0,5}Sat|opens/i),
    'Customers know when to come',
    'Wasted trips = bad reviews');
  addCheck('Operations', 'critical',
    'Phone or email contact',
    html.match(/Bailey@jamiesshoess|6368666669|@jamiesshoess/i),
    'Customers can reach you',
    'Lost sales without this');
  addCheck('Operations', 'warn',
    'Reviews collection system',
    html.includes('reviews-sec'),
    'Funnels happy to Google, sad to email',
    'More 5-star reviews = better SEO');
  addCheck('Operations', 'info',
    'Backup system documented',
    fs.existsSync(path.join(ROOT, 'enhance-customers.py')),
    'Have a process',
    'Disaster recovery');

  // Roll up summary
  let total = 0, passed = 0;
  for (const cat of Object.values(audit.categories)) {
    for (const c of cat) { total++; if (c.pass) passed++; }
  }
  audit.score = { passed, total, pct: total ? Math.round(passed / total * 100) : 0 };
  audit.timestamp = new Date().toISOString();

  res.json(audit);
});

// ── CLOVER STATUS ────────────────────────────────────────────────────────────
app.get('/clover-status', (req, res) => {
  const status = { configured: false, items: 0, lastSync: null, steps: [] };

  // Check .env
  let envOk = false;
  try {
    const env = fs.readFileSync(path.join(ROOT, '.env'), 'utf8');
    const merchantSet = /CLOVER_MERCHANT_ID=(?!your_|A1B2C3D4E5)\S+/.test(env);
    const tokenSet    = /CLOVER_API_TOKEN=(?!your_)\S+/.test(env);
    const secretSet   = /CLOVER_ECOM_SECRET_KEY=(?!your_)\S+/.test(env);
    const publicSet   = /CLOVER_ECOM_PUBLIC_KEY=(?!your_)\S+/.test(env);
    envOk = merchantSet && tokenSet && secretSet;
    status.steps.push({ label: 'Merchant ID set in .env',       done: merchantSet });
    status.steps.push({ label: 'API Token set in .env',          done: tokenSet });
    status.steps.push({ label: 'Ecom Secret Key set in .env',    done: secretSet });
    status.steps.push({ label: 'Ecom Public Key set in .env',    done: publicSet });
  } catch (e) {
    status.steps.push({ label: '.env file exists', done: false });
  }

  // Check config.js
  let configOk = false;
  try {
    const cfg = fs.readFileSync(path.join(ROOT, 'config.js'), 'utf8');
    configOk = /cloverPublicKey:\s*['"](?!your_|paste|YOUR_)[^'"]+['"]/.test(cfg);
    status.steps.push({ label: 'cloverPublicKey filled in config.js', done: configOk });
  } catch (e) {
    status.steps.push({ label: 'config.js exists', done: false });
  }

  // Check inventory.json
  let invOk = false;
  try {
    const inv = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'inventory.json'), 'utf8'));
    invOk = inv.items && inv.items.length > 0;
    status.items = inv.items ? inv.items.length : 0;
    status.lastSync = inv.lastUpdated;
    status.steps.push({ label: `Live inventory pulled (${status.items} items)`, done: invOk });
  } catch (e) {
    status.steps.push({ label: 'Live inventory pulled from Clover', done: false });
  }

  // Check backend deployed
  let deployOk = false;
  try {
    const cfg = fs.readFileSync(path.join(ROOT, 'config.js'), 'utf8');
    deployOk = /backendUrl:\s*['"]https?:\/\/(?!localhost)[^'"]+['"]/.test(cfg);
    status.steps.push({ label: 'Backend deployed (Railway/Render)', done: deployOk });
  } catch (e) {
    status.steps.push({ label: 'Backend deployed', done: false });
  }

  status.configured = envOk && configOk && invOk;
  status.totalSteps = status.steps.length;
  status.doneSteps  = status.steps.filter(s => s.done).length;
  res.json(status);
});

// ── ROADMAP ──────────────────────────────────────────────────────────────────
app.get('/roadmap', (req, res) => {
  res.json({
    phases: [
      {
        name: 'Phase 1 — Foundation',
        timeframe: 'NOW',
        status: 'done',
        items: [
          { done: true,  text: 'Dark-themed responsive site live' },
          { done: true,  text: 'Product catalog + cart + checkout flow' },
          { done: true,  text: 'Admin page for manual inventory' },
          { done: true,  text: 'Customer photo slideshow' },
          { done: true,  text: 'Reviews system (Google-compliant filter)' },
          { done: true,  text: 'Dashboard for site management' },
          { done: true,  text: 'iPhone-optimized + mobile scroll fixed' },
        ],
      },
      {
        name: 'Phase 2 — Live Inventory',
        timeframe: 'NEXT 1–2 WEEKS',
        status: 'active',
        items: [
          { done: false, text: 'Fill .env with real Clover API tokens (Merchant ID + Private Token + Ecom Secret/Public)' },
          { done: false, text: 'Run clover-sync.js locally to verify it pulls inventory' },
          { done: false, text: 'Deploy backend to Railway/Render (free tier, 24/7)' },
          { done: false, text: 'Update config.js backendUrl to public URL' },
          { done: false, text: 'Test full purchase end-to-end with real Clover card' },
        ],
      },
      {
        name: 'Phase 3 — Operations Layer',
        timeframe: '1 MONTH',
        status: 'planned',
        items: [
          { done: false, text: 'Low-stock SMS/email alerts to Bailey' },
          { done: false, text: 'Daily sales summary email (auto-generated)' },
          { done: false, text: 'Customer database (emails captured → newsletter)' },
          { done: false, text: 'Returning customer recognition (cart restored)' },
          { done: false, text: 'Order pickup notification system' },
        ],
      },
      {
        name: 'Phase 4 — Growth Layer',
        timeframe: '2–3 MONTHS',
        status: 'planned',
        items: [
          { done: false, text: 'Google Shopping product feed (auto-generated)' },
          { done: false, text: 'Instagram product tagging integration' },
          { done: false, text: 'Reserve/hold system (try-on by appointment)' },
          { done: false, text: 'Loyalty program (3rd purchase = $10 off)' },
          { done: false, text: 'Drop schedule on homepage (next product release)' },
        ],
      },
      {
        name: 'Phase 5 — Brand Layer',
        timeframe: '3–6 MONTHS',
        status: 'planned',
        items: [
          { done: false, text: 'Authentication certificates for high-value items' },
          { done: false, text: 'Vintage item history pages (provenance storytelling)' },
          { done: false, text: 'Wholesale/B2B portal for resellers' },
          { done: false, text: 'Mobile app (PWA with push notifications)' },
          { done: false, text: 'Subscription "monthly drop box" — curated heat' },
        ],
      },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`[DASHBOARD] Server running at http://localhost:${PORT}`);
  console.log(`[DASHBOARD] Open: http://localhost:${PORT}/dashboard.html`);
  console.log(`[DASHBOARD] Manager: http://localhost:${PORT}/manager.html`);
});
