// Shared CSS for the AI Engineering course. Scoped to .ai-engineering-lesson-host.
// The source lessons already use a dark theme close to the site's own — this
// remaps it onto the exact shared tokens (ml-course-styles.ts) so all guides
// read as one visual family.
export const AI_ENGINEERING_COURSE_CSS = `
.ai-engineering-lesson-host {
  --bg-page:    #0f1117;
  --bg-card:    #1a1d27;
  --bg-code:    #12141f;
  --bg-alt:     #22263a;
  --text-base:  #e2e4f0;
  --text-muted: #8b90a8;
  --heading:    #ffffff;
  --border:     #2e3350;
  --border-md:  #3a3f5c;
  --blue:       #7c6ff7;
  --blue-50:    #1e1b38;
  --violet:     #a78bfa;
  --teal:       #2dd4bf;
  --green:      #4ade80;
  --green-50:   #14291e;
  --amber:      #fbbf24;
  --amber-50:   #2a1d0e;
  --red:        #f87171;
  --red-50:     #2a1414;
  --font-sans:  'Inter', system-ui, sans-serif;
  --font-mono:  'JetBrains Mono', 'Fira Code', monospace;
  --max-w:      760px;
  --r-sm:       6px;
  --r-md:       10px;
  --r-lg:       16px;
  background: var(--bg-page);
  color: var(--text-base);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.8;
  min-height: 100%;
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 2.5rem 1.5rem 5rem;
}

.ai-engineering-lesson-host *, .ai-engineering-lesson-host *::before, .ai-engineering-lesson-host *::after {
  box-sizing: border-box;
}

/* Typography */
.ai-engineering-lesson-host h2 {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--heading);
  margin-top: 2.75rem;
  margin-bottom: 1rem;
  line-height: 1.3;
  scroll-margin-top: 6rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.5rem;
}
.ai-engineering-lesson-host h2:first-child { margin-top: 0; }
.ai-engineering-lesson-host h3 {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--heading);
  margin-top: 1.75rem;
  margin-bottom: 0.6rem;
}
.ai-engineering-lesson-host h4 { font-size: 0.95rem; color: var(--text-muted); margin-top: 1.5rem; margin-bottom: 0.5rem; }
.ai-engineering-lesson-host p { font-size: 0.985rem; color: var(--text-base); line-height: 1.85; margin-bottom: 1.1rem; }
.ai-engineering-lesson-host p:last-child { margin-bottom: 0; }
.ai-engineering-lesson-host ul, .ai-engineering-lesson-host ol { padding-left: 1.4rem; margin-bottom: 1.1rem; }
.ai-engineering-lesson-host li { font-size: 0.985rem; line-height: 1.8; margin-bottom: 0.35rem; color: var(--text-base); }
.ai-engineering-lesson-host li:last-child { margin-bottom: 0; }
.ai-engineering-lesson-host strong { font-weight: 600; color: var(--heading); }
.ai-engineering-lesson-host em { font-style: italic; color: var(--text-muted); }
.ai-engineering-lesson-host a { color: var(--blue); text-decoration: none; border-bottom: 1px solid transparent; }
.ai-engineering-lesson-host a:hover { border-bottom-color: var(--blue); }
.ai-engineering-lesson-host blockquote {
  margin: 1.25rem 0;
  padding: 1rem 1.25rem;
  border-left: 3px solid var(--blue);
  background: var(--bg-card);
  border-radius: 0 var(--r-md) var(--r-md) 0;
  color: var(--text-muted);
}
.ai-engineering-lesson-host hr { border: none; border-top: 1px solid var(--border); margin: 2.5rem 0; }

/* Inline code */
.ai-engineering-lesson-host code {
  font-family: var(--font-mono);
  font-size: 0.82em;
  background: var(--bg-alt);
  color: var(--violet);
  padding: 0.15em 0.45em;
  border-radius: var(--r-sm);
  border: 1px solid var(--border);
}

/* Code blocks (both bare <pre> and the .code-block card variant) */
.ai-engineering-lesson-host pre {
  background: var(--bg-code) !important;
  border-radius: var(--r-md);
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  margin: 1.25rem 0;
  border: 1px solid var(--border);
}
.ai-engineering-lesson-host pre code {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  background: none !important;
  border: none !important;
  padding: 0;
  color: var(--text-base);
  line-height: 1.7;
}
.ai-engineering-lesson-host .code-block { background: var(--bg-code); border: 1px solid var(--border); border-radius: var(--r-md); margin: 1.25rem 0; overflow: hidden; }
.ai-engineering-lesson-host .code-block pre { margin: 0; border: none; border-radius: 0; }
.ai-engineering-lesson-host .code-block .code-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.5rem 1rem; background: var(--bg-alt); border-bottom: 1px solid var(--border);
  font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);
}

/* Diagram container (populated at runtime via inline Diagrams.* calls) */
.ai-engineering-lesson-host .diagram-container {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 1.5rem;
  margin: 1.75rem 0;
  text-align: center;
  overflow-x: auto;
}
.ai-engineering-lesson-host .diagram-container svg { max-width: 100%; height: auto; }
.ai-engineering-lesson-host .diagram-container .caption {
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  font-style: italic;
}

/* Concept box */
.ai-engineering-lesson-host .concept-box {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 1.5rem 1.75rem;
  margin: 1.75rem 0;
}
.ai-engineering-lesson-host .concept-box h3 { margin-top: 0; color: var(--teal); }

/* Project box */
.ai-engineering-lesson-host .project-box {
  background: var(--bg-alt);
  border: 1px solid var(--blue);
  border-radius: var(--r-lg);
  padding: 1.5rem 1.75rem;
  margin: 1.75rem 0;
}
.ai-engineering-lesson-host .project-box h3 { margin-top: 0; color: var(--blue); }

/* Key points */
.ai-engineering-lesson-host .key-points {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 1.5rem 1.75rem;
  margin: 1.75rem 0;
}
.ai-engineering-lesson-host .key-points h3 {
  margin-top: 0; color: var(--blue); font-size: 0.85rem;
  text-transform: uppercase; letter-spacing: 0.05em;
}
.ai-engineering-lesson-host .key-points ul { margin-bottom: 0; }
.ai-engineering-lesson-host .key-points li::marker { color: var(--blue); }

/* Step list */
.ai-engineering-lesson-host .step-list { list-style: none; padding: 0; counter-reset: step-counter; }
.ai-engineering-lesson-host .step-list li {
  counter-increment: step-counter; position: relative; padding-left: 2.75rem;
  margin-bottom: 1.25rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--border);
}
.ai-engineering-lesson-host .step-list li:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.ai-engineering-lesson-host .step-list li::before {
  content: counter(step-counter); position: absolute; left: 0; top: 0;
  width: 1.7rem; height: 1.7rem; background: var(--blue); color: white; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-size: 0.78rem; font-weight: 700;
}

/* Callouts */
.ai-engineering-lesson-host .callout {
  border-radius: var(--r-md);
  padding: 1.1rem 1.25rem;
  margin: 1.5rem 0;
  border-left: 4px solid var(--blue);
  background: var(--bg-card);
}
.ai-engineering-lesson-host .callout strong:first-child {
  display: block; margin-bottom: 0.5rem; font-size: 0.8rem;
  text-transform: uppercase; letter-spacing: 0.05em; color: var(--blue);
}
.ai-engineering-lesson-host .callout.warning { border-left-color: var(--amber); background: var(--amber-50); }
.ai-engineering-lesson-host .callout.warning strong:first-child { color: var(--amber); }
.ai-engineering-lesson-host .callout.tip { border-left-color: var(--green); background: var(--green-50); }
.ai-engineering-lesson-host .callout.tip strong:first-child { color: var(--green); }
.ai-engineering-lesson-host .callout.note { border-left-color: var(--teal); }
.ai-engineering-lesson-host .callout.note strong:first-child { color: var(--teal); }

/* Comparison table */
.ai-engineering-lesson-host .comparison-table, .ai-engineering-lesson-host table {
  width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem;
}
.ai-engineering-lesson-host .comparison-table th, .ai-engineering-lesson-host .comparison-table td,
.ai-engineering-lesson-host table th, .ai-engineering-lesson-host table td {
  padding: 0.75rem 1.1rem; text-align: left; border-bottom: 1px solid var(--border);
}
.ai-engineering-lesson-host .comparison-table th, .ai-engineering-lesson-host table th {
  background: var(--bg-alt); color: var(--text-muted); font-size: 0.75rem;
  text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;
}
.ai-engineering-lesson-host .comparison-table td:first-child { font-weight: 600; color: var(--teal); }

/* Pills */
.ai-engineering-lesson-host .pill {
  display: inline-block; padding: 0.15em 0.6em; font-size: 0.72rem; font-weight: 600;
  border-radius: 999px; background: var(--bg-alt); color: var(--teal); border: 1px solid var(--border);
}
.ai-engineering-lesson-host .pill.accent { background: var(--blue-50); color: var(--blue); border-color: var(--blue); }
.ai-engineering-lesson-host .pill.success { background: var(--green-50); color: var(--green); border-color: var(--green); }
.ai-engineering-lesson-host .pill.warning { background: var(--amber-50); color: var(--amber); border-color: var(--amber); }
.ai-engineering-lesson-host .pill.danger { background: var(--red-50); color: var(--red); border-color: var(--red); }

/* Quiz widget (same markup/behavior convention as the Docker guide) */
.ai-engineering-lesson-host .quiz {
  background: var(--bg-card);
  border: 1px solid var(--border-md);
  border-radius: var(--r-lg);
  padding: 1.5rem 1.75rem;
  margin: 2rem 0;
}
.ai-engineering-lesson-host .quiz-question { font-weight: 600; font-size: 1rem; color: var(--heading); margin-bottom: 1rem; }
.ai-engineering-lesson-host .quiz-options { list-style: none; padding: 0; margin: 0; }
.ai-engineering-lesson-host .quiz-options li {
  padding: 0.75rem 1rem; margin-bottom: 0.6rem; border: 1px solid var(--border-md);
  border-radius: var(--r-md); cursor: pointer; transition: all 0.15s; font-size: 0.92rem;
  color: var(--text-base); background: var(--bg-alt);
}
.ai-engineering-lesson-host .quiz-options li:last-child { margin-bottom: 0; }
.ai-engineering-lesson-host .quiz-options li:hover { border-color: var(--blue); background: var(--blue-50); }
.ai-engineering-lesson-host .quiz-options li.correct { border-color: var(--green); background: var(--green-50); color: var(--green); }
.ai-engineering-lesson-host .quiz-options li.incorrect { border-color: var(--red); background: var(--red-50); color: var(--red); }
.ai-engineering-lesson-host .quiz-feedback { margin-top: 1rem; padding: 0.85rem 1.1rem; border-radius: var(--r-md); font-size: 0.88rem; display: none; }
.ai-engineering-lesson-host .quiz-feedback.show { display: block; }
.ai-engineering-lesson-host .quiz-feedback.correct { background: var(--green-50); color: var(--green); }
.ai-engineering-lesson-host .quiz-feedback.incorrect { background: var(--red-50); color: var(--red); }

/* Bottom nav (React-rendered, outside .ai-engineering-lesson-host) */
.ai-engineering-lesson-bottom-nav { background: #0f1117; border-top: 1px solid #2e3350; }
.ai-engineering-lesson-bottom-nav-inner { max-width: 760px; margin: 0 auto; padding: 24px 32px; display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.ai-engineering-lesson-nav-link { display: flex; flex-direction: column; gap: 4px; padding: 12px 16px; border: 1px solid #2e3350; border-radius: 8px; text-decoration: none; transition: border-color 0.15s, background 0.15s; flex: 1; min-width: 160px; max-width: 280px; }
.ai-engineering-lesson-nav-link:hover { border-color: #7c6ff7; background: #1a1d27; }
.ai-engineering-lesson-nav-link--next { text-align: right; margin-left: auto; }
.ai-engineering-lesson-nav-link--complete { cursor: default; opacity: 0.6; }
.ai-engineering-lesson-nav-link--complete:hover { border-color: #2e3350; background: transparent; }
.ai-engineering-lesson-nav-dir { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: #7c6ff7; text-transform: uppercase; letter-spacing: 0.06em; }
.ai-engineering-lesson-nav-title { font-family: 'Inter', system-ui, sans-serif; font-size: 0.88rem; color: #e2e4f0; font-weight: 500; }

@media (max-width: 640px) {
  .ai-engineering-lesson-host { padding: 0 1rem 4rem; }
}
`;
