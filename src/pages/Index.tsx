import { Helmet, HelmetProvider } from "react-helmet-async";
import { useSiteData } from "@/context/SiteDataContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturedMenu from "@/components/FeaturedMenu";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import SectionDivider from "@/components/SectionDivider";
import SpecialOfferBanner from "@/components/SpecialOfferBanner";

const Index = () => {
  const { seo, branding } = useSiteData();

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.ogImage} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <ScrollProgress />
        <SpecialOfferBanner />
        <Navbar />
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <FeaturedMenu />
        <SectionDivider />
        <GallerySection />
        <SectionDivider />
        <TestimonialsSection />
        <SectionDivider />
        <ContactSection />
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default Index;
