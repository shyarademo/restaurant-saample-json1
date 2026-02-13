import { useState, useEffect } from "react";
import { useSiteData } from "@/context/SiteDataContext";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { branding, navigation, contact, specialOffer } = useSiteData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const isHome = location.pathname === "/";
  const hasOffer = specialOffer?.visible;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking via IntersectionObserver
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
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          hasOffer ? "top-9" : "top-0"
        } ${scrolled ? "glass border-b border-border/50 py-3" : "bg-transparent py-5"}`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
          <Link to="/" className="font-display text-xl md:text-2xl font-bold text-foreground tracking-wide">
            {branding.name}
          </Link>

          {/* Desktop nav */}
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-foreground p-2"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
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
