import { useSiteData } from "@/context/SiteDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";
import SectionHeadline from "./SectionHeadline";

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation(0.3);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current * 10) / 10);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span ref={ref}>
      {Number.isInteger(target) ? Math.floor(count).toLocaleString() : count.toFixed(1)}
      {suffix}
    </span>
  );
};

const AboutSection = () => {
  const { about } = useSiteData();
  const { ref, isVisible } = useScrollAnimation();

  if (!about.visible) return null;

  return (
    <section id="about" className="py-24 lg:py-32">
      <div ref={ref} className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className={`relative overflow-hidden rounded-2xl transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <img
              src={about.image}
              alt="About our restaurant"
              className="w-full h-[400px] lg:h-[500px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>

          {/* Text */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <SectionHeadline className="mb-6">{about.headline}</SectionHeadline>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 mt-6">
              {about.text}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {about.stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl bg-secondary/50">
                  <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
