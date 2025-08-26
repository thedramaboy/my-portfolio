"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface TimelineEntry {
  id: number;
  image: string;
  alt: string;
  title: string;
  description: string;
  layout: "left" | "right";
}

interface TimelineProps {
  entries?: TimelineEntry[];
  className?: string;
  containerClassName?: string;
}

const timelineEntries = [
  {
    id: 1,
    image:
      "/projects/farm/farm1.jpg",
    alt: "Woman runner in artistic motion blur",
    title: "Every Step Counts",
    description:
      "From your first jog around the block to your hundredth marathon, every runner has a story. At Wadada, we celebrate beginners who are just lacing up their shoes for the first time. Your pace doesn't matter—your passion does. What are you waiting for?",
    layout: "left" as const,
  },
  {
    id: 2,
    image:
      "/projects/farm/farm1.jpg",
    alt: "Male runner with determination and focus",
    title: "Find Your Rhythm",
    description:
      "Whether you're chasing personal records or simply chasing the sunrise, our community embraces every type of runner. From speed demons to mindful joggers, from trail blazers to track stars—there's a place for you here. The only question is: what are you waiting for?",
    layout: "right" as const,
  },
  {
    id: 3,
    image:
      "/projects/farm/farm1.jpg",
    alt: "Runner in dynamic motion showing strength and grace",
    title: "Join the Movement",
    description:
      "Running isn't just about the miles—it's about the moments. The early morning conversations, the shared struggles, the collective victories. At Wadada Run Club, you're not just joining a group, you're joining a family. So lace up, step out, and discover what you're truly capable of. Seriously, what are you waiting for?",
    layout: "left" as const,
  },
];


export function Timeline({
  entries = timelineEntries,
  className,
  containerClassName,
}: TimelineProps) {
  return (
    <section id="timeline" className={cn("bg-base-200 py-20", className)}>
      <div className={cn("relative max-w-6xl mx-auto px-6", containerClassName)}>

        {/* Central vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-base-300 -translate-x-1/2 hidden md:block" />

        {Array.isArray(entries) && entries.length > 0 ? (
          entries.map((entry, i) => (
            <TimelineItem key={entry.id ?? i} entry={entry} index={i} />
          ))
        ) : (
          <div className="text-center text-sm text-base-content/60">
            No timeline entries yet.
          </div>
        )}
      </div>
    </section>
  );
}

function TimelineItem({ entry, index }: { entry: TimelineEntry; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start center", "end center"],
  });

  const opacity = useEase(scrollYProgress, [0, 0.25, 0.75, 1], [0.35, 1, 1, 0.35]);
  const scale = useEase(scrollYProgress, [0, 0.25, 0.75, 1], [0.9, 1, 1, 0.9]);
  const isLeft = entry.layout === "left";

  return (
    <motion.div ref={itemRef} style={{ opacity, scale }} className="relative mb-20 md:mb-32">
      <div className="absolute left-1/2 top-1/2 size-4 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block" />

      <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center", { "md:text-right": isLeft })}>
        {/* Image */}
        <div className={cn("relative", { "md:order-2": isLeft })}>
          <div className="sticky top-20">
            <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-base-300">
              <Image
                src={entry.image || "/placeholder.svg"}
                alt={entry.alt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={cn("relative", { "md:order-1": isLeft })}>
          <div className="sticky top-28">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              className="space-y-4"
            >
              <p className="font-mono text-xs tracking-wider text-base-content/60">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </p>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-wide text-primary">
                {entry.title}
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-base-content/80 max-w-prose">
                {entry.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function useEase(progress: MotionValue<number>, input: number[], output: number[]) {
  return useTransform(progress, input, output);
}