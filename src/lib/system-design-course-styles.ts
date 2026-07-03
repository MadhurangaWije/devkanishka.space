// Shared CSS for the System Design course. Scoped to .sd-lesson-host.
// Adapted from assets/styles.css (a light, Tufte-inspired serif theme) into
// the site's dark theme. Per-lesson <style> blocks (quiz widgets, interview
// accordions, the glossary) are injected separately as `lessonCss` — this
// file supplies dark-theme overrides for those under compound selectors
// (`.sd-lesson-host .foo`), which always win over the injected bare-class
// rules (`.foo`) on specificity, regardless of DOM insertion order.
export const SD_COURSE_CSS = `
.sd-lesson-host {
  color-scheme: dark;
  --bg:            #0f1117;
  --text:          #e2e4f0;
  --text-muted:    #8b90a8;
  --accent:        #f87171;
  --accent-blue:   #7c6ff7;
  --accent-green:  #4ade80;
  --accent-orange: #fbbf24;
  --accent-purple: #a78bfa;
  --border:        #2e3350;
  --code-bg:       #171a26;
  --card-bg:       #1a1d27;
  --shadow:        0 2px 8px rgba(0,0,0,0.3);
  --font-body:  'Inter', system-ui, sans-serif;
  --font-heading: 'Inter', system-ui, sans-serif;
  --font-mono:  'JetBrains Mono', 'Fira Code', monospace;
  --max-width: 760px;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.8;
  min-height: 100%;
}

.sd-lesson-host *, .sd-lesson-host *::before, .sd-lesson-host *::after {
  box-sizing: border-box;
}

.sd-lesson-host .lesson-main {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 2.5rem 1.5rem 5rem;
}

.sd-lesson-host h1, .sd-lesson-host h2, .sd-lesson-host h3, .sd-lesson-host h4 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.3;
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
  color: #ffffff;
}

.sd-lesson-host h1 { font-size: 1.9rem; border-bottom: 3px solid var(--accent); padding-bottom: 0.5rem; margin-top: 0; }
.sd-lesson-host h2 { font-size: 1.4rem; color: var(--accent-blue); }
.sd-lesson-host h3 { font-size: 1.15rem; color: var(--text); }

.sd-lesson-host p { margin-bottom: 1.2rem; }

.sd-lesson-host a { color: var(--accent-blue); text-decoration: underline; text-decoration-thickness: 1px; }
.sd-lesson-host a:hover { color: var(--accent); }

.sd-lesson-host code {
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: var(--code-bg);
  color: #c9d1e0;
  padding: 0.15em 0.4em;
  border-radius: 3px;
}

.sd-lesson-host pre {
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1.2rem;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  line-height: 1.5;
}

.sd-lesson-host pre code { background: none; padding: 0; }

.sd-lesson-host blockquote {
  border-left: 4px solid var(--accent-blue);
  padding: 0.8rem 1.2rem;
  margin: 1.5rem 0;
  background: rgba(124, 111, 247, 0.08);
  font-style: italic;
}

.sd-lesson-host blockquote strong { font-style: normal; }

/* Lesson metadata */
.sd-lesson-host .lesson-meta {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}
.sd-lesson-host .lesson-meta span { margin-right: 1.5rem; }

/* Diagrams (inline SVG figures) */
.sd-lesson-host .diagram { margin: 2rem 0; text-align: center; }
.sd-lesson-host .diagram svg { max-width: 100%; height: auto; background: transparent; }
.sd-lesson-host .diagram figcaption { font-family: var(--font-heading); font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem; text-align: center; }

/* Info/concept cards */
.sd-lesson-host .card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: var(--shadow);
}
.sd-lesson-host .card.highlight { border-left: 4px solid var(--accent); }
.sd-lesson-host .card.info { border-left: 4px solid var(--accent-blue); }
.sd-lesson-host .card.success { border-left: 4px solid var(--accent-green); }
.sd-lesson-host .card.warning { border-left: 4px solid var(--accent-orange); }
.sd-lesson-host .card h3 { margin-top: 0; font-size: 1.1rem; }

/* Key takeaway box */
.sd-lesson-host .takeaway {
  background: linear-gradient(135deg, rgba(74, 222, 128, 0.08), rgba(124, 111, 247, 0.08));
  border: 2px solid var(--accent-green);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
}
.sd-lesson-host .takeaway h3 { color: var(--accent-green); margin-top: 0; }

/* Comparison tables */
.sd-lesson-host table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem; }
.sd-lesson-host th, .sd-lesson-host td { padding: 0.75rem 1rem; text-align: left; border-bottom: 1px solid var(--border); }
.sd-lesson-host th { font-family: var(--font-heading); font-weight: 600; background: var(--code-bg); color: var(--text); }
.sd-lesson-host tr:hover { background: rgba(124, 111, 247, 0.06); }

/* Lists */
.sd-lesson-host ul, .sd-lesson-host ol { margin-bottom: 1.2rem; padding-left: 1.5rem; }
.sd-lesson-host li { margin-bottom: 0.4rem; }

/* Real-world example boxes */
.sd-lesson-host .real-world {
  background: rgba(251, 191, 36, 0.08);
  border: 1px solid var(--accent-orange);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.sd-lesson-host .real-world::before {
  content: "\\1F3E2 Real-World Example";
  display: block;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--accent-orange);
  margin-bottom: 0.75rem;
}

/* Interactive elements */
.sd-lesson-host .interactive {
  border: 2px dashed var(--accent-purple);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  background: rgba(167, 139, 250, 0.05);
}
.sd-lesson-host .interactive::before {
  content: "\\26A1 Interactive";
  display: block;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--accent-purple);
  margin-bottom: 0.75rem;
}

/* Form controls — browser UA defaults give these a white background
   regardless of surrounding theme, even though text color inherits, so
   they need an explicit dark background or the (inherited light) text
   becomes invisible against native white. */
.sd-lesson-host input[type="text"],
.sd-lesson-host input[type="number"],
.sd-lesson-host input:not([type]),
.sd-lesson-host textarea,
.sd-lesson-host select {
  background: var(--code-bg) !important;
  color: var(--text) !important;
  border-color: var(--border);
  -webkit-appearance: none;
  appearance: none;
}
.sd-lesson-host select option {
  background: var(--code-bg);
  color: var(--text);
}

/* Buttons for interactive elements */
.sd-lesson-host button {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  padding: 0.5rem 1.2rem;
  border: 2px solid var(--accent-blue);
  background: transparent;
  color: var(--accent-blue);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}
.sd-lesson-host button:hover { background: var(--accent-blue); color: #0f1117; }
.sd-lesson-host button.primary { background: var(--accent-blue); color: #0f1117; }
.sd-lesson-host button.primary:hover { background: #6457e8; }

/* Component-info reveal box used in Lesson 1's interactive demo */
.sd-lesson-host #component-info {
  background: var(--card-bg) !important;
  border: 1px solid var(--border) !important;
  color: var(--text) !important;
}

/* Progress indicators */
.sd-lesson-host .progress-bar { width: 100%; height: 8px; background: var(--border); border-radius: 4px; overflow: hidden; margin: 1rem 0; }
.sd-lesson-host .progress-bar .fill { height: 100%; background: var(--accent-green); border-radius: 4px; transition: width 0.3s ease; }

/* Footnotes */
.sd-lesson-host .footnote { font-size: 0.8rem; color: var(--text-muted); border-top: 1px solid var(--border); margin-top: 3rem; padding-top: 1rem; }

/* ── Quiz widget — variant A (Chapters 1–10) ──────────────────────────────
   Bare classes from the source's per-file <style> block: .quiz-progress,
   .dot, .question-card, .options, .option-btn, .explanation, .score-card,
   .nav-row, .btn. Overridden here at higher specificity for dark theme. */
.sd-lesson-host .quiz-progress { display: flex; gap: 4px; margin: 1rem 0; flex-wrap: wrap; }
.sd-lesson-host .quiz-progress .dot { width: 24px; height: 24px; border-radius: 50%; background: var(--border); color: var(--text); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; }
.sd-lesson-host .dot.correct { background: rgba(74, 222, 128, 0.18); color: var(--accent-green); }
.sd-lesson-host .dot.wrong { background: rgba(248, 113, 113, 0.18); color: var(--accent); }
.sd-lesson-host .dot.current { outline: 2px solid var(--accent-blue); }
.sd-lesson-host .question-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem; margin: 1rem 0; }
.sd-lesson-host .options { list-style: none; padding: 0; display: grid; gap: 0.5rem; }
.sd-lesson-host .option-btn { width: 100%; text-align: left; padding: 0.75rem 1rem; border: 2px solid var(--border); border-radius: 6px; background: var(--code-bg); color: var(--text); cursor: pointer; font-size: 0.95rem; transition: border-color 0.2s; font-family: var(--font-heading); }
.sd-lesson-host .option-btn:hover:not(:disabled) { border-color: var(--accent-blue); }
.sd-lesson-host .option-btn:disabled { cursor: default; }
.sd-lesson-host .option-btn.selected-correct, .sd-lesson-host .option-btn.reveal-correct { border-color: var(--accent-green); background: rgba(74, 222, 128, 0.12); }
.sd-lesson-host .option-btn.selected-wrong { border-color: var(--accent); background: rgba(248, 113, 113, 0.12); }
.sd-lesson-host .explanation { margin-top: 0.5rem; padding: 0.5rem 0.75rem; font-size: 0.85rem; border-radius: 4px; display: none; color: var(--text-muted); }
.sd-lesson-host .explanation.show { display: block; }
.sd-lesson-host .explanation.correct-exp { background: rgba(74, 222, 128, 0.1); color: var(--accent-green); }
.sd-lesson-host .explanation.wrong-exp { background: rgba(248, 113, 113, 0.1); color: var(--accent); }
.sd-lesson-host .score-card { text-align: center; padding: 2rem; }
.sd-lesson-host .score-card h2 { margin-bottom: 0.5rem; margin-top: 0; }
.sd-lesson-host .nav-row { display: flex; justify-content: space-between; margin-top: 1.5rem; flex-wrap: wrap; gap: 0.5rem; }
.sd-lesson-host .btn { padding: 0.5rem 1rem; border-radius: 6px; background: var(--accent-blue); color: #0f1117; text-decoration: none; border: none; cursor: pointer; font-size: 0.9rem; font-family: var(--font-heading); display: inline-block; }
.sd-lesson-host .btn:hover { background: #6457e8; }
.sd-lesson-host .btn.secondary { background: var(--border); color: var(--text); }

/* ── Quiz widget — variant B (Chapters 11–15) ─────────────────────────────
   Bare classes: .quiz-option, .explanation, .score-box, .quiz-nav. Reuses
   .card (already dark-themed above) for question wrappers. */
.sd-lesson-host .quiz-option { display: block; margin: 0.4rem 0; padding: 0.7rem 1rem; border: 2px solid var(--border); border-radius: 8px; cursor: pointer; transition: background 0.2s; color: var(--text); }
.sd-lesson-host .quiz-option:hover:not(.disabled) { background: var(--code-bg); }
.sd-lesson-host .quiz-option.correct { border-color: var(--accent-green); background: rgba(74, 222, 128, 0.12); }
.sd-lesson-host .quiz-option.wrong { border-color: var(--accent); background: rgba(248, 113, 113, 0.12); }
.sd-lesson-host .quiz-option.disabled { cursor: default; opacity: 0.85; }
.sd-lesson-host .score-box { text-align: center; font-size: 1.3rem; margin: 2rem 0; padding: 1.5rem; }
.sd-lesson-host .quiz-nav { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
.sd-lesson-host .quiz-nav a { text-decoration: none; }

/* ── Interview Q&A — variant A (Chapters 1–3) ─────────────────────────────
   Bare classes: .question-card (reused role — bordered card), .answer-block,
   .key-points, .follow-ups, .btn-reveal. */
.sd-lesson-host .question-card h3 { color: var(--text); }
.sd-lesson-host .answer-block { display: none; margin-top: 1rem; padding: 1rem; background: var(--code-bg); border-left: 4px solid var(--accent-blue); border-radius: 4px; }
.sd-lesson-host .answer-block.visible { display: block; }
.sd-lesson-host .answer-block p { line-height: 1.7; color: var(--text); }
.sd-lesson-host .key-points { background: rgba(74, 222, 128, 0.08); padding: 0.75rem 1rem; border-radius: 4px; margin-top: 1rem; }
.sd-lesson-host .key-points h4 { margin: 0 0 0.5rem; color: var(--accent-green); margin-top: 0; }
.sd-lesson-host .key-points ul { margin: 0; padding-left: 1.2rem; }
.sd-lesson-host .follow-ups { margin-top: 1rem; font-style: italic; color: var(--text-muted); }
.sd-lesson-host .btn-reveal { background: var(--accent-blue); color: #0f1117; border: none; padding: 0.5rem 1.2rem; border-radius: 4px; cursor: pointer; font-size: 0.95rem; font-family: var(--font-heading); }
.sd-lesson-host .btn-reveal:hover { background: #6457e8; }

/* ── Interview Q&A — variant B (Chapters 4–15) ────────────────────────────
   Bare classes: .question-block, .answer, .key-points, .follow-ups,
   .btn-show, .nav-row, .btn (nav-row/btn already covered above). */
.sd-lesson-host .question-block { margin: 2rem 0; padding: 1.5rem; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; }
.sd-lesson-host .question-block h3 { margin-top: 0; color: var(--accent-blue); font-size: 1.1rem; }
.sd-lesson-host .answer { display: none; margin-top: 1rem; padding: 1rem; background: var(--code-bg); border-radius: 6px; font-size: 0.95rem; line-height: 1.7; color: var(--text); }
.sd-lesson-host .answer p { margin-bottom: 0.8rem; }
.sd-lesson-host .answer.visible { display: block; }
.sd-lesson-host .follow-ups strong { color: var(--text); }
.sd-lesson-host .btn-show { padding: 0.4rem 1rem; border-radius: 5px; background: var(--accent-blue); color: #0f1117; border: none; cursor: pointer; font-size: 0.85rem; font-family: var(--font-heading); }
.sd-lesson-host .btn-show:hover { opacity: 0.85; }

/* ── Glossary ──────────────────────────────────────────────────────────── */
.sd-lesson-host .glossary-nav { position: sticky; top: 0; background: var(--bg); z-index: 10; padding: 0.75rem 0; border-bottom: 2px solid var(--border); display: flex; flex-wrap: wrap; gap: 0.25rem; align-items: center; }
.sd-lesson-host .glossary-nav a { display: inline-block; width: 2rem; height: 2rem; line-height: 2rem; text-align: center; border-radius: 0.375rem; font-weight: 600; font-size: 0.875rem; color: var(--text-muted); text-decoration: none; transition: background 0.15s; }
.sd-lesson-host .glossary-nav a:hover, .sd-lesson-host .glossary-nav a.active { background: var(--accent-blue); color: #0f1117; }
.sd-lesson-host .glossary-nav a.disabled { color: var(--border); pointer-events: none; }
.sd-lesson-host .search-box { margin: 1rem 0; position: relative; }
.sd-lesson-host .search-box input { width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border: 2px solid var(--border); background: var(--code-bg); color: var(--text); border-radius: 0.5rem; font-size: 1rem; outline: none; transition: border-color 0.2s; }
.sd-lesson-host .search-box input:focus { border-color: var(--accent-blue); }
.sd-lesson-host .search-box::before { content: "\\1F50D"; position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); font-size: 1rem; }
.sd-lesson-host .letter-group { margin: 2rem 0 1rem; scroll-margin-top: 5rem; }
.sd-lesson-host .letter-group h2 { font-size: 1.5rem; color: var(--text); border-bottom: 2px solid var(--accent-blue); padding-bottom: 0.25rem; display: inline-block; margin-top: 0; }
.sd-lesson-host .term { padding: 0.5rem 0; border-bottom: 1px solid var(--border); display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.5rem; margin-bottom: 0; }
.sd-lesson-host .term-name { font-weight: 700; color: var(--text); min-width: 180px; }
.sd-lesson-host .term-def { flex: 1; color: var(--text-muted); min-width: 200px; }
.sd-lesson-host .badge { display: inline-block; padding: 0.1rem 0.45rem; border-radius: 0.75rem; font-size: 0.7rem; font-weight: 600; color: #fff; white-space: nowrap; }
.sd-lesson-host .no-results { display: none; text-align: center; padding: 2rem; color: var(--text-muted); font-size: 1.125rem; }

/* ── Bottom prev/next nav (matches the ML & DL Mastery course's own copy) ── */
.sd-lesson-bottom-nav { background: #0f1117; border-top: 1px solid #2e3350; }
.sd-lesson-bottom-nav-inner { max-width: 760px; margin: 0 auto; padding: 24px 32px; display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.sd-lesson-nav-link { display: flex; flex-direction: column; gap: 4px; padding: 12px 16px; border: 1px solid #2e3350; border-radius: 8px; text-decoration: none; transition: border-color 0.15s, background 0.15s; flex: 1; min-width: 160px; max-width: 280px; }
.sd-lesson-nav-link:hover { border-color: #7c6ff7; background: #1a1d27; }
.sd-lesson-nav-link--next { text-align: right; margin-left: auto; }
.sd-lesson-nav-link--complete { cursor: default; opacity: 0.6; }
.sd-lesson-nav-link--complete:hover { border-color: #2e3350; background: transparent; }
.sd-lesson-nav-dir { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: #7c6ff7; text-transform: uppercase; letter-spacing: 0.06em; }
.sd-lesson-nav-title { font-family: 'Inter', system-ui, sans-serif; font-size: 0.88rem; color: #e2e4f0; font-weight: 500; }

@media (max-width: 600px) {
  .sd-lesson-host { font-size: 15px; }
  .sd-lesson-host h1 { font-size: 1.5rem; }
  .sd-lesson-host table { font-size: 0.8rem; }
  .sd-lesson-host th, .sd-lesson-host td { padding: 0.5rem; }
  .sd-lesson-host .term-name { min-width: 120px; }
}
`;
