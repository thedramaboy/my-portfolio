"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-6xl mx-auto px-6 w-full text-left flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-6xl font-semibold text-primary tracking-wider sm:text-7xl lg:text-8xl">
              Nate Se.
            </h1>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 overflow-hidden">
              <Image
                src="/images/avatar.png"
                alt="Nate Se. Avatar"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <p className="text-lg text-primary">
            👋 Hi! I&apos;m Nate, a recent graduate from SAIT in Software
            Development.
            <br />
            I&apos;m still in the early stages of my career path with a long way
            to go and so much to learn.
            <br />
            <br />
            Now I&apos;m currently working as a software developer intern at{" "}
            <a
              href="https://goapricot.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium"
            >
              GoApricot
            </a>
          </p>

          <div className="space-x-4 py-6">
            <Link href="https://github.com/thedramaboy" target="_blank">
              <Button
                variant="outline"
                size="icon"
                className="border border-black"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/ntwsc/" target="_blank">
              <Button
                variant="outline"
                size="icon"
                className="border border-black"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
