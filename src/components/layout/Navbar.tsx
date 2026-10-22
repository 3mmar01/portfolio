import { useState, useEffect } from 'react';
import { ThemeToggle } from '../ui/ThemeToggle';

const NAV_LINKS = [
  { label: 'Hero', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stats', href: '#stats' },
];

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <a
          href="#hero"
          className="font-semibold text-gray-900 dark:text-gray-100 text-sm tracking-tight hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        >
          Ammar Abdelsstar
        </a>

        {/* Right side: links + toggle */}
        <div className="flex items-center gap-2">
          <ul className="flex items-center gap-6 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-150 font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Separator */}
          <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 mx-1" aria-hidden="true" />

          {/* Theme toggle */}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </nav>
    </header>
  );
}
