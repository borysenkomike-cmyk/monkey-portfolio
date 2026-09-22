import { useRef, useState } from 'react';

import { ContactForm } from './components/ContactForm';
import { DeveloperProfile } from './components/DeveloperProfile';
import { HeroCarousel } from './components/HeroCarousel';
import { SiteHeader } from './components/SiteHeader';
import type { DeveloperId } from './data/developers';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const [activeId, setActiveId] = useState<DeveloperId>('mizaru');
  const [contactDeveloper, setContactDeveloper] = useState<DeveloperId>('mizaru');
  const contactRef = useRef<HTMLElement>(null);

  const navigateTo = (element: HTMLElement | null, focusTarget: HTMLElement | null = element) => {
    element?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    focusTarget?.focus({ preventScroll: true });
  };

  const handleActiveChange = (id: DeveloperId) => {
    setActiveId(id);
    setContactDeveloper(id);
  };

  const handleBookCall = () => {
    setContactDeveloper(activeId);
    const nameField = contactRef.current?.querySelector<HTMLElement>('#contact-name') ?? null;
    navigateTo(contactRef.current, nameField);
  };

  const handleViewProjects = () => {
    const project = document.getElementById('projects');
    navigateTo(project);
  };

  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <HeroCarousel
          activeId={activeId}
          onActiveChange={handleActiveChange}
          onBookCall={handleBookCall}
          onViewProjects={handleViewProjects}
        />

        <DeveloperProfile activeId={activeId} onActiveChange={handleActiveChange} />

        <ContactForm
          ref={contactRef}
          selectedDeveloper={contactDeveloper}
          onDeveloperChange={setContactDeveloper}
        />
      </main>
    </div>
  );
}
