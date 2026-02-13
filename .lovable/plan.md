

# Graceful Image Handling for Menu Items

When a menu item in `siteData.json` has no `image` field (empty string, missing, or undefined), the current code renders a broken image placeholder. This plan adds graceful fallback handling in both the **Menu Page** and **Featured Menu** components.

## Changes

### 1. `src/pages/MenuPage.tsx`
- Wrap the image section (`div.relative.h-48`) in a conditional: only render when `item.image` is a non-empty string.
- When there's no image, the card becomes a compact text-only card showing name, price, description, and tags inline (tags move into the text area instead of overlaying an image).

### 2. `src/components/FeaturedMenu.tsx`
- Same conditional logic: only render the `ShimmerImage` block when `item.image` exists.
- Without an image, the card shrinks to a clean text-only layout with tags displayed as inline badges above the dish name.

## Resulting Behavior
- Items **with** images: no change, same card with image, tags overlay, name, price, description.
- Items **without** images: clean, elegant text-only card with tags shown inline, no broken image or empty space. The card still looks polished and intentional.
