import { useEffect, useRef } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import resumeData from '@/data/resume.json';
import { SqlCylinder } from './SqlCylinder';

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
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-canvas pt-20 sm:pt-24 md:pt-32">
      {/* Parallax Background Patterns */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none">
        {/* Layer 3 - Background circles */}
        <div
          data-parallax="0.1"
          className="absolute top-10 sm:top-20 right-5 sm:right-10 w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] opacity-5"
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
          className="absolute top-1/4 right-1/4 w-[200px] sm:w-[300px] lg:w-[400px] h-[200px] sm:h-[300px] lg:h-[400px] pattern-halftone"
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Typography */}
          <div className="space-y-6 sm:space-y-8 reveal-slide-up">
            <div className="space-y-2">
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-ink-60 font-medium">
                Hi, I'm
              </p>
              <h1 className="font-display font-bold text-ink leading-[0.9] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                {resumeData.personal.name}
              </h1>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-ink-80 leading-tight">
                <span className="hero-emphasis">Analytical</span>, <span className="hero-emphasis">detail-oriented</span>, and <span className="hero-emphasis">impactful</span> data analyst
              </h2>

              {/* <p className="text-base sm:text-lg text-ink-60 max-w-xl leading-relaxed">
                {resumeData.summary}
              </p> */}

              {/* Rotating skills */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm text-ink-50 font-mono">
                <span>Specializing in:</span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 sm:px-3 py-1 bg-secondary">Python</span>
                  <span className="px-2 sm:px-3 py-1 bg-secondary">Data Viz</span>
                  <span className="px-2 sm:px-3 py-1 bg-secondary">EDA</span>
                  <span className="px-2 sm:px-3 py-1 bg-secondary whitespace-nowrap">Feature Engineering</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4">
              <button
                onClick={scrollToProjects}
                className="btn-primary flex items-center justify-center gap-2 group"
                data-cursor="data"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-outline flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download Resume
              </button>
            </div>
          </div>

          {/* Right Column - 3D SQL Cylinder */}
          <div className="hidden lg:block relative z-10 min-h-[400px]">
            <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
              <SqlCylinder />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-subtle">
        <span className="text-xs uppercase tracking-widest text-ink-50">Scroll</span>
        <div className="w-px h-8 sm:h-12 bg-ink-50" />
      </div>
    </section>
  );
};
