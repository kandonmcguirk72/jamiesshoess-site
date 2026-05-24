// ── STORE INFO ─────────────────────────────────────────────────────────────────
const STORE = {
  name: "JAMIESSHOESS",
  address: "302 Park Central East, Springfield, MO",
  hours: {
    // 0=Sun,1=Mon,2=Tue,3=Wed,4=Thu,5=Fri,6=Sat
    3: { open: 12, close: 18 },
    4: { open: 12, close: 18 },
    5: { open: 12, close: 19 },
    6: { open: 12, close: 19 },
  },
  instagram: "https://www.instagram.com/jamiesshoess",
  facebook: "https://www.facebook.com/jamiesshoess",
  tiktok: "https://www.tiktok.com/@jamiesshoess417",
  quote: "In a world of opportunity, it's your obligation to take action and create something for yourself.",
};

// ── PRODUCTS — Real listings copied from jamiesshoess.squarespace.com ─────────
const STARTER = [
  { id:1,  name:"1/1 JAMIESSHOESS HOODIE (SIZE XXL)", category:"clothing", price:45, size:"XXL", description:"One-of-one JAMIESSHOESS custom hoodie. Size XXL.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1769025392066-P7XJRKHLPSGAI1VDMF02/911DF987-D9D3-4530-AEB6-B7DE6E422C63.jpeg", badge:"rare", stock:1 },
  { id:2,  name:"1/1 JAMIESSHOESS CREW (SIZE XL)", category:"clothing", price:50, size:"XL", description:"One-of-one JAMIESSHOESS custom crewneck. Size XL.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1769024847046-BJB88E0ZLFPGZS3SP5UN/1116CB6B-A048-49C1-8E11-77D173F8652A.jpeg", badge:"rare", stock:1 },
  { id:3,  name:"1/1 JAMIESSHOESS CREW (SIZE 2XL)", category:"clothing", price:35, size:"2XL", description:"One-of-one JAMIESSHOESS custom crewneck. Size 2XL.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1769024663976-8D15JYL27GTBO1HC4A82/997994FA-D1F7-4508-8109-881517E79C54.jpeg", badge:"rare", stock:1 },
  { id:4,  name:"1/1 JAMIESSHOESS CREWNECK (SIZE 3XL)", category:"clothing", price:45, size:"3XL", description:"One-of-one JAMIESSHOESS custom crewneck. Size 3XL.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1769024370224-PMMCNUA3YOXFBDJ5KZ8E/CB419FB3-01A1-42F0-850B-F2796E23F12D.jpeg", badge:"rare", stock:1 },
  { id:5,  name:"1/1 JAMIESSHOESS HOODIE (SIZE M)", category:"clothing", price:60, size:"M", description:"One-of-one JAMIESSHOESS custom hoodie. Size M.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1769023591550-33ZZ1P5XJE7C53DJNLOT/CBE74A86-6092-4F5A-BE46-84D15AAB2699.jpeg", badge:"rare", stock:1 },
  { id:6,  name:"JAMIESSHOESS OG TEE (SIZE S-3XL)", category:"clothing", price:30, size:"S–3XL", description:"The OG JAMIESSHOESS tee. Available S through 3XL.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1769020654352-9W6B5R11ZL6HMRTM1R1S/2CD3764A-32D5-4EA4-9C9F-7EFA3ECEBF1F.jpeg", badge:"new", stock:10 },
  { id:7,  name:"VTG NASCAR AOP (SIZE L)", category:"clothing", price:100, size:"L", description:"Vintage NASCAR all-over print tee. Rare 90s piece.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1753149401458-JM7FT4UGDGQQ641OHKE5/694048B9-EDAB-4160-A293-B4C3FA6703CD.jpeg", badge:"vintage", stock:1 },
  { id:8,  name:"VTG MARK MCGWIRE TEE (FITS XL)", category:"clothing", price:35, size:"XL", description:"Vintage Mark McGwire graphic tee. Fits XL.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1753117798246-8KKGR7RBKWFPA7QSIPT9/50F1C565-8220-40AC-84FC-33A3CE263E14.jpeg", badge:"vintage", stock:1 },
  { id:9,  name:"VTG Y2K JIMMY NEUTRON TEE (SIZE S-M)", category:"clothing", price:30, size:"S–M", description:"Y2K era Jimmy Neutron graphic tee. Fits S–M.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1753117281561-AU3P5WPH3NBG1I7P0IZP/37AFBC25-CF8A-428D-A993-CC56C7944935.jpeg", badge:"vintage", stock:1 },
  { id:10, name:"VTG GUESS TEE (SIZE L)", category:"clothing", price:30, size:"L", description:"Vintage Guess graphic tee. Size L.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1753117226657-CHY9DGBC9O6GOYZ4UU0V/B791FBC7-0B00-4575-85EA-1D6219D391A3.jpeg", badge:"vintage", stock:1 },
  { id:11, name:"VTG GUESS TEE (SIZE M)", category:"clothing", price:30, size:"M", description:"Vintage Guess graphic tee. Size M.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1753117140602-6IK7F258SRLK3A1K454Y/1C4C52B6-00CE-448D-8A7D-EEB92E9A4E0E.jpeg", badge:"vintage", stock:1 },
  { id:12, name:"VTG SINGLE STITCH LEVIS TEE (FITS S-M)", category:"clothing", price:30, size:"S–M", description:"Vintage single stitch Levi's tee. Fits S–M.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1753117004822-HPWDFU51GKV8AK2VQ7PH/CE033052-D39D-47C2-ACF7-D775B78CCC16.jpeg", badge:"vintage", stock:1 },
  { id:13, name:"VTG ELVIS TEE (SIZE M)", category:"clothing", price:30, size:"M", description:"Vintage Elvis Presley graphic tee. Size M.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1753116932266-CQESCIOP260HKQMS0CXQ/FCF2B474-E964-4649-B595-D6C64D3DDB96.jpeg", badge:"vintage", stock:1 },
  { id:14, name:"VTG TASMANIAN DEVIL TEE (SIZE XL)", category:"clothing", price:35, size:"XL", description:"Vintage Tasmanian Devil Looney Tunes tee. Size XL.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1753116762718-YA13VRFO92500PLVWV75/81A8A3B8-E7A2-4AB1-864B-FDAD3606F66F.jpeg", badge:"vintage", stock:1 },
  { id:15, name:"VTG Y2K SKATE TEE (SIZE S)", category:"clothing", price:25, size:"S", description:"Y2K era skate graphic tee. Size S.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1753116484145-5K6A3E7Y8F0HQYPU8N34/F1521EFA-42DE-4750-B1A3-4AC44AAE84D9.jpeg", badge:"vintage", stock:1 },
  { id:16, name:"VTG 1998 JERRY RICE 49ERS TEE (SIZE M)", category:"clothing", price:60, size:"M", description:"Vintage 1998 Jerry Rice San Francisco 49ers tee. Size M.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1753116205949-4RW4DXIG5T4G7DXV1UQ2/C1A9A2F0-A17F-4E46-A8D6-65F821E4DBF4.jpeg", badge:"rare", stock:1 },
  { id:17, name:"VTG 1985 WORLD SERIES KC ROYALS TEE (SIZE M)", category:"clothing", price:40, size:"M", description:"Vintage 1985 World Series Kansas City Royals tee. Size M.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1753116015213-BP8R4102HPXSAJTABBG8/2B6F77A3-40DC-41FC-AE58-7F11D1112C74.jpeg", badge:"rare", stock:1 },
  { id:18, name:"VTG 2007 JOHN CENA WRESTLING TEE (SIZE L)", category:"clothing", price:40, size:"L", description:"Vintage 2007 John Cena WWE wrestling tee. Size L.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1753115809358-6INNK9ITIUZERX8U3USA/459E939D-0749-4F9A-9556-3CBB3DDB5C0D.jpeg", badge:"vintage", stock:1 },
  { id:19, name:"VTG FEAR FACTOR TEE (SIZE XL)", category:"clothing", price:40, size:"XL", description:"Vintage Fear Factor TV show tee. Size XL.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1753115619602-AIKTNPYQLEH1528K8HJ0/8C502257-E357-496A-BC4E-4CB62FE45266.jpeg", badge:"vintage", stock:1 },
  { id:20, name:"WMNS HARLEY JACKET (SIZE XL)", category:"clothing", price:35, size:"XL", description:"Women's Harley-Davidson jacket. Size XL.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1751748781792-SDULZ9VOLAURQNL5D70B/868A94F3-9F18-4473-972B-31EA4F5A8125.jpeg", badge:"", stock:1 },
  { id:21, name:"VTG ST. LOUIS RAMS PULL OVER (SIZE L-XL)", category:"clothing", price:30, size:"L–XL", description:"Vintage St. Louis Rams pullover. Fits L–XL.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1751748710844-OA89ZPBABWGT1J8AN4X6/8FDACAE4-863F-4046-98F4-29AAF82DF299.jpeg", badge:"vintage", stock:1 },
  { id:22, name:"VTG 2009 AOP TEE (SIZE M)", category:"clothing", price:60, size:"M", description:"Vintage 2009 all-over print tee. Size M.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1751746210051-ANE00GYG2V0A7A3DGQI7/9B431DF9-B072-4E1C-90FE-79428B23C888.jpeg", badge:"vintage", stock:1 },
  { id:23, name:"VTG WOMENS HARLEY VEST (SIZE L)", category:"clothing", price:35, size:"L", description:"Vintage women's Harley-Davidson vest. Size L.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1751746072456-9G7W4ZKR00YHTU8GAGRW/23E017F5-FA3D-450F-871C-58A73F50DF3C.jpeg", badge:"vintage", stock:1 },
  { id:24, name:"VTG HARLEY DENIM TOP (FITS L)", category:"clothing", price:35, size:"L", description:"Vintage Harley-Davidson denim top. Fits L.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1751746010264-8NGRPWYMQQ3LG86FG9TA/15D3D2F2-1267-4243-9C08-64FBA7977322.jpeg", badge:"vintage", stock:1 },
  { id:25, name:"VTG BUM EQUIPMENT TEE (FITS XL)", category:"clothing", price:25, size:"XL", description:"Vintage Bum Equipment tee. Fits XL.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1751745910060-4OC3KK5Q6NRG4PO10M0Z/78BB4CDF-BD39-4055-BBD9-8EB112DE2EFA.jpeg", badge:"vintage", stock:1 },
  { id:26, name:"VTG WOLF TEE (SIZE 3XL)", category:"clothing", price:35, size:"3XL", description:"Vintage wolf graphic tee. Size 3XL.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1751745785367-04A4PT7ECLNVL5Y95P2X/605D6D71-3B14-47BE-8E45-7D225C236A99.jpeg", badge:"vintage", stock:1 },
  { id:27, name:"VTG 2008 SUPERMAN THERMAL (SIZE L)", category:"clothing", price:25, size:"L", description:"Vintage 2008 Superman thermal long sleeve. Size L.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1751745573026-UQK4HQSRCATTMXM4Y1VD/D4977C5B-A767-40AF-9BDB-6972989E2AD2.jpeg", badge:"vintage", stock:1 },
  { id:28, name:"VTG 2008 HARLEY TEE (SIZE XXL)", category:"clothing", price:30, size:"XXL", description:"Vintage 2008 Harley-Davidson tee. Size XXL.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1751745512105-6GM82WYEVZJBJIT2T7IW/E35455F3-CFF7-4EF2-A17C-FEE21EF5B387.jpeg", badge:"vintage", stock:1 },
  { id:29, name:"VTG NOTRE DAME TEE (SIZE L)", category:"clothing", price:65, size:"L", description:"Vintage Notre Dame Fighting Irish tee. Size L.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1751744985185-ZJEJBRSSNR9AZ7OVQKXY/7F50FA65-94E1-416F-A4AE-9F2C664E8A30.jpeg", badge:"rare", stock:1 },
  { id:30, name:"VTG JNCO MOTO TEE (FITS S-M)", category:"clothing", price:80, size:"S–M", description:"Vintage JNCO motorcycle graphic tee. Rare find. Fits S–M.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1751745091579-VL5FFKYYY8B2HQL8EE3V/DB845825-E51B-4111-95DA-5414F3C13395.jpeg", badge:"rare", stock:1 },
  { id:31, name:"VTG CHIEFS SINGLE STITCH (FITS XL)", category:"clothing", price:25, size:"XL", description:"Vintage KC Chiefs single stitch tee. Fits XL.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1751744819157-33TNB42LCX1ABLT4S3W7/AE0D260E-A953-4FDD-8AB2-C76571FF4B0F.jpeg", badge:"vintage", stock:1 },
  { id:32, name:"VTG JNCO LONG SLEEVE TEE (FITS S-M)", category:"clothing", price:80, size:"S–M", description:"Vintage JNCO long sleeve tee. Rare. Fits S–M.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1751745202277-SRS5L4Q1C3RY84IMX550/E16FABA8-D903-478E-A042-F6D5BFC43849.jpeg", badge:"rare", stock:1 },
  { id:33, name:"VTG RAMS JERSEY (SIZE XL)", category:"clothing", price:35, size:"XL", description:"Vintage St. Louis Rams jersey. Size XL.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1751744656229-QG6ZPZ9BLOB2R5YMYF9H/2CDD9922-D9AA-4234-80B8-AFA21FCCF6E0.jpeg", badge:"vintage", stock:1 },
  { id:34, name:"JAMIESSHOESS 1/1 CAMO TEE (FITS L)", category:"clothing", price:30, size:"L", description:"One-of-one JAMIESSHOESS camo tee. Fits L.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1743438158749-HEVGR37TK9XO62F6UBMX/07780A60-56E8-4EE7-9D80-3C9520BA7913.jpeg", badge:"rare", stock:0 },
  { id:35, name:"JAMIESSHOESS X JOHN DEERE 1/1 LONG SLEEVE (SIZE M)", category:"clothing", price:40, size:"M", description:"JAMIESSHOESS x John Deere one-of-one long sleeve. Size M.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1743438024614-A3V1R79DY01KTZ2BP1SN/E2A42982-F396-4B5E-AED5-3AB4F0C2C8A5.jpeg", badge:"rare", stock:0 },
  { id:36, name:"Carhartt X Jamiesshoess Beanie", category:"hats", price:30, size:"One Size", description:"Limited Carhartt X JAMIESSHOESS collab beanie.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1737153351329-UDJ7OM6TKE1QZHKFIO4N/A1BB25E7-F661-4053-A3D8-CDC147F3A500.jpeg", badge:"new", stock:3 },
  { id:37, name:"Carhartt X Jamiesshoess Beanie (Alt)", category:"hats", price:30, size:"One Size", description:"Limited Carhartt X JAMIESSHOESS collab beanie — alternate colorway.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1737153522825-XYZHXBJUMJFDO53B7HTG/FC712D36-D939-4A3A-8A21-5D95E0628DAA.jpeg", badge:"new", stock:3 },
  { id:38, name:"Vintage Sweater (SIZE L)", category:"clothing", price:22, size:"L", description:"Vintage patterned sweater. Size L.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1737156943994-VD8F3OIXW21NLNSMU5FE/CCB310B9-E78C-49B8-9932-0703D4E93C26.jpeg", badge:"vintage", stock:1 },
  { id:39, name:"Vintage KU Crewneck (SIZE XL)", category:"clothing", price:20, size:"XL", description:"Vintage University of Kansas Jayhawks crewneck. Size XL.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1737155041819-DXESTAD5RNSAJ6UWBJVE/6B72FD25-8EF6-4D6A-8F9A-7963F63CDF15.jpeg", badge:"vintage", stock:1 },
  { id:40, name:"Vintage Sweater (SIZE XXL)", category:"clothing", price:22, size:"XXL", description:"Vintage patterned sweater. Size XXL.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1737156830425-CV20QAWZLVGF6Z3M6X7E/C7DD0357-A2FA-4266-9015-48F626A07DC8.jpeg", badge:"vintage", stock:1 },
  { id:41, name:"Harley Davidson Button Up (SIZE XL)", category:"clothing", price:14.99, size:"XL", description:"Harley-Davidson button-up shirt. Size XL.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1737155280959-KPF80J3T23M52NWEWABR/891228DE-32CF-4A37-97A0-3EFCEB92FE6C.jpeg", badge:"vintage", stock:0 },
  { id:42, name:"Vintage 1996 Grateful Dead Tee (SIZE S)", category:"clothing", price:35, size:"S", description:"Authentic 1996 Grateful Dead graphic tee. Size S.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1737155192386-J6Q6CHOU7CNL6BKQGLG4/A3D386A1-249F-4054-8070-E984E31CAA13.jpeg", badge:"rare", stock:1 },
  { id:43, name:"Vintage Cardinals 3pc Lot (SIZE XL)", category:"clothing", price:35, size:"XL", description:"Vintage St. Louis Cardinals 3-piece lot — jersey, tee, and hat. Size XL.", image:"https://images.squarespace-cdn.com/content/v1/62fbad74b2e83466d4f8bc87/1737233309223-AGZZTOZEJ1HWY2GYO9JR/327E1447-02D0-4A13-8079-C4A21FA93F47.jpeg", badge:"vintage", stock:1 },
];

