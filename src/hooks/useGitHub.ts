import { useEffect, useState } from 'react';
import { fetchUser, fetchRepos } from '../lib/github';
import type { GitHubUser, GitHubRepo, UseGitHubReturn } from '../types/github';


export function useGitHub(username: string): UseGitHubReturn {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [userData, reposData] = await Promise.all([
          fetchUser(username),
          fetchRepos(username),
        ]);
        if (!cancelled) {
          setUser(userData);
          setRepos(reposData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { user, repos, loading, error };
}
