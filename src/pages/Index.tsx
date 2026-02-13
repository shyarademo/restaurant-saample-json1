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
        <Navbar />
        <HeroSection />
        <AboutSection />
        <FeaturedMenu />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
