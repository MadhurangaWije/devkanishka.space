// Shared CSS for Python: Print to Production lesson pages. Scoped to
// .py-lesson-host so it doesn't leak into the portfolio site's own styles.
// Ported from the source course's assets/style.css (light theme) into the
// site's dark palette, reusing the same CSS variable names as the other
// course styles files for visual consistency across the whole site.
export const PY_COURSE_CSS = `
.py-lesson-host {
  --bg: #0f1117;
  --surface: #1a1d27;
  --surface2: #22263a;
  --border: #2e3350;
  --accent: #7c6ff7;
  --accent2: #4ade80;
  --accent3: #f97316;
  --text: #e2e4f0;
  --text-muted: #8b90a8;
  --text-dim: #555c7a;
  --code-bg: #12141f;
  --danger: #f87171;
  --warning: #fbbf24;
  --radius: 8px;
  --radius-sm: 4px;
  --radius-lg: 12px;
  --lh-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --lh-sans: 'Inter', system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  font-family: var(--lh-sans);
  font-size: 16px;
  line-height: 1.8;
  min-height: 100%;
}

/* ── Header ─────────────────────────────────────────────── */
.py-lesson-host #lesson-header {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 32px 32px 28px;
}

.py-lesson-host .lesson-track {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 999px;
  margin-bottom: 12px;
  font-family: var(--lh-mono);
}

.py-lesson-host .track-beginner { background: #14291e; color: var(--accent2); }
.py-lesson-host .track-intermediate { background: #1e2236; color: #60a5fa; }
.py-lesson-host .track-advanced { background: #2a1f45; color: #c4b5fd; }

.py-lesson-host #lesson-header h1 {
  font-family: var(--lh-sans);
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
  margin-bottom: 10px;
  letter-spacing: -0.01em;
}

.py-lesson-host .lesson-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 13px;
  color: var(--text-muted);
  font-family: var(--lh-mono);
}
.py-lesson-host .lesson-meta span { display: flex; align-items: center; gap: 4px; }

.py-lesson-host #content {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 32px 60px;
  width: 100%;
}

/* ── Typography ──────────────────────────────────────────── */
.py-lesson-host h2 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  margin: 2.5rem 0 0.75rem;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--accent);
  scroll-margin-top: 6rem;
}
.py-lesson-host h3 { font-size: 1.1rem; font-weight: 600; color: #fff; margin: 1.8rem 0 0.5rem; }
.py-lesson-host h4 { font-family: var(--lh-sans); }
.py-lesson-host p { margin-bottom: 1rem; color: var(--text); }
.py-lesson-host ul, .py-lesson-host ol { margin: 0.5rem 0 1rem 1.4rem; }
.py-lesson-host li { margin-bottom: 0.35rem; color: var(--text); }
.py-lesson-host li::marker { color: var(--accent); }
.py-lesson-host a { color: var(--accent); text-decoration: none; }
.py-lesson-host a:hover { text-decoration: underline; }
.py-lesson-host strong { font-weight: 600; }
.py-lesson-host em { color: var(--accent2); font-style: normal; }

/* ── Code ─────────────────────────────────────────────────── */
.py-lesson-host code {
  font-family: var(--lh-mono);
  font-size: 0.875em;
  background: var(--surface2);
  color: var(--accent2);
  padding: 1px 5px;
  border-radius: var(--radius-sm);
}

.py-lesson-host pre {
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow-x: auto;
  margin: 1.2rem 0;
  position: relative;
}

.py-lesson-host pre code {
  font-size: 13.5px;
  background: none;
  color: #c9d1e0;
  padding: 20px 24px;
  display: block;
  line-height: 1.65;
}

.py-lesson-host .code-label {
  position: absolute;
  top: 10px;
  right: 14px;
  font-size: 10px;
  font-weight: 600;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  pointer-events: none;
  font-family: var(--lh-mono);
}

/* ── Callout boxes ───────────────────────────────────────── */
.py-lesson-host .callout {
  border-radius: var(--radius);
  padding: 14px 18px;
  margin: 1.4rem 0;
  border-left: 4px solid;
  font-size: 0.95rem;
}

.py-lesson-host .callout-tip { background: #10241a; border-color: var(--accent2); }
.py-lesson-host .callout-tip::before { content: "💡 Tip: "; font-weight: 700; color: var(--accent2); }

.py-lesson-host .callout-warning,
.py-lesson-host .callout-warn { background: #2a220f; border-color: var(--warning); }
.py-lesson-host .callout-warning::before,
.py-lesson-host .callout-warn::before { content: "⚠️ Watch out: "; font-weight: 700; color: var(--warning); }

.py-lesson-host .callout-info { background: #16213a; border-color: #60a5fa; }
.py-lesson-host .callout-info::before { content: "ℹ️ Note: "; font-weight: 700; color: #60a5fa; }

.py-lesson-host .callout-concept { background: #1e1b38; border-color: var(--accent); }
.py-lesson-host .callout-concept::before { content: "🧠 Key Concept: "; font-weight: 700; color: var(--accent); }

/* ── Objectives ──────────────────────────────────────────── */
.py-lesson-host .objectives {
  background: linear-gradient(135deg, #1a1e2e, #182236);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  margin: 0 0 2rem;
}
.py-lesson-host .objectives h4 {
  font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--accent); margin-bottom: 10px; font-family: var(--lh-mono);
}
.py-lesson-host .objectives ul { margin: 0; padding-left: 1.2rem; }
.py-lesson-host .objectives li { font-size: 0.92rem; color: var(--text); margin-bottom: 4px; }

/* ── Tables ──────────────────────────────────────────────── */
.py-lesson-host table { width: 100%; border-collapse: collapse; margin: 1.2rem 0; font-size: 0.9rem; }
.py-lesson-host th {
  background: var(--surface2); color: var(--accent2); padding: 10px 14px; text-align: left;
  font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; font-family: var(--lh-mono);
}
.py-lesson-host td { padding: 9px 14px; border-bottom: 1px solid var(--border); vertical-align: top; color: var(--text); }
.py-lesson-host tr:hover td { background: var(--surface); }

/* ── Quiz ─────────────────────────────────────────────────── */
.py-lesson-host #quiz-section {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 32px;
  margin: 3rem 0 2rem;
}
.py-lesson-host #quiz-section h2 { border: none; padding-bottom: 0; margin-top: 0; font-size: 1.25rem; display: flex; align-items: center; gap: 10px; }

.py-lesson-host .quiz-score-bar { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.py-lesson-host .quiz-progress { flex: 1; height: 6px; background: var(--surface2); border-radius: 3px; overflow: hidden; }
.py-lesson-host .quiz-progress-fill {
  height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent2)); border-radius: 3px;
  transition: width 0.4s ease; width: 0%;
}
.py-lesson-host .quiz-score-text { font-size: 12px; font-weight: 600; color: var(--text-muted); min-width: 50px; text-align: right; font-family: var(--lh-mono); }

.py-lesson-host .quiz-question { margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid var(--border); }
.py-lesson-host .quiz-question:last-of-type { border-bottom: none; }
.py-lesson-host .quiz-q-text { font-weight: 600; font-size: 0.97rem; margin-bottom: 12px; color: #fff; line-height: 1.5; }
.py-lesson-host .quiz-q-number {
  display: inline-block; background: var(--accent); color: #fff; font-size: 10px; font-weight: 700;
  padding: 2px 7px; border-radius: 999px; margin-right: 6px; vertical-align: 1px; font-family: var(--lh-mono);
}

.py-lesson-host .quiz-options { display: flex; flex-direction: column; gap: 7px; }
.py-lesson-host .quiz-option {
  display: flex; align-items: flex-start; gap: 10px; padding: 10px 14px;
  border: 1.5px solid var(--border); border-radius: var(--radius);
  cursor: pointer; transition: all 0.15s ease; font-size: 0.9rem; line-height: 1.4;
  user-select: none; background: var(--surface2); color: var(--text);
}
.py-lesson-host .quiz-option:hover:not(.answered) { border-color: var(--accent); background: #1e2236; }
.py-lesson-host .quiz-option.correct { border-color: var(--accent2); background: #14291e; color: var(--accent2); }
.py-lesson-host .quiz-option.incorrect { border-color: var(--danger); background: #2a1414; color: var(--danger); }
.py-lesson-host .quiz-option.reveal { border-color: var(--accent2); background: #14291e; color: var(--accent2); opacity: 0.7; }
.py-lesson-host .quiz-option-icon { font-size: 14px; flex-shrink: 0; margin-top: 1px; }

.py-lesson-host .quiz-explanation {
  margin-top: 10px; padding: 10px 14px; background: var(--surface2);
  border-left: 3px solid var(--accent); border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-size: 0.88rem; color: var(--text); display: none; line-height: 1.5;
}
.py-lesson-host .quiz-explanation.visible { display: block; }

.py-lesson-host .quiz-btn {
  margin-top: 20px; padding: 11px 24px; background: var(--accent); color: #fff; border: none;
  border-radius: var(--radius); font-size: 14px; font-weight: 600; cursor: pointer;
  transition: background 0.15s, transform 0.15s; font-family: var(--lh-sans);
}
.py-lesson-host .quiz-btn:hover { background: #6457e8; transform: translateY(-1px); }

.py-lesson-host .quiz-result { margin-top: 16px; padding: 14px 18px; border-radius: var(--radius); font-weight: 600; font-size: 0.95rem; text-align: center; display: none; }
.py-lesson-host .quiz-result.visible { display: block; }
.py-lesson-host .quiz-result.pass { background: #14291e; color: var(--accent2); border: 1px solid var(--accent2); }
.py-lesson-host .quiz-result.fail { background: #2a220f; color: var(--warning); border: 1px solid var(--warning); }

/* ── Exercises ───────────────────────────────────────────── */
.py-lesson-host #exercise-section {
  background: linear-gradient(135deg, #0f172a, #1a1d27);
  border-radius: var(--radius-lg);
  padding: 28px 32px;
  margin: 2rem 0;
  color: var(--text);
}
.py-lesson-host #exercise-section h2 { color: var(--accent2); border-color: var(--border); font-size: 1.2rem; margin-top: 0; display: flex; align-items: center; gap: 10px; }

.py-lesson-host .exercise {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 22px;
  margin-bottom: 16px;
}
.py-lesson-host .exercise-title { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
.py-lesson-host .exercise-num { background: var(--accent2); color: #0f172a; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 999px; font-family: var(--lh-mono); }
.py-lesson-host .exercise p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 12px; }
.py-lesson-host .exercise pre { background: rgba(0,0,0,0.4); border-color: var(--border); margin: 8px 0; }
.py-lesson-host .exercise pre code { font-size: 13px; color: #c9d1e0; }

.py-lesson-host details.solution { margin-top: 12px; }
.py-lesson-host details.solution summary {
  cursor: pointer; font-size: 12px; font-weight: 600; color: var(--accent2);
  padding: 6px 0; user-select: none; display: flex; align-items: center; gap: 6px; font-family: var(--lh-mono);
}
.py-lesson-host details.solution summary::-webkit-details-marker { display: none; }
.py-lesson-host details.solution[open] summary::before { content: "▼ "; }
.py-lesson-host details.solution:not([open]) summary::before { content: "▶ "; }

/* ── Ask the AI reminder ─────────────────────────────────── */
.py-lesson-host .ask-ai-reminder {
  background: linear-gradient(135deg, #1a1d27, #1e1b38);
  border-radius: var(--radius-lg);
  padding: 18px 22px;
  margin: 2rem 0;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  color: var(--text);
  font-size: 0.9rem;
}
.py-lesson-host .ask-ai-reminder .ai-icon { font-size: 24px; flex-shrink: 0; margin-top: 2px; }
.py-lesson-host .ask-ai-reminder p { margin: 0; line-height: 1.5; }
.py-lesson-host .ask-ai-reminder strong { color: var(--accent); }

/* ── Primary source ──────────────────────────────────────── */
.py-lesson-host .primary-source {
  background: #2a220f;
  border: 1px solid #3a3010;
  border-radius: var(--radius);
  padding: 12px 16px;
  font-size: 0.88rem;
  margin: 1.5rem 0;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.py-lesson-host .primary-source::before { content: "📖"; font-size: 18px; flex-shrink: 0; }
.py-lesson-host .primary-source p { margin: 0; color: var(--warning); }
.py-lesson-host .primary-source a { color: var(--warning); font-weight: 600; }

/* ── Bottom nav (React-rendered) ─────────────────────────── */
.lesson-bottom-nav { background: #0f1117; border-top: 1px solid #2e3350; }
.lesson-bottom-nav-inner { max-width: 700px; margin: 0 auto; padding: 24px 32px; display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.lesson-nav-link { display: flex; flex-direction: column; gap: 4px; padding: 12px 16px; border: 1px solid #2e3350; border-radius: 8px; text-decoration: none; transition: border-color 0.15s, background 0.15s; flex: 1; min-width: 160px; max-width: 280px; }
.lesson-nav-link:hover { border-color: #7c6ff7; background: #1a1d27; }
.lesson-nav-link--next { text-align: right; margin-left: auto; }
.lesson-nav-link--complete { cursor: default; opacity: 0.6; }
.lesson-nav-link--complete:hover { border-color: #2e3350; background: transparent; }
.lesson-nav-dir { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: #7c6ff7; text-transform: uppercase; letter-spacing: 0.06em; }
.lesson-nav-title { font-family: 'Inter', system-ui, sans-serif; font-size: 0.88rem; color: #e2e4f0; font-weight: 500; }
`;
