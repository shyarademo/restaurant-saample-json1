import { useSiteData } from "@/context/SiteDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Phone, MapPin, Clock, Mail } from "lucide-react";
import SectionHeadline from "./SectionHeadline";

const ContactSection = () => {
  const { contact } = useSiteData();
  const { ref, isVisible } = useScrollAnimation();

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

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Map */}
          <div
            className={`rounded-2xl overflow-hidden border border-border h-[350px] lg:h-full transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
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
          </div>

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

            <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
              <Mail className="text-primary mt-1 shrink-0" size={22} />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Get in Touch</h3>
                <p className="text-muted-foreground text-sm">{contact.email}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3.5 bg-primary text-primary-foreground rounded-full font-semibold text-center hover:bg-primary/90 transition-all hover:scale-105"
              >
                WhatsApp Us
              </a>
              <a
                href={`tel:${contact.phone}`}
                className="flex-1 px-6 py-3.5 border border-border text-foreground rounded-full font-semibold text-center hover:border-primary hover:text-primary transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                <Phone size={16} />
                Call Us
              </a>
              <a
                href={contact.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3.5 border border-border text-foreground rounded-full font-semibold text-center hover:border-primary hover:text-primary transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                <MapPin size={16} />
                Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
