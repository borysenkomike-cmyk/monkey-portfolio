export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#crew" aria-label="Monkey Crew home">
        <span>Monkey</span>
        <strong>Crew</strong>
      </a>

      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#mind">About</a>
        <a href="#projects">Work</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
