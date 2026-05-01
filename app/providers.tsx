'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): Theme {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }

  return 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const savedTheme = window.localStorage.getItem('theme');

  return savedTheme === 'dark' || savedTheme === 'light'
    ? savedTheme
    : getSystemTheme();
}

export function Providers({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    queueMicrotask(() => {
      const initialTheme = getInitialTheme();

      setThemeState(initialTheme);
      applyTheme(initialTheme);
    });
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemChange = () => {
      const savedTheme = window.localStorage.getItem('theme');

      if (!savedTheme) {
        const nextTheme = getSystemTheme();
        setThemeState(nextTheme);
        applyTheme(nextTheme);
      }
    };

    media.addEventListener('change', handleSystemChange);

    return () => media.removeEventListener('change', handleSystemChange);
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    window.localStorage.setItem('theme', nextTheme);
    setThemeState(nextTheme);
    applyTheme(nextTheme);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside Providers');
  }

  return context;
}
