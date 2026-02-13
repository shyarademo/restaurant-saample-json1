

# 🍽️ JSON-Driven Restaurant Website Template — Implementation Plan

A fully static, front-end only restaurant website template. Swap one JSON file to create a completely different restaurant site. No backend, no coding needed for content changes.

---

## Phase 1: Foundation & JSON Structure

**Create `siteData.json`** — A single, human-readable config file controlling:
- Branding (name, logo, tagline, color scheme)
- Navigation items
- All section content (hero, about, menu, gallery, testimonials, contact)
- SEO metadata (title, description, keywords, Open Graph)
- Layout settings (section order, visibility toggles, grid columns, spacing)
- Action links (WhatsApp number, phone number, Google Maps link, socials)

**Build a JSON provider** that loads this file and makes it available to all components.

---

## Phase 2: Main Page — Sections (Single-Page Scroll)

### Hero Section
- Full-screen background image with dark overlay
- Animated headline with staggered text reveal
- CTA buttons: "View Menu", "Order on WhatsApp" (wa.me link), "Call Us" (tel: link)
- Scroll-down indicator animation

### About / Story Section
- Split layout: story text + image
- Animated stat counters (years open, dishes served, happy customers)
- Scroll-triggered fade-in animations

### Featured Menu Preview
- Horizontally scrollable cards showing bestseller items from JSON
- Each card: food image, name, price, tags (veg/spicy/new)
- "View Full Menu" button linking to `/menu` page

### Gallery Section
- Animated masonry/grid photo layout
- Lightbox popup on image click
- Hover zoom effects

### Testimonials Section
- Auto-rotating carousel with customer reviews
- Star ratings and customer names
- Smooth slide transition animations

### Contact & Location Section
- Google Maps iframe embed (URL from JSON)
- Opening hours display
- Quick action buttons: WhatsApp, Call, Get Directions (all just links)

### Footer
- Social media icon links
- Quick nav links
- Restaurant branding

---

## Phase 3: Dedicated Menu Page (`/menu`)

- Full visual menu with category tabs (Starters, Mains, Desserts, Drinks, etc.)
- Each item: photo, name, description, price, dietary tags
- Tag-based filtering (Veg, Non-Veg, Spicy, Bestseller)
- Configurable grid layout (columns controlled via JSON)
- Staggered fade-in animations on items

---

## Phase 4: Animations & User Experience

- Scroll-triggered fade-in/slide-in on every section
- Parallax effect on hero background image
- Staggered card entrance animations for menu and gallery
- Smooth page transitions between Home and Menu
- Sticky navigation bar with active section highlighting
- Hover effects on all interactive elements (buttons, cards, images)
- Mobile hamburger menu with smooth slide-in drawer

---

## Phase 5: SEO & Responsiveness

- Dynamic `<title>`, `<meta description>`, and Open Graph tags set from JSON
- Semantic HTML (proper heading hierarchy, nav, section, footer elements)
- Restaurant schema-friendly structure
- Fully mobile-first responsive design
- WhatsApp and Call buttons prominently placed on mobile
- Touch-friendly interactions for gallery and menu

