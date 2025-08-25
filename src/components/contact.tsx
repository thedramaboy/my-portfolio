"use client"

import { Button } from "./ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const subject = encodeURIComponent(`Message from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    const mailtoLink = `mailto:ntwwork.ca@gmail.com?subject=${subject}&body=${body}`
    
    window.location.href = mailtoLink
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="px-6 py-20 bg-background text-foreground">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 text-primary">I would love to hear anything from you</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Now seeking a junior software developer or an internship opportunity for 2026!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Thank you for visiting :-&#41;</h3>
              <p className="text-muted-foreground mb-6">
                Feel free to reach me out through any of these channels:
              </p>
              
              <div className="space-y-4">
                <Link 
                  href="mailto:natthawat.se@example.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>ntwwork.ca@gmail.com</span>
                </Link>
                
                <Link 
                  href="https://github.com/thedramaboy"
                  target="_blank"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span>GitHub</span>
                </Link>
                
                <Link 
                  href="https://www.linkedin.com/in/ntwsc/"
                  target="_blank"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your awesome name here"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-input bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your wonderful email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-input bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  placeholder="Your lovely message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-input bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  variant="default" 
                  size="lg"
                  className="min-w-[140px]"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}