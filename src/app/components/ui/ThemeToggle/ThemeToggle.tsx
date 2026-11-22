'use client';

import { useEffect, useState } from 'react';
import { MoonStar, Sun } from 'lucide-react';
import styles from './ThemeToggle.module.scss';

type Theme = 'light' | 'dark';

function applyTheme(theme: Theme) {
  const html = document.documentElement;
  html.dataset.theme = theme;
  html.classList.remove('light', 'dark');
  html.classList.add(theme);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  // გვერდის ჩატვირთვისას წაიკითხე შენახული თემა
  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    const initial: Theme =
      saved ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
    localStorage.setItem('theme', next);
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={theme === 'dark' ? 'ღია თემა' : 'მუქი თემა'}
    >
      {theme === 'dark' ? <Sun size={20} /> : <MoonStar size={20} />}
    </button>
  );
}