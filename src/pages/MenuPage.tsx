import { useSiteData } from "@/context/SiteDataContext";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const tagColors: Record<string, string> = {
  bestseller: "bg-primary/20 text-primary",
  new: "bg-green-500/20 text-green-400",
  veg: "bg-emerald-500/20 text-emerald-400",
  "non-veg": "bg-red-500/20 text-red-400",
  spicy: "bg-orange-500/20 text-orange-400",
};

const MenuPage = () => {
  const { menu, branding } = useSiteData();
  const [activeCategory, setActiveCategory] = useState(menu.categories[0]?.name || "");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { ref, isVisible } = useScrollAnimation();

  const currentCategory = menu.categories.find((c) => c.name === activeCategory);

  const filteredItems = currentCategory?.items.filter((item) => {
    if (activeFilters.length === 0) return true;
    return activeFilters.some((f) => item.tags.includes(f));
  }) || [];

  const toggleFilter = (tag: string) => {
    setActiveFilters((prev) =>
      prev.includes(tag) ? prev.filter((f) => f !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero banner */}
      <div className="pt-28 pb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl md:text-6xl font-bold text-foreground mb-3"
        >
          Our Menu
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg"
        >
          Crafted with fire, served with soul
        </motion.p>
      </div>

      <div ref={ref} className="container mx-auto px-4 lg:px-8 pb-24">
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {menu.categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => { setActiveCategory(cat.name); setActiveFilters([]); }}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.name
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {menu.filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleFilter(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
                activeFilters.includes(tag)
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-muted-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
          {activeFilters.length > 0 && (
            <button
              onClick={() => setActiveFilters([])}
              className="px-4 py-1.5 text-xs text-muted-foreground hover:text-foreground underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Menu Grid */}
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, 320px), 1fr))` }}
        >
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl overflow-hidden bg-card border border-border group hover:border-primary/40 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        tagColors[tag] || "bg-muted text-muted-foreground"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display text-lg font-semibold text-foreground">{item.name}</h3>
                  <span className="text-primary font-bold text-lg whitespace-nowrap ml-3">{item.price}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No items match the selected filters.
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MenuPage;
