"use client";

import Link from "next/link";

export default function AboutMe() {
  return (
    <section id="about" className="bg-base-100 text-base-content py-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div></div>
        {/* Left column: text */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-4xl font-bold text-primary tracking-wide">
            About myself
          </h2>
          <p className="text-muted-foreground">
            I am a software developer with internship experience in web
            applications. I enjoy fixing issues, dividing complex flows into
            pieces, and learning from teamwork in agile environments.
          </p>
          <p className="text-muted-foreground">
            I have worked with Next.js/React, Supabase, ASP.NET Core MVC, and
            Flutter/Firebase, and I am eager to keep learning new tools and
            practices. I do care about writing clean code as much as I can (that
            what I got from Clean code from Robert C. Martin), designing
            friendly interfaces, and creating documentation that supports the
            team.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="#projects" className="btn btn-outline">
              See projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
