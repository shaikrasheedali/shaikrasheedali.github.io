import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import resumeData from '@/data/resume.json';

export const About = () => {
  return (
    <section id="about" className="section-padding bg-canvas pattern-grid">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Bio */}
          <div className="space-y-8 reveal-slide-up">
            <div className="space-y-4">
              <span className="text-sm uppercase tracking-[0.3em] text-ink-60 font-medium">
                About Me
              </span>
              <h2 className="font-display font-bold text-ink">
                Transforming Data Into <span className="italic">Actionable Insights</span>
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-ink-70">
                {resumeData.summary}
              </p>
              
              <p className="text-ink-60">
                I specialize in building end-to-end data solutions that drive measurable business impact. 
                With expertise in Python, SQL, and modern visualization tools, I help organizations make 
                data-driven decisions with confidence.
              </p>
            </div>

            {/* Achievement highlights */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-border">
              <div className="space-y-2">
                <div className="text-4xl font-display font-bold text-ink">9.3</div>
                <div className="text-sm text-ink-60">CGPA / 10.0</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-display font-bold text-ink">99.1%</div>
                <div className="text-sm text-ink-60">12th Grade</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-display font-bold text-ink">5+</div>
                <div className="text-sm text-ink-60">Certifications</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-display font-bold text-ink">2+</div>
                <div className="text-sm text-ink-60">Internships</div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Card */}
          <div className="reveal-scale">
            <div className="bg-ink text-canvas p-8 lg:p-12 relative overflow-hidden">
              {/* Pattern overlay */}
              <div className="absolute inset-0 pattern-crosshatch opacity-10" />
              
              <div className="relative z-10 space-y-8">
                <h3 className="font-display text-2xl font-bold">Let's Connect</h3>
                
                <div className="space-y-4">
                  <a
                    href={`mailto:${resumeData.personal.email}`}
                    className="flex items-center gap-4 group hover:opacity-70 transition-opacity"
                    data-cursor="mail"
                  >
                    <div className="w-10 h-10 bg-canvas text-ink flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-canvas/60">Email</div>
                      <div className="font-medium">{resumeData.personal.email}</div>
                    </div>
                  </a>

                  <a
                    href={`tel:${resumeData.personal.phone}`}
                    className="flex items-center gap-4 group hover:opacity-70 transition-opacity"
                  >
                    <div className="w-10 h-10 bg-canvas text-ink flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-canvas/60">Phone</div>
                      <div className="font-medium">{resumeData.personal.phone}</div>
                    </div>
                  </a>

                  <a
                    href={`https://${resumeData.personal.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group hover:opacity-70 transition-opacity"
                  >
                    <div className="w-10 h-10 bg-canvas text-ink flex items-center justify-center">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-canvas/60">LinkedIn</div>
                      <div className="font-medium">{resumeData.personal.linkedin}</div>
                    </div>
                  </a>

                  <a
                    href={`https://${resumeData.personal.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group hover:opacity-70 transition-opacity"
                    data-cursor="data"
                  >
                    <div className="w-10 h-10 bg-canvas text-ink flex items-center justify-center">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-canvas/60">GitHub</div>
                      <div className="font-medium">{resumeData.personal.github}</div>
                    </div>
                  </a>
                </div>

                {/* Decorative border */}
                <div className="absolute top-0 left-0 w-full h-1 bg-canvas/20" />
                <div className="absolute bottom-0 left-0 w-1 h-full bg-canvas/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
