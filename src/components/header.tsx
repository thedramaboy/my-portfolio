export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-20 w-full px-6 py-4 flex items-center justify-between bg-transparent text-primary">
      <h1 className="text-xl font-bold">My Portfolio</h1>
      <nav className="space-x-4 text-primary">
        <a href="#about" className="hover:underline">About</a>
        <a href="#projects" className="hover:underline">Projects</a>
        <a href="#contact" className="hover:underline">Contact</a>
      </nav>
    </header>
  )
}