const PROOF_NAMES = ["Marcus T.","Sarah K.","Jordan M.","Chris L.","Aliya B.","Devon R.","Priya S.","Tyler W.","Brandon H.","Mia C."];
const PROOF_ITEMS = ["Vintage NASCAR Tee","JAMIESSHOESS OG Tee","Carhartt x Jamiesshoess Beanie","Vintage Grateful Dead Tee","VTG Harley Tee","JNCO Moto Tee","Vintage Notre Dame Tee","VTG Jerry Rice Tee","Vintage KC Royals Tee","John Cena Wrestling Tee"];
const INSTA_IMGS = [
  { src:"images/store-interior-shoes.jpg",   alt:"Sneaker wall at JAMIESSHOESS — 302 Park Central East, Springfield MO" },
  { src:"images/sneakers-feature.jpg",        alt:"Nike SB Dunk collection — JAMIESSHOESS Springfield" },
  { src:"images/store-interior-vintage.jpg",  alt:"Vintage tee racks at JAMIESSHOESS" },
  { src:"images/store-interior-counter.jpg",  alt:"JAMIESSHOESS store counter and vintage tee wall display" },
  { src:"images/store-interior-window.jpg",   alt:"JAMIESSHOESS storefront window view from inside" },
  { src:"images/store-interior-fisheye.jpg",  alt:"Full store view at JAMIESSHOESS — fisheye lens" },
];

