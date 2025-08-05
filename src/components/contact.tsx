"use client"

import { Button } from "./ui/button"
import { motion } from "framer-motion"

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen px-6 py-20 bg-background text-foreground">
      <div className="max-w-xl mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          className="mb-8 text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Have a question or want to work together? Drop me a message!
        </motion.p>
        <form
          className="space-y-4 text-left"
          action="mailto:your-email@example.com"
          method="POST"
          encType="text/plain"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-md border border-input bg-muted text-foreground"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-md border border-input bg-muted text-foreground"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
            className="w-full p-3 rounded-md border border-input bg-muted text-foreground"
          />
          <Button type="submit" variant="default">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  )
}