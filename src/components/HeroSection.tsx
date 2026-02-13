import { useSiteData } from "@/context/SiteDataContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const { hero, branding } = useSiteData();
  const [currentBg, setCurrentBg] = useState(0);
  const images = hero.backgroundImages || [hero.backgroundImage];

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  const words = hero.headline.split(" ");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Sliding background images */}
      {images.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[2000ms] ease-in-out"
          style={{
            backgroundImage: `url(${img})`,
            opacity: i === currentBg ? 1 : 0,
            transform: i === currentBg ? "scale(1.05)" : "scale(1)",
            transition: "opacity 2s ease-in-out, transform 8s ease-in-out",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-6"
        >
          {branding.tagline}
        </motion.p>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.6 }}
              className="inline-block mr-[0.3em] text-foreground"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {hero.subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {hero.cta.map((btn) => {
            const isInternal = btn.href.startsWith("/");
            const baseClass =
              btn.variant === "primary"
                ? "px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105"
                : "px-8 py-3.5 border border-foreground/30 text-foreground rounded-full font-semibold hover:border-primary hover:text-primary transition-all hover:scale-105";

            if (isInternal) {
              return (
                <Link key={btn.label} to={btn.href} className={baseClass}>
                  {btn.label}
                </Link>
              );
            }

            return (
              <a
                key={btn.label}
                href={btn.href}
                target={btn.href.startsWith("tel:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className={`${baseClass} inline-flex items-center gap-2`}
              >
                {btn.icon === "phone" && <Phone size={16} />}
                {btn.icon === "whatsapp" && (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.504 3.935 1.394 5.611L0 24l6.613-1.336A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.875 0-3.63-.506-5.145-1.389l-.369-.219-3.826.773.81-3.698-.24-.382A9.71 9.71 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" />
                  </svg>
                )}
                {btn.label}
              </a>
            );
          })}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {hero.scrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
            className="text-muted-foreground hover:text-primary transition-colors animate-bounce-subtle"
          >
            <ChevronDown size={28} />
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;
