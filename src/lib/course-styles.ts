// Shared CSS for all lesson pages. Scoped to .lesson-host so it doesn't
// leak into the portfolio site's own styles.
export const SHARED_COURSE_CSS = `
.lesson-host {
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
  --lh-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --lh-sans: 'Inter', system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  font-family: var(--lh-sans);
  font-size: 16px;
  line-height: 1.8;
  min-height: 100%;
}
.lesson-host .page { max-width: 700px; margin: 0 auto; padding: 48px 32px 32px; }

/* Typography */
.lesson-host h1 { font-family: var(--lh-sans); font-size: 2rem; font-weight: 700; line-height: 1.2; color: #fff; margin-bottom: 8px; letter-spacing: -0.02em; }
.lesson-host h2 { font-family: var(--lh-sans); font-size: 1.35rem; font-weight: 700; color: #fff; margin: 2.75rem 0 1rem; line-height: 1.3; border-bottom: 2px solid var(--accent); padding-bottom: 0.5rem; scroll-margin-top: 6rem; }
.lesson-host h3 { font-family: var(--lh-sans); font-size: 1.1rem; font-weight: 600; color: #fff; margin: 24px 0 8px; }
.lesson-host h4 { font-family: var(--lh-sans); }
.lesson-host p  { color: var(--text); margin-bottom: 16px; font-family: var(--lh-sans); font-weight: 400; line-height: 1.85; }
.lesson-host a  { color: var(--accent); text-decoration: none; }
.lesson-host a:hover { text-decoration: underline; }
.lesson-host strong { font-weight: 600; }
.lesson-host em { color: var(--accent2); font-style: normal; font-weight: 500; }

/* Meta / header */
.lesson-host .lesson-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; flex-wrap: wrap; }
.lesson-host .phase-badge { background: var(--surface2); border: 1px solid var(--border); color: var(--text-muted); font-size: 0.72rem; font-weight: 600; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.06em; font-family: var(--lh-mono); }
.lesson-host .lesson-number { color: var(--text-dim); font-size: 0.8rem; font-family: var(--lh-mono); }
.lesson-host .divider { border: none; border-top: 1px solid var(--border); margin: 32px 0; }

/* Progress bar */
.lesson-host .progress-bar { background: var(--surface2); border-radius: 999px; height: 6px; margin-bottom: 32px; overflow: hidden; }
.lesson-host .progress-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--accent), var(--accent2)); transition: width 0.4s ease; }

/* Code */
.lesson-host pre { background: var(--code-bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px 24px; overflow-x: auto; margin: 20px 0; }
.lesson-host code { font-family: var(--lh-mono); font-size: 0.88rem; color: #c9d1e0; }
.lesson-host p code, .lesson-host li code { background: var(--surface2); border: 1px solid var(--border); padding: 2px 6px; border-radius: 4px; font-size: 0.85em; color: var(--accent2); }
.lesson-host .comment { color: #4c5470; }
.lesson-host .kw  { color: #a78bfa; }
.lesson-host .fn  { color: #60a5fa; }
.lesson-host .str { color: #86efac; }
.lesson-host .num { color: #fb923c; }
.lesson-host .type { color: #f472b6; }

/* Cards & callouts */
.lesson-host .card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px 24px; margin: 16px 0; }
.lesson-host .callout { border-left: 3px solid var(--accent); background: var(--surface); padding: 16px 20px; border-radius: 0 var(--radius) var(--radius) 0; margin: 20px 0; }
.lesson-host .callout.tip  { border-color: var(--accent2); }
.lesson-host .callout.warn { border-color: var(--warning); }
.lesson-host .callout.danger { border-color: var(--danger); }
.lesson-host .callout-label { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; color: var(--accent); font-family: var(--lh-mono); }
.lesson-host .callout.tip .callout-label  { color: var(--accent2); }
.lesson-host .callout.warn .callout-label { color: var(--warning); }
.lesson-host .callout.danger .callout-label { color: var(--danger); }

/* Lists */
.lesson-host ul, .lesson-host ol { padding-left: 24px; margin-bottom: 16px; }
.lesson-host li { margin-bottom: 6px; color: var(--text); font-family: var(--lh-sans); }
.lesson-host li::marker { color: var(--accent); }

/* Quiz */
.lesson-host .quiz { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; margin: 32px 0; }
.lesson-host .quiz h3 { color: var(--accent2); margin: 0 0 16px; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.06em; }
.lesson-host .quiz-q { font-size: 1rem; font-weight: 500; color: #fff; margin-bottom: 16px; line-height: 1.5; font-family: var(--lh-sans); }
.lesson-host .quiz-options { display: grid; gap: 8px; }
.lesson-host .quiz-btn { background: var(--surface2); border: 1px solid var(--border); color: var(--text); font-size: 0.9rem; padding: 12px 16px; border-radius: var(--radius); cursor: pointer; text-align: left; transition: border-color 0.15s, background 0.15s; font-family: var(--lh-sans); }
.lesson-host .quiz-btn:hover { border-color: var(--accent); background: #1e2236; }
.lesson-host .quiz-btn.correct { border-color: var(--accent2); background: #14291e; color: var(--accent2); }
.lesson-host .quiz-btn.wrong   { border-color: var(--danger);  background: #2a1414; color: var(--danger); }
.lesson-host .quiz-feedback { margin-top: 14px; font-size: 0.9rem; min-height: 24px; line-height: 1.5; color: var(--text); font-family: var(--lh-sans); }
.lesson-host .quiz-next { margin-top: 16px; background: var(--accent); color: #fff; border: none; padding: 10px 20px; border-radius: var(--radius); cursor: pointer; font-size: 0.9rem; display: none; font-family: var(--lh-sans); font-weight: 600; }
.lesson-host .quiz-next:hover { background: #6457e8; }

/* Hide the lesson's built-in nav — we render our own React nav below */
.lesson-host .lesson-nav { display: none !important; }

/* Ask Claude callout */
.lesson-host .ask-claude { background: linear-gradient(135deg, #1a1d27, #1e1b38); border: 1px solid #3b3568; border-radius: var(--radius); padding: 20px 24px; margin: 32px 0; text-align: center; }
.lesson-host .ask-claude p { color: var(--text-muted); margin: 0; font-size: 0.9rem; font-family: var(--lh-sans); }
.lesson-host .ask-claude strong { color: var(--accent); }

/* ASCII diagrams */
.lesson-host .diagram { background: var(--code-bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; margin: 20px 0; font-family: var(--lh-mono); font-size: 0.82rem; color: var(--text-muted); white-space: pre; overflow-x: auto; line-height: 1.6; }

/* Tables */
.lesson-host table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 0.9rem; font-family: var(--lh-sans); }
.lesson-host th { background: var(--surface2); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.06em; padding: 10px 14px; text-align: left; border-bottom: 1px solid var(--border); }
.lesson-host td { padding: 12px 14px; border-bottom: 1px solid var(--border); vertical-align: top; color: var(--text); }
.lesson-host tr:last-child td { border-bottom: none; }
.lesson-host tr:hover td { background: var(--surface); }
.lesson-host .tag { display: inline-block; font-size: 0.72rem; font-weight: 600; padding: 2px 8px; border-radius: 999px; margin: 2px; font-family: var(--lh-mono); }
.lesson-host .tag-beginner { background: #14291e; color: var(--accent2); border: 1px solid #1e4a2e; }
.lesson-host .tag-intermediate { background: #1e1b38; color: var(--accent); border: 1px solid #3b3568; }
.lesson-host .tag-advanced { background: #2a1a0e; color: var(--accent3); border: 1px solid #4a2e14; }

/* Bottom nav (React-rendered) */
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
