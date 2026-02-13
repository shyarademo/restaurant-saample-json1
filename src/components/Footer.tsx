import { useSiteData } from "@/context/SiteDataContext";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

const socialIcons: Record<string, React.ReactNode> = {
  instagram: <Instagram size={18} />,
  facebook: <Facebook size={18} />,
  twitter: <Twitter size={18} />,
  tiktok: (
    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z" />
    </svg>
  ),
};

const Footer = () => {
  const { branding, navigation, social, contact } = useSiteData();

  const socialLinks = Object.entries(social).filter(([, url]) => url);

  return (
    <footer className="border-t border-border bg-card/50 py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">{branding.name}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{branding.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {item.label}
                </a>
              ))}
              <Link to="/menu" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Full Menu
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 uppercase tracking-wider text-sm">Follow Us</h4>
            <div className="flex gap-3">
              {socialLinks.map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 transition-all duration-300"
                >
                  {socialIcons[platform] || <span className="text-xs font-bold uppercase">{platform[0]}</span>}
                </a>
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-4">{contact.email}</p>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-8 text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} {branding.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
