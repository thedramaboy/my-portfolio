"use client";

import Link from "next/link";

export default function AboutMe() {
  return (
    <section id="about" className="bg-base-100 text-base-content py-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column: text */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-4xl font-bold text-primary tracking-wide">About me</h2>
          <p className="text-muted-foreground">
            I am a junior full-stack developer with internship experience in production web
            applications and booking systems. I enjoy debugging, simplifying complex flows, and
            collaborating in agile teams.
          </p>
          <p className="text-muted-foreground">
            Comfortable with Next.js/React, Supabase, ASP.NET Core MVC, and Flutter/Firebase.
            I care about maintainable code, accessible UI, and concise documentation.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="#timeline" className="btn btn-primary">View timeline</Link>
            <Link href="#projects" className="btn btn-outline">See projects</Link>
          </div>
        </div>

        {/* Right column: looping video */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-base-300 w-full max-w-[500px] aspect-square md:justify-self-end">
          <video
            className="w-full h-full object-cover"
            src="/videos/clip1.mov"
            // poster="/videos/profile-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
      </div>
    </section>
  );
}