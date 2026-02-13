import { useSiteData } from "@/context/SiteDataContext";
import { X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SpecialOfferBanner = () => {
  const { specialOffer } = useSiteData();
  const [dismissed, setDismissed] = useState(false);

  if (!specialOffer?.visible || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-[55] bg-primary text-primary-foreground"
      >
        <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-3 text-sm font-medium">
          <span className="text-center">{specialOffer.text}</span>
          {specialOffer.link && (
            <a href={specialOffer.link} className="underline font-bold whitespace-nowrap">
              {specialOffer.linkText || "Learn more"}
            </a>
          )}
          <button
            onClick={() => setDismissed(true)}
            className="ml-2 hover:opacity-70 transition-opacity shrink-0"
            aria-label="Dismiss offer"
          >
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SpecialOfferBanner;
