'use client';

import { useEffect, useState } from 'react';
import { MoonStar, Sun } from 'lucide-react';
import { applyTheme, readSavedTheme, saveTheme, type Theme } from '@/lib/theme';
import styles from './ThemeToggle.module.scss';


export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  // გვერდის ჩატვირთვისას წაიკითხე შენახული თემა
  useEffect(() => {
    const initial = readSavedTheme();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    saveTheme(next);
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