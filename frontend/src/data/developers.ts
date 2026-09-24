export type DeveloperId = 'mizaru' | 'kikazaru' | 'iwazaru';

export interface Developer {
  id: DeveloperId;
  index: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  hobby: string;
  approach: string;
  technologies: string[];
  project: {
    name: string;
    description: string;
    result: string;
  };
  heroImage: string;
  profileImage: string;
  accent: string;
}

export const developers: Developer[] = [
  {
    id: 'mizaru',
    index: '01',
    name: 'Mizaru',
    role: 'Frontend Developer',
    tagline: 'Sees no limits, only better interfaces.',
    bio: 'Mizaru turns ambitious ideas into tactile digital experiences. Every screen is shaped around clarity, personality, and the small interactions people remember.',
    hobby: 'Collecting vintage arcade interfaces and sketching type after dark.',
    approach: 'Prototype early, test with real people, then refine every state until the experience feels effortless.',
    technologies: ['React', 'TypeScript', 'Next.js', 'Motion', 'Accessibility'],
    project: {
      name: 'Canopy',
      description: 'A calm planning workspace for creative teams with a fast, expressive interface.',
      result: '42% faster weekly planning',
    },
    heroImage: '/images/mizaru-hero.png',
    profileImage: '/images/mizaru-profile.png',
    accent: '#e7ff43',
  },
  {
    id: 'kikazaru',
    index: '02',
    name: 'Kikazaru',
    role: 'Backend Developer',
    tagline: 'Calm systems, even under pressure.',
    bio: 'Kikazaru designs dependable foundations for products that need to grow. He likes clear contracts, observable systems, and APIs that are pleasant to use.',
    hobby: 'Restoring mechanical keyboards and brewing unreasonably precise coffee.',
    approach: 'Start with the domain, make failure visible, and keep the architecture as simple as the real constraints allow.',
    technologies: ['Node.js', 'PostgreSQL', 'NestJS', 'Redis', 'AWS'],
    project: {
      name: 'Hushline',
      description: 'A resilient event platform that keeps customer operations moving during peak traffic.',
      result: '99.99% successful event delivery',
    },
    heroImage: '/images/kikazaru-hero.png',
    profileImage: '/images/kikazaru-profile.png',
    accent: '#ff775f',
  },
  {
    id: 'iwazaru',
    index: '03',
    name: 'Iwazaru',
    role: 'Full-stack Developer',
    tagline: 'Says less. Ships the whole product.',
    bio: 'Iwazaru connects product thinking, interface craft, and solid engineering. He is happiest taking a useful idea from its first flow to a confident release.',
    hobby: 'Building tiny synths and finding the best noodles in every city.',
    approach: 'Reduce uncertainty in small steps, keep feedback loops short, and treat quality as part of the product rather than a final pass.',
    technologies: ['React', 'Node.js', 'TypeScript', 'Playwright', 'Docker'],
    project: {
      name: 'Unsaid',
      description: 'A privacy-first feedback product for distributed teams who need honest signals.',
      result: '3.4x more useful feedback',
    },
    heroImage: '/images/iwazaru-hero.png',
    profileImage: '/images/iwazaru-profile.png',
    accent: '#ffcc33',
  },
];

export const getDeveloperById = (id: DeveloperId): Developer =>
  developers.find((developer) => developer.id === id) ?? developers[0];
