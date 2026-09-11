"use client"

import Link from "next/link"
import Image from 'next/image'

export default function Contact() {

  return (
    <section id="contact" className="px-6 py-10 bg-background text-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4 text-primary">I would love to hear anything from you</h2>
        <p className="text-base text-muted-foreground mb-10">
          Now seeking a junior software developer or an internship opportunity for 2026!
        </p>

        <div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-primary">Thank you for visiting.</h3>
              <p className="text-base text-muted-foreground mb-6">
                Feel free to reach me out through any of these channels:
              </p>
              
              <div className="flex flex-col items-center space-y-4">
                <Link 
                  href="mailto:ntwwork.ca@gmail.com"
                  className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Image
                    src="/images/mail.png"
                    width={16}
                    height={16}
                    className="h-4 w-4"
                    alt="GitHub"
                  />
                  <span>ntwwork.ca@gmail.com</span>
                </Link>
                
                <Link 
                  href="https://github.com/thedramaboy"
                  target="_blank"
                  className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Image
                    src="/images/github.png"
                    width={16}
                    height={16}
                    className="h-4 w-4"
                    alt="GitHub"
                  />
                  <span>GitHub</span>
                </Link>
                
                <Link 
                  href="https://www.linkedin.com/in/ntwsc/"
                  target="_blank"
                  className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Image
                    src="/images/linkedin.png"
                    width={16}
                    height={16}
                    className="h-4 w-4"
                    alt="GitHub"
                  />
                  <span>LinkedIn</span>
                </Link>
              </div>
            </div>
        </div>
      </div>
    </section>
  )
}