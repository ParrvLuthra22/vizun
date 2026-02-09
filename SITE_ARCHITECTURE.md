# VIZUN Website Architecture
**Premium eCommerce Fashion Platform**

---

## Quick Reference

### Site Structure
```
VIZUN
├── Home (/)
├── Shop (/shop)
├── Product Detail (/product/:slug)
├── Cart (/cart)
├── Checkout (/checkout)
├── Brand (/brand)
├── Account (/account)
└── Admin (/admin)
```

### Navigation
**Primary:** Shop • Brand • Cart  
**Mobile:** Hamburger • Logo • Cart Badge

### Design Hierarchy (Home)
Hero → Philosophy → Featured Drop → Trust → Community → Footer

---

## Page Definitions

### 1. HOME (`/`)
**Purpose:** Establish brand, showcase current drop, drive action

**Sections:**
- **Hero** — Full-screen cinematic intro (electric blue)
- **Philosophy** — Brand positioning statement
- **Featured Drop** — Current limited collection (3-4 products)
- **Trust Signals** — Quality, scarcity, shipping (3-column)
- **Community** — Instagram feed integration
- **Footer** — Navigation, legal, social

**Key Features:**
- Single primary CTA per section
- Scarcity messaging ("Limited to 100 pieces")
- Mobile-first responsive design

---

### 2. SHOP (`/shop`)
**Purpose:** Browse all products, filter, fast discovery

**Components:**
- Filter pills (All, Outerwear, Tops, Bottoms, Accessories, Archive)
- Product grid (3 col desktop, 2 tablet, 1 mobile)
- Product cards (image, name, price, availability)
- Minimal sorting dropdown

**States:**
- Available (dots indicator)
- Sold Out (text overlay)

---

### 3. PRODUCT DETAIL (`/product/:slug`)
**Purpose:** Showcase product, drive purchase, communicate scarcity

**Layout:**
- **Left (60%):** Image gallery with thumbnails
- **Right (40%):** Product info, size selector, CTA

**Key Elements:**
- Quantity remaining (if < 20)
- Size selector (button group)
- Add to Cart (primary CTA)
- Collapsible details (description, care, shipping)
- Related products below

**States:**
- In Stock → "Add to Cart"
- Sold Out → "Join Waitlist"

---

### 4. CART (`/cart`)
**Purpose:** Review selections, adjust, proceed to checkout

**Components:**
- Cart items (image, name, size, qty, price, remove)
- Cart summary (subtotal, shipping, total)
- Primary CTA: "Proceed to Checkout"
- Secondary: "Continue Shopping"

**Empty State:**
- "Your cart is empty" + CTA to shop

---

### 5. CHECKOUT (`/checkout`)
**Purpose:** Collect shipping/payment, complete purchase

**Steps:**
1. **Shipping** — Address, shipping method
2. **Payment** — Card details, billing address
3. **Confirmation** — Order number, email confirmation

**Features:**
- Progress indicator (3 steps)
- Real-time validation
- Sticky order summary (desktop)
- Security badges

---

### 6. BRAND (`/brand`)
**Purpose:** Tell brand story, communicate values

**Sections:**
- **Hero** — Editorial photography
- **Philosophy** — Brand statement (2-3 paragraphs)
- **Story** — Two-column layout (text + image)
- **Craftsmanship** — 3 values grid
- **Email Signup** — "Join the Movement"

---

### 7. ACCOUNT (`/account`)
**Purpose:** Manage profile, orders, wishlist

**Sections:**
- Profile (edit details, addresses)
- Orders (history, tracking)
- Wishlist (saved products)
- Logout

---

### 8. ADMIN (`/admin`) [Internal]
**Purpose:** Manage products, orders, drops, analytics

**Sections:**
- Dashboard (stats, recent orders)
- Products (list, add/edit, bulk actions)
- Orders (list, detail, fulfillment)
- Drops (create, schedule, set limits)
- Analytics (sales, performance, insights)

---

## User Flows

### Primary: Browse → Purchase
```
Home → Shop → Product → Cart → Checkout → Confirmation
```

### Secondary: Discovery → Wishlist → Purchase
```
Home → Browse → Save to Wishlist → Account → Add to Cart → Checkout
```

---

## Mobile-First Principles

✅ Single column layouts  
✅ Sticky CTAs on product pages  
✅ Swipe gestures for galleries  
✅ Bottom sheet for filters  
✅ Minimum 44x44px tap targets  
✅ Lazy loading for images  

---

## Content Strategy

### Scarcity Messaging
- "Limited to 100 pieces"
- "Only 12 remaining"
- "Sold out — join waitlist"

### Product Naming
- Descriptive, not clever
- Example: "Oversized Wool Coat"

### SEO Titles
- Home: "VIZUN — Quiet Luxury for the Modern Man"
- Shop: "Shop All — VIZUN"
- Product: "[Product Name] — VIZUN"

---

## Technical Stack

**Frontend:**
- Next.js 14+ (App Router)
- Design System CSS
- React Context/Zustand
- Framer Motion

**Backend:**
- Headless CMS (Sanity/Contentful)
- Shopify (headless) or Stripe
- PostgreSQL
- NextAuth.js

**Integrations:**
- Stripe (payments)
- SendGrid (email)
- Plausible (analytics)
- Instagram API

---

## Key Principles

🎯 **Minimal navigation** (3 links)  
🎯 **Scarcity-focused** (limited drops)  
🎯 **Fast decision-making** (clear CTAs)  
🎯 **Mobile-first** (responsive)  
🎯 **Premium aesthetic** (generous spacing)  
🎯 **Brand storytelling** (philosophy)  

---

For full details, see the complete architecture document.
