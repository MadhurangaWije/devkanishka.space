// Shared CSS for the ML & DL Mastery course. Scoped to .ml-lesson-host.
// Adapted from assets/style.css with dark-theme variables to match the portfolio.
export const ML_COURSE_CSS = `
.ml-lesson-host {
  --bg-page:    #0f1117;
  --bg-card:    #1a1d27;
  --bg-code:    #12141f;
  --bg-alt:     #22263a;
  --bg-subtle:  #1a1d27;
  --text-base:  #e2e4f0;
  --text-muted: #8b90a8;
  --text-light: #555c7a;
  --text-inv:   #e2e4f0;
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
  --violet-100: #2a2650;
  --violet-900: #c4b5fd;
  --green:      #4ade80;
  --green-50:   #14291e;
  --green-100:  #1e3d2d;
  --green-700:  #22c55e;
  --amber:      #fbbf24;
  --amber-50:   #2a1d0e;
  --amber-100:  #3d2a14;
  --red:        #f87171;
  --red-50:     #2a1414;
  --red-100:    #3d1f1f;
  --teal:       #2dd4bf;
  --teal-50:    #0d1f1e;
  --teal-100:   #162e2b;
  --font-sans:  'Inter', system-ui, sans-serif;
  --font-serif: 'Inter', system-ui, sans-serif;
  --font-mono:  'JetBrains Mono', 'Fira Code', monospace;
  --max-w:      700px;
  --r-sm:       6px;
  --r-md:       10px;
  --r-lg:       16px;
  --r-xl:       20px;
  background: var(--bg-page);
  color: var(--text-base);
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.8;
  min-height: 100%;
}

/* Hide the original lesson header and built-in nav — we use our own */
.ml-lesson-host .lesson-header { display: none !important; }
.ml-lesson-host .lesson-nav    { display: none !important; }

/* Reset */
.ml-lesson-host *, .ml-lesson-host *::before, .ml-lesson-host *::after {
  box-sizing: border-box;
}

/* Layout */
.ml-lesson-host .lesson-main    { padding: 0 1.5rem 5rem; }
.ml-lesson-host .content-wrapper { max-width: var(--max-w); margin: 0 auto; padding-top: 2.5rem; }
.ml-lesson-host .lesson-section  { margin-bottom: 3rem; }

/* Typography */
.ml-lesson-host h2 {
  font-family: var(--font-sans);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--heading);
  margin-bottom: 1rem;
  margin-top: 2.5rem;
  line-height: 1.3;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  scroll-margin-top: 6rem;
}
.ml-lesson-host h2:first-child, .ml-lesson-host .lesson-section:first-child h2 { margin-top: 0; }
.ml-lesson-host h3 {
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 600;
  color: var(--heading);
  margin-top: 1.75rem;
  margin-bottom: 0.5rem;
}
.ml-lesson-host p  { font-size: 0.985rem; color: var(--text-base); line-height: 1.85; margin-bottom: 1rem; }
.ml-lesson-host p:last-child { margin-bottom: 0; }
.ml-lesson-host ul, .ml-lesson-host ol { padding-left: 1.4rem; margin-bottom: 1rem; }
.ml-lesson-host li { font-size: 0.985rem; line-height: 1.8; margin-bottom: 0.3rem; color: var(--text-base); }
.ml-lesson-host li:last-child { margin-bottom: 0; }
.ml-lesson-host strong { font-weight: 600; }
.ml-lesson-host em    { font-style: italic; color: var(--text-muted); }
.ml-lesson-host a     { color: var(--blue); text-decoration: none; }
.ml-lesson-host a:hover { text-decoration: underline; }

/* Section number circles */
.ml-lesson-host .section-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.8rem;
  height: 1.8rem;
  background: var(--blue-50);
  color: var(--blue);
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

/* Inline code */
.ml-lesson-host code {
  font-family: var(--font-mono);
  font-size: 0.82em;
  background: var(--bg-alt);
  color: var(--violet);
  padding: 0.15em 0.45em;
  border-radius: var(--r-sm);
  border: 1px solid var(--border);
}

/* Code blocks (fallback styling for non-notebook code, e.g. bash/yaml
   snippets that are intentionally NOT wrapped in .jupyter-cell below) */
.ml-lesson-host pre {
  background: var(--bg-code) !important;
  border-radius: var(--r-md);
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  margin: 1.25rem 0;
  border: 1px solid var(--border);
}
.ml-lesson-host pre code {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  background: none !important;
  border: none !important;
  padding: 0;
  color: var(--text-code);
  line-height: 1.7;
}

/* ────────────────────────────────────────────────────────────────────────
   Jupyter-notebook-style cells (visual only — nothing executes).
   Structure per cell:
     .jupyter-cell
       .jupyter-input-row  > .input-prompt + .input-box (pre/code)
       .jupyter-output-row > .output-prompt + .output-box (.output-text | .output-table)
   ──────────────────────────────────────────────────────────────────────── */
.ml-lesson-host .jupyter-cell {
  margin: 1.25rem 0;
  border-radius: var(--r-md);
  overflow: hidden;
  border: 1px solid var(--border);
}
.ml-lesson-host .jupyter-input-row,
.ml-lesson-host .jupyter-output-row {
  display: flex;
  align-items: stretch;
}
.ml-lesson-host .jupyter-output-row { border-top: 1px solid var(--border); }

/* Prompts: fixed, identical width so input/output text columns line up */
.ml-lesson-host .input-prompt,
.ml-lesson-host .output-prompt {
  flex: 0 0 4.75rem;
  width: 4.75rem;
  padding: 1.25rem 0.6rem 0 0;
  text-align: right;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1.7;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
}
.ml-lesson-host .input-prompt {
  color: var(--blue);
  background: var(--bg-code);
}
.ml-lesson-host .output-prompt {
  color: var(--red);
  background: #0a0a12;
}

.ml-lesson-host .input-box,
.ml-lesson-host .output-box {
  flex: 1 1 auto;
  min-width: 0; /* allow child <pre> to shrink and scroll instead of overflowing the flex row */
}

/* The <pre><code> inside .input-box keeps Prism's syntax highlighting —
   just drop the standalone card chrome since .jupyter-cell now provides it. */
.ml-lesson-host .input-box pre {
  margin: 0;
  border: none;
  border-radius: 0;
  background: var(--bg-code) !important;
}

/* Output variant A: plain console/text output */
.ml-lesson-host .output-text {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  line-height: 1.7;
  color: var(--green);
  background: transparent;
  border: none;
  padding: 0.9rem 1.25rem 0.9rem 0.6rem;
  white-space: pre-wrap;
}

/* Output variant B: rich DataFrame/table output, styled to match pandas'
   default to_html() rendering — a real Jupyter notebook renders DataFrames
   this way (white background, light-gray grid) regardless of the
   notebook's own light/dark theme, so this is intentionally NOT dark-themed. */
.ml-lesson-host .output-box .output-table {
  padding: 0.75rem 1rem;
  background: #fdfdfd;
  overflow-x: auto;
}
.ml-lesson-host .output-table table {
  border-collapse: collapse;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: #262626;
  background: #ffffff;
}
.ml-lesson-host .output-table th,
.ml-lesson-host .output-table td {
  border: 1px solid #d3d3d3;
  padding: 0.45rem 0.85rem;
}
.ml-lesson-host .output-table th {
  font-weight: 700;
  text-align: center;
  background: #f5f5f5;
}
.ml-lesson-host .output-table td {
  text-align: right;
}
.ml-lesson-host .output-table tbody tr:nth-child(even) {
  background: #f7f7f7;
}
.ml-lesson-host .output-table tbody tr:nth-child(odd) {
  background: #ffffff;
}

/* Standalone illustrative output blocks (a handful of lessons show a
   reference log/UI screenshot-as-text that isn't the output of the
   immediately preceding cell — these keep a simple labeled-card style
   rather than being forced into the In[]/Out[] pairing above). */
.ml-lesson-host .output-block {
  background: #0a0a12;
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  padding: 0.9rem 1.25rem;
  margin: 1.25rem 0;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--green);
  line-height: 1.7;
  white-space: pre-wrap;
}
.ml-lesson-host .output-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-light);
  margin-bottom: 0.4rem;
  font-family: var(--font-sans);
}

/* Callouts */
.ml-lesson-host .callout {
  display: flex;
  gap: 0.85rem;
  padding: 1rem 1.25rem;
  border-radius: var(--r-md);
  margin: 1.5rem 0;
  border-left: 4px solid;
}
.ml-lesson-host .callout-icon { font-size: 1.15rem; flex-shrink: 0; margin-top: 0.05rem; }
.ml-lesson-host .callout-body p { font-size: 0.9rem; margin-bottom: 0.5rem; }
.ml-lesson-host .callout-body p:last-child { margin-bottom: 0; }
.ml-lesson-host .callout-body strong { font-size: 0.9rem; display: block; margin-bottom: 0.3rem; }
.ml-lesson-host .callout-tip  { background: var(--blue-50);  border-color: var(--blue);  color: var(--blue-900); }
.ml-lesson-host .callout-tip .callout-body strong { color: var(--blue-700); }
.ml-lesson-host .callout-key  { background: var(--violet-50); border-color: var(--violet); color: var(--violet-900); }
.ml-lesson-host .callout-key .callout-body strong { color: var(--violet); }
.ml-lesson-host .callout-warn { background: var(--amber-50); border-color: var(--amber); color: var(--amber); }
.ml-lesson-host .callout-warn .callout-body strong { color: var(--amber); }
.ml-lesson-host .callout-rw   { background: var(--teal-50);  border-color: var(--teal);  color: var(--teal); }
.ml-lesson-host .callout-rw .callout-body strong { color: var(--teal); }

/* Objectives card */
.ml-lesson-host .objectives-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 1.5rem 1.75rem;
  margin-bottom: 2.5rem;
}
.ml-lesson-host .objectives-card h2 {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--blue);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-top: 0;
  margin-bottom: 0.9rem;
  display: block;
}
.ml-lesson-host .objectives-card ul { list-style: none; padding-left: 0; margin: 0; }
.ml-lesson-host .objectives-card li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.9rem;
  padding: 0.3rem 0;
  color: var(--text-base);
}
.ml-lesson-host .objectives-card li::before {
  content: '✓';
  color: var(--green);
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 0.05rem;
}

/* Array visualisations */
.ml-lesson-host .array-viz { margin: 1.25rem 0; display: flex; flex-direction: column; gap: 0.15rem; }
.ml-lesson-host .array-viz-label { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); margin-bottom: 0.35rem; }
.ml-lesson-host .array-row { display: flex; gap: 0.15rem; }
.ml-lesson-host .array-cell {
  display: flex; align-items: center; justify-content: center;
  min-width: 2.6rem; height: 2.6rem;
  background: var(--blue-50); border: 1px solid var(--blue-100);
  border-radius: var(--r-sm);
  font-family: var(--font-mono); font-size: 0.8rem; font-weight: 500; color: var(--blue-900);
}
.ml-lesson-host .array-cell.highlight { background: var(--blue); color: white; border-color: var(--blue-700); }
.ml-lesson-host .array-cell.dim { background: var(--bg-alt); border-color: var(--border); color: var(--text-muted); }
.ml-lesson-host .array-dim-label { font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-muted); text-align: center; margin-top: 0.35rem; }

/* Charts & diagrams */
.ml-lesson-host .chart-container {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 1.25rem 1.25rem 0.75rem;
  margin: 1.75rem 0 1.25rem;
}
.ml-lesson-host .chart-caption {
  font-size: 0.8rem; color: var(--text-muted); text-align: center; font-style: italic; margin: 0.5rem 0 0.25rem;
}
.ml-lesson-host .diagram-controls {
  display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;
  background: var(--bg-alt); border: 1px solid var(--border); border-radius: var(--r-md);
  padding: 0.85rem 1.1rem; margin-bottom: 1rem;
}
.ml-lesson-host .diagram-control-row { display: flex; align-items: center; gap: 0.65rem; flex: 1 1 220px; }
.ml-lesson-host .diagram-control-label { font-size: 0.8rem; font-weight: 600; color: var(--heading); white-space: nowrap; }
.ml-lesson-host .diagram-slider {
  flex: 1; appearance: none; -webkit-appearance: none; height: 5px; border-radius: 3px;
  background: var(--border-md); outline: none;
}
.ml-lesson-host .diagram-slider::-webkit-slider-thumb {
  appearance: none; -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%;
  background: var(--violet); border: 2px solid var(--bg-card); cursor: pointer;
}
.ml-lesson-host .diagram-slider::-moz-range-thumb {
  width: 16px; height: 16px; border-radius: 50%;
  background: var(--violet); border: 2px solid var(--bg-card); cursor: pointer;
}
.ml-lesson-host .diagram-control-value {
  font-family: var(--font-mono); font-size: 0.82rem; font-weight: 600; color: var(--violet); min-width: 3.4rem; text-align: right;
}
.ml-lesson-host .diagram-btn-group { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
.ml-lesson-host .diagram-btn {
  font-family: var(--font-sans); font-size: 0.8rem; font-weight: 600; padding: 0.45rem 0.9rem;
  border-radius: 20px; border: 1.5px solid var(--border-md); background: var(--bg-card); color: var(--text-muted);
  cursor: pointer; transition: border-color 0.15s, background 0.15s, color 0.15s;
}
.ml-lesson-host .diagram-btn:hover { border-color: var(--violet); color: var(--violet); }
.ml-lesson-host .diagram-btn.active { background: var(--violet); border-color: var(--violet); color: #fff; }
.ml-lesson-host .chart-row { display: flex; gap: 1.25rem; flex-wrap: wrap; }
.ml-lesson-host .chart-row .chart-container { flex: 1 1 280px; margin-top: 0; }
.ml-lesson-host .diagram-svg-wrap {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-lg);
  padding: 1.5rem; margin: 1.75rem 0 1.25rem; overflow-x: auto; text-align: center;
}
.ml-lesson-host .diagram-svg-wrap svg { max-width: 100%; height: auto; }
.ml-lesson-host .diagram-svg-caption { font-size: 0.8rem; color: var(--text-muted); text-align: center; font-style: italic; margin-top: 0.75rem; }
.ml-lesson-host .diagram-node { fill: var(--blue-50); stroke: var(--blue); stroke-width: 1.5; transition: fill 0.15s, stroke-width 0.15s; }
.ml-lesson-host .diagram-node:hover { fill: var(--blue-100); stroke-width: 2.5; }
.ml-lesson-host .diagram-node-alt { fill: var(--violet-50); stroke: var(--violet); stroke-width: 1.5; transition: fill 0.15s, stroke-width 0.15s; }
.ml-lesson-host .diagram-node-alt:hover { fill: var(--violet-100); stroke-width: 2.5; }
.ml-lesson-host .diagram-node-good { fill: var(--green-50); stroke: var(--green); stroke-width: 1.5; transition: fill 0.15s, stroke-width 0.15s; }
.ml-lesson-host .diagram-node-good:hover { fill: var(--green-100); stroke-width: 2.5; }
.ml-lesson-host .diagram-node-bad { fill: var(--amber-50); stroke: var(--amber); stroke-width: 1.5; transition: fill 0.15s, stroke-width 0.15s; }
.ml-lesson-host .diagram-node-bad:hover { fill: var(--amber-100); stroke-width: 2.5; }
.ml-lesson-host .diagram-arrow { stroke: var(--text-muted); stroke-width: 1.75; fill: none; marker-end: url(#diagram-arrowhead); }
.ml-lesson-host .diagram-label { font-family: var(--font-sans); font-size: 12px; font-weight: 600; fill: var(--heading); text-anchor: middle; }
.ml-lesson-host .diagram-sublabel { font-family: var(--font-sans); font-size: 10.5px; fill: var(--text-muted); text-anchor: middle; }
.ml-lesson-host .diagram-mono-label { font-family: var(--font-mono); font-size: 11px; font-weight: 600; text-anchor: middle; }

/* Concept videos (Remotion-rendered) */
.ml-lesson-host .video-container {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 1rem 1rem 0.75rem;
  margin: 1.75rem 0 1.25rem;
}
.ml-lesson-host .video-container video {
  width: 100%;
  height: auto;
  border-radius: var(--r-md);
  display: block;
  background: #1a1d27;
}
.ml-lesson-host .video-caption {
  font-size: 0.8rem; color: var(--text-muted); text-align: center; font-style: italic; margin: 0.6rem 0 0.25rem;
}

/* Real-world use case */
.ml-lesson-host .use-case-section {
  background: var(--teal-50);
  border: 1px solid var(--teal-100);
  border-radius: var(--r-xl);
  padding: 2rem;
  margin: 2.5rem 0;
}
.ml-lesson-host .use-case-header { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1rem; }
.ml-lesson-host .use-case-header h2 { font-size: 1rem; font-weight: 700; color: var(--teal); margin: 0; display: block; text-transform: none; letter-spacing: 0; }
.ml-lesson-host .use-case-section p, .ml-lesson-host .use-case-section li { font-size: 0.9rem; }

/* Quiz */
.ml-lesson-host .quiz-section { margin: 3rem 0; }
.ml-lesson-host .quiz { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r-xl); overflow: hidden; }
.ml-lesson-host .quiz-title {
  background: var(--violet-50);
  padding: 1rem 1.5rem;
  font-weight: 700; font-size: 0.95rem;
  color: var(--violet);
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; gap: 0.5rem;
}
.ml-lesson-host .quiz-question { padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); transition: background 0.2s; }
.ml-lesson-host .quiz-question:last-of-type { border-bottom: none; }
.ml-lesson-host .quiz-question.answered-correct { background: var(--green-50); }
.ml-lesson-host .quiz-question.answered-wrong   { background: var(--red-50); }
.ml-lesson-host .quiz-question-header { display: flex; align-items: flex-start; gap: 0.7rem; margin-bottom: 0.85rem; }
.ml-lesson-host .quiz-q-number {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 1.6rem; height: 1.6rem;
  background: var(--violet-50); color: var(--violet);
  border-radius: 50%; font-size: 0.72rem; font-weight: 700; flex-shrink: 0;
}
.ml-lesson-host .quiz-q-text { font-size: 0.9rem; font-weight: 500; color: var(--heading); line-height: 1.5; }
.ml-lesson-host .quiz-options { display: flex; flex-direction: column; gap: 0.4rem; padding-left: 2.3rem; }
.ml-lesson-host .quiz-option {
  display: flex; align-items: center; gap: 0.65rem;
  padding: 0.5rem 0.9rem;
  border-radius: var(--r-md); border: 1.5px solid var(--border);
  cursor: pointer; transition: all 0.15s ease; background: var(--bg-alt);
}
.ml-lesson-host .quiz-option:hover { border-color: var(--violet); background: var(--violet-50); }
.ml-lesson-host .quiz-option.selected { border-color: var(--violet); background: var(--violet-50); }
.ml-lesson-host .quiz-option.correct  { border-color: var(--green); background: var(--green-50); cursor: default; }
.ml-lesson-host .quiz-option.wrong    { border-color: var(--red);   background: var(--red-50);   cursor: default; }
.ml-lesson-host .quiz-option-letter {
  display: inline-flex; align-items: center; justify-content: center;
  width: 1.3rem; height: 1.3rem; border-radius: var(--r-sm);
  background: var(--border); color: var(--text-muted);
  font-size: 0.68rem; font-weight: 700; flex-shrink: 0; transition: all 0.15s;
}
.ml-lesson-host .quiz-option.selected .quiz-option-letter { background: var(--violet); color: white; }
.ml-lesson-host .quiz-option.correct  .quiz-option-letter { background: var(--green);  color: white; }
.ml-lesson-host .quiz-option.wrong    .quiz-option-letter { background: var(--red);    color: white; }
.ml-lesson-host .quiz-option-text { font-size: 0.85rem; color: var(--text-base); font-family: var(--font-mono); line-height: 1.4; }
.ml-lesson-host .quiz-explanation { margin-top: 0.65rem; padding: 0.65rem 0.9rem; border-radius: var(--r-sm); font-size: 0.82rem; line-height: 1.6; display: none; }
.ml-lesson-host .quiz-explanation.correct { background: var(--green-100); color: var(--green); display: block; }
.ml-lesson-host .quiz-explanation.wrong   { background: var(--red-100);   color: var(--red);   display: block; }
.ml-lesson-host .quiz-explanation.hidden  { display: none; }
.ml-lesson-host .quiz-footer { padding: 1rem 1.5rem; border-top: 1px solid var(--border); background: var(--bg-alt); }
.ml-lesson-host .quiz-submit-btn {
  padding: 0.6rem 1.5rem; background: var(--violet); color: white;
  border: none; border-radius: var(--r-md);
  font-family: var(--font-sans); font-size: 0.85rem; font-weight: 600;
  cursor: pointer; transition: background 0.15s;
}
.ml-lesson-host .quiz-submit-btn:hover:not(:disabled) { background: var(--blue-700); }
.ml-lesson-host .quiz-submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.ml-lesson-host .quiz-result { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; }
.ml-lesson-host .quiz-score  { font-weight: 700; font-size: 1rem; color: var(--heading); }
.ml-lesson-host .quiz-feedback { font-size: 0.85rem; color: var(--text-muted); flex: 1; }
.ml-lesson-host .quiz-retry-btn {
  padding: 0.45rem 1.1rem; background: transparent; color: var(--violet);
  border: 1.5px solid var(--violet); border-radius: var(--r-md);
  font-family: var(--font-sans); font-size: 0.8rem; font-weight: 600;
  cursor: pointer; transition: all 0.15s;
}
.ml-lesson-host .quiz-retry-btn:hover { background: var(--violet); color: white; }

/* Practice card */
.ml-lesson-host .practice-card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--r-lg); padding: 1.5rem 1.75rem; margin: 2.5rem 0;
}
.ml-lesson-host .practice-card h2 {
  font-size: 0.85rem; font-weight: 700; color: var(--amber);
  text-transform: uppercase; letter-spacing: 0.04em;
  margin-top: 0; margin-bottom: 0.75rem; display: block;
}
.ml-lesson-host .practice-card ol { padding-left: 1.25rem; }
.ml-lesson-host .practice-card li { font-size: 0.9rem; margin-bottom: 0.4rem; }

/* Details/summary (expandable hints) */
.ml-lesson-host details {
  margin-top: 1rem; border: 1px solid var(--border);
  border-radius: var(--r-md); overflow: hidden;
}
.ml-lesson-host summary {
  padding: 0.7rem 1rem; cursor: pointer;
  font-size: 0.85rem; font-weight: 600; color: var(--violet);
  background: var(--violet-50); user-select: none;
  list-style: none; display: flex; align-items: center; gap: 0.4rem;
}
.ml-lesson-host summary::before { content: '▶'; font-size: 0.6rem; transition: transform 0.2s; }
.ml-lesson-host details[open] summary::before { transform: rotate(90deg); }
.ml-lesson-host details[open] summary { border-bottom: 1px solid var(--border); }
.ml-lesson-host details pre { margin: 0; border-radius: 0; }

/* Primary source / Ask tutor */
.ml-lesson-host .primary-source {
  background: var(--blue-50); border: 1px solid var(--blue-100);
  border-radius: var(--r-lg); padding: 1.25rem 1.5rem; margin: 2rem 0;
}
.ml-lesson-host .primary-source h2 {
  font-size: 0.85rem; font-weight: 700; color: var(--blue);
  text-transform: uppercase; letter-spacing: 0.05em;
  margin-top: 0; margin-bottom: 0.5rem; display: block;
}
.ml-lesson-host .primary-source p { font-size: 0.88rem; color: var(--text-muted); margin: 0; }
.ml-lesson-host .primary-source a { color: var(--blue); font-weight: 500; }
.ml-lesson-host .ask-tutor {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--r-lg); padding: 1.25rem 1.5rem; margin: 2rem 0;
  color: var(--text-muted); font-size: 0.88rem; line-height: 1.65;
  display: flex; align-items: center; gap: 0.75rem;
}
.ml-lesson-host .ask-tutor .icon { font-size: 1.4rem; flex-shrink: 0; }

/* Utility */
.ml-lesson-host .divider { border: none; border-top: 1px solid var(--border); margin: 2rem 0; }
.ml-lesson-host .text-muted  { color: var(--text-muted); }
.ml-lesson-host .text-mono   { font-family: var(--font-mono); font-size: 0.85em; }
.ml-lesson-host .tag-chip    {
  display: inline-block; padding: 0.15rem 0.6rem; border-radius: 20px;
  font-size: 0.72rem; font-weight: 600;
  background: var(--bg-alt); color: var(--text-muted); margin-right: 0.3rem;
}

/* Bottom nav (React-rendered, outside .ml-lesson-host) */
.ml-lesson-bottom-nav { background: #0f1117; border-top: 1px solid #2e3350; }
.ml-lesson-bottom-nav-inner { max-width: 700px; margin: 0 auto; padding: 24px 32px; display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.ml-lesson-nav-link { display: flex; flex-direction: column; gap: 4px; padding: 12px 16px; border: 1px solid #2e3350; border-radius: 8px; text-decoration: none; transition: border-color 0.15s, background 0.15s; flex: 1; min-width: 160px; max-width: 280px; }
.ml-lesson-nav-link:hover { border-color: #7c6ff7; background: #1a1d27; }
.ml-lesson-nav-link--next { text-align: right; margin-left: auto; }
.ml-lesson-nav-link--complete { cursor: default; opacity: 0.6; }
.ml-lesson-nav-link--complete:hover { border-color: #2e3350; background: transparent; }
.ml-lesson-nav-dir   { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: #7c6ff7; text-transform: uppercase; letter-spacing: 0.06em; }
.ml-lesson-nav-title { font-family: 'Inter', system-ui, sans-serif; font-size: 0.88rem; color: #e2e4f0; font-weight: 500; }

@media (max-width: 640px) {
  .ml-lesson-host .lesson-main { padding: 0 1rem 4rem; }
  .ml-lesson-host .quiz-option-text { font-size: 0.8rem; }
}
`;
