'use client';

import { useEffect } from 'react';

type Props = {
  bodyHtml: string;
  script: string;
};

export function AzureLessonReader({ bodyHtml, script }: Props) {
  useEffect(() => {
    if (!script) return;
    const el = document.createElement('script');
    el.textContent = `;(function(){\n${script}\n})();`;
    document.body.appendChild(el);
    return () => {
      if (document.body.contains(el)) document.body.removeChild(el);
    };
  }, [script]);

  return (
    <div className="azure-lesson-host">
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </div>
  );
}
