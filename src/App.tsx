import './index.css';
import { useGitHub } from './hooks/useGitHub';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { Stats } from './components/sections/Stats';

const GITHUB_USERNAME = '3mmar01';

function App() {
  const { user, repos, loading, error } = useGitHub(GITHUB_USERNAME);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <Hero user={user} loading={loading} />
        <Projects repos={repos} loading={loading} />
        <Stats user={user} repos={repos} loading={loading} />
      </main>

      <Footer />

      {/* Error toast */}
      {error && (
        <div
          role="alert"
          className="fixed bottom-4 right-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-4 py-3 rounded-md shadow-lg max-w-xs"
        >
          <strong>GitHub API error:</strong> {error}
        </div>
      )}
    </>
  );
}

export default App;
