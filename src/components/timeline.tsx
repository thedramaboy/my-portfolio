"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

export interface TimelineEntry {
  id: number
  title: string
  description: string
  layout: "left" | "right"
}

interface TimelineProps {
  entries?: TimelineEntry[]
  className?: string
  containerClassName?: string
}

const timelineEntries: TimelineEntry[] = [
  {
    id: 1,
    title: "Software Developer Intern · GoApricot (2025 – Present)",
    description:
      "Contributed to a company website (Next.js/React), an online booking system (Supabase, shadcn/ui), and production bug fixes for FlashYourMeme (ASP.NET Core MVC). Worked in Agile sprints with senior developers.",
    layout: "left",
  },
  {
    id: 2,
    title: "Diploma in Software Development · SAIT (2023 – 2025)",
    description:
      "Graduated with honours. Focused on full-stack development, cloud services, and collaborative project delivery using modern frameworks and tooling.",
    layout: "right",
  },
  {
    id: 3,
    title: "Inspection Engineer · GCME (2020 – 2021)",
    description:
      "Built automated dashboards and analysed reliability data for high-risk equipment, improving decision-making and reducing reporting time.",
    layout: "left",
  },
  {
    id: 4,
    title: "B.Eng. (Mechanical) · KMITL (2016 – 2019)",
    description:
      "Developed a strong foundation in engineering analysis and problem-solving before transitioning into software development.",
    layout: "right",
  },
]

export function Timeline({
  entries = timelineEntries,
  className,
  containerClassName,
}: TimelineProps) {
  return (
    <section id="timeline" className={cn("bg-base-200 py-16", className)}>
      <div className={cn("relative max-w-6xl mx-auto px-6", containerClassName)}>
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-neutral-400/70 -translate-x-1/2 hidden md:block" />

        {entries.map((entry, i) => (
          <TimelineItem key={entry.id ?? i} entry={entry} index={i} />
        ))}
      </div>
    </section>
  )
}

function TimelineItem({ entry, index }: { entry: TimelineEntry; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start center", "end center"],
  })

  const opacity = useEase(scrollYProgress, [0, 0.25, 0.75, 1], [0.35, 1, 1, 0.35])
  const scale = useEase(scrollYProgress, [0, 0.25, 0.75, 1], [0.95, 1, 1, 0.95])
  const isLeft = entry.layout === "left"

  return (
    <motion.div
      ref={itemRef}
      style={{ opacity, scale }}
      className="relative mb-14 md:mb-20"
    >
      {/* Dot ตรงเส้นกลาง */}
      <div className="absolute left-1/2 top-4 w-3 h-3 bg-primary rounded-full -translate-x-1/2 z-10 hidden md:block" />

      <div
        className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12")}
      >
        {/* Content */}
        <div
          className={cn("space-y-2", {
            "md:col-start-1 md:justify-self-end md:text-right": isLeft,
            "md:col-start-2 md:justify-self-start md:text-left": !isLeft,
          })}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-2 max-w-md"
          >
            <h3 className="text-xl md:text-2xl font-bold text-primary">
              {entry.title}
            </h3>
            <p className="text-sm md:text-base text-base-content/80 leading-relaxed">
              {entry.description}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

function useEase(progress: MotionValue<number>, input: number[], output: number[]) {
  return useTransform(progress, input, output)
}