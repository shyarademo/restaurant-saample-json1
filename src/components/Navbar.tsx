import { useState, useEffect } from "react";
import { useSiteData } from "@/context/SiteDataContext";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { branding, navigation, contact, specialOffer } = useSiteData();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const isHome = location.pathname === "/";
  const hasOffer = specialOffer?.visible;

  // Gradual blur based on scroll position (0 to 1 over 100px)
  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min(window.scrollY / 100, 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sectionIds = navigation.map((n) => n.href.replace("#", "")).filter(Boolean);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isHome, navigation]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#") && isHome) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    } else if (href.startsWith("#") && !isHome) {
      window.location.href = "/" + href;
    }
  };

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          hasOffer ? "top-9" : "top-0"
        }`}
        style={{
          backdropFilter: `blur(${scrollProgress * 12}px) saturate(${100 + scrollProgress * 80}%)`,
          backgroundColor: `hsla(20, 12%, 10%, ${scrollProgress * 0.7})`,
          borderBottom: scrollProgress > 0.5 ? `1px solid hsl(20 10% 18% / ${scrollProgress})` : "none",
          padding: `${1.25 - scrollProgress * 0.5}rem 0`,
        }}
      >
        <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
          <Link to="/" className="font-display text-xl md:text-2xl font-bold text-foreground tracking-wide">
            {branding.name}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = isHome && activeSection === sectionId;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-sm font-medium transition-colors duration-300 tracking-wide uppercase ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="h-0.5 bg-primary rounded-full mt-0.5"
                    />
                  )}
                </button>
              );
            })}
            {!isHome && (
              <Link
                to="/"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wide uppercase"
              >
                Home
              </Link>
            )}
            <Link
              to="/menu"
              className="px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Full Menu
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-foreground p-2"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-card border-l border-border p-8 flex flex-col"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="self-end text-muted-foreground hover:text-foreground mb-8"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors text-left tracking-wide"
                  >
                    {item.label}
                  </button>
                ))}
                <Link
                  to="/menu"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 px-5 py-3 bg-primary text-primary-foreground rounded-full text-center font-semibold"
                >
                  Full Menu
                </Link>
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 border border-primary text-primary rounded-full text-center font-semibold"
                >
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