// ── STATE ──────────────────────────────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('js_cart') || '[]');
let currentFilter = 'all';
let currentSort = 'default';

// Live inventory from data/inventory.json (null = not yet loaded → falls back to STARTER)
let allProducts = null;
let inventoryLastUpdated = null;

// Clover checkout state
let cloverInstance = null;
let checkoutState  = { itemIds: [], amount: 0, label: '' };

// ── INIT ───────────────────────────────────────────────────────────────────────
function init() {
  // Seed localStorage from STARTER for immediate render before JSON loads
  if (!localStorage.getItem('js_products') || localStorage.getItem('js_v') !== '3') {
    localStorage.setItem('js_products', JSON.stringify(STARTER));
    localStorage.setItem('js_v', '3');
  }
  buildFilterTabs();
  renderProducts();
  window.ALL_PRODUCTS = getProducts();
  window._productsLoaded = true;
  renderInsta();
  updateCartBadge();
  animateStats();
  setupSearch();
  startSocialProof();
  scheduleEmailPopup();
  renderStoreStatus();

  // Load live Clover inventory in background; re-render when ready
  loadInventory().then(() => {
    if (allProducts) {
      buildFilterTabs();
      renderProducts();
      window.ALL_PRODUCTS = getProducts();
      window._productsLoaded = true;
      renderLastUpdated();
      setInterval(renderLastUpdated, 60000);
    }
  }).catch(() => {});

  // Init Clover SDK when public key is available
  const cfg = window.JAMIESSHOESS_CONFIG || {};
  if (cfg.cloverPublicKey && typeof Clover !== 'undefined') {
    cloverInstance = new Clover(cfg.cloverPublicKey);
  }
}

