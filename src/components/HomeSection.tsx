
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Scene3D from './Scene3D';

const HomeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col md:flex-row items-center">
      {/* 3D Background on mobile (smaller) */}
      <div className="absolute inset-0 md:hidden opacity-30 pointer-events-none">
        <Scene3D />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between z-10">
        <motion.div 
          ref={ref}
          className="w-full md:w-1/2 pt-24 md:pt-0 text-center md:text-left"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-white/80 mb-2 tracking-widest"
            variants={itemVariants}
          >
            WELCOME TO MY PORTFOLIO
          </motion.h2>
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient mb-4"
            variants={itemVariants}
          >
            I'm Virender
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-white/70 mb-8 max-w-lg mx-auto md:mx-0"
            variants={itemVariants}
          >
            Creative developer crafting immersive digital experiences with cutting-edge technologies
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            variants={itemVariants}
          >
            <a 
              href="#projects" 
              className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors"
            >
              View Projects
            </a>
            <a 
              href="#about" 
              className="px-8 py-3 rounded-full border border-white text-white font-medium hover:bg-white/10 transition-colors"
            >
              About Me
            </a>
          </motion.div>
        </motion.div>
        
        {/* 3D Scene (hidden on mobile, shown on desktop) */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-[80vh] hidden md:block">
          <Scene3D />
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center">
          <p className="text-white/50 text-sm mb-2">Scroll Down</p>
          <div className="w-0.5 h-10 bg-white/30 relative">
            <motion.div 
              className="w-1 h-4 bg-white absolute top-0 left-1/2 transform -translate-x-1/2"
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
