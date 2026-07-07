'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export const CONTENT_WIDTHS = [
  { key: 'narrow', label: 'Narrow', px: 620 },
  { key: 'medium', label: 'Medium', px: 700 },
  { key: 'wide', label: 'Wide', px: 880 },
  { key: 'full', label: 'Full', px: 1120 },
] as const;

type WidthKey = (typeof CONTENT_WIDTHS)[number]['key'];

const STORAGE_KEY = 'reader-content-width';

type ContentWidthContextValue = {
  widthKey: WidthKey;
  cycleWidth: () => void;
};

const ContentWidthContext = createContext<ContentWidthContextValue>({
  widthKey: 'medium',
  cycleWidth: () => {},
});

export function useContentWidth() {
  return useContext(ContentWidthContext);
}

export function ContentWidthProvider({ children }: { children: React.ReactNode }) {
  const [widthKey, setWidthKey] = useState<WidthKey>('medium');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (CONTENT_WIDTHS.some((w) => w.key === stored)) {
      setWidthKey(stored as WidthKey);
    }
  }, []);

  useEffect(() => {
    const width = CONTENT_WIDTHS.find((w) => w.key === widthKey)!;
    document.documentElement.style.setProperty('--reader-width', `${width.px}px`);
    localStorage.setItem(STORAGE_KEY, widthKey);
  }, [widthKey]);

  const cycleWidth = useCallback(() => {
    setWidthKey((prev) => {
      const idx = CONTENT_WIDTHS.findIndex((w) => w.key === prev);
      return CONTENT_WIDTHS[(idx + 1) % CONTENT_WIDTHS.length].key;
    });
  }, []);

  return (
    <ContentWidthContext.Provider value={{ widthKey, cycleWidth }}>
      {children}
    </ContentWidthContext.Provider>
  );
}
