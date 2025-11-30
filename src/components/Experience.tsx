import { Briefcase, Calendar } from 'lucide-react';
import resumeData from '@/data/resume.json';

export const Experience = () => {
  return (
    <section id="experience" className="section-padding bg-canvas">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mb-16 reveal-slide-up">
          <span className="text-sm uppercase tracking-[0.3em] text-ink-60 font-medium">
            Professional Journey
          </span>
          <h2 className="font-display font-bold text-ink mt-4">
            Work <span className="italic">Experience</span>
          </h2>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-12">
          {resumeData.experience.map((exp, idx) => (
            <article
              key={idx}
              className="reveal-slide-up relative pl-12 md:pl-16"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {/* Timeline connector */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border">
                <div className="sticky top-32 w-6 h-6 -ml-3 bg-ink flex items-center justify-center">
                  <Briefcase className="w-3 h-3 text-canvas" />
                </div>
              </div>

              {/* Content Card */}
              <div className="border border-border p-8 lg:p-10 hover:shadow-elegant transition-all duration-300 group bg-canvas">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-display text-2xl lg:text-3xl font-bold text-ink group-hover:text-ink-70 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-xl text-ink-60 mt-2">{exp.company}</p>
                  </div>
                  <div className="flex items-center gap-2 text-ink-60">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm whitespace-nowrap">{exp.period}</span>
                  </div>
                </div>

                {/* Achievements */}
                <ul className="space-y-3">
                  {exp.achievements.map((achievement, aIdx) => (
                    <li key={aIdx} className="flex gap-4 text-lg text-ink-70 leading-relaxed">
                      <span className="text-ink-60 mt-1">•</span>
                      <span dangerouslySetInnerHTML={{ __html: achievement.replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink font-semibold">$1</strong>') }} />
                    </li>
                  ))}
                </ul>

                {/* Decorative border accent */}
                <div 
                  className="absolute top-0 left-0 w-1 h-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                  style={{
                    background: `repeating-linear-gradient(0deg, black, black 10px, transparent 10px, transparent 20px)`
                  }}
                />
              </div>
            </article>
          ))}
        </div>

        {/* Download CV */}
        <div className="mt-16 text-center reveal-fade">
          <button className="btn-primary">
            Download Experience Summary
          </button>
        </div>
      </div>
    </section>
  );
};
