import { ContactForm } from './components/ContactForm';
import { DeveloperProfile } from './components/DeveloperProfile';
import { HeroCarousel } from './components/HeroCarousel';
import { SiteHeader } from './components/SiteHeader';

export default function App() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <HeroCarousel />
        <DeveloperProfile />
        <ContactForm />
      </main>
    </div>
  );
}
