import { useSiteData } from "@/context/SiteDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import SectionHeadline from "./SectionHeadline";

const TestimonialsSection = () => {
  const { testimonials } = useSiteData();
  const { ref, isVisible } = useScrollAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.reviews.length]);

  const goTo = (i: number) => {
    setDirection(i > activeIndex ? 1 : -1);
    setActiveIndex(i);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold || info.velocity.x < -500) {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.reviews.length);
    } else if (info.offset.x > threshold || info.velocity.x > 500) {
      setDirection(-1);
      setActiveIndex((prev) => (prev - 1 + testimonials.reviews.length) % testimonials.reviews.length);
    }
  };

  if (!testimonials.visible || !testimonials.reviews || testimonials.reviews.length === 0) return null;

  const review = testimonials.reviews[activeIndex];
  const initials = (review.name || "?").split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeadline>{testimonials.headline}</SectionHeadline>
        </div>

        <div className="max-w-2xl mx-auto overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              initial={{ opacity: 0, x: 80 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 * direction }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="bg-card border border-border rounded-2xl p-8 md:p-10 text-center relative cursor-grab active:cursor-grabbing touch-pan-y"
            >
              <Quote size={32} className="text-primary/20 mx-auto mb-4" />

              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={18}
                    className={s < review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}
                  />
                ))}
              </div>

              <p className="text-foreground text-lg md:text-xl leading-relaxed italic mb-6 select-none">
                "{review.text}"
              </p>

              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                  {initials}
                </div>
                <span className="text-muted-foreground font-medium">{review.name}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "bg-primary w-7" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
