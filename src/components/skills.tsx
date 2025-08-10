"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import clsx from "clsx"

const FULL_STACK = ["Next.js", "Node.js", "Express", "TypeScript", "PostgreSQL"]
const DESIGN_STACK = ["Tailwind", "Framer Motion", "Shadcn", "CSS Modules", "Figma"]
const LEARNING_STACK = ["tRPC", "Prisma", "Zod", "GraphQL", "Docker"]

const TABS = [
  { label: "FULL STACK", data: FULL_STACK },
  { label: "DESIGN STACK", data: DESIGN_STACK },
  { label: "LEARNING STACK", data: LEARNING_STACK },
]

const GRID_SIZE = 25

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0)
  const [gridItems, setGridItems] = useState<string[]>([])

  useEffect(() => {
    setGridItems(fillGrid(FULL_STACK))
  }, [])

  function handleTab(index: number) {
    setActiveTab(index)
    setGridItems(fillGrid(TABS[index].data))
  }

  return (
    <section
      id="skills"
      className="bg-background text-foreground px-6 py-20"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-4xl font-bold text-primary tracking-wide">
            Skills
          </h2>
          <p className="text-muted-foreground max-w-md">
            The tools and technologies I use to build efficient and user-friendly websites.
          </p>
          <div className="flex flex-wrap gap-2 relative">
            {TABS.map((tab, index) => (
              <motion.button
                key={tab.label}
                onClick={() => handleTab(index)}
                className={clsx(
                  "px-4 py-1 rounded-full border text-sm font-medium transition relative z-10",
                  activeTab === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
                )}
                whileHover={{ scale: 1.05 }}
                initial="initial"
                animate="initial"
                whileTap="hover"
              >
                {tab.label}
                {activeTab === index && (
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: "radial-gradient(circle, rgba(100,100,100,0.2) 0%, rgba(50,50,50,0.1) 40%, rgba(0,0,0,0) 100%)",
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.5 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="mx-auto max-w-[400px] grid grid-cols-5 gap-2">
          {gridItems.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: item ? 1.05 : 1 }}
              className={clsx(
                "w-16 h-16 flex items-center justify-center text-sm font-medium rounded-md",
                "border border-border bg-white/5 backdrop-blur-md transition-all",
                item ? "text-primary" : "text-transparent"
              )}
            >
              {item || "."}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function fillGrid(data: string[]): string[] {
  const filled = Array(GRID_SIZE).fill("")
  const indexes = getRandomIndexes(GRID_SIZE, data.length)
  indexes.forEach((idx, i) => {
    filled[idx] = data[i]
  })
  return filled
}

function getRandomIndexes(total: number, count: number): number[] {
  const indexes: number[] = []
  while (indexes.length < count) {
    const rand = Math.floor(Math.random() * total)
    if (!indexes.includes(rand)) indexes.push(rand)
  }
  return indexes
}