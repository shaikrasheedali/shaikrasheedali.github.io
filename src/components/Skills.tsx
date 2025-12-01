import { useEffect, useRef, useState } from 'react';
import resumeData from '@/data/resume.json';

interface SkillMeter {
  name: string;
  proficiency: number;
}

const skillProficiency: Record<string, number> = {
  Python: 90,
  Pandas: 85,
  NumPy: 85,
  'scikit-learn': 80,
  Matplotlib: 85,
  MySQL: 85,
  'Power BI': 90,
  Tableau: 80,
  'MS Excel (Advanced)': 85,
  DAX: 80,
  PowerPoint: 75,
  Statistics: 85,
  EDA: 90,
  'Feature Engineering': 85,
  SQL: 90,
};

export const Skills = () => {
  const [visibleMeters, setVisibleMeters] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillName = entry.target.getAttribute('data-skill');
            if (skillName) {
              setTimeout(() => {
                setVisibleMeters((prev) => new Set(prev).add(skillName));
              }, 100);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const skillElements = sectionRef.current?.querySelectorAll('[data-skill]');
    skillElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const allSkills: SkillMeter[] = [
    ...resumeData.skills.languages,
    ...resumeData.skills.libraries,
    ...resumeData.skills.databases,
    ...resumeData.skills.tools,
    ...resumeData.skills.techniques,
  ].map((skill) => ({
    name: skill,
    proficiency: skillProficiency[skill] || 75,
  }));

  const skillGroups = [
    { title: 'Languages', items: resumeData.skills.languages, pattern: 'pattern-halftone' },
    { title: 'Libraries', items: resumeData.skills.libraries, pattern: 'pattern-grid' },
    { title: 'Databases', items: resumeData.skills.databases, pattern: 'pattern-diagonal' },
    { title: 'Tools', items: resumeData.skills.tools, pattern: 'pattern-crosshatch' },
    { title: 'Techniques', items: resumeData.skills.techniques, pattern: 'pattern-halftone' },
  ];

  return (
    <section id="skills" className="section-padding bg-canvas" ref={sectionRef}>
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 reveal-slide-up">
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-ink-60 font-medium">
            Technical Expertise
          </span>
          <h2 className="font-display font-bold text-ink mt-3 sm:mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Skills & <span className="italic">Proficiencies</span>
          </h2>
        </div>

        {/* Skill Groups Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillGroups.map((group, idx) => (
            <div
              key={group.title}
              className="reveal-scale border border-border p-5 sm:p-6 hover:shadow-elegant transition-all duration-300 relative overflow-hidden group"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Pattern background */}
              <div className={`absolute inset-0 ${group.pattern} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <h3 className="font-display text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-ink">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-secondary text-ink text-xs sm:text-sm font-medium hover:bg-ink hover:text-canvas transition-colors duration-200 cursor-pointer"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