function getProducts() {
  return allProducts || JSON.parse(localStorage.getItem('js_products') || '[]');
}

// ── INVENTORY LOADING ─────────────────────────────────────────────────────────
async function loadInventory() {
  try {
    const res = await fetch('data/inventory.json?t=' + Date.now());
    if (!res.ok) return;
    const data = await res.json();
    if (data.items && data.items.length > 0) {
      allProducts = data.items.map(normalizeItem);
      inventoryLastUpdated = data.lastUpdated;
    }
  } catch (e) { /* network error — stay on STARTER */ }
}

function normalizeItem(item) {
  // Clover sync format: price in cents, uses quantity + imageUrl
  // STARTER format: price in dollars, uses stock + image
  const isClover = item.priceDisplay !== undefined;
  return {
    id:       item.id,
    name:     item.name,
    category: item.category || 'clothing',
    price:    isClover ? item.price / 100 : item.price,
    size:     item.size || '',
    description: item.description || '',
    image:    item.imageUrl || item.image || '',
    badge:    (item.badge || '').toLowerCase(),
    stock:    isClover ? item.quantity : (item.stock ?? 1),
  };
}

function renderLastUpdated() {
  const meta = document.getElementById('inventoryMeta');
  const span = document.getElementById('lastUpdatedText');
  if (!span || !inventoryLastUpdated) return;
  const mins = Math.floor((Date.now() - new Date(inventoryLastUpdated)) / 60000);
  span.textContent = mins <= 1 ? 'just now' : mins + ' min ago';
  if (meta) meta.hidden = false;
}

