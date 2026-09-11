"use client";

const experiences = [
  {
    period: "July 2025 - June 2026",
    title: "Software Developer (Intern)",
    company: "GoApricot",
    location: "Calgary, AB",
    details: [
      "Primary developer on three client web applications, building React and Next.js interfaces end-to-end from requirements through REST API integration to production.",
      "Built JR Plus, a pharmacy e-commerce admin dashboard with a full order and warehouse workflow, and BSH Drug, a drug information management system with Excel import/export and Supabase-backed file storage.",
      "Worked on FlashYourMeme, a live ASP.NET Core MVC platform - debugged C# controller logic and re-engineered pagination from page-based to Firestore query cursors.",
      "Worked in an Agile team with PR-based Git workflow and code reviews, owning features from scoping through to release.",
    ],
  },
  {
    period: "Sep 2025 - Present",
    title: "Full-stack Developer (Freelance)",
    company: "Fastwork Thailand",
    location: "Remote",
    details: [
      "Maintained and extended TempJob, a production React Native (Expo) mobile app for temporary staffing, shipping bug fixes and new features to Google Play via EAS.",
      "Built the back-office portal for job and worker management using Next.js and Node.js (Express), structured with a Controller-Service-Model architecture.",
      "Integrated Google Maps API for location-based job browsing and implemented Supabase Auth with role-based access control across the platform.",
    ],
  },
  {
    period: "Jan 2020 - Jan 2021",
    title: "Inspection Engineer, Plant Reliability and Integrity",
    company: "GC Maintenance and Engineering Company Limited (GCME)",
    location: "Rayong, TH",
    details: [
      "Built automated Power BI dashboards that cut manual reporting time by around 35%, converting raw inspection data into structured summaries for engineering teams.",
      "Analysed inspection data from high-risk equipment to support decisions around maintenance and operational safety.",
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
    <section id="experience" className="py-10">
      <div className="max-w-4xl mx-auto px-6 gap-8">
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
