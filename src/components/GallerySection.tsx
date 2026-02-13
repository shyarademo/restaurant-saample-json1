import { useSiteData } from "@/context/SiteDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import SectionHeadline from "./SectionHeadline";
import GlowCard from "./GlowCard";
import ShimmerImage from "./ShimmerImage";

const GallerySection = () => {
  const { gallery } = useSiteData();
  const { ref, isVisible } = useScrollAnimation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const galleryY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  if (!gallery.visible) return null;

  const images = gallery.images.map((img: any) =>
    typeof img === "string" ? { src: img, caption: "" } : img
  );

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () =>
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  const goNext = () =>
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));

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

        <div ref={parallaxRef}>
          <motion.div style={{ y: galleryY }}>
            <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0 md:auto-rows-[220px]">
              {images.map((img: { src: string; caption: string }, i: number) => (
                <GlowCard
                  key={i}
                  className={`relative overflow-hidden rounded-xl cursor-pointer group flex-shrink-0 w-64 h-48 snap-center md:w-auto md:h-auto transition-all duration-700 ${
                    i === 0 || i === 5 ? "md:row-span-2" : ""
                  } ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                  style={{ transitionDelay: isVisible ? `${i * 80}ms` : "0ms" }}
                >
                  <div onClick={() => openLightbox(i)} className="w-full h-full">
                    <ShimmerImage
                      src={img.src}
                      alt={img.caption || `Gallery ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      wrapperClassName="w-full h-full"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      {img.caption && (
                        <span className="text-foreground text-sm font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          {img.caption}
                        </span>
                      )}
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Lightbox with navigation and blur background */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Blurred background image */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${images[lightboxIndex].src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(40px) brightness(0.3)",
              }}
            />
            <div className="absolute inset-0 bg-background/60" />

            {/* Navigation */}
            <button
              className="absolute left-4 md:left-8 z-10 text-foreground/70 hover:text-foreground p-2 rounded-full bg-background/30 backdrop-blur-sm transition-colors"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
            >
              <ChevronLeft size={28} />
            </button>
            <button
              className="absolute right-4 md:right-8 z-10 text-foreground/70 hover:text-foreground p-2 rounded-full bg-background/30 backdrop-blur-sm transition-colors"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
            >
              <ChevronRight size={28} />
            </button>

            <button
              className="absolute top-6 right-6 z-10 text-foreground hover:text-primary"
              onClick={closeLightbox}
            >
              <X size={28} />
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={lightboxIndex}
                initial={{ scale: 0.9, opacity: 0, rotate: -1 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.9, opacity: 0, rotate: 1 }}
                transition={{ duration: 0.3 }}
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].caption || "Gallery preview"}
                className="relative z-10 max-w-full max-h-[85vh] object-contain rounded-xl"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {/* Caption */}
            {images[lightboxIndex].caption && (
              <div className="absolute bottom-8 z-10 text-center">
                <span className="text-foreground/80 text-sm bg-background/40 backdrop-blur-sm px-4 py-2 rounded-full">
                  {images[lightboxIndex].caption}
                </span>
              </div>
            )}

            {/* Dot indicators */}
            <div className="absolute bottom-16 z-10 flex gap-1.5">
              {images.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === lightboxIndex ? "bg-primary w-5" : "bg-foreground/30"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
