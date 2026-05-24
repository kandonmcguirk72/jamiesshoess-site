# JAMIESSHOESS — Clover Inventory Sync

Pulls live inventory from Clover every 15 minutes and saves it to `data/inventory.json`. The site reads that file so products are always current. Also runs a lightweight checkout server so customers can pay with a card right on the site.

---

## Step 1 — Get your Clover API tokens

1. Log in at [dashboard.clover.com](https://dashboard.clover.com)
2. Go to **Accounts & Setup → Ecommerce API Tokens**
3. Copy:
   - **Merchant ID** (top of the dashboard, looks like `A1B2C3D4E5`)
   - **Private API Token** (used by the server to read/update inventory)
   - **Ecommerce Secret Key** (used by the server to charge cards)
   - **Ecommerce Public Key** (used by the frontend — goes in `config.js`)

---

## Step 2 — Configure

1. Open `.env` and fill in all four values:
   ```
   CLOVER_MERCHANT_ID=A1B2C3D4E5
   CLOVER_API_TOKEN=your_private_token
   CLOVER_ECOM_SECRET_KEY=your_ecom_secret
   CLOVER_ECOM_PUBLIC_KEY=your_ecom_public_key
   CLOVER_ENV=production
   PORT=3001
   ```

2. Open `config.js` (frontend) and fill in:
   ```js
   backendUrl: 'https://your-app.up.railway.app',
   cloverPublicKey: 'your_ecom_public_key',
   ```

---

## Step 3 — Run locally

```bash
npm install
node clover-sync.js
```

The server starts on `http://localhost:3001`. Open `index.html` in a browser to test. Inventory syncs immediately, then every 15 minutes.

---

## Free hosting

### Backend (Node server) — Railway or Render

**Railway** (recommended, free tier):
1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **New Project → Deploy from GitHub repo** → pick `jamiesshoess-site`
3. Set environment variables in Railway dashboard (same as your `.env`)
4. Railway auto-detects `package.json` and runs `npm start`
5. Copy the generated URL (e.g. `https://jamiesshoess.up.railway.app`)
6. Paste it into `config.js` as `backendUrl`

**Render** (alternative):
1. Go to [render.com](https://render.com) → **New Web Service**
2. Connect GitHub repo, set Build Command: `npm install`, Start Command: `node clover-sync.js`
3. Add environment variables, deploy

### Frontend — GitHub Pages

1. Push latest code to GitHub:
   ```bash
   git add .
   git commit -m "Add Clover sync"
   git push
   ```
2. In GitHub repo → **Settings → Pages → Source: Deploy from branch → master**
3. Site goes live at `https://kandonmcguirk72.github.io/jamiesshoess-site`

---

## How it works

| What | Where |
|------|-------|
| Inventory sync | `clover-sync.js` → reads Clover API → writes `data/inventory.json` every 15 min |
| Product display | `app.js` fetches `data/inventory.json` on page load |
| Checkout | Customer clicks ADD TO CART → Clover card iframe → POST `/checkout` → charge |
| Stock update | On successful sale, server decrements stock in `inventory.json` AND in Clover |

If Clover is not configured (`config.js` left blank), the site falls back to the built-in product catalog and the existing cart/DM-on-Instagram checkout flow.
