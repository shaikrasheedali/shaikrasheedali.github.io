import { useState, useEffect } from 'react';
import { Menu, X, Download, Github, Linkedin } from 'lucide-react';
import resumeData from '@/data/resume.json';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'glass-effect border-b border-border shadow-elegant py-4' 
          : 'bg-transparent py-6'
        }
      `}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-2xl font-bold tracking-tight hover:opacity-70 transition-opacity"
          >
            <span className="text-ink">B</span>
            <span className="text-ink-60">•</span>
            <span className="text-ink">V</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="btn-ghost text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`https://${resumeData.personal.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`https://${resumeData.personal.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-secondary rounded-full transition-colors"
              data-cursor="data"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <button className="btn-primary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Resume
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-effect border-b border-border mt-1">
            <nav className="container-custom py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="btn-ghost text-left"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex gap-4 pt-4 border-t border-border">
                <a
                  href={`https://${resumeData.personal.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`https://${resumeData.personal.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                  data-cursor="data"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <button className="btn-outline flex-1 flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Resume
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
