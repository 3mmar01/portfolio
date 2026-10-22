// Language color map for the dot indicator
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
};

import type { GitHubRepo } from '../../types/github';

interface RepoCardProps {
  repo: GitHubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  const langColor = repo.language ? (LANGUAGE_COLORS[repo.language] ?? '#a3a3a3') : null;

  const updatedAt = new Date(repo.updated_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-gray-200 dark:border-gray-800 rounded-lg p-5 bg-white dark:bg-gray-900 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-gray-300 dark:hover:border-gray-700"
      aria-label={`View ${repo.name} on GitHub`}
    >
      {/* Header: name + external link icon */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-snug break-all">
          {repo.name}
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 text-gray-400 dark:text-gray-600 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors mt-0.5"
          aria-hidden="true"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </div>

      {/* Description */}
      <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
        {repo.description ?? 'No description provided.'}
      </p>

      {/* Footer: language + stars + forks + date */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400 dark:text-gray-500">
        {langColor && repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: langColor }}
              aria-hidden="true"
            />
            <span>{repo.language}</span>
          </span>
        )}

        <span className="flex items-center gap-1" title="Stars">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          {repo.stargazers_count}
        </span>

        <span className="flex items-center gap-1" title="Forks">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="18" r="3" />
            <circle cx="6" cy="6" r="3" />
            <circle cx="18" cy="6" r="3" />
            <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
            <line x1="12" y1="12" x2="12" y2="15" />
          </svg>
          {repo.forks_count}
        </span>

        <span className="ml-auto">{updatedAt}</span>
      </div>
    </a>
  );
}
