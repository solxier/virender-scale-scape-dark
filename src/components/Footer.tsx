
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  scrollToTop: () => void;
}

const Footer = ({ scrollToTop }: FooterProps) => {
  return (
    <footer className="py-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-xl font-bold mb-2">Virender</h3>
            <p className="text-white/60 mb-4 md:mb-0">Creative Developer</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
              Back to top
            </button>
            <p className="text-white/40 text-sm">&copy; {new Date().getFullYear()} - All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