// ── STORE HOURS / OPEN STATUS ──────────────────────────────────────────────────
function isStoreOpen() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const todayHours = STORE.hours[day];
  if (!todayHours) return false;
  return hour >= todayHours.open && hour < todayHours.close;
}

function getNextOpenTime() {
  const now = new Date();
  const day = now.getDay();
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    if (STORE.hours[d]) {
      return `${days[d]} at ${STORE.hours[d].open === 12 ? '12pm' : STORE.hours[d].open + 'pm'}`;
    }
  }
  return 'soon';
}

function renderStoreStatus() {
  const el = document.getElementById('storeStatus');
  if (!el) return;
  const open = isStoreOpen();
  el.innerHTML = open
    ? `<span class="status-dot open"></span> Open Now`
    : `<span class="status-dot closed"></span> Closed · Opens ${getNextOpenTime()}`;
  el.className = 'store-status ' + (open ? 'is-open' : 'is-closed');
}

// ── FILTER TABS ────────────────────────────────────────────────────────────────
function buildFilterTabs() {
  const container = document.getElementById('filterTabs');
  if (!container) return;
  const products = getProducts();
  const activeCats = new Set(products.map(p => p.category));
  const tabs = [
    { key: 'all',         label: 'All Items' },
    { key: 'shoes',       label: '👟 Shoes' },
    { key: 'clothing',    label: '👕 Clothing' },
    { key: 'hats',        label: '🧢 Hats' },
    { key: 'bags',        label: '👜 Bags' },
    { key: 'accessories', label: '💍 Accessories' },
    { key: 'kids',        label: '🧸 Kids' },
    { key: 'vintage',     label: '🕰️ Vintage Items' },
    { key: 'pokemon',     label: '🃏 Pokémon Cards' },
  ].filter(t => t.key === 'all' || activeCats.has(t.key));
  container.innerHTML = tabs.map(t => `
    <button class="filter-tab${t.key === currentFilter ? ' active' : ''}"
      onclick="filterProducts('${t.key}', this)"
      role="tab" aria-selected="${t.key === currentFilter}">${t.label}</button>
  `).join('');
}

