import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-20 w-full px-6 py-4 flex items-center justify-around bg-transparent text-primary">
      <nav className="space-x-4 text-primary">
        <a href="#about" className="hover:underline">About</a>
        <a href="#skills" className="hover:underline">Skills</a>
        <a href="#projects" className="hover:underline">Projects</a>
        <a href="#contact" className="hover:underline">Contact</a>
      </nav>
      <Button variant="secondary" className="text-primary">Resume</Button>
    </header>
  )
}
