"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects-data";

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-[70vh] px-6 py-10 bg-background text-foreground"
    >
      <div className="max-w-4xl mx-auto space-y-12">

        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-wide mb-4 text-primary">Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of projects I&apos;ve worked on. Click a row to read the full case study.
          </p>
        </div>

        <div className="w-full">
          {/* Table header */}
          <div className="grid grid-cols-[2rem_1fr_auto] md:grid-cols-[2rem_1fr_1fr_auto] gap-4 px-4 pb-3 border-b border-border text-xs font-mono text-muted-foreground uppercase tracking-wider">
            <span>#</span>
            <span>Project</span>
            <span className="hidden md:block">Stack</span>
            <span />
          </div>

          {/* Rows */}
          <ul>
            {projects.map((project, id) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="grid grid-cols-[2rem_1fr_auto] md:grid-cols-[2rem_1fr_1fr_auto] gap-4 items-center px-4 py-5 border-b border-border hover:bg-muted/40 transition-colors group"
                >
                  {/* Index */}
                  <span className="text-xs font-mono text-muted-foreground">
                    {String(id + 1).padStart(2, "0")}
                  </span>

                  {/* Name + description */}
                  <div className="space-y-1 min-w-0">
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                      {project.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{project.description}</p>
                  </div>

                  {/* Stack badges - hidden on mobile */}
                  <div className="hidden md:flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-0.5 text-xs text-muted-foreground">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
