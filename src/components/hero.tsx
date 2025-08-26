"use client"

import { Button } from "./ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Linkedin } from "lucide-react"
import { useEffect, useRef } from "react"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const GRAY_SHADES = [
    "rgba(50, 50, 50, 0.5)",
    "rgba(100, 100, 100, 0.5)",
    "rgba(150,150,150,0.3)",
    "rgba(30,30,30,0.7)",
  ]

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.color = GRAY_SHADES[Math.floor(Math.random() * GRAY_SHADES.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full bg-background" />
      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-6xl mx-auto px-6 w-full text-center flex flex-col items-center justify-center">
          <motion.h1
          className="mb-4 text-6xl font-semibold text-primary tracking-wider sm:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          >
            Natthawat Se.
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-primary tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Junior software developer
          </motion.p>

          <motion.p
            className="max-w-xl mt-6 text-muted-foreground text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span role="img" aria-label="waving hand" className="mr-2">👋</span>
            Hi! I&apos;m Paul, a recent graduate from SAIT in Software Development. 
            I&apos;m still in the early stages of my career path<br/>
            with a long way to go and so much to learn.<br/><br/> 
            Now I&apos;m currently working as a software developer intern at <a href="https://goapricot.ca/" className="underline">GoApricot</a>.
          </motion.p>

          <div className="space-x-4 py-6">
            <Link href="https://github.com/thedramaboy" target="_blank">
              <Button variant="outline" size="icon" className="border border-black">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/ntwsc/" target="_blank">
              <Button variant="outline" size="icon" className="border border-black">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}