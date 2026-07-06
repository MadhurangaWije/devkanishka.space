// Shared CSS for the Docker course. Scoped to .docker-lesson-host.
// Re-skins the source's light "Georgia serif" lesson-style.css into the
// site's dark theme, reusing the same tokens as ml-course-styles.ts so all
// tutorial guides read as one visual family.
export const DOCKER_COURSE_CSS = `
.docker-lesson-host {
  --bg-page:    #0f1117;
  --bg-card:    #1a1d27;
  --bg-code:    #12141f;
  --bg-alt:     #22263a;
  --text-base:  #e2e4f0;
  --text-muted: #8b90a8;
  --text-light: #555c7a;
  --text-code:  #c9d1e0;
  --heading:    #ffffff;
  --border:     #2e3350;
  --border-md:  #3a3f5c;
  --blue:       #7c6ff7;
  --blue-50:    #1e1b38;
  --blue-100:   #2a2650;
  --blue-700:   #6457e8;
  --blue-900:   #b8b0fb;
  --violet:     #a78bfa;
  --violet-50:  #1e1b38;
  --green:      #4ade80;
  --green-50:   #14291e;
  --green-700:  #22c55e;
  --amber:      #fbbf24;
  --amber-50:   #2a1d0e;
  --red:        #f87171;
  --red-50:     #2a1414;
  --orange:     #fb923c;
  --orange-50:  #2a1a0e;
  --font-sans:  'Inter', system-ui, sans-serif;
  --font-mono:  'JetBrains Mono', 'Fira Code', monospace;
  --max-w:      700px;
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

.docker-lesson-host *, .docker-lesson-host *::before, .docker-lesson-host *::after {
  box-sizing: border-box;
}

/* Typography */
.docker-lesson-host h2 {
  font-family: var(--font-sans);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--heading);
  margin-top: 2.75rem;
  margin-bottom: 1rem;
  line-height: 1.3;
  scroll-margin-top: 6rem;
  border-bottom: 2px solid var(--blue);
  padding-bottom: 0.5rem;
}
.docker-lesson-host h2:first-child { margin-top: 0; }
.docker-lesson-host h3 {
  font-family: var(--font-sans);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--heading);
  margin-top: 1.75rem;
  margin-bottom: 0.6rem;
}
.docker-lesson-host p  { font-size: 0.985rem; color: var(--text-base); line-height: 1.85; margin-bottom: 1.1rem; }
.docker-lesson-host p:last-child { margin-bottom: 0; }
.docker-lesson-host ul, .docker-lesson-host ol { padding-left: 1.4rem; margin-bottom: 1.1rem; }
.docker-lesson-host li { font-size: 0.985rem; line-height: 1.8; margin-bottom: 0.35rem; color: var(--text-base); }
.docker-lesson-host li:last-child { margin-bottom: 0; }
.docker-lesson-host strong { font-weight: 600; }
.docker-lesson-host em { font-style: italic; color: var(--text-muted); }
.docker-lesson-host a { color: var(--blue); text-decoration: none; }
.docker-lesson-host a:hover { text-decoration: underline; }

/* Inline code */
.docker-lesson-host code {
  font-family: var(--font-mono);
  font-size: 0.82em;
  background: var(--bg-alt);
  color: var(--violet);
  padding: 0.15em 0.45em;
  border-radius: var(--r-sm);
  border: 1px solid var(--border);
}

/* Code blocks */
.docker-lesson-host pre {
  background: var(--bg-code) !important;
  border-radius: var(--r-md);
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  margin: 1.25rem 0;
  border: 1px solid var(--border);
}
.docker-lesson-host pre code {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  background: none !important;
  border: none !important;
  padding: 0;
  color: var(--text-code);
  line-height: 1.7;
}

/* Diagrams (inline SVG) */
.docker-lesson-host .diagram {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 1.5rem;
  margin: 1.75rem 0;
  text-align: center;
  overflow-x: auto;
}
.docker-lesson-host .diagram svg { max-width: 100%; height: auto; }
.docker-lesson-host .diagram-caption {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 0.75rem;
  font-style: italic;
}

/* Tables (comparison tables etc.) */
.docker-lesson-host table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.88rem;
}
.docker-lesson-host th, .docker-lesson-host td {
  border: 1px solid var(--border);
  padding: 0.6rem 0.9rem;
  text-align: left;
}
.docker-lesson-host th { background: var(--bg-alt); color: var(--heading); font-weight: 600; }

/* Callout boxes */
.docker-lesson-host .callout {
  border-left: 4px solid var(--blue);
  background: var(--blue-50);
  padding: 1rem 1.25rem;
  margin: 1.75rem 0;
  border-radius: 0 var(--r-md) var(--r-md) 0;
}
.docker-lesson-host .callout-title {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.4rem;
  color: var(--blue-900);
}
.docker-lesson-host .callout p { font-size: 0.9rem; }
.docker-lesson-host .callout.warning { border-color: var(--amber); background: var(--amber-50); }
.docker-lesson-host .callout.warning .callout-title { color: var(--amber); }
.docker-lesson-host .callout.success { border-color: var(--green); background: var(--green-50); }
.docker-lesson-host .callout.success .callout-title { color: var(--green); }
.docker-lesson-host .callout.industry { border-color: var(--violet); background: var(--violet-50); }
.docker-lesson-host .callout.industry .callout-title { color: var(--violet); }
.docker-lesson-host .callout.not-just-docker { border-color: var(--orange); background: var(--orange-50); }
.docker-lesson-host .callout.not-just-docker .callout-title { color: var(--orange); }

/* Hands-on tasks */
.docker-lesson-host .hands-on {
  background: var(--green-50);
  border: 1px solid var(--green-700);
  border-radius: var(--r-lg);
  padding: 1.5rem;
  margin: 1.75rem 0;
}
.docker-lesson-host .hands-on-title {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--green);
  margin-bottom: 0.8rem;
}

/* Key takeaways */
.docker-lesson-host .takeaways {
  background: var(--bg-card);
  border: 1px solid var(--amber);
  border-radius: var(--r-lg);
  padding: 1.5rem 1.75rem;
  margin: 2rem 0;
}
.docker-lesson-host .takeaways h3 { color: var(--amber); margin-top: 0; }

/* Quiz widget */
.docker-lesson-host .quiz {
  background: var(--bg-card);
  border: 1px solid var(--border-md);
  border-radius: var(--r-lg);
  padding: 1.5rem 1.75rem;
  margin: 2rem 0;
}
.docker-lesson-host .quiz-question {
  font-family: var(--font-sans);
  font-weight: 600;
  font-size: 1rem;
  color: var(--heading);
  margin-bottom: 1rem;
}
.docker-lesson-host .quiz-options { list-style: none; padding: 0; margin: 0; }
.docker-lesson-host .quiz-options li {
  padding: 0.75rem 1rem;
  margin-bottom: 0.6rem;
  border: 1px solid var(--border-md);
  border-radius: var(--r-md);
  cursor: pointer;
  transition: all 0.15s;
  font-size: 0.92rem;
  color: var(--text-base);
  background: var(--bg-alt);
}
.docker-lesson-host .quiz-options li:last-child { margin-bottom: 0; }
.docker-lesson-host .quiz-options li:hover { border-color: var(--blue); background: var(--blue-50); }
.docker-lesson-host .quiz-options li.correct { border-color: var(--green); background: var(--green-50); color: var(--green); }
.docker-lesson-host .quiz-options li.incorrect { border-color: var(--red); background: var(--red-50); color: var(--red); }
.docker-lesson-host .quiz-feedback {
  margin-top: 1rem;
  padding: 0.85rem 1.1rem;
  border-radius: var(--r-md);
  font-size: 0.88rem;
  display: none;
}
.docker-lesson-host .quiz-feedback.show { display: block; }
.docker-lesson-host .quiz-feedback.correct { background: var(--green-50); color: var(--green); }
.docker-lesson-host .quiz-feedback.incorrect { background: var(--red-50); color: var(--red); }

/* Bottom nav (React-rendered, outside .docker-lesson-host) */
.docker-lesson-bottom-nav { background: #0f1117; border-top: 1px solid #2e3350; }
.docker-lesson-bottom-nav-inner { max-width: 700px; margin: 0 auto; padding: 24px 32px; display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.docker-lesson-nav-link { display: flex; flex-direction: column; gap: 4px; padding: 12px 16px; border: 1px solid #2e3350; border-radius: 8px; text-decoration: none; transition: border-color 0.15s, background 0.15s; flex: 1; min-width: 160px; max-width: 280px; }
.docker-lesson-nav-link:hover { border-color: #7c6ff7; background: #1a1d27; }
.docker-lesson-nav-link--next { text-align: right; margin-left: auto; }
.docker-lesson-nav-link--complete { cursor: default; opacity: 0.6; }
.docker-lesson-nav-link--complete:hover { border-color: #2e3350; background: transparent; }
.docker-lesson-nav-dir   { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: #7c6ff7; text-transform: uppercase; letter-spacing: 0.06em; }
.docker-lesson-nav-title { font-family: 'Inter', system-ui, sans-serif; font-size: 0.88rem; color: #e2e4f0; font-weight: 500; }

@media (max-width: 640px) {
  .docker-lesson-host { padding: 0 1rem 4rem; }
}
`;
