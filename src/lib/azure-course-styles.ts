export const AZURE_COURSE_CSS = `
/* ── Azure Admin Course — dark-theme, scoped to .azure-lesson-host ── */
.azure-lesson-host {
  --az-blue:    #60a5fa;
  --az-dark:    #93c5fd;
  --az-light:   #1e3a5f;
  --az-teal:    #22d3ee;
  --az-purple:  #c084fc;
  --az-amber:   #fbbf24;
  --az-red:     #f87171;
  --az-green:   #4ade80;
  --az-text:    #e2e4f0;
  --az-muted:   #8b90a8;
  --az-border:  #2e3350;
  --az-surface: #1a1d27;
  --az-alt:     #22263a;
  --az-font:    system-ui, -apple-system, sans-serif;
  --az-mono:    'Cascadia Code', 'Fira Code', 'Consolas', monospace;

  font-family: var(--az-font);
  color: var(--az-text);
  background: transparent;
  line-height: 1.75;
  max-width: 820px;
  margin: 0 auto;
  padding: 2rem 1.5rem 5rem;
}

/* Hide lesson header and built-in nav — React handles navigation */
.azure-lesson-host .lesson-header,
.azure-lesson-host .lesson-nav { display: none !important; }

/* ── Typography ── */
.azure-lesson-host h1 {
  font-size: 2rem; font-weight: 700; letter-spacing: -0.02em;
  line-height: 1.2; margin-bottom: 0.3rem; color: var(--az-dark);
}
.azure-lesson-host h2 {
  font-size: 1.3rem; font-weight: 700; margin-top: 2.8rem;
  margin-bottom: 0.7rem; color: var(--az-dark);
  border-bottom: 2px solid var(--az-light); padding-bottom: 0.3rem;
}
.azure-lesson-host h3 {
  font-size: 1.05rem; font-weight: 600; margin-top: 1.8rem;
  margin-bottom: 0.4rem; color: var(--az-text);
}
.azure-lesson-host p  { margin-bottom: 1rem; }
.azure-lesson-host a  {
  color: var(--az-blue); text-decoration: none;
  border-bottom: 1px solid transparent; transition: border-color 0.15s;
}
.azure-lesson-host a:hover { border-bottom-color: var(--az-blue); }
.azure-lesson-host ul,
.azure-lesson-host ol { padding-left: 1.4rem; margin-bottom: 1rem; }
.azure-lesson-host li { margin-bottom: 0.3rem; }
.azure-lesson-host strong { font-weight: 600; color: var(--az-dark); }
.azure-lesson-host em { color: var(--az-muted); }
.azure-lesson-host code {
  font-family: var(--az-mono); font-size: 0.85em;
  background: var(--az-alt); padding: 0.15em 0.4em;
  border-radius: 3px; color: var(--az-teal);
}
.azure-lesson-host pre {
  background: #0d1117; color: #e8eaf6;
  border-radius: 6px; padding: 1.2rem;
  overflow-x: auto; margin: 1.2rem 0;
  font-family: var(--az-mono); font-size: 0.85rem; line-height: 1.5;
  border: 1px solid var(--az-border);
}
.azure-lesson-host pre code {
  background: none; color: inherit; padding: 0; font-size: inherit;
}
.azure-lesson-host hr {
  border: none; border-top: 1px solid var(--az-border); margin: 2.5rem 0;
}
.azure-lesson-host blockquote {
  border-left: 3px solid var(--az-blue); padding: 0.6rem 1rem;
  margin: 1.2rem 0; background: var(--az-light); border-radius: 0 4px 4px 0;
  color: var(--az-muted); font-style: italic;
}

/* ── Badges ── */
.azure-lesson-host .badge {
  display: inline-block; font-size: 0.72rem; font-weight: 600;
  letter-spacing: 0.06em; text-transform: uppercase;
  padding: 0.2em 0.7em; border-radius: 20px;
}
.azure-lesson-host .badge-domain { background: var(--az-light); color: var(--az-dark); }
.azure-lesson-host .badge-exam   { background: #14532d; color: var(--az-green); }
.azure-lesson-host .badge-time   { background: #451a03; color: var(--az-amber); }
.azure-lesson-host .badge-prereq { background: #3b0764; color: var(--az-purple); }

/* ── Callouts ── */
.azure-lesson-host .callout {
  padding: 0.9rem 1.1rem; border-radius: 6px;
  margin: 1.4rem 0; border-left: 4px solid; font-size: 0.95rem;
}
.azure-lesson-host .callout-info    { background: #0f2744; border-color: var(--az-blue); }
.azure-lesson-host .callout-warn    { background: #1c1400; border-color: var(--az-amber); }
.azure-lesson-host .callout-danger  { background: #1f0a0a; border-color: var(--az-red); }
.azure-lesson-host .callout-success { background: #052e16; border-color: var(--az-green); }
.azure-lesson-host .callout strong {
  display: block; margin-bottom: 0.3rem;
  font-size: 0.8rem; letter-spacing: 0.07em; text-transform: uppercase;
}
.azure-lesson-host .callout-info    strong { color: var(--az-blue); }
.azure-lesson-host .callout-warn    strong { color: var(--az-amber); }
.azure-lesson-host .callout-danger  strong { color: var(--az-red); }
.azure-lesson-host .callout-success strong { color: var(--az-green); }

/* ── Hierarchy diagram ── */
.azure-lesson-host .hierarchy {
  background: var(--az-alt); border: 1px solid var(--az-border);
  border-radius: 8px; padding: 1.4rem 1.6rem; margin: 1.4rem 0;
  font-family: var(--az-mono); font-size: 0.88rem; line-height: 2;
  overflow-x: auto; white-space: pre;
}
.azure-lesson-host .hier-tenant   { color: var(--az-dark);   font-weight: 700; }
.azure-lesson-host .hier-mgmt     { color: var(--az-purple); font-weight: 600; }
.azure-lesson-host .hier-sub      { color: var(--az-blue);   font-weight: 600; }
.azure-lesson-host .hier-rg       { color: var(--az-amber);  font-weight: 600; }
.azure-lesson-host .hier-resource { color: var(--az-green); }

/* ── Tables ── */
.azure-lesson-host table {
  width: 100%; border-collapse: collapse; margin: 1.2rem 0;
  font-size: 0.93rem;
}
.azure-lesson-host th {
  background: var(--az-light); color: var(--az-dark);
  padding: 0.55rem 0.9rem; text-align: left; font-weight: 600;
  font-size: 0.82rem; letter-spacing: 0.04em; text-transform: uppercase;
}
.azure-lesson-host td {
  padding: 0.5rem 0.9rem; border-bottom: 1px solid var(--az-border);
  vertical-align: top; color: var(--az-text);
}
.azure-lesson-host tr:nth-child(even) td { background: var(--az-alt); }
.azure-lesson-host tr:last-child td { border-bottom: 2px solid var(--az-blue); }

/* ── Quiz widget ── */
.azure-lesson-host .quiz { margin: 2.5rem 0; }
.azure-lesson-host .quiz h2 { margin-top: 0; }
.azure-lesson-host .quiz-question {
  background: var(--az-alt); border: 1px solid var(--az-border);
  border-radius: 8px; padding: 1.2rem 1.4rem; margin-bottom: 1.4rem;
}
.azure-lesson-host .quiz-question p {
  font-weight: 600; margin-bottom: 0.8rem; color: var(--az-text);
}
.azure-lesson-host .quiz-options {
  display: flex; flex-direction: column; gap: 0.45rem;
}
.azure-lesson-host .quiz-option {
  display: flex; align-items: flex-start; gap: 0.5rem;
  padding: 0.5rem 0.8rem; border: 1.5px solid var(--az-border);
  border-radius: 6px; cursor: pointer; background: var(--az-surface);
  transition: border-color 0.15s, background 0.15s;
  font-size: 0.93rem; user-select: none; color: var(--az-text);
}
.azure-lesson-host .quiz-option:hover {
  border-color: var(--az-blue); background: var(--az-light);
}
.azure-lesson-host .quiz-option input[type="radio"] {
  margin-top: 0.18rem; accent-color: var(--az-blue);
}
.azure-lesson-host .quiz-option.correct {
  border-color: var(--az-green); background: #052e16;
}
.azure-lesson-host .quiz-option.wrong {
  border-color: var(--az-red); background: #1f0a0a;
}
.azure-lesson-host .quiz-feedback {
  margin-top: 0.8rem; padding: 0.6rem 0.9rem;
  border-radius: 5px; font-size: 0.9rem; display: none;
}
.azure-lesson-host .quiz-feedback.show { display: block; }
.azure-lesson-host .quiz-feedback.correct-msg {
  background: #052e16; color: var(--az-green); border-left: 3px solid var(--az-green);
}
.azure-lesson-host .quiz-feedback.wrong-msg {
  background: #1f0a0a; color: var(--az-red); border-left: 3px solid var(--az-red);
}
.azure-lesson-host .quiz-score {
  background: var(--az-light); color: var(--az-dark);
  padding: 1rem 1.4rem; border-radius: 8px;
  text-align: center; font-size: 1rem; display: none; margin-top: 1rem;
  border: 1px solid var(--az-blue);
}
.azure-lesson-host .quiz-score.show { display: block; }
.azure-lesson-host .btn {
  display: inline-block; margin-top: 1rem; padding: 0.55rem 1.3rem;
  background: var(--az-blue); color: #0a0e1a;
  border: none; border-radius: 5px; font-size: 0.92rem; font-weight: 700;
  cursor: pointer; font-family: var(--az-font); transition: opacity 0.15s;
}
.azure-lesson-host .btn:hover { opacity: 0.85; }
.azure-lesson-host .btn-outline {
  background: transparent; color: var(--az-blue);
  border: 2px solid var(--az-blue);
}
.azure-lesson-host .btn-outline:hover {
  background: var(--az-light); color: var(--az-dark);
}

/* ── Primary source callout ── */
.azure-lesson-host .primary-source {
  background: linear-gradient(135deg, var(--az-light) 0%, #163456 100%);
  color: var(--az-text); border-radius: 8px;
  padding: 1.2rem 1.4rem; margin: 2rem 0;
  border: 1px solid var(--az-blue);
}
.azure-lesson-host .primary-source strong {
  color: var(--az-blue); font-size: 0.8rem; letter-spacing: 0.07em;
  text-transform: uppercase; display: block; margin-bottom: 0.4rem;
}
.azure-lesson-host .primary-source a {
  color: var(--az-dark); border-bottom-color: var(--az-dark); font-weight: 600;
}

/* ── Ask your teacher note ── */
.azure-lesson-host .ask-teacher {
  background: var(--az-alt); border: 1px dashed var(--az-blue);
  border-radius: 6px; padding: 0.8rem 1rem; margin: 2rem 0;
  font-size: 0.92rem; color: var(--az-muted);
}
.azure-lesson-host .ask-teacher strong { color: var(--az-dark); }

/* ── Section spacing ── */
.azure-lesson-host section { margin-bottom: 0.5rem; }

/* ── Azure bottom nav (React-injected) ── */
.az-bottom-nav {
  max-width: 820px; margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}
.az-bottom-nav-inner {
  display: flex; justify-content: space-between; gap: 1rem;
  border-top: 1px solid var(--site-border, #2a2d3e); padding-top: 2rem;
  flex-wrap: wrap;
}
.az-nav-link {
  display: flex; flex-direction: column; gap: 0.2rem;
  max-width: 48%; text-decoration: none;
}
.az-nav-link--next { align-items: flex-end; margin-left: auto; }
.az-nav-dir {
  font-family: var(--font-mono, monospace); font-size: 0.72rem;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: #8b90a8;
}
.az-nav-title {
  font-family: var(--font-mono, monospace); font-size: 0.82rem;
  color: #e2e4f0; transition: color 0.15s;
}
.az-nav-link:hover .az-nav-title { color: #60a5fa; }
.az-nav-link--complete .az-nav-dir { color: #4ade80; }
.az-nav-link--complete .az-nav-title { color: #4ade80; opacity: 0.7; }

@media (max-width: 600px) {
  .azure-lesson-host { padding: 1rem 1rem 4rem; }
  .az-bottom-nav { padding: 1.5rem 1rem 3rem; }
}
`;
