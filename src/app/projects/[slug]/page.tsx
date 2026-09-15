import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProjectBySlug, projects } from "@/lib/projects-data";
import RequirementsSection from "@/components/project-detail/requirements-section";
import DiagramSection from "@/components/project-detail/diagram-section";
import DatabaseSection from "@/components/project-detail/database-section";
import StackSection from "@/components/project-detail/stack-section";
import ChallengesSection from "@/components/project-detail/challenges-section";
import OutcomeSection from "@/components/project-detail/outcome-section";
import ScreenshotsSection from "@/components/project-detail/screenshots-section";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return { title: project ? `${project.title} - Nate's Portfolio` : "Project Not Found" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen px-6 py-20 bg-background text-foreground">
      <div className="max-w-3xl mx-auto space-y-16">

        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        {/* Header */}
        <div className="space-y-3">
          <p className="text-xs font-mono text-muted-foreground">{project.year}</p>
          <h1 className="text-4xl font-bold text-primary">{project.title}</h1>
          <p className="text-lg text-muted-foreground">{project.description}</p>
          {project.demoUrl && (
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-primary underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                live demo →
              </a>
              {project.demoCredentials && (
                <span className="text-xs font-mono text-muted-foreground/50">
                  {project.demoCredentials}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Case study sections */}
        <div className="space-y-14">
          {project.requirements && (
            <RequirementsSection content={project.requirements} />
          )}
          {project.architectureDiagram && (
            <DiagramSection diagram={project.architectureDiagram} />
          )}
          {project.databaseDesign && (
            <DatabaseSection content={project.databaseDesign} />
          )}
          {project.erdDiagram && (
            <DiagramSection diagram={project.erdDiagram} />
          )}
          {project.stackRationale && (
            <StackSection
              technologies={project.technologies}
              techStack={project.techStack}
              rationale={project.stackRationale}
            />
          )}
          {project.challenges && project.challenges.length > 0 && (
            <ChallengesSection challenges={project.challenges} />
          )}
          {project.outcome && (
            <OutcomeSection content={project.outcome} />
          )}
          <ScreenshotsSection images={project.images} />
        </div>

      </div>
    </main>
  );
}
