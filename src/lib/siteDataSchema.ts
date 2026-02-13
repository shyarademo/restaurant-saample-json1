import { z } from "zod";

// ── Helpers ──────────────────────────────────────────────
const hslColor = z.string().min(1, "Color value is required (e.g. \"36 95% 50%\")");

// ── Sub-schemas ──────────────────────────────────────────

const brandingSchema = z.object({
  name: z.string().min(1, "Restaurant name is required"),
  tagline: z.string().optional().default(""),
  logo: z.string().optional().default(""),
  colors: z.object({
    primary: hslColor,
    primaryForeground: hslColor,
    accent: hslColor,
    accentForeground: hslColor,
    background: hslColor,
    foreground: hslColor,
    card: hslColor,
    cardForeground: hslColor,
    muted: hslColor,
    mutedForeground: hslColor,
    border: hslColor,
  }),
});

const navItemSchema = z.object({
  label: z.string().min(1, "Navigation label is required"),
  href: z.string().min(1, "Navigation href is required"),
});

const seoSchema = z.object({
  title: z.string().min(1, "SEO title is required"),
  description: z.string().min(1, "SEO description is required"),
  keywords: z.string().optional().default(""),
  ogImage: z.string().optional().default(""),
});

const ctaSchema = z.object({
  label: z.string().min(1, "CTA label is required"),
  href: z.string().min(1, "CTA href is required"),
  variant: z.string().optional().default("primary"),
  icon: z.string().optional(),
});

const heroSchema = z.object({
  backgroundImage: z.string().optional().default(""),
  backgroundImages: z.array(z.string()).optional().default([]),
  headline: z.string().min(1, "Hero headline is required"),
  subtext: z.string().optional().default(""),
  cta: z.array(ctaSchema).optional().default([]),
  scrollIndicator: z.boolean().optional().default(true),
});

const statSchema = z.object({
  value: z.number({ invalid_type_error: "Stat value must be a number" }),
  suffix: z.string().optional().default(""),
  label: z.string().min(1, "Stat label is required"),
});

const aboutSchema = z.object({
  visible: z.boolean().optional().default(true),
  headline: z.string().optional().default("About Us"),
  text: z.string().optional().default(""),
  image: z.string().optional().default(""),
  stats: z.array(statSchema).optional().default([]),
});

const menuItemSchema = z.object({
  name: z.string().min(1, "Menu item name is required"),
  description: z.string().optional().default(""),
  price: z.string().min(1, "Menu item price is required"),
  image: z.string().optional().default(""),
  tags: z.array(z.string()).optional().default([]),
});

const featuredMenuSchema = z.object({
  visible: z.boolean().optional().default(true),
  headline: z.string().optional().default("Our Menu"),
  subtext: z.string().optional().default(""),
  items: z.array(menuItemSchema).optional().default([]),
});

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  items: z.array(menuItemSchema).min(1, "Each category needs at least one menu item"),
});

const menuSchema = z.object({
  categories: z.array(categorySchema).min(1, "At least one menu category is required"),
  gridColumns: z.number().optional().default(3),
  filterTags: z.array(z.string()).optional().default([]),
});

const galleryImageSchema = z.object({
  src: z.string().min(1, "Gallery image src is required"),
  caption: z.string().optional().default(""),
});

const gallerySchema = z.object({
  visible: z.boolean().optional().default(true),
  headline: z.string().optional().default("Gallery"),
  images: z.array(galleryImageSchema).optional().default([]),
});

const reviewSchema = z.object({
  name: z.string().optional().default("Anonymous"),
  text: z.string().min(1, "Review text is required"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
});

const testimonialsSchema = z.object({
  visible: z.boolean().optional().default(true),
  headline: z.string().optional().default("Reviews"),
  reviews: z.array(reviewSchema).optional().default([]),
});

const openingHoursSchema = z.object({
  days: z.string().min(1, "Days are required"),
  hours: z.string().min(1, "Hours are required"),
});

const contactSchema = z.object({
  visible: z.boolean().optional().default(true),
  headline: z.string().optional().default("Contact"),
  address: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  whatsapp: z.string().optional().default(""),
  email: z.string().optional().default(""),
  mapEmbedUrl: z.string().optional().default(""),
  openingHours: z.array(openingHoursSchema).optional().default([]),
  mapDirectionsUrl: z.string().optional().default(""),
});

const socialSchema = z.object({
  instagram: z.string().optional().default(""),
  facebook: z.string().optional().default(""),
  twitter: z.string().optional().default(""),
  tiktok: z.string().optional().default(""),
});

const specialOfferSchema = z.object({
  visible: z.boolean().optional().default(false),
  text: z.string().optional().default(""),
  link: z.string().optional().default(""),
  linkText: z.string().optional().default(""),
});

const layoutSchema = z.object({
  sectionOrder: z.array(z.string()).optional().default(["hero", "about", "featuredMenu", "gallery", "testimonials", "contact"]),
  menuPage: z.boolean().optional().default(true),
});

// ── Main schema ──────────────────────────────────────────

export const siteDataSchema = z.object({
  branding: brandingSchema,
  navigation: z.array(navItemSchema).min(1, "At least one navigation item is required"),
  seo: seoSchema,
  hero: heroSchema,
  about: aboutSchema.optional().default({}),
  featuredMenu: featuredMenuSchema.optional().default({}),
  menu: menuSchema,
  gallery: gallerySchema.optional().default({}),
  testimonials: testimonialsSchema.optional().default({}),
  contact: contactSchema.optional().default({}),
  social: socialSchema.optional().default({}),
  specialOffer: specialOfferSchema.optional().default({}),
  layout: layoutSchema.optional().default({}),
});

export type SiteDataSchemaType = z.infer<typeof siteDataSchema>;

// ── Friendly error formatter ─────────────────────────────

export interface ValidationError {
  path: string;
  message: string;
}

export function validateSiteData(data: unknown): { success: true; data: SiteDataSchemaType } | { success: false; errors: ValidationError[] } {
  const result = siteDataSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: ValidationError[] = result.error.issues.map((issue) => ({
    path: issue.path.length > 0 ? issue.path.join(" → ") : "(root)",
    message: issue.message,
  }));

  return { success: false, errors };
}
