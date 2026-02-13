

# Premium Immersive UX Improvements

Enhancements focused on making the user feel completely absorbed in the experience -- smoother transitions, richer micro-interactions, and a more tactile, cinematic feel throughout.

---

## 1. Smooth Page Transition Animation

When navigating between Home and the Menu page, add a full-screen fade-to-black transition instead of an instant page swap. This creates a cinematic "scene change" feel, like turning a page in a luxury book.

**Technical**: Wrap `Routes` in a framer-motion `AnimatePresence` with a shared layout transition. Each page fades out then fades in with a subtle scale.

---

## 2. Staggered Section Reveal with Parallax Depth

Currently sections fade in uniformly. Upgrade to a layered parallax effect where background elements (images, decorative lines) move at a different speed than foreground text. This creates a sense of depth as you scroll, making the page feel three-dimensional rather than flat.

**Technical**: Use framer-motion `useScroll` + `useTransform` on the About image, Gallery images, and Contact map to shift them at 80% scroll speed while text stays at 100%.

---

## 3. Cursor-Following Glow Effect on Cards

When hovering over menu cards and gallery items, add a soft radial glow that follows the mouse cursor position within the card. This creates a premium, "lit from within" effect that makes the cards feel interactive and alive.

**Technical**: Track `onMouseMove` on cards, calculate cursor position relative to the card, and apply a CSS radial-gradient background at that position with a warm amber glow.

---

## 4. Smooth Number Counter with Easing

The stat counters in the About section currently increment linearly. Upgrade to an ease-out curve so numbers accelerate fast then slow down near the target -- this feels much more natural and satisfying. Also add a subtle scale-up pulse when the counter finishes.

**Technical**: Replace the linear interval with a requestAnimationFrame loop using an easeOutExpo timing function.

---

## 5. Magnetic Hover on CTA Buttons

Make primary CTA buttons (hero buttons, "View Full Menu", contact actions) slightly follow the cursor when hovering near them, creating a magnetic pull effect. This subtle interaction makes buttons feel alive and premium.

**Technical**: Use `onMouseMove` on button wrappers to calculate offset and apply a small `transform: translate()` toward the cursor, with a spring-back on mouse leave.

---

## 6. Text Reveal with Clip-Path Animation

Section body text (About paragraph, featured menu subtext) currently just fades in. Upgrade to a clip-path reveal where text slides in from behind an invisible curtain -- like a theater reveal. This is more dramatic and premium than a simple fade.

**Technical**: Use CSS `clip-path: inset(0 100% 0 0)` transitioning to `inset(0 0% 0 0)` triggered by the scroll animation hook.

---

## 7. Gallery Lightbox with Navigation and Blur Background

The current lightbox just shows a single image. Upgrade to include left/right arrow navigation between gallery images, a blurred background of the current image (instead of plain dark), and a smooth scale + rotation micro-animation on image switch.

**Technical**: Track lightbox index, add prev/next buttons, use the gallery image as a blurred full-screen background behind the sharp centered image.

---

## 8. Testimonial Swipe Gesture Support

On mobile, allow users to swipe left/right on testimonials instead of only tapping dots. This makes the carousel feel native and intuitive on touch devices.

**Technical**: Use framer-motion's `drag="x"` with `dragConstraints` and `onDragEnd` velocity detection to trigger slide changes.

---

## 9. Scroll-Linked Navbar Blur Intensification

Instead of the navbar instantly switching between transparent and glass, make the blur and background opacity gradually increase based on scroll position. At 0px scroll it's fully transparent; by 100px it's fully frosted glass. This creates a seamless, continuous transition.

**Technical**: Use a scroll listener to calculate a 0-1 progress value and apply it to backdrop-filter blur amount and background opacity via inline styles.

---

## 10. Loading Shimmer on Images

Before images load, show an elegant dark shimmer/skeleton placeholder instead of blank space. This prevents layout shift and adds a polished feel during image loading.

**Technical**: Add a CSS shimmer animation on image containers, hide it once the image's `onLoad` fires.

---

## Components Modified

- `src/App.tsx` -- page transition wrapper
- `src/components/HeroSection.tsx` -- magnetic buttons
- `src/components/AboutSection.tsx` -- parallax image, improved counters, text reveal
- `src/components/FeaturedMenu.tsx` -- cursor glow on cards, magnetic CTA
- `src/components/GallerySection.tsx` -- parallax, cursor glow, enhanced lightbox
- `src/components/TestimonialsSection.tsx` -- swipe gestures
- `src/components/ContactSection.tsx` -- parallax map, magnetic buttons
- `src/components/Navbar.tsx` -- gradual blur transition

## New Utilities

- Reusable `MagneticButton` wrapper component
- Reusable `GlowCard` wrapper component
- CSS shimmer animation added to `index.css`

