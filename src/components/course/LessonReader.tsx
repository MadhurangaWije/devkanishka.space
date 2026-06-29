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
    // Convert const/let to var so re-navigation doesn't trigger "already declared"
    // errors, while keeping functions in global scope for onclick= attributes.
    // (An IIFE would fix the redeclaration but breaks onclick="answer(i)" calls.)
    const patched = script.replace(/\b(const|let)\b/g, 'var');
    el.textContent = patched;
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
