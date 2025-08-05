import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <div>
      <Header/>
      <Hero/>
      <About />
      <Skills />
      <Projects />
      <Contact/>
      <Footer/>
    </div>
  );
}
