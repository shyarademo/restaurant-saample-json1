# "WOW Factor" UI Improvements Plan

Here are the high-impact visual and interactive upgrades that will make customers say "WOW" when they visit the site.

## 1. Hero Section image

Instead of a static Hero image, make it tick imagess from the gallery tagged as Interior, and make them slowly transition into one another in the background.

---

## 2. Scroll Progress Bar

A thin amber/gold progress bar at the very top of the page that fills as the user scrolls down. It adds a premium, app-like feel and subtly tells the user how much content is left.

---

## 4. Section Dividers with Decorative Elements

Between sections, add elegant decorative dividers -- a subtle ornamental line or a small fork/knife icon with thin lines extending outward. This replaces the abrupt section transitions with something visually polished.

---

## 5. Testimonials Card Carousel (Not Just Text Fade)

Upgrade from a simple text crossfade to proper card-style testimonials with customer avatars/initials, quotation marks, and a horizontal slide animation. Each card feels tangible and trustworthy.

---

## 7. Animated Section Headlines with Accent Underline

Each section headline gets a short, animated gold underline that draws itself in as the section scrolls into view. This adds a signature visual flourish to every section.

---

## 8. Back-to-Top Button

A smooth scroll-to-top button that appears after scrolling past the hero section. Styled as a subtle circle with an up-arrow, matching the amber theme.

---

## 9. Gallery and Image Hover Caption Reveal

Gallery images reveal a subtle caption overlay on hover (e.g., "Our Kitchen", "Signature Plating") that slides up from the bottom. Captions are configurable from the JSON file.  
Also the gallery should not be vertically stacked in smaller screen devices, it should be a horizontally scrollable gallery.

---

## 10. Navbar Active Section Highlighting

As the user scrolls through sections, the corresponding nav link in the top bar lights up with the primary color, giving clear wayfinding feedback.

---

## 11. Footer with Animated Social Icons

Social media icons in the footer get proper brand icons (Instagram, Facebook logos) instead of plain letters, with a hover lift + color animation.

---

## 12. "Special Offers" Banner (Optional, JSON-Toggled)

A slim, animated banner just below the navbar (or above the hero) that can announce offers like "20% off on weekday lunches!" -- fully controlled from JSON with show/hide toggle.

---

## Technical Details

- All new features will be JSON-configurable (toggle on/off, customize text/links)
- New components: `ScrollProgress.tsx`, `BackToTop.tsx`, `SectionDivider.tsx`, `SpecialOfferBanner.tsx`
- Modified components: `HeroSection.tsx` (Ken Burns), `Navbar.tsx` (active highlighting), `TestimonialsSection.tsx` (card carousel), `FeaturedMenu.tsx` and `MenuPage.tsx` (hover overlay), `GallerySection.tsx` (captions), `Footer.tsx` (social icons), all section headlines (animated underline)
- `siteData.json` gets new fields for gallery captions, special offer text, and feature toggles
- No new dependencies needed -- all achievable with existing framer-motion + Tailwind + lucide-react