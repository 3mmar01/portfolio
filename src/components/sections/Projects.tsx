import type { GitHubRepo } from '../../types/github';
import { RepoCard } from '../ui/RepoCard';
import { RepoCardSkeleton } from '../ui/Skeleton';

interface ProjectsProps {
  repos: GitHubRepo[];
  loading: boolean;
}

const SKELETON_COUNT = 6;

export function Projects({ repos, loading }: ProjectsProps) {
  return (
    <section id="projects">
      <div className="section-divider" />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Projects</h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Pulled live from{' '}
            <a
              href="https://github.com/3mmar01"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              github.com/3mmar01
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <RepoCardSkeleton key={i} />
              ))
            : repos.length > 0
              ? repos.map((repo) => <RepoCard key={repo.id} repo={repo} />)
              : (
                <p className="text-gray-400 dark:text-gray-500 text-sm col-span-full text-center py-10">
                  No public repositories found.
                </p>
              )}
        </div>
      </div>
    </section>
  );
}
