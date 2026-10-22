import type { GitHubUser, GitHubRepo } from '../types/github';

const BASE_URL = 'https://api.github.com';

export async function fetchUser(username: string): Promise<GitHubUser> {
  const res = await fetch(`${BASE_URL}/users/${username}`, {
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch GitHub user: ${res.status}`);
  }
  return res.json() as Promise<GitHubUser>;
}

export async function fetchRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${BASE_URL}/users/${username}/repos?sort=updated&per_page=30`,
    { headers: { Accept: 'application/vnd.github+json' } },
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch GitHub repos: ${res.status}`);
  }
  const repos = (await res.json()) as GitHubRepo[];
  // Exclude forks, keep only original repos
  return repos.filter((r) => !r.fork);
}
