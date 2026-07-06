'use client';

import { useEffect } from 'react';

type Props = {
  bodyHtml: string;
  script: string;
};

export function DockerLessonReader({ bodyHtml, script }: Props) {
  useEffect(() => {
    if (!script) return;
    const el = document.createElement('script');
    el.textContent = `;(function(){\n${script}\n})();`;
    document.body.appendChild(el);
    return () => {
      if (document.body.contains(el)) document.body.removeChild(el);
    };
    // Depend on bodyHtml too — script is the same constant string on every
    // lesson, so [script] alone wouldn't re-fire this effect when
    // client-side navigating between two lessons (React compares strings
    // by value). bodyHtml always differs per lesson, forcing a re-run.
  }, [script, bodyHtml]);

  return (
    <div className="docker-lesson-host">
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </div>
  );
}
