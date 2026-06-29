'use client';

import { useEffect, useId } from 'react';

type LessonReaderProps = {
  lessonCss: string;
  bodyHtml: string;
  script: string;
};

export function LessonReader({ lessonCss, bodyHtml, script }: LessonReaderProps) {
  const styleId = useId();

  useEffect(() => {
    if (!script) return;
    const el = document.createElement('script');
    // Wrap in IIFE so const/let declarations don't leak to global scope.
    // Without this, navigating between lessons causes "already declared" errors.
    el.textContent = `;(function(){\n${script}\n})();`;
    document.body.appendChild(el);
    return () => {
      if (document.body.contains(el)) document.body.removeChild(el);
    };
  }, [script]);

  return (
    <div className="lesson-host">
      <style id={styleId} dangerouslySetInnerHTML={{ __html: lessonCss }} />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </div>
  );
}
