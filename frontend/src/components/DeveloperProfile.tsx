import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { developers, getDeveloperById, type DeveloperId } from '../data/developers';

export function DeveloperProfile() {
  const [activeId, setActiveId] = useState<DeveloperId>('mizaru');
  const developer = getDeveloperById(activeId);

  return (
    <section className="profile-section" id="mind" aria-label="Developer profile">
      <div className="section-heading">
        <span className="section-heading__index">02 / Inside</span>
        <h2>Inside the monkey mind.</h2>
      </div>

      <div className="profile-selector" aria-label="Choose a developer">
        {developers.map((item) => (
          <button
            key={item.id}
            type="button"
            className="profile-selector__button"
            aria-label={`Select ${item.name}`}
            aria-pressed={item.id === activeId}
            onClick={() => setActiveId(item.id)}
          >
            <span>{item.index}</span>
            {item.name}
          </button>
        ))}
      </div>

      <div className="profile">
        <div className="profile__visual" style={{ '--accent': developer.accent } as React.CSSProperties}>
          <img src={developer.profileImage} alt={`${developer.name} outside the code cave`} />
          <span>{developer.role}</span>
        </div>

        <div className="profile__content">
          <p className="profile__lead">{developer.tagline}</p>
          <p>{developer.bio}</p>

          <dl className="profile__facts">
            <div>
              <dt>Off the clock</dt>
              <dd>{developer.hobby}</dd>
            </div>
            <div>
              <dt>Work mode</dt>
              <dd>{developer.approach}</dd>
            </div>
          </dl>

          <ul className="tech-list" aria-label={`${developer.name}'s technologies`}>
            {developer.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
      </div>

      <article className="project-strip" id="projects" aria-labelledby="project-title">
        <div>
          <span>Selected project</span>
          <h3 id="project-title">{developer.project.name}</h3>
        </div>
        <p>{developer.project.description}</p>
        <strong>{developer.project.result}</strong>
        <ArrowUpRight aria-hidden="true" />
      </article>
    </section>
  );
}
