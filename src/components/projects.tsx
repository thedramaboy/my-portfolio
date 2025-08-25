"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

type Project = {
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  liveUrl?: string
  status: 'live' | 'in-progress' | 'completed'
}

const projects: Project[] = [
  {
    title: "Company website",
    description: "Corporate SaaS website",
    longDescription:
      "A responsive company website developed during my internship at GoApricot. Contributed to building modular UI components (navigation, hero, services, footer) with animations and scalable design. Deployment and production release were handled by senior developers.",
    image: "/api/placeholder/600/400",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://goapricot.ca/",
    status: "live",
  },
  {
    title: "Online booking system",
    description: "Scheduling and booking platform",
    longDescription:
      "An end-to-end booking platform created as part of my internship. Built booking workflows including authentication (login/signup), CRUD operations, and an admin dashboard. Implemented a calendar view, analytics cards, and modular UI components to improve efficiency for administrators.",
    image: "/api/placeholder/600/400",
    technologies: ["Next.js", "React", "Supabase", "Tailwind CSS", "shadcn/ui"],
    liveUrl: "https://gobooqing.com/",
    status: "in-progress",
  },
  {
    title: "FlashYourMeme",
    description: "Bug fixing and maintenance project",
    longDescription:
      "Supported maintenance of a production ASP.NET Core MVC application by debugging and resolving customer-reported issues. Worked across Models, Views, and Controllers to fix backend errors and UI inconsistencies, improving overall stability and usability.",
    image: "/api/placeholder/600/400",
    technologies: ["ASP.NET Core MVC", "C#", "Razor", "Firebase"],
    status: "live",
  },
  {
    title: "Ferra Ag (Capstone project)",
    description: "Smart agriculture web application for farmers",
    longDescription:
      "A capstone project developed with Flutter and Firebase. Led backend development, implementing secure CRUD operations and role-based access control. Integrated Firestore and authentication to ensure scalability and reliability for agricultural management.",
    image: "/api/placeholder/600/400",
    technologies: ["Flutter", "Dart", "Firebase"],
    status: "completed",
  },
];

const StatusBadge = ({ status }: { status: Project['status'] }) => {
  const statusConfig = {
    live: { text: 'Live', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
    completed: { text: 'Completed', className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    'in-progress': { text: 'In Progress', className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  }

  const config = statusConfig[status]
  
  return (
    <span className={`px-2 py-1 text-xs rounded-full border ${config.className}`}>
      {config.text}
    </span>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen px-6 py-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-wide mb-4 text-primary">
            Projects as an intern
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of projects I&apos;ve worked on as an intern.
          </p>
        </div>

        <div className="space-y-20">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0
            const titleId = `project-title-${index}`
            const descId = `project-desc-${index}`

            return (
              <article
                key={project.title}
                aria-labelledby={titleId}
                aria-describedby={descId}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                {/* Image */}
                <div className={`relative overflow-hidden rounded-xl ${isEven ? "md:order-1" : "md:order-2"}`}>
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-cover rounded-xl"
                      sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
                      priority={index === 0}
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                    <div className="flex gap-4">
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors"
                          aria-label={`View ${project.title} live site`}
                        >
                          <ExternalLink className="h-5 w-5 text-black" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className={`space-y-6 ${isEven ? "md:order-2" : "md:order-1"}`}>
                  <div className="flex items-center gap-3">
                    <h3 id={titleId} className="text-3xl font-bold text-primary">
                      {project.title}
                    </h3>
                    <StatusBadge status={project.status} />
                  </div>
                  
                  <p className="text-lg text-muted-foreground">
                    {project.description}
                  </p>
                  
                  <p id={descId} className="text-muted-foreground leading-relaxed">
                    {project.longDescription}
                  </p>

                  {/* Tech stacks */}
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2">Tech stacks:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action button */}
                  <div className="flex gap-4 pt-2">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
                        aria-label={`View ${project.title} live site`}
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Live
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}