import { useEffect, useRef } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import resumeData from '@/data/resume.json';

export const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrolled = window.scrollY;
      const layers = parallaxRef.current.querySelectorAll('[data-parallax]');
      
      layers.forEach((layer) => {
        const speed = parseFloat(layer.getAttribute('data-parallax') || '1');
        const yPos = -(scrolled * speed);
        (layer as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-canvas">
      {/* Parallax Background Patterns */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none">
        {/* Layer 3 - Background circles */}
        <div
          data-parallax="0.1"
          className="absolute top-20 right-10 w-[600px] h-[600px] opacity-5"
        >
          <svg viewBox="0 0 600 600" fill="none">
            {[...Array(8)].map((_, i) => (
              <circle
                key={i}
                cx="300"
                cy="300"
                r={50 + i * 40}
                stroke="currentColor"
                strokeWidth="1"
                className="text-ink"
              />
            ))}
          </svg>
        </div>

        {/* Layer 2 - Diagonal stripes */}
        <div
          data-parallax="0.2"
          className="absolute bottom-0 right-0 w-full h-1/2 pattern-diagonal opacity-30"
        />

        {/* Layer 1 - Halftone foreground */}
        <div
          data-parallax="0.3"
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] pattern-halftone"
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Typography */}
          <div className="space-y-8 reveal-slide-up">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-ink-60 font-medium">
                Hi, I'm
              </p>
              <h1 className="font-display font-bold text-ink leading-[0.9]">
                {resumeData.personal.name}
              </h1>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-ink-80 leading-tight">
                <span className="hero-emphasis">Analytical</span>, <span className="hero-emphasis">detail-oriented</span>, and <span className="hero-emphasis">impactful</span> data analyst
              </h2>
              
              <p className="text-lg text-ink-60 max-w-xl leading-relaxed">
                {resumeData.summary}
              </p>

              {/* Rotating skills */}
              <div className="flex items-center gap-2 text-sm text-ink-50 font-mono">
                <span>Specializing in:</span>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-secondary">Python</span>
                  <span className="px-3 py-1 bg-secondary">Data Viz</span>
                  <span className="px-3 py-1 bg-secondary">EDA</span>
                  <span className="px-3 py-1 bg-secondary">Feature Engineering</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={scrollToProjects}
                className="btn-primary flex items-center gap-2 group"
                data-cursor="data"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-outline flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Resume
              </button>
            </div>
          </div>

          {/* Right Column - Abstract Visual */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square">
              {/* Geometric composition */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  {/* Grid background */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-ink opacity-10" />
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill="url(#grid)" />
                  
                  {/* Abstract shapes */}
                  <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink opacity-20 animate-float" />
                  <rect x="140" y="140" width="120" height="120" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink opacity-30" style={{ animationDelay: '1s' }} />
                  <line x1="100" y1="100" x2="300" y2="300" stroke="currentColor" strokeWidth="1" className="text-ink opacity-15" />
                  <line x1="300" y1="100" x2="100" y2="300" stroke="currentColor" strokeWidth="1" className="text-ink opacity-15" />
                  
                  {/* Data points */}
                  {[...Array(12)].map((_, i) => {
                    const angle = (i * 30 * Math.PI) / 180;
                    const x = 200 + 140 * Math.cos(angle);
                    const y = 200 + 140 * Math.sin(angle);
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="3"
                        fill="currentColor"
                        className="text-ink animate-pulse-subtle"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-subtle">
        <span className="text-xs uppercase tracking-widest text-ink-50">Scroll</span>
        <div className="w-px h-12 bg-ink-50" />
      </div>
    </section>
  );
};
