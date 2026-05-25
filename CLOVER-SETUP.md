# Clover Integration Setup — JAMIESSHOESS

This guide gets your **real-time Clover inventory sync** running. Takes ~10 minutes.

## What this does once configured

- Inventory shown on your website pulls from **your actual Clover POS every 15 minutes**
- When someone buys online → stock decrements in Clover automatically
- When you sell in-store on Clover → website reflects the new stock
- No manual data entry, no double bookkeeping

---

## Step 1 — Log in to Clover Dashboard

Go to: **https://dashboard.clover.com**

Log in with your store's Clover account.

## Step 2 — Find your Merchant ID

1. After login, look at the URL in the browser address bar
2. It looks like: `https://dashboard.clover.com/m/A1B2C3D4E5/...`
3. **Your Merchant ID** is the `A1B2C3D4E5` part (yours will be different — usually 13 characters)

Copy that. Paste it into `.env` as the value for `CLOVER_MERCHANT_ID=`

## Step 3 — Get your API Token

1. In the Clover Dashboard sidebar → **Account & Setup**
2. Find **API Tokens** (sometimes called "Ecommerce API Tokens" or "API Keys")
3. Click **Create API Token** (or use an existing one if you already have one)
4. Give it permissions: `Read inventory`, `Write inventory`, `Read orders`, `Write orders`
5. Copy the token

Paste into `.env` as `CLOVER_API_TOKEN=`

## Step 4 — Get your Ecommerce Secret + Public Keys

These are different from the API token — they're for processing online payments.

1. In Clover Dashboard → **Account & Setup → Ecommerce API Tokens**
2. You'll see **Public Key** and **Private (Secret) Key**
3. Copy both

- `CLOVER_ECOM_PUBLIC_KEY=` ← Public Key (used by website to tokenize cards safely)
- `CLOVER_ECOM_SECRET_KEY=` ← Secret Key (used by server to charge cards)

**⚠ Keep the Secret Key secret.** Never commit it to GitHub. The `.gitignore` should exclude `.env`.

## Step 5 — Update config.js (frontend)

Open `C:\Users\kando\jamies-shoes\config.js` and fill in:

```js
window.JAMIESSHOESS_CONFIG = {
  backendUrl: 'http://localhost:3001',  // for local testing; change after deploy
  cloverPublicKey: 'paste your public key here',
};
```

## Step 6 — Test locally

Open a terminal in `C:\Users\kando\jamies-shoes`:

```bash
node clover-sync.js
```

You should see:
```
[SYNCED] X items pulled from Clover at HH:MM:SS
[SERVER] JAMIESSHOESS backend running on port 3001
[SERVER] Clover env: production
```

If you see `[SYNC] Skipped — CLOVER_MERCHANT_ID...` then your .env isn't loading. Double-check.

## Step 7 — Verify on the website

Open `http://localhost:8080` (or your dev URL). On the Products section, you should see real Clover items instead of the starter catalog. The Manager page (`/manager.html`) will show **🟢 from Clover (live)** instead of "starter catalog."

## Step 8 — Deploy backend to Railway (so it runs 24/7)

Once it works locally, deploy so it runs even when your laptop is off:

1. Go to **railway.app** → sign up (free)
2. New Project → **Deploy from GitHub**
3. Connect this repo
4. Add environment variables (paste in same values from `.env`)
5. Set start command: `node clover-sync.js`
6. Railway gives you a URL like `https://jamiesshoess.up.railway.app`
7. Update `config.js` → `backendUrl: 'https://jamiesshoess.up.railway.app'`
8. Push to GitHub — site now uses live backend forever

## Troubleshooting

**"Clover API 401 Unauthorized"**
Your API token is wrong or expired. Re-create from Clover Dashboard.

**"Clover API 404"**
Your Merchant ID is wrong. Verify by checking the URL in your Clover dashboard.

**"items: []" in inventory.json**
Your Clover catalog might be empty, or items might be `hidden:true`. Check Clover Dashboard → Inventory.

**Site still shows starter catalog**
Hard-refresh the browser (Ctrl+Shift+R). The site reads `data/inventory.json` which was empty before sync ran.

---

## What gets synced automatically

| From Clover | To website |
|---|---|
| Item name | Product name |
| Price (cents) | Display price |
| Image | Product photo |
| Stock count | "Only X left" badges, sold-out state |
| Category name | Category filter (mapped via keywords) |
| Hidden items | Excluded from website |

Sync runs every 15 minutes. When something sells online, stock decrements in both places immediately.
