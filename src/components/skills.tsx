const SKILL_GROUPS = [
  {
    category: "Languages",
    skills: ["JavaScript", "TypeScript", "HTML", "CSS", "SQL"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js (App Router)", "Vite", "shadcn/ui", "Tailwind CSS", "MUI", "Recharts", "React Native (Expo)"],
  },
  {
    category: "Backend",
    skills: ["Node.js (Express)", "Prisma ORM", "REST API design", "JWT auth"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "Supabase", "Firebase / Firestore", "MySQL", "MongoDB"],
  },
  {
    category: "Tooling",
    skills: ["Git / GitHub", "Vercel", "Railway"],
  },
  {
    category: "Certifications",
    skills: ["Microsoft Azure Fundamentals", "AWS Certified Cloud Practitioner"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-20 bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-12">

        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-wide mb-4 text-primary">Skills</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with.
          </p>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-[140px_1fr] text-xs font-mono text-muted-foreground uppercase tracking-wider px-4 pb-3 border-b border-border gap-6">
            <span className="text-primary font-bold">Category</span>
            <span className="px-3 text-primary font-bold">Skills</span>
          </div>

          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="grid grid-cols-[140px_1fr] gap-6 px-4 py-4 border-b border-border items-start"
            >
              <span className="text-sm font-bold text-muted-foreground">{group.category}</span>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
