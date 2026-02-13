import { useSiteData } from "@/context/SiteDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const GallerySection = () => {
  const { gallery } = useSiteData();
  const { ref, isVisible } = useScrollAnimation();
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (!gallery.visible) return null;

  return (
    <section id="gallery" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            {gallery.headline}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {gallery.images.map((img, i) => (
            <div
              key={i}
              onClick={() => setLightbox(img)}
              className={`relative overflow-hidden rounded-xl cursor-pointer group transition-all duration-700 ${
                i === 0 || i === 5 ? "row-span-2" : ""
              } ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              style={{ transitionDelay: isVisible ? `${i * 80}ms` : "0ms" }}
            >
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                  i === 0 || i === 5 ? "h-full min-h-[300px] md:min-h-[400px]" : "h-48 md:h-56"
                }`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-foreground hover:text-primary"
              onClick={() => setLightbox(null)}
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={lightbox}
              alt="Gallery preview"
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
