'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type ReadingModeContextValue = {
  isReadingMode: boolean;
  toggleReadingMode: () => void;
};

const ReadingModeContext = createContext<ReadingModeContextValue>({
  isReadingMode: false,
  toggleReadingMode: () => {},
});

export function useReadingMode() {
  return useContext(ReadingModeContext);
}

export function ReadingModeProvider({ children }: { children: React.ReactNode }) {
  const [isReadingMode, setIsReadingMode] = useState(false);

  // Keep state in sync if the user exits fullscreen via Esc / browser chrome
  // rather than our own toggle button.
  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) setIsReadingMode(false);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Escape also exits if the Fullscreen API request never actually engaged
  // (permission denied, unsupported, iframe restrictions, etc).
  useEffect(() => {
    if (!isReadingMode) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsReadingMode(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isReadingMode]);

  useEffect(() => {
    document.documentElement.classList.toggle('reading-mode', isReadingMode);
  }, [isReadingMode]);

  const toggleReadingMode = useCallback(() => {
    setIsReadingMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.requestFullscreen?.().catch(() => {
          // Fullscreen can be denied/unsupported — the CSS-driven layout
          // change below is the part that actually matters for reading.
        });
      } else if (document.fullscreenElement) {
        document.exitFullscreen?.().catch(() => {});
      }
      return next;
    });
  }, []);

  return (
    <ReadingModeContext.Provider value={{ isReadingMode, toggleReadingMode }}>
      {children}
    </ReadingModeContext.Provider>
  );
}
