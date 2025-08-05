export default function Skills() {
  return (
    <section id="skills" className="min-h-screen px-6 py-20 bg-background text-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-lg">
          <span>TypeScript</span>
          <span>React</span>
          <span>Next.js</span>
          <span>Tailwind CSS</span>
          <span>Node.js</span>
          <span>Git & GitHub</span>
        </div>
      </div>
    </section>
  );
}