// ── PRODUCTS ───────────────────────────────────────────────────────────────────
function renderProducts(filter, sort, search) {
  filter = filter ?? currentFilter;
  sort = sort ?? currentSort;
  search = search ?? (document.getElementById('searchInput')?.value || '');

  let products = getProducts();
  if (filter !== 'all') products = products.filter(p => p.category === filter);
  if (search) products = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.description||'').toLowerCase().includes(search.toLowerCase())
  );

  if (sort === 'price-low') products.sort((a,b) => a.price - b.price);
  else if (sort === 'price-high') products.sort((a,b) => b.price - a.price);
  else if (sort === 'newest') products.reverse();

  const grid = document.getElementById('productsGrid');
  const empty = document.getElementById('emptyState');
  const title = document.getElementById('productsTitle');
  const count = document.getElementById('productsCount');

  const catNames = {all:'All Items',shoes:'Shoes',clothing:'Clothing',hats:'Hats',bags:'Bags',accessories:'Accessories',kids:'Kids',vintage:'Vintage Items'};
  if (title) title.textContent = catNames[filter] || 'All Items';
  if (count) count.textContent = products.length + ' item' + (products.length !== 1 ? 's' : '');

  if (!products.length) {
    if (grid) grid.innerHTML = '';
    if (empty) { empty.style.display = 'block'; empty.style.gridColumn = '1/-1'; }
    return;
  }
  if (empty) empty.style.display = 'none';

  const emojiMap = {shoes:'👟',clothing:'👕',hats:'🧢',bags:'👜',accessories:'💍',kids:'🧸',vintage:'🕰️'};
  const viewers = [3,5,7,8,12,15,2,4,6,9];

  if (grid) grid.innerHTML = products.map((p, i) => {
    const isSoldOut = p.stock === 0;
    const isVintage = /vtg|vintage/i.test(p.name);
    const isRare    = p.badge === 'rare';
    const isNew     = p.badge === 'new' || /1\/1/i.test(p.name);
    const lowStock  = p.stock && p.stock <= 3 && !isSoldOut;

    const badge = isSoldOut
      ? `<span class="card-badge badge-sold">SOLD</span>`
      : isRare
        ? `<span class="card-badge badge-rare">RARE</span>`
        : isNew
          ? `<span class="card-badge badge-new">1 OF 1</span>`
          : isVintage
            ? `<span class="card-badge badge-vintage">VINTAGE</span>`
            : '';

    const stock = lowStock
      ? `<span class="card-stock">Only ${p.stock} left</span>`
      : '';

    return `
    <div class="product-card${isSoldOut ? ' sold-out' : ''}" data-id="${p.id}" role="listitem">
      <div class="product-img-wrap">
        ${p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.nextSibling.style.display='flex'">` : ''}
        <div class="product-placeholder" style="${p.image?'display:none':''}">
          ${emojiMap[p.category]||'🛍️'}
        </div>
        ${badge}
        ${stock}
        ${isSoldOut ? `<div class="sold-out-overlay"><span>SOLD OUT</span></div>` : ''}
        <div class="product-quick-add">
          ${isSoldOut
            ? `<button class="quick-add-btn sold-out-btn" disabled>Sold Out</button>`
            : `<button class="quick-add-btn" onclick="addToCart(${p.id}, this)">+ Add to Cart</button>`
          }
        </div>
      </div>
      <div class="product-info">
        <div class="product-cat">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-bottom">
          <div class="product-price">$${parseFloat(p.price).toFixed(2)}</div>
          ${p.size ? `<div class="product-size">${p.size}</div>` : ''}
        </div>
      </div>
    </div>`;
  }).join('');
}

function filterProducts(cat, el) {
  currentFilter = cat;
  // Update filter tabs
  document.querySelectorAll('.filter-tab').forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });
  if (el && el.classList.contains('filter-tab')) {
    el.classList.add('active');
    el.setAttribute('aria-selected', 'true');
  } else {
    // Called from nav or category grid — update tabs programmatically
    document.querySelectorAll('.filter-tab').forEach(t => {
      if (t.textContent.toLowerCase().includes(cat) || (cat === 'all' && t.textContent.includes('All'))) {
        t.classList.add('active');
        t.setAttribute('aria-selected', 'true');
      }
    });
  }
  renderProducts(cat);
  return false;
}

function sortProducts(val) {
  currentSort = val;
  renderProducts();
}

// ── SEARCH ─────────────────────────────────────────────────────────────────────
function setupSearch() {
  var input = document.getElementById('searchInput');
  if (!input) return;
  var t;
  input.addEventListener('input', function() {
    clearTimeout(t);
    var q = input.value;
    t = setTimeout(function() {
      renderProducts(currentFilter, currentSort, q);
      var visible = document.querySelectorAll('#productsGrid .product-card').length;
      var noResults = document.getElementById('noResults');
      if (noResults) noResults.hidden = visible > 0 || !q;
    }, 200);
  });
  var floatBtn = document.getElementById('floatBtn');
  if (floatBtn) {
    input.addEventListener('focus', function() {
      floatBtn.classList.remove('visible');
    });
    input.addEventListener('blur', function() {
      if (window.scrollY > 400) floatBtn.classList.add('visible');
    });
  }
}

function toggleSearch() {
  const wrap = document.getElementById('searchBarWrap');
  if (!wrap) return;
  const isOpen = wrap.classList.contains('open');
  wrap.classList.toggle('open');
  if (!isOpen) {
    wrap.querySelector('input')?.focus();
  } else {
    const input = wrap.querySelector('input');
    if (input?.value) { input.value = ''; renderProducts(); }
  }
}

// ── CART ───────────────────────────────────────────────────────────────────────
function addToCart(id, btn) {
  const products = getProducts();
  const p = products.find(p => String(p.id) === String(id));
  if (!p || p.stock === 0) return;

  // Add to cart sidebar
  const existing = cart.find(i => String(i.id) === String(id));
  if (existing) existing.qty = (existing.qty || 1) + 1;
  else cart.push({ ...p, qty: 1 });

  saveCart();
  updateCartBadge();

  if (btn) {
    const orig = btn.textContent;
    btn.textContent = '✓ Added!';
    btn.style.background = '#2563EB';
    btn.style.color = 'white';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.style.color = '';
    }, 1800);
  }
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartBadge();
  renderCart();
}

function saveCart() {
  localStorage.setItem('js_cart', JSON.stringify(cart));
}

function updateCartBadge() {
  const count = cart.reduce((s, i) => s + (i.qty||1), 0);
  const badge = document.getElementById('cartBadge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('overlay');
  const isOpen = sidebar?.classList.contains('open');
  sidebar?.classList.toggle('open');
  overlay?.classList.toggle('open');
  if (!isOpen) renderCart();
}

function renderCart() {
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  if (!body) return;

  if (!cart.length) {
    body.innerHTML = '<div class="cart-empty">Your cart is empty 🛍️<br><br>Start shopping!</div>';
    if (footer) footer.innerHTML = '';
    return;
  }

  const total = cart.reduce((s, i) => s + i.price * (i.qty||1), 0);
  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      ${item.image
        ? `<img class="cart-item-img" src="${item.image}" alt="${item.name}">`
        : `<div class="cart-item-img" style="display:flex;align-items:center;justify-content:center;font-size:26px">🛍️</div>`
      }
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}${(item.qty||1)>1 ? ` × ${item.qty}`:''}</div>
        <div class="cart-item-price">$${(item.price*(item.qty||1)).toFixed(2)}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
    </div>
  `).join('');

  if (footer) footer.innerHTML = `
    <div class="cart-total">Total <span>$${total.toFixed(2)}</span></div>
    <p style="font-size:12px;color:var(--text-light);margin-bottom:12px">📍 Select local pickup at checkout for free!</p>
    <button class="btn-primary full" onclick="checkout()">Checkout</button>
  `;
}

