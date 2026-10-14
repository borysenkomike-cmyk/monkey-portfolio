import { useRef, useState } from 'react';
import { ArrowDownRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { A11y, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';

import { developers } from '../data/developers';

export function HeroCarousel() {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDeveloper = developers[activeIndex];

  return (
    <section className="hero" id="crew" aria-labelledby="crew-title">
      <div className="hero__eyebrow">
        <span>01 / Meet the crew</span>
        <span>Est. in the canopy</span>
      </div>

      <h1 className="hero__title" id="crew-title">
        <span className="hero__title-kicker" aria-hidden="true">Meet</span>
        {activeDeveloper.name}
      </h1>

      <Swiper
        className="crew-swiper"
        modules={[A11y, Keyboard]}
        keyboard={{ enabled: true }}
        speed={650}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {developers.map((developer) => (
          <SwiperSlide key={developer.id}>
            <article className="hero-slide" style={{ '--accent': developer.accent } as React.CSSProperties}>
              <div className="hero-slide__copy">
                <span className="hero-slide__role">{developer.role}</span>
                <p className="hero-slide__statement">{developer.tagline}</p>

                <div className="hero-slide__actions">
                  <a
                    className="button button--primary"
                    href="#contact"
                    aria-label={`Book a call with ${developer.name}`}
                  >
                    Book a call
                    <ArrowDownRight aria-hidden="true" />
                  </a>
                  <a className="button button--text" href="#projects">
                    View projects
                  </a>
                </div>
              </div>

              <div className="hero-slide__visual">
                <span className="hero-slide__number" aria-hidden="true">
                  {developer.index}
                </span>
                <img src={developer.heroImage} alt={`${developer.name}, ${developer.role}`} />
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hero__controls">
        <button
          className="icon-button"
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous developer"
        >
          <ArrowLeft aria-hidden="true" />
        </button>
        <span className="hero__counter" aria-live="polite">
          {activeDeveloper.index}
          <span>/ {developers.length}</span>
        </span>
        <button
          className="icon-button"
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next developer"
        >
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
