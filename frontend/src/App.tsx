import { useRef, useState } from 'react';

import { DeveloperProfile } from './components/DeveloperProfile';
import { HeroCarousel } from './components/HeroCarousel';
import { SiteHeader } from './components/SiteHeader';
import { developers, type DeveloperId } from './data/developers';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const [activeId, setActiveId] = useState<DeveloperId>('mizaru');
  const [contactDeveloper, setContactDeveloper] = useState<DeveloperId>('mizaru');
  const contactRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);

  const scrollTo = (element: HTMLElement | null) => {
    element?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  const handleBookCall = () => {
    setContactDeveloper(activeId);
    scrollTo(contactRef.current);
  };

  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <HeroCarousel
          activeId={activeId}
          onActiveChange={setActiveId}
          onBookCall={handleBookCall}
          onViewProjects={() => scrollTo(projectsRef.current)}
        />

        <div ref={projectsRef as React.RefObject<HTMLDivElement>}>
          <DeveloperProfile activeId={activeId} onActiveChange={setActiveId} />
        </div>

        <section className="contact-section" id="contact" ref={contactRef}>
          <label htmlFor="contact-developer">Developer</label>
          <select
            id="contact-developer"
            value={contactDeveloper}
            onChange={(event) => setContactDeveloper(event.target.value as DeveloperId)}
          >
            {developers.map((developer) => (
              <option key={developer.id} value={developer.id}>
                {developer.name}
              </option>
            ))}
          </select>
        </section>
      </main>
    </div>
  );
}