function closeAll() {
  document.getElementById('cartSidebar')?.classList.remove('open');
  document.getElementById('overlay')?.classList.remove('open');
}

function checkout() {
  const cfg = window.JAMIESSHOESS_CONFIG || {};
  if (cfg.backendUrl && cfg.cloverPublicKey && cart.length) {
    const total = cart.reduce((s,i) => s + i.price*(i.qty||1), 0);
    const ids   = cart.map(i => i.id);
    const label = `Cart — ${cart.length} item${cart.length > 1 ? 's' : ''}`;
    closeAll();
    openCloverCheckout(ids, label, Math.round(total * 100));
    return;
  }

  // Fallback: DM on Instagram flow
  const total = cart.reduce((s,i) => s + i.price*(i.qty||1), 0);
  const body   = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');
  if (body) body.innerHTML = `
    <div style="text-align:center;padding:40px 20px">
      <div style="font-size:52px;margin-bottom:16px">🙏</div>
      <h3 style="font-family:var(--ff-d);font-size:22px;font-weight:800;margin-bottom:10px">Order Received!</h3>
      <p style="font-size:14px;color:#aaa;line-height:1.7;margin-bottom:20px">
        Your total is <strong>$${total.toFixed(2)}</strong>.<br>
        DM us on Instagram to confirm your pickup time, or just stop by.
      </p>
      <a href="https://www.instagram.com/jamiesshoess" target="_blank" rel="noopener"
         style="display:inline-flex;align-items:center;gap:8px;background:#c8f500;color:#000;padding:12px 24px;border-radius:100px;font-size:13px;font-weight:700;text-decoration:none">
        DM @jamiesshoess →
      </a>
      <p style="font-size:12px;color:#666;margin-top:20px">
        📍 302 Park Central East, Springfield MO<br>Wed–Thu 12–6pm · Fri–Sat 12–7pm
      </p>
    </div>
  `;
  if (footer) footer.innerHTML = '';
  cart = [];
  saveCart();
  updateCartBadge();
}

// ── INSTAGRAM GRID ─────────────────────────────────────────────────────────────
function renderInsta() {
  const grid = document.getElementById('instaGrid');
  if (!grid) return;
  grid.innerHTML = INSTA_IMGS.map(item => `
    <div class="insta-item">
      <img src="${item.src}" alt="${item.alt}" loading="lazy">
      <div class="insta-overlay">@jamiesshoess</div>
    </div>
  `).join('');
}

// ── SOCIAL PROOF POPUP ─────────────────────────────────────────────────────────
function startSocialProof() {
  function showNext() {
    const name = PROOF_NAMES[Math.floor(Math.random()*PROOF_NAMES.length)];
    const item = PROOF_ITEMS[Math.floor(Math.random()*PROOF_ITEMS.length)];
    const mins = Math.floor(Math.random()*8)+1;
    const popup = document.getElementById('spPopup');
    if (!popup) return;
    document.getElementById('spName').textContent = name;
    document.getElementById('spAction').textContent = `just bought ${item}`;
    popup.querySelector('.sp-time').textContent = `${mins} minute${mins>1?'s':''} ago`;
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 4500);
  }
  setTimeout(() => { showNext(); setInterval(showNext, 18000); }, 6000);
}

// ── EMAIL POPUP ────────────────────────────────────────────────────────────────
function scheduleEmailPopup() {
  if (localStorage.getItem('js_email_dismissed')) return;
  setTimeout(() => {
    document.getElementById('emailPopup')?.classList.add('open');
    document.getElementById('popupOverlay')?.classList.add('open');
  }, 12000);
}

function closeEmailPopup() {
  document.getElementById('emailPopup')?.classList.remove('open');
  document.getElementById('popupOverlay')?.classList.remove('open');
  localStorage.setItem('js_email_dismissed', '1');
}

function submitEmail(e) {
  e.preventDefault();
  const input = document.getElementById('emailInput');
  if (input) { alert(`You're on the list! 🌿\n\nWe'll hit you first when new drops land.`); input.value = ''; }
}

function submitEmailPopup(e) {
  e.preventDefault();
  closeEmailPopup();
  alert(`You're in! 🙌\n\nFirst dibs on every new drop coming to your inbox.`);
}

// ── STAT COUNTER ANIMATION ─────────────────────────────────────────────────────
function animateStats() {
  const nums = document.querySelectorAll('.stat-num[data-count]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const duration = 1800;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString() + (el.dataset.suffix || '');
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString() + (el.dataset.suffix || '');
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => obs.observe(n));
}

