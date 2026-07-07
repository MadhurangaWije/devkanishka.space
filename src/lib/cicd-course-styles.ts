// Shared CSS for the CI/CD Pipelines course. Scoped to .cicd-lesson-host.
// Re-skins the source's light Tufte-serif lesson.css into the site's dark
// theme, reusing the same tokens as the other new guides.
export const CICD_COURSE_CSS = `
.cicd-lesson-host {
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
  --green:      #4ade80;
  --green-50:   #14291e;
  --amber:      #fbbf24;
  --amber-50:   #2a1d0e;
  --red:        #f87171;
  --red-50:     #2a1414;
  --violet:     #a78bfa;
  --font-sans:  'Inter', system-ui, sans-serif;
  --font-mono:  'JetBrains Mono', 'Fira Code', monospace;
  --max-w:      var(--reader-width, 700px);
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

.cicd-lesson-host *, .cicd-lesson-host *::before, .cicd-lesson-host *::after {
  box-sizing: border-box;
}

/* Typography */
.cicd-lesson-host h2 {
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
.cicd-lesson-host h2:first-child { margin-top: 0; }
.cicd-lesson-host h3 { font-size: 1.05rem; font-weight: 600; color: var(--heading); margin-top: 1.75rem; margin-bottom: 0.6rem; }
.cicd-lesson-host p { font-size: 0.985rem; color: var(--text-base); line-height: 1.85; margin-bottom: 1.1rem; }
.cicd-lesson-host p:last-child { margin-bottom: 0; }
.cicd-lesson-host ul, .cicd-lesson-host ol { padding-left: 1.4rem; margin-bottom: 1.1rem; }
.cicd-lesson-host li { font-size: 0.985rem; line-height: 1.8; margin-bottom: 0.35rem; color: var(--text-base); }
.cicd-lesson-host li:last-child { margin-bottom: 0; }
.cicd-lesson-host strong { font-weight: 600; }
.cicd-lesson-host em { font-style: italic; color: var(--text-muted); }
.cicd-lesson-host a { color: var(--blue); text-decoration: none; }
.cicd-lesson-host a:hover { text-decoration: underline; }
.cicd-lesson-host .sidenote { font-size: 0.85rem; color: var(--text-muted); border-left: 2px solid var(--border); padding-left: 0.9rem; margin: 1.25rem 0; }

/* Inline code */
.cicd-lesson-host code {
  font-family: var(--font-mono);
  font-size: 0.82em;
  background: var(--bg-alt);
  color: var(--violet);
  padding: 0.15em 0.45em;
  border-radius: var(--r-sm);
  border: 1px solid var(--border);
}

/* Code blocks */
.cicd-lesson-host pre {
  background: var(--bg-code) !important;
  border-radius: var(--r-md);
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  margin: 1.25rem 0;
  border: 1px solid var(--border);
}
.cicd-lesson-host pre code {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  background: none !important;
  border: none !important;
  padding: 0;
  color: var(--text-base);
  line-height: 1.7;
}
.cicd-lesson-host .ascii-diagram {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  line-height: 1.4;
  white-space: pre;
  overflow-x: auto;
  background: var(--bg-code);
  color: var(--text-base);
  padding: 1.25rem;
  border-radius: var(--r-md);
  margin: 1.5rem 0;
  border: 1px solid var(--border);
}

/* Diagrams (inline SVG) */
.cicd-lesson-host .diagram {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 1.5rem;
  margin: 1.75rem 0;
  overflow-x: auto;
}
.cicd-lesson-host .diagram svg { display: block; margin: 0 auto; max-width: 100%; height: auto; }
.cicd-lesson-host .diagram figcaption {
  text-align: center; font-size: 0.8rem; color: var(--text-muted); margin-top: 0.75rem; font-style: italic;
}

/* Flow diagram + pipeline viz (CSS-animated, no JS required) */
.cicd-lesson-host .flow-diagram { display: flex; align-items: center; gap: 0; overflow-x: auto; padding: 1rem 0; margin: 1.5rem 0; }
.cicd-lesson-host .flow-step { display: flex; flex-direction: column; align-items: center; min-width: 100px; animation: cicd-fade-in-up 0.5s ease-out both; }
.cicd-lesson-host .flow-step:nth-child(1) { animation-delay: 0.1s; }
.cicd-lesson-host .flow-step:nth-child(2) { animation-delay: 0.3s; }
.cicd-lesson-host .flow-step:nth-child(3) { animation-delay: 0.5s; }
.cicd-lesson-host .flow-step:nth-child(4) { animation-delay: 0.7s; }
.cicd-lesson-host .flow-step:nth-child(5) { animation-delay: 0.9s; }
.cicd-lesson-host .flow-step .icon { font-size: 2rem; margin-bottom: 0.3rem; }
.cicd-lesson-host .flow-step .label { font-size: 0.75rem; font-weight: 600; text-align: center; color: var(--text-base); }
.cicd-lesson-host .flow-arrow { font-size: 1.5rem; color: var(--blue); margin: 0 0.3rem; animation: cicd-pulse 1.5s infinite; }
@keyframes cicd-fade-in-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes cicd-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
.cicd-lesson-host .pipeline-viz {
  position: relative; background: linear-gradient(135deg, var(--blue) 0%, var(--violet) 100%);
  border-radius: var(--r-md); padding: 2rem; margin: 1.5rem 0; color: white; overflow: hidden;
}

/* Callouts */
.cicd-lesson-host .key-insight {
  background: var(--blue-50); border-left: 4px solid var(--blue);
  padding: 1rem 1.2rem; margin: 1.5rem 0; border-radius: 0 var(--r-md) var(--r-md) 0;
}
.cicd-lesson-host .key-insight::before { content: "\\1F4A1 "; font-weight: bold; }
.cicd-lesson-host .warning {
  background: var(--amber-50); border-left: 4px solid var(--amber);
  padding: 1rem 1.2rem; margin: 1.5rem 0; border-radius: 0 var(--r-md) var(--r-md) 0;
}
.cicd-lesson-host .warning::before { content: "\\26A0\\FE0F "; }

/* Tables */
.cicd-lesson-host table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem; }
.cicd-lesson-host th, .cicd-lesson-host td { padding: 0.65rem 0.9rem; text-align: left; border-bottom: 1px solid var(--border); }
.cicd-lesson-host th { font-weight: 600; background: var(--bg-alt); color: var(--heading); }
.cicd-lesson-host tr:hover td { background: var(--bg-alt); }

/* Compare boxes */
.cicd-lesson-host .compare { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1.5rem 0; }
.cicd-lesson-host .compare-bad, .cicd-lesson-host .compare-good { padding: 1rem 1.1rem; border-radius: var(--r-md); font-size: 0.9rem; }
.cicd-lesson-host .compare-bad { background: var(--red-50); border: 1px solid var(--red); }
.cicd-lesson-host .compare-bad::before { content: "\\274C Don't"; display: block; font-weight: 700; color: var(--red); margin-bottom: 0.5rem; }
.cicd-lesson-host .compare-good { background: var(--green-50); border: 1px solid var(--green); }
.cicd-lesson-host .compare-good::before { content: "\\2705 Do"; display: block; font-weight: 700; color: var(--green); margin-bottom: 0.5rem; }
@media (max-width: 640px) { .cicd-lesson-host .compare { grid-template-columns: 1fr; } }

/* Exercise / recall (native <details>/<summary>, no JS) */
.cicd-lesson-host .exercise {
  background: var(--bg-card); border: 1px solid var(--violet); border-radius: var(--r-lg);
  padding: 1.5rem 1.75rem; margin: 2rem 0;
}
.cicd-lesson-host .exercise::before { content: "\\1F3CB\\FE0F Exercise"; display: block; font-weight: 700; font-size: 1.05rem; margin-bottom: 0.8rem; color: var(--violet); }
.cicd-lesson-host .recall {
  background: var(--bg-card); border: 1px dashed var(--blue); border-radius: var(--r-lg);
  padding: 1.5rem 1.75rem; margin: 2rem 0;
}
.cicd-lesson-host .recall::before { content: "\\1F9E0 Recall Check"; display: block; font-weight: 700; font-size: 1.05rem; margin-bottom: 0.8rem; color: var(--blue); }
.cicd-lesson-host .recall details { margin-top: 0.8rem; }
.cicd-lesson-host .recall summary { cursor: pointer; color: var(--blue); font-weight: 600; }
.cicd-lesson-host .recall details[open] summary { margin-bottom: 0.75rem; }

/* Bottom nav (React-rendered, outside .cicd-lesson-host) */
.cicd-lesson-bottom-nav { background: #0f1117; border-top: 1px solid #2e3350; }
.cicd-lesson-bottom-nav-inner { max-width: 700px; margin: 0 auto; padding: 24px 32px; display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.cicd-lesson-nav-link { display: flex; flex-direction: column; gap: 4px; padding: 12px 16px; border: 1px solid #2e3350; border-radius: 8px; text-decoration: none; transition: border-color 0.15s, background 0.15s; flex: 1; min-width: 160px; max-width: 280px; }
.cicd-lesson-nav-link:hover { border-color: #7c6ff7; background: #1a1d27; }
.cicd-lesson-nav-link--next { text-align: right; margin-left: auto; }
.cicd-lesson-nav-link--complete { cursor: default; opacity: 0.6; }
.cicd-lesson-nav-link--complete:hover { border-color: #2e3350; background: transparent; }
.cicd-lesson-nav-dir { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: #7c6ff7; text-transform: uppercase; letter-spacing: 0.06em; }
.cicd-lesson-nav-title { font-family: 'Inter', system-ui, sans-serif; font-size: 0.88rem; color: #e2e4f0; font-weight: 500; }

@media (max-width: 640px) {
  .cicd-lesson-host { padding: 0 1rem 4rem; }
}
`;
