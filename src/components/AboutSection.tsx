import { useSiteData } from "@/context/SiteDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeadline from "./SectionHeadline";
import ShimmerImage from "./ShimmerImage";

// easeOutExpo timing function
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const { ref, isVisible } = useScrollAnimation(0.3);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      setCount(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
        setDone(true);
      }
    };
    requestAnimationFrame(step);
  }, [isVisible, target]);

  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-300 ${done ? "scale-110" : ""}`}
      style={{ transition: done ? "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" : undefined }}
      onTransitionEnd={() => done && setTimeout(() => setDone(false), 200)}
    >
      {Number.isInteger(target) ? Math.floor(count).toLocaleString() : count.toFixed(1)}
      {suffix}
    </span>
  );
};

const AboutSection = () => {
  const { about } = useSiteData();
  const { ref, isVisible } = useScrollAnimation();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  if (!about.visible) return null;

  return (
    <section id="about" className="py-24 lg:py-32">
      <div ref={ref} className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Parallax Image */}
          <div
            ref={parallaxRef}
            className={`relative overflow-hidden rounded-2xl transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <motion.div style={{ y: imageY }}>
              <ShimmerImage
                src={about.image}
                alt="About our restaurant"
                className="w-full h-[400px] lg:h-[500px] object-cover"
                loading="lazy"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </div>

          {/* Text with clip-path reveal */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <SectionHeadline className="mb-6">{about.headline}</SectionHeadline>
            <p
              className={`text-muted-foreground text-lg leading-relaxed mb-10 mt-6 text-reveal ${
                isVisible ? "revealed" : ""
              }`}
            >
              {about.text}
            </p>

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
