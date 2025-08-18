"use client"

import Image from "next/image"
import Link from "next/link"

type Project = {
  title: string
  description: string
  image: string
  href?: string
}

const projects: Project[] = [
  {
    title: "Go Apricot",
    description: "SaaS company website",
    image: "/images/pic1.jpg",
    href: "/projects/go-apricot",
  },
  {
    title: "Go Booqing",
    description: "A website for scheduling and booking services.",
    image: "/images/pic1.jpg",
    href: "/projects/go-booqing",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen px-6 py-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto space-y-20">
        <h2 className="text-center py-6 text-4xl font-semibold tracking-widest mb-4">
          Projects
        </h2>

        {projects.map((project, index) => {
          const isEven = index % 2 === 0
          const titleId = `project-title-${index}`
          const descId = `project-desc-${index}`

          return (
            <article
              key={project.title}
              aria-labelledby={titleId}
              aria-describedby={descId}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              {/* Image */}
              <div className={`relative overflow-hidden rounded-3xl ${isEven ? "md:order-1" : "md:order-2"}`}>
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover rounded-3xl"
                  sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
                  priority={index === 0}
                />

                {/* Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/10 backdrop-blur-md rounded-lg flex justify-between items-center text-sm md:text-base">
                  <span className="text-foreground">{project.title} / {project.description}</span>
                  <span className="text-foreground text-xl" aria-hidden>→</span>
                </div>
              </div>

              {/* Details */}
              <div className={`space-y-4 ${isEven ? "md:order-2" : "md:order-1"}`}>
                <h3 id={titleId} className="text-2xl font-semibold text-primary">{project.title}</h3>
                <p id={descId} className="text-muted-foreground">{project.description}</p>

                {project.href ? (
                  <Link
                    href={project.href}
                    className="inline-block mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
                    aria-label={`View details for ${project.title}`}
                  >
                    View Details
                  </Link>
                ) : (
                  <button
                    className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
                    disabled
                    aria-disabled="true"
                  >
                    View Details
                  </button>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
