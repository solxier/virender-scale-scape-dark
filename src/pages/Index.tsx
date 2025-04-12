
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from "@/components/Navbar";
import HomeSection from "@/components/HomeSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: mainRef });
  
  // Scroll position for animations
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  useEffect(() => {
    // Optional: Add any additional loading logic here
    document.body.style.overflow = loading ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [loading]);
  
  // Function to scroll to a section
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  if (loading) {
    return <Loader onLoadingComplete={() => setLoading(false)} />;
  }
  
  return (
    <motion.div 
      ref={mainRef}
      className="bg-background min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Navbar scrollToSection={scrollToSection} />
      
      <main>
        <HomeSection />
        <ProjectsSection />
        <AboutSection />
      </main>
      
      <Footer scrollToTop={scrollToTop} />
    </motion.div>
  );
};

export default Index;
