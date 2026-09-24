import { useState } from 'react';

import { ContactForm } from './components/ContactForm';
import { DeveloperProfile } from './components/DeveloperProfile';
import { HeroCarousel } from './components/HeroCarousel';
import { SiteHeader } from './components/SiteHeader';
import type { DeveloperId } from './data/developers';

export default function App() {
  const [activeId, setActiveId] = useState<DeveloperId>('mizaru');
  const [contactDeveloper, setContactDeveloper] = useState<DeveloperId>('mizaru');

  const handleActiveChange = (id: DeveloperId) => {
    setActiveId(id);
    setContactDeveloper(id);
  };

  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <HeroCarousel activeId={activeId} onActiveChange={handleActiveChange} />

        <DeveloperProfile activeId={activeId} onActiveChange={handleActiveChange} />

        <ContactForm
          selectedDeveloper={contactDeveloper}
          onDeveloperChange={setContactDeveloper}
        />
      </main>
    </div>
  );
}
