import { ArrowUp, Linkedin, Github, Mail } from 'lucide-react';
import resumeData from '@/data/resume.json';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-ink text-canvas py-16 relative overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 pattern-crosshatch opacity-5" />
      
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Branding */}
          <div className="space-y-4">
            <div className="font-display text-3xl font-bold tracking-tight">
              <span>B</span>
              <span className="text-canvas/60">•</span>
              <span>V</span>
            </div>
            <p className="text-canvas/70 text-sm leading-relaxed max-w-xs">
              Transforming data into actionable insights. Building solutions that drive measurable business impact.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(`#${item.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-canvas/70 hover:text-canvas transition-colors text-sm"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold">Connect</h3>
            <div className="flex gap-3">
              <a
                href={`https://${resumeData.personal.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-canvas text-canvas flex items-center justify-center hover:bg-canvas hover:text-ink transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`https://${resumeData.personal.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-canvas text-canvas flex items-center justify-center hover:bg-canvas hover:text-ink transition-colors"
                data-cursor="data"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${resumeData.personal.email}`}
                className="w-10 h-10 border-2 border-canvas text-canvas flex items-center justify-center hover:bg-canvas hover:text-ink transition-colors"
                data-cursor="mail"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-canvas/70 text-sm">
              {resumeData.personal.email}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-canvas/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-canvas/60 text-sm">
            © {new Date().getFullYear()} {resumeData.personal.name}. All rights reserved.
          </p>
          <p className="text-canvas/60 text-sm">
            Crafted with precision & attention to detail
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-canvas text-ink flex items-center justify-center hover:bg-ink hover:text-canvas border-2 border-ink transition-all duration-300 hover:scale-110 z-40"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};
