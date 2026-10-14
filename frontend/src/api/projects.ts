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

export async function fetchProject(repo: string): Promise<ProjectDto> {
  const response = await fetch(`https://monkey-portfolio.onrender.com/api/projects/${repo}`);

  if (!response.ok) {
    throw new Error(`Failed to load ${repo}: ${response.status}`);
  }

  return (await response.json()) as ProjectDto;
}