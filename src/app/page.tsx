import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import { Timeline } from "@/components/timeline";

export default function Home() {
  return (
    <div>
      <Header/>
      <Hero/>
      <About/>
      <Timeline/>
      <Skills />
      <Projects />
      <Contact/>
      <Footer/>
    </div>
  );
}
