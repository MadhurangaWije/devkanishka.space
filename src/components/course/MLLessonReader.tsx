'use client';

import { useEffect } from 'react';

type Props = {
  bodyHtml: string;
  script: string;
};

export function MLLessonReader({ bodyHtml, script }: Props) {
  useEffect(() => {
    if (!script) return;
    const el = document.createElement('script');
    // IIFE is safe here — MLQuiz uses event listeners, not global onclick attributes
    el.textContent = `;(function(){\n${script}\n})();`;
    document.body.appendChild(el);
    return () => {
      if (document.body.contains(el)) document.body.removeChild(el);
    };
  }, [script]);

  return (
    <div className="ml-lesson-host">
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </div>
  );
}
