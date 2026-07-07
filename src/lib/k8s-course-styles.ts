// Shared CSS for the Kubernetes Mastery course. Scoped to .k8s-lesson-host.
// This is the largest and most visually varied of the new guides: lessons
// 1-62 use a light "Georgia serif" theme (.key-insight/.production-note/
// .quiz-q reveal buttons), lessons 72-100 use an already-dark GitHub-style
// theme with dozens of bespoke one-off infographic components (bars,
// gauges, layer stacks, sequence diagrams, maturity models — each lesson's
// own <head><style>, which gets stripped along with the rest of <head>).
// Rather than hand-styling ~90 one-off classes for a 29-lesson tail, the
// common structural elements (callouts, quiz, diagrams, code, tables,
// badges, cards, grids) get full treatment, and a generic attribute-selector
// layer at the bottom catches the long tail of bespoke component names by
// family so nothing goes fully unstyled.
export const K8S_COURSE_CSS = `
.k8s-lesson-host {
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
  --violet-50:  #241f42;
  --teal:       #2dd4bf;
  --gold:       #fbbf24;
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

.k8s-lesson-host *, .k8s-lesson-host *::before, .k8s-lesson-host *::after {
  box-sizing: border-box;
}

/* Typography */
.k8s-lesson-host h2 {
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
.k8s-lesson-host h2:first-child { margin-top: 0; }
.k8s-lesson-host h3, .k8s-lesson-host h4 { font-weight: 600; color: var(--heading); margin-top: 1.75rem; margin-bottom: 0.6rem; }
.k8s-lesson-host h3 { font-size: 1.05rem; }
.k8s-lesson-host h4 { font-size: 0.95rem; color: var(--text-muted); }
.k8s-lesson-host p { font-size: 0.985rem; color: var(--text-base); line-height: 1.85; margin-bottom: 1.1rem; }
.k8s-lesson-host p:last-child { margin-bottom: 0; }
.k8s-lesson-host ul, .k8s-lesson-host ol { padding-left: 1.4rem; margin-bottom: 1.1rem; }
.k8s-lesson-host li { font-size: 0.985rem; line-height: 1.8; margin-bottom: 0.35rem; color: var(--text-base); }
.k8s-lesson-host li:last-child { margin-bottom: 0; }
.k8s-lesson-host strong { font-weight: 600; }
.k8s-lesson-host em { font-style: italic; color: var(--text-muted); }
.k8s-lesson-host a { color: var(--blue); text-decoration: none; }
.k8s-lesson-host a:hover { text-decoration: underline; }
.k8s-lesson-host .sub { font-size: 1rem; color: var(--text-muted); }

/* Cert badges */
.k8s-lesson-host .cert-badge, .k8s-lesson-host .skill-tag {
  display: inline-block; background: var(--blue); color: #fff; font-size: 0.7rem;
  padding: 0.15rem 0.55rem; border-radius: 10px; margin-left: 0.4rem; vertical-align: middle; font-weight: 600;
}
.k8s-lesson-host .skill-tag.gold { background: var(--gold); color: #1a1200; }

/* Inline code */
.k8s-lesson-host code {
  font-family: var(--font-mono);
  font-size: 0.82em;
  background: var(--bg-alt);
  color: var(--violet);
  padding: 0.15em 0.45em;
  border-radius: var(--r-sm);
  border: 1px solid var(--border);
}

/* Code blocks + manual syntax-highlight token classes (.k/.s/.c/.f/.n) */
.k8s-lesson-host pre {
  background: var(--bg-code) !important;
  border-radius: var(--r-md);
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  margin: 1.25rem 0;
  border: 1px solid var(--border);
}
.k8s-lesson-host pre code {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  background: none !important;
  border: none !important;
  padding: 0;
  color: var(--text-base);
  line-height: 1.7;
}
.k8s-lesson-host pre .k { color: var(--violet); }
.k8s-lesson-host pre .s { color: var(--green); }
.k8s-lesson-host pre .c { color: var(--text-muted); font-style: italic; }
.k8s-lesson-host pre .f { color: var(--blue); }
.k8s-lesson-host pre .n { color: #ffa657; }

/* Diagrams (inline SVG) */
.k8s-lesson-host .diagram {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 1.5rem;
  margin: 1.75rem 0;
  text-align: center;
  overflow-x: auto;
}
.k8s-lesson-host .diagram svg { max-width: 100%; height: auto; }
.k8s-lesson-host .diagram figcaption { font-size: 0.8rem; color: var(--text-muted); margin-top: 0.75rem; font-style: italic; }

/* Tables */
.k8s-lesson-host table, .k8s-lesson-host .ext-table, .k8s-lesson-host .tbl-wrap table {
  width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem;
}
.k8s-lesson-host th, .k8s-lesson-host td { padding: 0.6rem 0.85rem; text-align: left; border: 1px solid var(--border); vertical-align: top; }
.k8s-lesson-host th { background: var(--bg-alt); font-weight: 600; color: var(--heading); }
.k8s-lesson-host tr:nth-child(even) td { background: var(--bg-card); }
.k8s-lesson-host tr:hover td { background: var(--bg-alt); }

/* Callouts — older template */
.k8s-lesson-host .key-insight {
  background: var(--blue-50); border-left: 4px solid var(--blue);
  padding: 1rem 1.2rem; margin: 1.5rem 0; border-radius: 0 var(--r-md) var(--r-md) 0;
}
.k8s-lesson-host .key-insight strong { color: var(--blue); }
.k8s-lesson-host .production-note {
  background: var(--amber-50); border-left: 4px solid var(--amber);
  padding: 1rem 1.2rem; margin: 1.5rem 0; border-radius: 0 var(--r-md) var(--r-md) 0;
}
.k8s-lesson-host .production-note::before { content: '\\1F3ED Production: '; font-weight: bold; color: var(--amber); }

/* Callouts — newer template (.callout + variant) */
.k8s-lesson-host .callout {
  border-radius: var(--r-md); padding: 1.1rem 1.25rem; margin: 1.5rem 0; border-left: 4px solid var(--blue); background: var(--bg-card);
}
.k8s-lesson-host .callout.info { border-color: var(--blue); background: var(--blue-50); }
.k8s-lesson-host .callout.tip { border-color: var(--green); background: var(--green-50); }
.k8s-lesson-host .callout.warn { border-color: var(--amber); background: var(--amber-50); }
.k8s-lesson-host .callout.danger { border-color: var(--red); background: var(--red-50); }
.k8s-lesson-host .callout.gold, .k8s-lesson-host .callout.series { border-color: var(--gold); background: #1a1200; }

/* Quiz — older template (reveal button) */
.k8s-lesson-host .quiz { background: var(--bg-card); border: 1px solid var(--border-md); border-radius: var(--r-lg); padding: 1.5rem; margin-top: 2rem; }
.k8s-lesson-host .quiz h2 { border-bottom: none; margin-top: 0; }
.k8s-lesson-host .quiz-q { margin-bottom: 1.2rem; }
.k8s-lesson-host .quiz-q p { font-weight: 600; margin-bottom: 0.4rem; }
.k8s-lesson-host .quiz-answer { display: none; background: var(--green-50); color: var(--green); padding: 0.6rem 0.9rem; border-radius: var(--r-sm); margin-top: 0.5rem; }
.k8s-lesson-host .reveal-btn { background: var(--blue); color: white; border: none; padding: 0.4rem 0.9rem; border-radius: var(--r-sm); cursor: pointer; font-size: 0.8rem; }
.k8s-lesson-host .reveal-btn:hover { opacity: 0.85; }

/* Quiz — newer template (click-to-grade options) */
.k8s-lesson-host .quiz-block { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg); padding: 1.75rem; margin: 1.5rem 0; }
.k8s-lesson-host .quiz-block h4 { font-size: 1rem; font-weight: 600; margin-bottom: 1rem; margin-top: 0; }
.k8s-lesson-host .quiz-options { list-style: none; padding: 0; margin: 0; }
.k8s-lesson-host .quiz-opt {
  background: var(--bg-alt); border: 1px solid var(--border-md); border-radius: var(--r-md);
  padding: 0.75rem 1rem; margin-bottom: 0.6rem; cursor: pointer; transition: border-color 0.2s; user-select: none; font-size: 0.92rem;
}
.k8s-lesson-host .quiz-opt:hover { border-color: var(--blue); }
.k8s-lesson-host .quiz-opt.correct { border-color: var(--green) !important; background: var(--green-50) !important; color: var(--green); }
.k8s-lesson-host .quiz-opt.wrong { border-color: var(--red) !important; background: var(--red-50) !important; color: var(--red); }
.k8s-lesson-host .quiz-explain { display: none; margin-top: 0.9rem; padding: 0.9rem; background: var(--bg-alt); border-radius: var(--r-md); font-size: 0.88rem; color: var(--text-muted); }

/* Buttons */
.k8s-lesson-host .btn, .k8s-lesson-host .big-btn, .k8s-lesson-host .nav-btn {
  display: inline-block; padding: 0.55rem 1.1rem; border-radius: var(--r-sm); font-size: 0.88rem; font-weight: 600;
  border: 1px solid var(--border); color: var(--text-base); background: var(--bg-alt); transition: border-color 0.2s;
}
.k8s-lesson-host .btn:hover, .k8s-lesson-host .nav-btn:hover { border-color: var(--blue); }
.k8s-lesson-host .btn.primary { background: var(--blue); color: #0d1117; border-color: var(--blue); }

/* Badges/tags (generic status colors) */
.k8s-lesson-host .badge, .k8s-lesson-host .phase-tag, .k8s-lesson-host .cert-card, .k8s-lesson-host .num, .k8s-lesson-host .label {
  display: inline-block; padding: 0.15em 0.6em; border-radius: 999px; font-size: 0.75rem; font-weight: 600; background: var(--bg-alt); color: var(--text-muted); border: 1px solid var(--border);
}
.k8s-lesson-host .badge.green, .k8s-lesson-host .util-ok { color: var(--green); border-color: var(--green); background: var(--green-50); }
.k8s-lesson-host .badge.red, .k8s-lesson-host .util-danger { color: var(--red); border-color: var(--red); background: var(--red-50); }
.k8s-lesson-host .badge.yellow, .k8s-lesson-host .util-warn { color: var(--amber); border-color: var(--amber); background: var(--amber-50); }

/* Checklists / step lists */
.k8s-lesson-host .checklist, .k8s-lesson-host .step-list, .k8s-lesson-host .runbook { list-style: none; padding: 0; margin: 1.25rem 0; }
.k8s-lesson-host .checklist li, .k8s-lesson-host .step-list li, .k8s-lesson-host .runbook li {
  padding: 0.6rem 0.9rem; margin-bottom: 0.5rem; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-md);
}

/* ── Generic long-tail coverage ──────────────────────────────────────────
   The 72-100 range has dozens of bespoke one-off infographic components
   (bars, gauges, layer-stacks, sequence/pipeline diagrams, maturity grids)
   defined only in each lesson's own stripped <style> block. Group by
   attribute-selector family so none of it renders as unstyled plain text. */
.k8s-lesson-host [class*="-grid"], .k8s-lesson-host [class$="-grid"] {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.9rem; margin: 1.5rem 0;
}
.k8s-lesson-host [class*="card"], .k8s-lesson-host [class*="panel"], .k8s-lesson-host [class*="tier"],
.k8s-lesson-host [class*="model-card"], .k8s-lesson-host [class*="ch-card"], .k8s-lesson-host [class*="path-card"] {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-md); padding: 1rem 1.2rem;
}
.k8s-lesson-host [class$="-row"], .k8s-lesson-host [class*="-row "] {
  display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0; flex-wrap: wrap;
}
.k8s-lesson-host [class*="bar-wrap"] { background: var(--bg-alt); border-radius: 999px; overflow: hidden; height: 10px; flex: 1; min-width: 80px; }
.k8s-lesson-host [class$="-bar"]:not([class*="-wrap"]) { display: block; height: 100%; background: var(--blue); border-radius: 999px; }
.k8s-lesson-host [class*="layer"], .k8s-lesson-host [class*="zone"], .k8s-lesson-host [class*="loop-box"],
.k8s-lesson-host [class*="pf-step"], .k8s-lesson-host [class*="seq-step"], .k8s-lesson-host [class*="pipe-stage"],
.k8s-lesson-host [class*="mode-panel"], .k8s-lesson-host [class*="mat-level"], .k8s-lesson-host [class*="sec-layer"],
.k8s-lesson-host [class*="strat"] {
  background: var(--bg-alt); border: 1px solid var(--border-md); border-radius: var(--r-sm); padding: 0.6rem 0.9rem; margin: 0.3rem 0; font-size: 0.88rem;
}
.k8s-lesson-host [class*="two-col"] { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.k8s-lesson-host [class*="three-col"] { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
@media (max-width: 640px) {
  .k8s-lesson-host [class*="two-col"], .k8s-lesson-host [class*="three-col"] { grid-template-columns: 1fr; }
}
.k8s-lesson-host [class*="hero-chip"] {
  display: inline-block; background: var(--bg-alt); border: 1px solid var(--violet); color: var(--violet);
  border-radius: 999px; padding: 0.3rem 0.9rem; font-size: 0.82rem; margin-bottom: 1rem;
}

/* Bottom nav (React-rendered, outside .k8s-lesson-host) */
.k8s-lesson-bottom-nav { background: #0f1117; border-top: 1px solid #2e3350; }
.k8s-lesson-bottom-nav-inner { max-width: 700px; margin: 0 auto; padding: 24px 32px; display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.k8s-lesson-nav-link { display: flex; flex-direction: column; gap: 4px; padding: 12px 16px; border: 1px solid #2e3350; border-radius: 8px; text-decoration: none; transition: border-color 0.15s, background 0.15s; flex: 1; min-width: 160px; max-width: 280px; }
.k8s-lesson-nav-link:hover { border-color: #7c6ff7; background: #1a1d27; }
.k8s-lesson-nav-link--next { text-align: right; margin-left: auto; }
.k8s-lesson-nav-link--complete { cursor: default; opacity: 0.6; }
.k8s-lesson-nav-link--complete:hover { border-color: #2e3350; background: transparent; }
.k8s-lesson-nav-dir { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: #7c6ff7; text-transform: uppercase; letter-spacing: 0.06em; }
.k8s-lesson-nav-title { font-family: 'Inter', system-ui, sans-serif; font-size: 0.88rem; color: #e2e4f0; font-weight: 500; }

@media (max-width: 640px) {
  .k8s-lesson-host { padding: 0 1rem 4rem; }
}
`;