// ── MOBILE MENU ────────────────────────────────────────────────────────────────
function toggleMobileMenu() {
  const nav = document.getElementById('mainNav');
  nav?.classList.toggle('open');
  const btn = document.querySelector('.mobile-menu-btn');
  if (btn) btn.textContent = nav?.classList.contains('open') ? '×' : '☰';
}

// ── SCROLL HEADER ──────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('header')?.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

init();

window.resetSearch = function() {
  var input = document.getElementById('searchInput');
  if (input) { input.value = ''; input.dispatchEvent(new Event('input')); }
  var noResults = document.getElementById('noResults');
  if (noResults) noResults.hidden = true;
};

var yearEl = document.getElementById('copyrightYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── CLOVER CHECKOUT ───────────────────────────────────────────────────────────
function openCloverCheckout(itemIds, label, amountInCents) {
  checkoutState = {
    itemIds: Array.isArray(itemIds) ? itemIds : [itemIds].filter(Boolean),
    amount:  amountInCents,
    label,
  };

  const nameEl  = document.getElementById('cloverItemName');
  const priceEl = document.getElementById('cloverItemPrice');
  if (nameEl)  nameEl.textContent  = label;
  if (priceEl) priceEl.textContent = '$' + (amountInCents / 100).toFixed(2);

  // Reset form state
  const form    = document.getElementById('cloverForm');
  const success = document.getElementById('cloverSuccess');
  const errEl   = document.getElementById('cloverError');
  const payBtn  = document.getElementById('cloverPayBtn');
  if (form)    form.style.display    = '';
  if (success) success.hidden        = true;
  if (errEl)   errEl.hidden          = true;
  if (payBtn)  { payBtn.disabled = false; payBtn.textContent = 'Pay Now'; }

  // Show modal
  const modal   = document.getElementById('cloverModal');
  const overlay = document.getElementById('cloverOverlay');
  if (modal)   modal.hidden   = false;
  if (overlay) overlay.hidden = false;
  document.body.style.overflow = 'hidden';

  // Mount Clover card fields
  mountCloverFields();
}

function closeCloverModal() {
  document.getElementById('cloverModal').hidden   = true;
  document.getElementById('cloverOverlay').hidden = true;
  document.body.style.overflow = '';
}

function mountCloverFields() {
  const cfg = window.JAMIESSHOESS_CONFIG || {};
  if (!cfg.cloverPublicKey) return;

  if (!cloverInstance) {
    if (typeof Clover === 'undefined') return;
    cloverInstance = new Clover(cfg.cloverPublicKey);
  }

  // Clear containers so elements can be mounted fresh
  ['clover-card-number','clover-card-date','clover-card-cvv','clover-card-postal'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = '';
  });

  const fieldStyles = {
    styles: {
      '.input-wrapper': { 'background': '#1a1a1a', 'border-radius': '8px' },
      '.input-wrapper input': {
        'color': '#f0f0f0',
        'font-size': '15px',
        'font-family': "'DM Sans', sans-serif",
      },
      '.input-wrapper.invalid input': { 'color': '#ff6b6b' },
    },
  };

  const elements = cloverInstance.elements();
  elements.create('CARD_NUMBER',      fieldStyles).mount('#clover-card-number');
  elements.create('CARD_DATE',        fieldStyles).mount('#clover-card-date');
  elements.create('CARD_CVV',         fieldStyles).mount('#clover-card-cvv');
  elements.create('CARD_POSTAL_CODE', fieldStyles).mount('#clover-card-postal');

  setTimeout(function() {
    var loader = document.getElementById('cloverLoadingState');
    if (loader) loader.style.display = 'none';
  }, 1500);
}

async function submitCloverPayment(e) {
  e.preventDefault();
  const payBtn = document.getElementById('cloverPayBtn');
  const errEl  = document.getElementById('cloverError');

  payBtn.disabled    = true;
  payBtn.textContent = 'Processing…';
  errEl.hidden       = true;

  try {
    if (!cloverInstance) throw new Error('Clover SDK not initialised');

    const { token, errors } = await cloverInstance.createToken();
    if (errors) {
      const msg = Object.values(errors).filter(Boolean)[0];
      throw new Error(msg || 'Card error — check your details');
    }

    const cfg = window.JAMIESSHOESS_CONFIG || {};
    const res = await fetch(cfg.backendUrl + '/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        amount:  checkoutState.amount,
        itemIds: checkoutState.itemIds,
      }),
    });
    const data = await res.json();
    if (!res.ok || data.error) throw new Error(data.error || 'Payment failed');

    // Show success screen
    document.getElementById('cloverForm').style.display = 'none';
    document.getElementById('cloverSuccess').hidden      = false;

    // Mark sold locally so cards update instantly
    if (checkoutState.itemIds.length && allProducts) {
      for (const id of checkoutState.itemIds) {
        const item = allProducts.find(p => String(p.id) === String(id));
        if (item) item.stock = Math.max(0, (item.stock || 1) - 1);
      }
      renderProducts();
    }

    // Clear cart
    cart = [];
    saveCart();
    updateCartBadge();

  } catch (err) {
    errEl.textContent = err.message;
    errEl.hidden      = false;
    payBtn.disabled   = false;
    payBtn.textContent = 'Try Again';
  }
}
