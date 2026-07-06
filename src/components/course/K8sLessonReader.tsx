'use client';

import { useEffect } from 'react';

type Props = {
  bodyHtml: string;
  script: string;
};

export function K8sLessonReader({ bodyHtml, script }: Props) {
  useEffect(() => {
    if (!script) return;
    const el = document.createElement('script');
    // NOT wrapped in an IIFE — lessons 72-100 call a global quiz(...) function
    // via inline onclick="quiz(this,'c','…')" attributes, which needs to live
    // on window, not inside a closure.
    el.textContent = script;
    document.body.appendChild(el);
    return () => {
      if (document.body.contains(el)) document.body.removeChild(el);
    };
  }, [script, bodyHtml]);

  return (
    <div className="k8s-lesson-host">
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </div>
  );
}
