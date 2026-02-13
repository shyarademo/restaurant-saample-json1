import { useSiteData } from "@/context/SiteDataContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import SectionHeadline from "./SectionHeadline";
import GlowCard from "./GlowCard";
import MagneticButton from "./MagneticButton";
import ShimmerImage from "./ShimmerImage";

const tagColors: Record<string, string> = {
  bestseller: "bg-primary/20 text-primary",
  new: "bg-green-500/20 text-green-400",
  veg: "bg-emerald-500/20 text-emerald-400",
  "non-veg": "bg-red-500/20 text-red-400",
  spicy: "bg-orange-500/20 text-orange-400",
};

const FeaturedMenu = () => {
  const { featuredMenu } = useSiteData();
  const { ref, isVisible } = useScrollAnimation();

  if (!featuredMenu.visible) return null;

  return (
    <section id="featured-menu" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeadline>{featuredMenu.headline}</SectionHeadline>
          <p
            className={`text-muted-foreground text-lg mt-4 text-reveal ${
              isVisible ? "revealed" : ""
            }`}
          >
            {featuredMenu.subtext}
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {featuredMenu.items.map((item, i) => (
            <GlowCard
              key={item.name}
              className={`flex-shrink-0 w-72 md:w-80 snap-center rounded-2xl overflow-hidden bg-card border border-border group hover:border-primary/40 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: isVisible ? `${i * 100}ms` : "0ms" }}
            >
              <div className="relative h-48 overflow-hidden">
                <ShimmerImage
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  wrapperClassName="h-full"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        tagColors[tag] || "bg-muted text-muted-foreground"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display text-lg font-semibold text-foreground">{item.name}</h3>
                  <span className="text-primary font-bold text-lg whitespace-nowrap ml-3">{item.price}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            </GlowCard>
          ))}
        </div>

        <div className="text-center mt-10">
          <MagneticButton strength={0.25}>
            <Link
              to="/menu"
              className="inline-block px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105"
            >
              View Full Menu
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;
