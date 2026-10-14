import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

import { developers, getDeveloperById, type DeveloperId } from '../data/developers';

import { fetchProject, type ProjectDto } from '../api/projects';

export function DeveloperProfile() {
  const [activeId, setActiveId] = useState<DeveloperId>('mizaru');
  const developer = getDeveloperById(activeId);

  const [project, setProject] = useState<ProjectDto | null>(null);
  const [hasError, setHasError] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  function toggleDetails() {
    setIsExpanded(!isExpanded);
  }

  useEffect(() => {
    let ignore = false;

    async function load() {
      setProject(null);
      setHasError(false);

      try {
        const data = await fetchProject(developer.repo);
        if (!ignore) setProject(data);
      } catch {
        if (!ignore) setHasError(true);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [developer.repo]);

  let description = 'Loading…';
  if (hasError) {
    description = 'Could not load project details.';
  } else if (project) {
    description = project.description ?? 'No description provided.';
  }

    let stats: { label: string; value: string }[] = [];
  if (project) {
    stats = [
      { label: 'Stars', value: project.stars.toLocaleString('en-US') },
      { label: 'Forks', value: project.forks.toLocaleString('en-US') },
      { label: 'Watchers', value: project.watchers.toLocaleString('en-US') },
      { label: 'Open issues', value: project.openIssues.toLocaleString('en-US') },
      {
        label: 'Last push',
        value: new Date(project.lastPush).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      },
    ];
  }

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

      <div className="project-card">
      
      <article className="project-strip"
        id="projects"
        aria-labelledby="project-title"
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onClick={toggleDetails}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleDetails();
          }
        }}>
        <div>
          <span>Selected project</span>
          <h3 id="project-title">{project?.name ?? developer.repo}</h3>
        </div>
        <p>{description}</p>
        <strong>{project?.language}</strong>
        <ArrowUpRight aria-hidden="true" />
      </article>

       {isExpanded && project && (
        <div className="project-details">
         <dl className="project-stats">
            {stats.map((stat) => (
             <div key={stat.label}>
               <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
             ))}
          </dl>

        <a
          className="project-details__link"
            href={project.url}
            target="_blank"
             rel="noreferrer"
          >
            View on GitHub
        </a>
          </div>
        )}
    </div>
    </section>
  );
}
