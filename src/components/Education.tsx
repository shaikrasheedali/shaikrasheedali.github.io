import { GraduationCap, Award, ExternalLink } from 'lucide-react';
import resumeData from '@/data/resume.json';

export const Education = () => {
  return (
    <section id="education" className="section-padding bg-canvas pattern-grid">
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mb-16 reveal-slide-up">
          <span className="text-sm uppercase tracking-[0.3em] text-ink-60 font-medium">
            Academic Background
          </span>
          <h2 className="font-display font-bold text-ink mt-4">
            Education & <span className="italic">Certifications</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div className="space-y-8">
            <h3 className="font-display text-2xl font-bold text-ink flex items-center gap-3">
              <GraduationCap className="w-6 h-6" />
              Education
            </h3>

            <div className="space-y-6">
              {resumeData.education.map((edu, idx) => (
                <article
                  key={idx}
                  className="reveal-scale border border-border p-6 hover:shadow-elegant transition-all duration-300 bg-canvas"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-display text-xl font-bold text-ink">
                        {edu.degree}
                      </h4>
                      <p className="text-ink-60 mt-1">{edu.institution}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-sm text-ink-60">{edu.period}</span>
                      <span className="font-display text-lg font-bold text-ink">
                        {edu.grade}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-8">
            <h3 className="font-display text-2xl font-bold text-ink flex items-center gap-3">
              <Award className="w-6 h-6" />
              Certifications
            </h3>

            <div className="space-y-4">
              {resumeData.certifications.map((cert, idx) => (
                <article
                  key={idx}
                  className="reveal-scale border border-border p-6 hover:shadow-elegant transition-all duration-300 group bg-canvas cursor-pointer"
                  style={{ animationDelay: `${(idx + 2) * 0.1}s` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-display text-lg font-bold text-ink group-hover:text-ink-70 transition-colors">
                        {cert.name}
                      </h4>
                      <p className="text-sm text-ink-60 mt-1">{cert.issuer}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-ink-60">{cert.year}</span>
                      <ExternalLink className="w-4 h-4 text-ink-60 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Download all certs */}
            <button className="btn-outline w-full mt-6">
              View All Certificates
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
