'use client';

import { useEffect } from 'react';

type Props = {
  bodyHtml: string;
  script: string;
};

export function MLLessonReader({ bodyHtml, script }: Props) {
  useEffect(() => {
    if (!script) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const el = document.createElement('script');
    // IIFE is safe here — MLQuiz uses event listeners, not global onclick attributes
    el.textContent = `;(function(){\n${script}\n})();`;

    const run = () => {
      if (!cancelled) document.body.appendChild(el);
    };

    // Plotly loads async (next/script in the course layout) — lesson scripts
    // that call Plotly.newPlot/.react must wait for it instead of racing it.
    const needsPlotly = /Plotly\./.test(script);
    if (needsPlotly && typeof window !== 'undefined' && !(window as unknown as { Plotly?: unknown }).Plotly) {
      const waitForPlotly = () => {
        if (cancelled) return;
        if ((window as unknown as { Plotly?: unknown }).Plotly) run();
        else timer = setTimeout(waitForPlotly, 50);
      };
      waitForPlotly();
    } else {
      run();
    }

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      if (document.body.contains(el)) document.body.removeChild(el);
    };
  }, [script]);

  return (
    <div className="ml-lesson-host">
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </div>
  );
}
