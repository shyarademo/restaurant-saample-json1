import { useSiteData } from "@/context/SiteDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeadline from "./SectionHeadline";

const GallerySection = () => {
  const { gallery } = useSiteData();
  const { ref, isVisible } = useScrollAnimation();
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (!gallery.visible) return null;

  // Support both old string[] and new {src, caption}[] format
  const images = gallery.images.map((img: any) =>
    typeof img === "string" ? { src: img, caption: "" } : img
  );

  return (
    <section id="gallery" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeadline>{gallery.headline}</SectionHeadline>
        </div>

        {/* Mobile: horizontal scroll / Desktop: grid */}
        <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0 md:auto-rows-[220px]">
          {images.map((img: { src: string; caption: string }, i: number) => (
            <div
              key={i}
              onClick={() => setLightbox(img.src)}
              className={`relative overflow-hidden rounded-xl cursor-pointer group flex-shrink-0 w-64 h-48 snap-center md:w-auto md:h-auto transition-all duration-700 ${
                i === 0 || i === 5 ? "md:row-span-2" : ""
              } ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
              style={{ transitionDelay: isVisible ? `${i * 80}ms` : "0ms" }}
            >
              <img
                src={img.src}
                alt={img.caption || `Gallery ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              {/* Hover caption overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                {img.caption && (
                  <span className="text-foreground text-sm font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {img.caption}
                  </span>
                )}
              </div>
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
