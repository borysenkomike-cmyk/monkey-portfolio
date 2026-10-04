interface GithubRepoResponse {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  subscribers_count: number;
  open_issues_count: number;
  language: string | null;
  pushed_at: string;
}

export interface ProjectDto {
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  language: string | null;
  lastPush: string;
}

function toProjectDto(data: GithubRepoResponse): ProjectDto {
  return {
    name: data.name,
    fullName: data.full_name,
    description: data.description,
    url: data.html_url,
    stars: data.stargazers_count,
    forks: data.forks_count,
    watchers: data.subscribers_count,
    openIssues: data.open_issues_count,
    language: data.language,
    lastPush: data.pushed_at,
  };
}

export class GithubError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const GITHUB_API = 'https://api.github.com';

const CACHE_TTL_MS = 10 * 60 * 1000;

const cache = new Map<string, { project: ProjectDto; expiresAt: number }>();

export async function getRepo(owner: string, repo: string): Promise<ProjectDto> {
  const key = `${owner}/${repo}`.toLowerCase();
  const cached = cache.get(key); 
  if (cached && cached.expiresAt > Date.now()) {
    return cached.project;
  }

  const response = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'monkey-portfolio',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (!response.ok) {
    throw new GithubError(response.status, `GitHub responded with ${response.status} for ${owner}/${repo}`);
  }

  const data = (await response.json()) as GithubRepoResponse;
  const project = toProjectDto(data);  

  cache.set(key, { project, expiresAt: Date.now() + CACHE_TTL_MS });
  return project;
}