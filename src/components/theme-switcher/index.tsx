import { useEffect, useState } from 'react';
import s from './theme-switcher.module.css';

const THEMES = ['light', 'dark', 'system'] as const;
type Theme = (typeof THEMES)[number];

function getCookieTheme(): Theme {
  if (typeof document === 'undefined') {
    return 'system';
  }

  const theme = document.cookie.replace(
    /(?:(?:^|.*;\s*)theme\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );

  return THEMES.includes(theme as Theme) ? (theme as Theme) : 'system';
}

function saveTheme(theme: Theme) {
  const date = new Date();
  date.setTime(date.getTime() + 365 * 86400000);
  document.cookie = `theme=${theme};expires=${date.toUTCString()};path=/`;
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const currentTheme = getCookieTheme();
    setTheme(currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, []);

  function cycleTheme() {
    const currentIndex = THEMES.indexOf(theme);
    const nextTheme = THEMES[(currentIndex + 1) % THEMES.length];
    setTheme(nextTheme);
    saveTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  }

  return (
    <button className={s.button} type="button" onClick={cycleTheme}>
      {theme}
    </button>
  );
}
