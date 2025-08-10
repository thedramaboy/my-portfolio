"use client"

import Image from "next/image"

const projects = [
  {
    title: "Go Apricot",
    description: "Digital Collectible",
    image: "/images/pic1.jpg",
  },
]

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen px-6 py-20 bg-background text-foreground"
    >
      <div className="max-w-6xl mx-auto space-y-20">
        <h2 className="text-center py-6 text-4xl font-semibold tracking-widest mb-4">
          Projects
        </h2>

        {projects.map((project, index) => {
          const isEven = index % 2 === 0

          return (
            <div
              key={index}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                isEven ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover rounded-3xl"
                />

                {/* Liquid Glass Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/10 backdrop-blur-md rounded-lg flex justify-between items-center text-sm md:text-base">
                  <span className="text-foreground">{project.title} / {project.description}</span>
                  <span className="text-foreground text-xl">→</span>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-primary">{project.title}</h3>
                <p className="text-muted-foreground">
                  This project is a showcase of {project.description.toLowerCase()}.
                  It demonstrates modern web technology and smooth UI/UX interactions.
                </p>
                <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">
                  View Details
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}