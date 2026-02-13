# 📝 How to Edit `siteData.json`

This guide explains every field in `siteData.json` so you can customize your restaurant website without any coding knowledge.

> **Important**: Always keep the JSON format valid. Use a tool like [jsonlint.com](https://jsonlint.com) to check your file before saving.

---

## 🏷️ `branding` — Your restaurant identity

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| `name` | ✅ Yes | Your restaurant name, shown in navbar and footer | `"Ember & Oak"` |
| `tagline` | ❌ Optional | Short slogan shown in the hero and footer | `"Where Fire Meets Flavor"` |
| `logo` | ❌ Optional | URL to your logo image (leave `""` to show text name instead) | `"https://example.com/logo.png"` |
| `colors` | ❌ Optional | Color theme — advanced, leave as-is unless you know HSL colors | See defaults |

### Color fields (inside `colors`)
All colors use **HSL format** like `"36 95% 50%"`. If you're unsure, leave the defaults.

| Color | What it affects |
|-------|----------------|
| `primary` | Buttons, links, accents (your brand color) |
| `primaryForeground` | Text on primary-colored buttons |
| `background` | Page background |
| `foreground` | Main text color |
| `card` | Card/panel backgrounds |
| `muted` | Subtle backgrounds |
| `mutedForeground` | Secondary/dim text |
| `border` | Borders and dividers |
| `accent` | Secondary accent color |

---

## 🧭 `navigation` — Menu links in the navbar

An array of links. Each needs:

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| `label` | ✅ Yes | Text shown in the navbar | `"About"` |
| `href` | ✅ Yes | Where to scroll/navigate. Use `#section-id` for homepage sections | `"#about"` |

---

## 🔍 `seo` — Search engine settings

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| `title` | ✅ Yes | Browser tab title and Google result title (keep under 60 chars) | `"Ember & Oak — Where Fire Meets Flavor"` |
| `description` | ✅ Yes | Google result description (keep under 160 chars) | `"Experience bold flavors..."` |
| `keywords` | ❌ Optional | Comma-separated keywords for search engines | `"restaurant, steakhouse"` |
| `ogImage` | ❌ Optional | Image URL shown when sharing on social media | `"https://..."` |

---

## 🦸 `hero` — The big opening section

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| `headline` | ✅ Yes | Big headline text | `"Where Fire Meets Flavor"` |
| `subtext` | ❌ Optional | Paragraph below the headline | `"Handcrafted dishes..."` |
| `backgroundImage` | ❌ Optional | Single background image URL (fallback if `backgroundImages` is empty) | `"https://..."` |
| `backgroundImages` | ❌ Optional | Array of image URLs that rotate automatically | `["url1", "url2"]` |
| `scrollIndicator` | ❌ Optional | Show a scroll-down arrow? (`true` or `false`) | `true` |
| `cta` | ❌ Optional | Array of buttons (see below) | |

### CTA buttons (inside `hero.cta`)

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| `label` | ✅ Yes | Button text | `"View Menu"` |
| `href` | ✅ Yes | Link URL. Use `/menu` for internal pages, full URLs for external | `"/menu"` |
| `variant` | ✅ Yes | `"primary"` (filled) or `"outline"` (bordered) | `"primary"` |
| `icon` | ❌ Optional | `"whatsapp"` or `"phone"` — adds an icon before the text | `"whatsapp"` |

---

## 📖 `about` — The "Our Story" section

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| `visible` | ✅ Yes | Show this section? (`true` or `false`) | `true` |
| `headline` | ❌ Optional | Section title (defaults to "About Us" if empty) | `"Our Story"` |
| `text` | ❌ Optional | Your story paragraph | `"Born from a passion..."` |
| `image` | ❌ Optional | Image URL. Leave `""` to hide the image column | `"https://..."` |
| `stats` | ❌ Optional | Array of stat counters (see below). Leave empty `[]` to hide | |

### Stats (inside `about.stats`)

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| `value` | ✅ Yes | The number to count up to | `150` |
| `suffix` | ✅ Yes | Text after the number | `"+"` or `"★"` |
| `label` | ✅ Yes | Description below the number | `"Signature Dishes"` |

---

## 🌟 `featuredMenu` — Chef's Picks on the homepage

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| `visible` | ✅ Yes | Show this section? | `true` |
| `headline` | ❌ Optional | Section title | `"Chef's Picks"` |
| `subtext` | ❌ Optional | Subtitle | `"Our most loved creations"` |
| `items` | ✅ Yes | Array of featured dishes (see Menu Item format below) | |

---

## 📋 `menu` — Full menu page

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| `categories` | ✅ Yes | Array of menu categories | |
| `filterTags` | ❌ Optional | Tags shown as filter buttons on the menu page | `["veg", "spicy"]` |

### Categories (inside `menu.categories`)

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| `name` | ✅ Yes | Category tab name | `"Starters"` |
| `items` | ✅ Yes | Array of menu items in this category | |

### Menu Item format (used in both `featuredMenu.items` and category items)

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| `name` | ✅ Yes | Dish name | `"Smoked Wagyu Brisket"` |
| `description` | ❌ Optional | Short description | `"12-hour oak-smoked..."` |
| `price` | ✅ Yes | Price with currency symbol | `"$48"` |
| `image` | ❌ Optional | Image URL. Leave `""` or remove entirely for a text-only card | `"https://..."` |
| `tags` | ❌ Optional | Array of tags. Options: `"veg"`, `"non-veg"`, `"spicy"`, `"bestseller"`, `"new"` | `["veg", "bestseller"]` |

---

## 🖼️ `gallery` — Photo gallery section

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| `visible` | ✅ Yes | Show this section? | `true` |
| `headline` | ❌ Optional | Section title | `"A Glimpse Inside"` |
| `images` | ✅ Yes | Array of gallery images | |

### Gallery images (inside `gallery.images`)

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| `src` | ✅ Yes | Image URL (items with empty `src` are automatically hidden) | `"https://..."` |
| `caption` | ❌ Optional | Text shown on hover | `"The Main Hall"` |

---

## ⭐ `testimonials` — Customer reviews

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| `visible` | ✅ Yes | Show this section? | `true` |
| `headline` | ❌ Optional | Section title | `"What Our Guests Say"` |
| `reviews` | ✅ Yes | Array of reviews (section hides if empty) | |

### Reviews (inside `testimonials.reviews`)

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| `name` | ✅ Yes | Reviewer name | `"Sarah M."` |
| `text` | ✅ Yes | Review text | `"The brisket was amazing..."` |
| `rating` | ✅ Yes | Star rating from 1 to 5 | `5` |

---

## 📍 `contact` — Contact information section

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| `visible` | ✅ Yes | Show this section? | `true` |
| `headline` | ❌ Optional | Section title | `"Find Us"` |
| `address` | ❌ Optional | Physical address | `"742 Evergreen Terrace..."` |
| `phone` | ❌ Optional | Phone number (leave `""` to hide Call button) | `"+1234567890"` |
| `whatsapp` | ❌ Optional | WhatsApp number without + (leave `""` to hide WhatsApp button) | `"1234567890"` |
| `email` | ❌ Optional | Email address | `"hello@example.com"` |
| `mapEmbedUrl` | ❌ Optional | Google Maps embed URL (leave `""` to hide the map) | `"https://www.google.com/maps/embed?..."` |
| `mapDirectionsUrl` | ❌ Optional | Google Maps directions link (leave `""` to hide Directions button) | `"https://maps.google.com/?q=..."` |
| `openingHours` | ❌ Optional | Array of opening hours | |

### Opening Hours (inside `contact.openingHours`)

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| `days` | ✅ Yes | Day range | `"Monday – Friday"` |
| `hours` | ✅ Yes | Time range | `"12:00 PM – 11:00 PM"` |

---

## 📱 `social` — Social media links

All fields are **optional**. Leave `""` to hide that platform's icon.

| Field | Description | Example |
|-------|-------------|---------|
| `instagram` | Instagram profile URL | `"https://instagram.com/yourname"` |
| `facebook` | Facebook page URL | `"https://facebook.com/yourname"` |
| `twitter` | Twitter/X profile URL | `""` |
| `tiktok` | TikTok profile URL | `""` |

---

## 🔥 `specialOffer` — Top banner announcement

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| `visible` | ✅ Yes | Show the banner? | `true` |
| `text` | ✅ Yes | Banner message (emojis work!) | `"🔥 20% off weekday lunches!"` |
| `link` | ❌ Optional | URL to link to (leave `""` for no link) | `"https://..."` |
| `linkText` | ❌ Optional | Link button text (defaults to "Learn more") | `"Book Now"` |

---

## 🧩 `layout` — Page structure settings

| Field | Required? | Description | Example |
|-------|-----------|-------------|---------|
| `sectionOrder` | ❌ Optional | Order of homepage sections | `["hero", "about", "featuredMenu", "gallery", "testimonials", "contact"]` |
| `menuPage` | ❌ Optional | Enable the full menu page? | `true` |

---

## 💡 Tips

- **Images**: Use URLs from [Unsplash](https://unsplash.com) or upload your own images to a hosting service. Add `?w=500&q=80` to Unsplash URLs for optimized loading.
- **Hide a section**: Set `"visible": false` on any section to hide it completely.
- **No image for a dish**: Leave the `image` field as `""` — the card will show a clean text-only layout instead of a broken image.
- **Empty arrays**: Use `[]` for empty lists (e.g., `"tags": []`, `"stats": []`).
- **Test your changes**: After editing, refresh the site to see your changes. If something breaks, check your JSON is valid.
