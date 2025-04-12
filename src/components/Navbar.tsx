
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';

interface NavbarProps {
  scrollToSection: (section: string) => void;
}

const Navbar = ({ scrollToSection }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    scrollToSection(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled ? "py-3 glass-morphism" : "py-5 bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <div 
            className={cn(
              "text-xl font-bold text-white cursor-pointer",
              isScrolled ? "text-2xl" : "text-3xl"
            )}
            onClick={() => handleNavClick('home')}
          >
            VIRENDER
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10">
          {['home', 'projects', 'about'].map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item)}
              className="text-gray-300 hover:text-white capitalize transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 neo-blur animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {['home', 'projects', 'about'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="text-gray-300 hover:text-white capitalize py-2 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
