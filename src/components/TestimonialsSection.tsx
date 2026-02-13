import { useSiteData } from "@/context/SiteDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const { testimonials } = useSiteData();
  const { ref, isVisible } = useScrollAnimation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.reviews.length]);

  if (!testimonials.visible) return null;

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            {testimonials.headline}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <div className="relative h-52 md:h-40 overflow-hidden">
            {testimonials.reviews.map((review, i) => (
              <div
                key={i}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                  i === activeIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
                }`}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={18}
                      className={s < review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}
                    />
                  ))}
                </div>
                <p className="text-foreground text-lg md:text-xl leading-relaxed italic mb-4">
                  "{review.text}"
                </p>
                <span className="text-muted-foreground font-medium">— {review.name}</span>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
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
