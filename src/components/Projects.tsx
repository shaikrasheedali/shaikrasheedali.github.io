import { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import resumeData from '@/data/resume.json';

export const Projects = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding bg-canvas pattern-diagonal">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 reveal-slide-up">
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-ink-60 font-medium">
            Featured Work
          </span>
          <h2 className="font-display font-bold text-ink mt-3 sm:mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Projects & <span className="italic">Case Studies</span>
          </h2>
          <p className="text-base sm:text-lg text-ink-60 mt-4 sm:mt-6 leading-relaxed">
            End-to-end data solutions with measurable business impact
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-8 sm:space-y-12">
          {resumeData.projects.map((project, idx) => (
            <article
              key={idx}
              className="reveal-slide-up border border-border bg-canvas hover:shadow-elegant transition-all duration-300"
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              <div className="grid lg:grid-cols-5 gap-0">
                {/* Visual Side */}
                <div className="lg:col-span-2 bg-ink text-canvas p-6 sm:p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 pattern-grid opacity-10" />
                  
                  {/* Project visual representation */}
                  <div className="relative z-10 w-full max-w-[250px] sm:max-w-xs">
                    <svg viewBox="0 0 300 300" className="w-full h-full">
                      {/* Data visualization mockup */}
                      {idx === 0 ? (
                        // Disease Prediction - Neural network style
                        <>
                          <circle cx="150" cy="150" r="60" fill="none" stroke="currentColor" strokeWidth="2" />
                          <circle cx="150" cy="150" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
                          <circle cx="150" cy="150" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
                          {[0, 60, 120, 180, 240, 300].map((angle) => (
                            <line
                              key={angle}
                              x1="150"
                              y1="150"
                              x2={150 + 70 * Math.cos((angle * Math.PI) / 180)}
                              y2={150 + 70 * Math.sin((angle * Math.PI) / 180)}
                              stroke="currentColor"
                              strokeWidth="1"
                            />
                          ))}
                          {[0, 60, 120, 180, 240, 300].map((angle) => (
                            <circle
                              key={angle}
                              cx={150 + 70 * Math.cos((angle * Math.PI) / 180)}
                              cy={150 + 70 * Math.sin((angle * Math.PI) / 180)}
                              r="8"
                              fill="currentColor"
                            />
                          ))}
                        </>
                      ) : (
                        // Zepto Dashboard - Bar chart style
                        <>
                          {[60, 120, 90, 150, 80, 140].map((height, i) => (
                            <rect
                              key={i}
                              x={30 + i * 40}
                              y={200 - height}
                              width="30"
                              height={height}
                              fill="currentColor"
                              opacity={0.7 + i * 0.05}
                            />
                          ))}
                          <line x1="20" y1="200" x2="280" y2="200" stroke="currentColor" strokeWidth="2" />
                          <line x1="20" y1="200" x2="20" y2="40" stroke="currentColor" strokeWidth="2" />
                        </>
                      )}
                    </svg>
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:col-span-3 p-6 sm:p-8 lg:p-12">
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                          {project.title}
                        </h3>
                        <span className="text-xs sm:text-sm text-ink-60 whitespace-nowrap">{project.period}</span>
                      </div>
                      <p className="text-base sm:text-lg text-ink-70 mt-3 sm:mt-4 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Key Metric */}
                    <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-ink text-canvas font-display text-lg sm:text-xl font-bold">
                      {project.metrics}
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-xs sm:text-sm uppercase tracking-wider text-ink-60 mb-2 sm:mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 sm:px-3 py-1 border border-border text-xs sm:text-sm font-medium text-ink hover:bg-ink hover:text-canvas transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expandable Details */}
                    <div>
                      <button
                        onClick={() => setExpandedProject(expandedProject === idx ? null : idx)}
                        className="flex items-center gap-2 text-ink-60 hover:text-ink transition-colors group text-sm sm:text-base"
                      >
                        <span className="font-medium">Key Highlights</span>
                        {expandedProject === idx ? (
                          <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                        ) : (
                          <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                        )}
                      </button>
                      
                      {expandedProject === idx && (
                        <ul className="mt-3 sm:mt-4 space-y-2 text-sm sm:text-base text-ink-70">
                          {project.highlights.map((highlight, hIdx) => (
                            <li key={hIdx} className="flex gap-3">
                              <span className="text-ink-60 mt-1.5 flex-shrink-0">—</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Action */}
                    <button className="btn-ghost flex items-center gap-2 text-sm sm:text-base" data-cursor="data">
                      View Details
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative border */}
              <div className="h-0.5 sm:h-1 bg-ink" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
