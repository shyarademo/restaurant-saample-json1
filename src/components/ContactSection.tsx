import { useSiteData } from "@/context/SiteDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef } from "react";
import { Phone, MapPin, Clock, Mail } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeadline from "./SectionHeadline";
import MagneticButton from "./MagneticButton";

const ContactSection = () => {
  const { contact } = useSiteData();
  const { ref, isVisible } = useScrollAnimation();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const mapY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  if (!contact.visible) return null;

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeadline>{contact.headline}</SectionHeadline>
        </div>

        <div className={`grid ${contact.mapEmbedUrl ? "lg:grid-cols-2" : ""} gap-10`}>
          {/* Parallax Map */}
          {contact.mapEmbedUrl && (
            <div
              ref={parallaxRef}
              className={`rounded-2xl overflow-hidden border border-border h-[350px] lg:h-full transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <motion.div style={{ y: mapY }} className="w-full h-full">
                <iframe
                  src={contact.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 350 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Restaurant location"
                />
              </motion.div>
            </div>
          )}

          {/* Info */}
          <div
            className={`flex flex-col gap-6 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
              <MapPin className="text-primary mt-1 shrink-0" size={22} />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Address</h3>
                <p className="text-muted-foreground text-sm">{contact.address}</p>
              </div>
            </div>

            {contact.openingHours && contact.openingHours.length > 0 && (
            <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
              <Clock className="text-primary mt-1 shrink-0" size={22} />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Opening Hours</h3>
                {contact.openingHours.map((oh) => (
                  <p key={oh.days} className="text-muted-foreground text-sm">
                    <span className="text-foreground/80">{oh.days}:</span> {oh.hours}
                  </p>
                ))}
              </div>
            </div>
            )}

            <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
              <Mail className="text-primary mt-1 shrink-0" size={22} />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Get in Touch</h3>
                <p className="text-muted-foreground text-sm">{contact.email}</p>
              </div>
            </div>

            {/* Magnetic CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              {contact.whatsapp && (
                <MagneticButton className="flex-1" strength={0.2}>
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-6 py-3.5 bg-primary text-primary-foreground rounded-full font-semibold text-center hover:bg-primary/90 transition-all hover:scale-105"
                  >
                    WhatsApp Us
                  </a>
                </MagneticButton>
              )}
              {contact.phone && (
                <MagneticButton className="flex-1" strength={0.2}>
                  <a
                    href={`tel:${contact.phone}`}
                    className="px-6 py-3.5 border border-border text-foreground rounded-full font-semibold text-center hover:border-primary hover:text-primary transition-all hover:scale-105 inline-flex items-center justify-center gap-2 w-full"
                  >
                    <Phone size={16} />
                    Call Us
                  </a>
                </MagneticButton>
              )}
              {contact.mapDirectionsUrl && (
                <MagneticButton className="flex-1" strength={0.2}>
                  <a
                    href={contact.mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 border border-border text-foreground rounded-full font-semibold text-center hover:border-primary hover:text-primary transition-all hover:scale-105 inline-flex items-center justify-center gap-2 w-full"
                  >
                    <MapPin size={16} />
                    Directions
                  </a>
                </MagneticButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
