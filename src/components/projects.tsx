"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type Project = {
  title: string;
  description: string;
  longDescription: string;
  images: string[];
  technologies: string[];
  liveUrl?: string;
  status: "live" | "in-progress" | "completed";
};

const projects: Project[] = [
  {
    title: "TempJob (Fastwork Thailand)",
    description: "Multi-platform staffing & management solution",
    longDescription:
      "Delivered high-quality features for the TempJob ecosystem. Designed back-office modules using a Controller-Service-Model architecture and developed a React Native mobile application. Managed the complete deployment pipeline to Google Play Console via EAS (Expo).",
    images: [
      "/projects/tempjob/temp1.JPG",
      "/projects/tempjob/temp2.JPG",
      "/projects/tempjob/temp3.JPG",
      "/projects/tempjob/temp4.jpg",
    ],
    technologies: [
      "Next.js",
      "Node.js (Express)",
      "React Native",
      "Google Maps API",
      "EAS",
    ],
    liveUrl: "https://www.tempjob.in.th/",
    status: "live",
  },
  {
    title: "JR Plus",
    description: "E-commerce platform for pharmacy distributors",
    longDescription:
      "Built a robust back-office system for wholesale distribution. Implemented real-time order tracking and product management dashboards to streamline the supply chain process between distributors and pharmacies.",
    images: [
      "/projects/jr/jr1.JPG",
      "/projects/jr/jr2.JPG",
      "/projects/jr/jr3.JPG",
      "/projects/jr/jr4.JPG",
      "/projects/jr/jr5.JPG",
    ],
    technologies: ["Next.js", "React", "Supabase", "Tailwind CSS"],
    liveUrl: "https://jrplus.vercel.app/",
    status: "live",
  },
  {
    title: "BSH Drug",
    description: "Pharmaceutical database & inventory system",
    longDescription:
      "Developed a specialized inventory dashboard for medical teams with secure file management (Supabase Storage). Features include complex CRUD operations for drug categories, Role-Based Access Control (RBAC), and automated Excel import/export functionality.",
    images: [
      "/projects/bsh/bsh1.JPG",
      "/projects/bsh/bsh2.JPG",
      "/projects/bsh/bsh3.JPG",
    ],
    technologies: ["Next.js", "React", "Supabase", "Tailwind CSS"],
    status: "completed",
  },
  {
    title: "GoApricot company website",
    description: "Corporate SaaS website",
    longDescription:
      "A responsive company website developed during my internship at GoApricot. Contributed to building modular UI components (navigation, hero, services, footer) with animations and scalable design. Deployment and production release were handled by senior developers.",
    images: [
      "/projects/goapricot/goapricot1.JPG",
      "/projects/goapricot/goapricot2.JPG",
      "/projects/goapricot/goapricot3.JPG",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://goapricot.ca/",
    status: "live",
  },
  {
    title: "FlashYourMeme",
    description: "Production stability & bug resolution",
    longDescription:
      "Diagnosed and resolved complex backend logic issues within a production ASP.NET Core MVC environment. Improved UI consistency across MVC layers to ensure high system stability and seamless user experience.",
    images: ["/projects/flashyourmeme/flashyourmeme_logo.png"],
    technologies: ["ASP.NET Core MVC", "C#", "Firebase", "Firestore"],
    status: "completed",
  },
  {
    title: "Ferra Ag (Capstone project)",
    description: "Smart agriculture management system",
    longDescription:
      "A Flutter-based application for agricultural data management. Led the backend implementation using Firebase, focusing on secure CRUD operations and scalable Firestore architecture for real-time monitoring.",
    images: [
      "/projects/farm/farm1.JPG",
      "/projects/farm/farm2.JPG",
      "/projects/farm/farm3.JPG",
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Firestore"],
    status: "completed",
  },
];

const StatusBadge = ({ status }: { status: Project["status"] }) => {
  const statusConfig = {
    live: {
      text: "Live",
      className: "bg-green-500/20 text-green-400 border-green-500/30",
    },
    completed: {
      text: "Completed",
      className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    "in-progress": {
      text: "In Progress",
      className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    },
  } as const;

  const config = statusConfig[status];
  return (
    <span
      className={`px-2 py-1 text-xs rounded-full border ${config.className}`}
    >
      {config.text}
    </span>
  );
};

function Carousel({
  images,
  alt,
  priority,
}: {
  images: string[];
  alt: string;
  priority?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const go = (delta: number) =>
    setIndex((i) => (i + delta + images.length) % images.length);
  const set = (i: number) =>
    setIndex(((i % images.length) + images.length) % images.length);

  let startX = 0;
  const onTouchStart = (e: React.TouchEvent) => (startX = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="aspect-[4/3] relative overflow-hidden rounded-xl">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0.0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0.0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <Image
              src={images[index]}
              alt={`${alt} – slide ${index + 1} of ${images.length}`}
              fill
              className="object-contain p-4"
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 40vw, 90vw"
              priority={priority}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur text-white z-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur text-white z-10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => set(i)}
                className={`h-2.5 w-2.5 rounded-full transition border border-white/60 ${
                  i === index ? "bg-white/90" : "bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen px-6 py-20 bg-background text-foreground"
    >
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-wide mb-4 text-primary">
            Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of my projects I&apos;ve worked on.
          </p>
        </div>

        <div className="space-y-20">
          {projects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            const titleId = `project-title-${idx}`;
            const descId = `project-desc-${idx}`;

            return (
              <article
                key={project.title}
                aria-labelledby={titleId}
                aria-describedby={descId}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                {/* Images / Carousel */}
                <div
                  className={`relative rounded-xl ${
                    isEven ? "md:order-1" : "md:order-2"
                  } ${project.title === "FlashYourMeme" ? "max-w-xs w-full mx-auto" : ""}`}
                >
                  <Carousel
                    images={project.images}
                    alt={`${project.title} screenshot`}
                    priority={idx === 0}
                  />
                </div>

                {/* Details */}
                <div
                  className={`space-y-6 ${isEven ? "md:order-2" : "md:order-1"}`}
                >
                  <div className="flex items-center gap-3">
                    <h3
                      id={titleId}
                      className="text-3xl font-bold text-primary"
                    >
                      {project.title}
                    </h3>
                    <StatusBadge status={project.status} />
                  </div>

                  <p className="text-lg text-muted-foreground">
                    {project.description}
                  </p>
                  <p
                    id={descId}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {project.longDescription}
                  </p>

                  {/* Tech stacks */}
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2">
                      Tech stacks:
                    </h4>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
