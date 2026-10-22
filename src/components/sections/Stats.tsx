import type { GitHubUser, GitHubRepo } from '../../types/github';
import { StatCard } from '../ui/StatCard';
import { StatCardSkeleton } from '../ui/Skeleton';

interface StatsProps {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  loading: boolean;
}

const GITHUB_USERNAME = '3mmar01';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
}

function computeTopLanguages(repos: GitHubRepo[]): { lang: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] ?? 0) + 1;
    }
  }
  return Object.entries(counts)
    .map(([lang, count]) => ({ lang, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

export function Stats({ user, repos, loading }: StatsProps) {
  const topLangs = computeTopLanguages(repos);
  const total = topLangs.reduce((sum, l) => sum + l.count, 0) || 1;

  return (
    <section id="stats">
      <div className="section-divider" />

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Section header */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">GitHub Stats</h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Activity overview from GitHub</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {loading || !user ? (
            Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
          ) : (
            <>
              <StatCard value={user.public_repos} label="Repos" />
              <StatCard value={user.followers} label="Followers" />
              <StatCard value={user.following} label="Following" />
              <StatCard value={formatDate(user.created_at)} label="Member Since" />
            </>
          )}
        </div>

        {/* Top Languages */}
        {!loading && topLangs.length > 0 && (
          <div className="mb-12">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-widest">
              Top Languages
            </h3>
            <div className="space-y-3">
              {topLangs.map(({ lang, count }) => (
                <div key={lang} className="flex items-center gap-3 text-sm">
                  <span className="w-24 text-gray-600 dark:text-gray-400 font-medium shrink-0">{lang}</span>
                  <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-800 dark:bg-gray-300 rounded-full transition-all duration-700"
                      style={{ width: `${(count / total) * 100}%` }}
                      role="progressbar"
                      aria-valuenow={(count / total) * 100}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${lang}: ${Math.round((count / total) * 100)}%`}
                    />
                  </div>
                  <span className="text-gray-400 dark:text-gray-500 text-xs w-8 text-right">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GitHub Readme Stats image embed */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-widest">
            Contribution Graph
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            {/* Single stats image — invert in dark mode to avoid dual-request data skew */}
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&hide_border=true&title_color=171717&icon_color=525252&text_color=404040&bg_color=ffffff`}
              alt="GitHub contribution stats"
              className="border border-gray-200 dark:border-gray-800 rounded-lg max-w-full sm:max-w-sm dark:hidden"
              loading="lazy"
            />
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&hide_border=true&title_color=171717&icon_color=525252&text_color=404040&bg_color=ffffff`}
              alt="GitHub contribution stats (dark)"
              className="border border-gray-800 rounded-lg max-w-full sm:max-w-sm hidden dark:block dark:invert"
              loading="lazy"
            />
            {/* Single top-langs image — same URL for both modes, invert in dark */}
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&hide_border=true&title_color=171717&text_color=404040&bg_color=ffffff`}
              alt="Top programming languages"
              className="border border-gray-200 dark:border-gray-800 rounded-lg max-w-full sm:max-w-xs dark:hidden"
              loading="lazy"
            />
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&hide_border=true&title_color=171717&text_color=404040&bg_color=ffffff`}
              alt="Top programming languages (dark)"
              className="border border-gray-800 rounded-lg max-w-full sm:max-w-xs hidden dark:block dark:invert"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
