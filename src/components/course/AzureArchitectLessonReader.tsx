'use client';

import { useEffect } from 'react';

type Props = {
  bodyHtml: string;
  script: string;
};

export function AzureArchitectLessonReader({ bodyHtml, script }: Props) {
  useEffect(() => {
    if (!script) return;
    const el = document.createElement('script');
    el.textContent = `;(function(){\n${script}\n})();`;
    document.body.appendChild(el);
    return () => {
      if (document.body.contains(el)) document.body.removeChild(el);
    };
    // bodyHtml included — script is the same constant string on every
    // lesson, so [script] alone wouldn't re-fire this on client-side
    // navigation between two lessons.
  }, [script, bodyHtml]);

  return (
    <div className="azure-architect-lesson-host">
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </div>
  );
}
