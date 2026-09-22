import { useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { A11y, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';

import { developers, type DeveloperId } from '../data/developers';

interface HeroCarouselProps {
  activeId: DeveloperId;
  onActiveChange: (id: DeveloperId) => void;
  onBookCall: () => void;
  onViewProjects: () => void;
}

export function HeroCarousel({
  activeId,
  onActiveChange,
  onBookCall,
  onViewProjects,
}: HeroCarouselProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const activeIndex = developers.findIndex(({ id }) => id === activeId);
  const activeDeveloper = developers[activeIndex];

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.realIndex !== activeIndex) {
      swiperRef.current.slideTo(activeIndex);
    }
  }, [activeIndex]);

  return (
    <section className="hero" id="crew" aria-labelledby="crew-title">
      <div className="hero__eyebrow">
        <span>Digital product studio</span>
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
        slidesPerView={1}
        speed={650}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          const next = developers[swiper.realIndex];
          if (next && next.id !== activeId) onActiveChange(next.id);
        }}
      >
        {developers.map((developer) => (
          <SwiperSlide key={developer.id}>
            <article className="hero-slide" style={{ '--accent': developer.accent } as React.CSSProperties}>
              <div className="hero-slide__copy">
                <span className="hero-slide__role">{developer.role}</span>
                <p className="hero-slide__statement" aria-label={developer.tagline}>
                  {developer.tagline.split(' ').map((word) => (
                    <span key={`${developer.id}-${word}`}>{word} </span>
                  ))}
                </p>

                <div className="hero-slide__actions">
                  <button
                    className="button button--primary"
                    type="button"
                    onClick={onBookCall}
                    aria-label={`Book a call with ${developer.name}`}
                  >
                    Book a call
                    <ArrowDownRight aria-hidden="true" />
                  </button>
                  <button className="button button--text" type="button" onClick={onViewProjects}>
                    View projects
                  </button>
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
          {activeDeveloper.index} <span>/ 03</span>
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
