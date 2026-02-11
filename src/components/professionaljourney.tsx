"use client";

const experiences = [
  {
    period: "Sep 2025 - Present",
    title: "Full-stack Developer (Remote)",
    company: "Fastwork Thailand",
    location: "Bangkok, TH",
    details: [
      "Delivered high-quality features for TempJob (Outsource) by designing and implementing back-office modules using Next.js and Node.js (Express).",
      "Applied Controller-Service-Model architecture to ensure maintainable and structured codebases for multi-platform integration (Web & Mobile).",
      "Developed a React Native application, integrated Google Maps API, and managed the complete deployment pipeline to Google Play Console via EAS (Expo).",
    ],
  },
  {
    period: "July 2025 - Present",
    title: "Software Developer (Intern)",
    company: "GoApricot",
    location: "Calgary, AB",
    details: [
      "Built responsive web apps and booking workflows using Next.js, React, and Supabase; improved usability and management efficiency.",
      "Debugged production issues in .NET Core MVC; re-engineered pagination from page-based to query cursors for better performance.",
      "Delivered features within Agile sprints, collaborating with designers and senior devs.",
    ],
  },
  {
    period: "Jan 2020 - Jan 2021",
    title: "Inspection Engineer, Plant Reliability and Integrity",
    company: "GC Maintenance and Engineering Company Limited (GCME)",
    location: "Rayong, TH",
    details: [
      "Created automated Power BI dashboards, reducing reporting time by 35%.",
      "Analysed inspection data from high-risk equipment to prevent operational failures.",
    ],
  },
];

const education = [
  {
    period: "2023 - 2025",
    school: "Southern Alberta Institute of Technology (SAIT)",
    degree: "Diploma in Software Development, with Honours",
    location: "Calgary, CA",
  },
  {
    period: "2016 - 2019",
    school: "King Mongkut's Institute of Technology Ladkrabang (KMITL)",
    degree: "Bachelor of Engineering, Mechanical Engineering",
    location: "Bangkok, TH",
  },
];

export default function ProfessionalJourney() {
  return (
    <section id="experience" className="py-12">
      <div className="max-w-6xl mx-auto px-6 gap-8">
        {/* Experience Section */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-10">
            Experience
          </h2>
          <div className="space-y-14 mb-10">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-10"
              >
                <div className="text-[13px] text-slate-400 tabular-nums pt-1.5">
                  {exp.period}
                </div>
                <div className="group">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {exp.company}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-[14px] font-medium">
                    <span className="text-slate-700">{exp.title}</span>
                    <span className="text-slate-300">/</span>
                    <span className="text-slate-500 font-normal">
                      {exp.location}
                    </span>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {exp.details.map((detail, i) => (
                      <li
                        key={i}
                        className="text-[15px] text-slate-600 leading-relaxed flex gap-3"
                      >
                        <span className="text-slate-300 mt-1 shrink-0">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-slate-100" />

        {/* Education Section */}
        <div className="mt-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-10">
            Education
          </h2>
          <div className="space-y-12">
            {education.map((edu, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-2 md:gap-10"
              >
                <div className="text-[13px] text-slate-400 tabular-nums pt-1">
                  {edu.period}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {edu.school}
                  </h3>
                  <p className="text-[15px] text-slate-600 mt-1">
                    {edu.degree}
                  </p>
                  <p className="text-[13px] text-slate-400 mt-1 font-medium italic">
                    {edu.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
