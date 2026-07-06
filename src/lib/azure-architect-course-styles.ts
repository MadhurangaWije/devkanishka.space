// Shared CSS for the Azure Solutions Architect course. Scoped to
// .azure-architect-lesson-host. Re-skins the source's light Tufte-serif
// styles.css into the site's dark theme. The 50-lesson source corpus itself
// drifted in class naming across lessons (callout / callout-warning /
// warning-box / info-box / note-box all express the same "warning" idea;
// similarly for "real world" and "exam tip" callouts, and half a dozen table
// variants) — several of those variants were never even styled in the
// original stylesheet. Rather than chase every exact name, this groups them
// by evident intent so nothing renders unstyled.
export const AZURE_ARCHITECT_COURSE_CSS = `
.azure-architect-lesson-host {
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
  --teal-50:    #0d1f1e;
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

.azure-architect-lesson-host *, .azure-architect-lesson-host *::before, .azure-architect-lesson-host *::after {
  box-sizing: border-box;
}

/* Typography */
.azure-architect-lesson-host h2 {
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
.azure-architect-lesson-host h2:first-child { margin-top: 0; }
.azure-architect-lesson-host h3 { font-size: 1.05rem; font-weight: 600; color: var(--heading); margin-top: 1.75rem; margin-bottom: 0.6rem; }
.azure-architect-lesson-host h4 { font-size: 0.95rem; font-weight: 600; color: var(--text-muted); margin-top: 1.5rem; margin-bottom: 0.5rem; }
.azure-architect-lesson-host p { font-size: 0.985rem; color: var(--text-base); line-height: 1.85; margin-bottom: 1.1rem; }
.azure-architect-lesson-host p:last-child { margin-bottom: 0; }
.azure-architect-lesson-host ul, .azure-architect-lesson-host ol { padding-left: 1.4rem; margin-bottom: 1.1rem; }
.azure-architect-lesson-host li { font-size: 0.985rem; line-height: 1.8; margin-bottom: 0.35rem; color: var(--text-base); }
.azure-architect-lesson-host li:last-child { margin-bottom: 0; }
.azure-architect-lesson-host strong { font-weight: 600; color: var(--heading); }
.azure-architect-lesson-host em { font-style: italic; color: var(--text-muted); }
.azure-architect-lesson-host a { color: var(--blue); text-decoration: none; }
.azure-architect-lesson-host a:hover { text-decoration: underline; }

/* Section badge (🟢 DEEP DIVE / 🟡 REVIEW / ⚪ SKIP) shown as a plain tag */
.azure-architect-lesson-host .tag {
  display: inline-block; font-size: 0.72rem; font-weight: 600; padding: 0.15em 0.6em;
  border-radius: 999px; background: var(--bg-alt); color: var(--teal); border: 1px solid var(--border);
}

/* Inline code */
.azure-architect-lesson-host code {
  font-family: var(--font-mono);
  font-size: 0.82em;
  background: var(--bg-alt);
  color: var(--violet);
  padding: 0.15em 0.45em;
  border-radius: var(--r-sm);
  border: 1px solid var(--border);
}

/* Code blocks */
.azure-architect-lesson-host pre, .azure-architect-lesson-host .code-block {
  background: var(--bg-code) !important;
  border-radius: var(--r-md);
  padding: 1.25rem 1.5rem;
  overflow-x: auto;
  margin: 1.25rem 0;
  border: 1px solid var(--border);
}
.azure-architect-lesson-host pre code {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  background: none !important;
  border: none !important;
  padding: 0;
  color: var(--text-base);
  line-height: 1.7;
}

/* Diagrams (box-and-arrow SVG rendered at runtime, plus any static ones) */
.azure-architect-lesson-host .diagram,
.azure-architect-lesson-host .box-diagram,
.azure-architect-lesson-host .diagram-container {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 1.5rem;
  margin: 1.75rem 0;
  text-align: center;
  overflow-x: auto;
}
.azure-architect-lesson-host .diagram svg,
.azure-architect-lesson-host .box-diagram svg,
.azure-architect-lesson-host .diagram-container svg { max-width: 100%; height: auto; }
.azure-architect-lesson-host .diagram figcaption,
.azure-architect-lesson-host .diagram-caption {
  font-size: 0.8rem; color: var(--text-muted); margin-top: 0.75rem; font-style: italic;
}

/* Plain HTML box/arrow diagrams (.box + color modifiers, used in a few lessons
   instead of the JS-rendered SVG diagrams) */
.azure-architect-lesson-host .box-row, .azure-architect-lesson-host .diagram-row {
  display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; margin: 1.25rem 0;
}
.azure-architect-lesson-host .box, .azure-architect-lesson-host .diagram-box {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0.6rem 1rem; border-radius: var(--r-md); font-size: 0.85rem; font-weight: 600;
  background: var(--bg-alt); border: 1px solid var(--border-md); color: var(--text-base);
}
.azure-architect-lesson-host .box.accent, .azure-architect-lesson-host .box.azure, .azure-architect-lesson-host .box.blue { background: var(--blue-50); border-color: var(--blue); color: var(--blue); }
.azure-architect-lesson-host .box.green { background: var(--green-50); border-color: var(--green); color: var(--green); }
.azure-architect-lesson-host .box.orange, .azure-architect-lesson-host .box.yellow { background: var(--amber-50); border-color: var(--amber); color: var(--amber); }
.azure-architect-lesson-host .box.red { background: var(--red-50); border-color: var(--red); color: var(--red); }
.azure-architect-lesson-host .box.purple { background: var(--violet-50); border-color: var(--violet); color: var(--violet); }
.azure-architect-lesson-host .box.dark, .azure-architect-lesson-host .box.gray, .azure-architect-lesson-host .box.aws, .azure-architect-lesson-host .box.gcp, .azure-architect-lesson-host .box.on-prem {
  background: var(--bg-code); border-color: var(--border-md); color: var(--text-muted);
}
.azure-architect-lesson-host .box-arrow, .azure-architect-lesson-host .diagram-arrow, .azure-architect-lesson-host .flow-arrow {
  color: var(--blue); font-size: 1.2rem;
}

/* Callouts — grouped by intent across the drifted class names */
.azure-architect-lesson-host .key-concept,
.azure-architect-lesson-host .callout,
.azure-architect-lesson-host .callout-info,
.azure-architect-lesson-host .info-box,
.azure-architect-lesson-host .note-box {
  background: var(--blue-50); border-left: 4px solid var(--blue);
  border-radius: 0 var(--r-md) var(--r-md) 0; padding: 1rem 1.25rem; margin: 1.75rem 0;
}
.azure-architect-lesson-host .key-concept::before { content: '\\1F511 Key Concept'; display: block; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--blue); margin-bottom: 0.5rem; }

.azure-architect-lesson-host .real-world,
.azure-architect-lesson-host .real-world-example,
.azure-architect-lesson-host .real-world-box,
.azure-architect-lesson-host .real-world-note,
.azure-architect-lesson-host .real-world-scenario,
.azure-architect-lesson-host .scenario-box,
.azure-architect-lesson-host .scenario-card {
  background: var(--green-50); border-left: 4px solid var(--green);
  border-radius: 0 var(--r-md) var(--r-md) 0; padding: 1rem 1.25rem; margin: 1.75rem 0;
}
.azure-architect-lesson-host .real-world-example::before { content: '\\1F310 Real-World Example'; display: block; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--green); margin-bottom: 0.5rem; }

.azure-architect-lesson-host .callout-warning,
.azure-architect-lesson-host .callout.warn,
.azure-architect-lesson-host .callout.warning,
.azure-architect-lesson-host .warning-box {
  background: var(--amber-50); border-left: 4px solid var(--amber);
  border-radius: 0 var(--r-md) var(--r-md) 0; padding: 1rem 1.25rem; margin: 1.75rem 0;
}
.azure-architect-lesson-host .callout-warning::before { content: '\\26A0\\FE0F Watch Out'; display: block; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--amber); margin-bottom: 0.5rem; }

.azure-architect-lesson-host .exam-tip,
.azure-architect-lesson-host .exam-tip-box,
.azure-architect-lesson-host .exam-tip-section,
.azure-architect-lesson-host .callout.exam-tip {
  background: var(--violet-50); border-left: 4px solid var(--violet);
  border-radius: 0 var(--r-md) var(--r-md) 0; padding: 1rem 1.25rem; margin: 1.75rem 0;
}
.azure-architect-lesson-host .exam-tip::before { content: '\\1F3AF Exam Tip'; display: block; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--violet); margin-bottom: 0.5rem; }

.azure-architect-lesson-host .callout p:last-child,
.azure-architect-lesson-host .key-concept p:last-child,
.azure-architect-lesson-host .real-world-example p:last-child,
.azure-architect-lesson-host .callout-warning p:last-child,
.azure-architect-lesson-host .exam-tip p:last-child { margin-bottom: 0; }

/* Tables — grouped variants all get the same clean dark treatment */
.azure-architect-lesson-host table,
.azure-architect-lesson-host .comparison-table,
.azure-architect-lesson-host .compare-table,
.azure-architect-lesson-host .compact-table,
.azure-architect-lesson-host .info-table,
.azure-architect-lesson-host .styled-table {
  width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.9rem;
}
.azure-architect-lesson-host th, .azure-architect-lesson-host td { padding: 0.65rem 0.9rem; text-align: left; border-bottom: 1px solid var(--border); vertical-align: top; }
.azure-architect-lesson-host th { font-weight: 600; background: var(--bg-alt); color: var(--heading); }
.azure-architect-lesson-host tr:hover td { background: var(--bg-alt); }

/* Two-column compare grid */
.azure-architect-lesson-host .compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1.5rem 0; }
.azure-architect-lesson-host .compare-grid .compare-col, .azure-architect-lesson-host .compare-col {
  background: var(--bg-alt); border: 1px solid var(--border); border-radius: var(--r-md); padding: 1rem 1.1rem;
}
.azure-architect-lesson-host .compare-col.pros { border-color: var(--green); }
.azure-architect-lesson-host .compare-col.cons { border-color: var(--red); }
.azure-architect-lesson-host .compare-grid .compare-col h4, .azure-architect-lesson-host .compare-header {
  margin: 0 0 0.6rem; font-size: 0.9rem; color: var(--blue); border-bottom: 1px solid var(--border); padding-bottom: 0.4rem;
}
.azure-architect-lesson-host .compare-cell.highlight { background: var(--blue-50); font-weight: 600; }
@media (max-width: 580px) { .azure-architect-lesson-host .compare-grid { grid-template-columns: 1fr; } }

/* Quiz (radio-button, self-scoring via AzureLessons.Quiz) */
.azure-architect-lesson-host .quiz,
.azure-architect-lesson-host .quiz-container,
.azure-architect-lesson-host .quiz-wrapper,
.azure-architect-lesson-host .quiz-section {
  background: var(--bg-card); border: 1px solid var(--border-md); border-radius: var(--r-lg);
  padding: 1.5rem 1.75rem; margin: 2.5rem 0;
}
.azure-architect-lesson-host .quiz h3 {
  font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--amber); margin: 0 0 1.25rem; border: none; padding: 0;
}
.azure-architect-lesson-host .quiz-question { margin-bottom: 1.5rem; }
.azure-architect-lesson-host .quiz-question p.question-text, .azure-architect-lesson-host .quiz-question > p { font-weight: 600; margin-bottom: 0.6rem; }
.azure-architect-lesson-host .quiz-options { list-style: none; margin: 0; padding: 0; }
.azure-architect-lesson-host .quiz-options li { margin: 0.35rem 0; }
.azure-architect-lesson-host .quiz-options label {
  display: flex; align-items: flex-start; gap: 0.5rem; cursor: pointer;
  font-size: 0.92rem; padding: 0.5rem 0.65rem; border-radius: var(--r-sm); transition: background 0.15s;
  color: var(--text-base);
}
.azure-architect-lesson-host .quiz-options label:hover { background: var(--bg-alt); }
.azure-architect-lesson-host .quiz-options input[type="radio"], .azure-architect-lesson-host .quiz-options input[type="checkbox"] { margin-top: 0.2em; flex-shrink: 0; }
.azure-architect-lesson-host .quiz-options li.correct label { background: var(--green-50); color: var(--green); border-radius: var(--r-sm); }
.azure-architect-lesson-host .quiz-options li.incorrect label { background: var(--red-50); color: var(--red); border-radius: var(--r-sm); }
.azure-architect-lesson-host .quiz-feedback, .azure-architect-lesson-host .quiz-explanation, .azure-architect-lesson-host .quiz-explain {
  font-size: 0.88rem; margin-top: 0.6rem; padding: 0.7rem 0.9rem; border-radius: var(--r-sm); display: none;
}
.azure-architect-lesson-host .quiz-feedback.show, .azure-architect-lesson-host .quiz-explanation:not(.hidden), .azure-architect-lesson-host .quiz-explain:not(.hidden) { display: block; }
.azure-architect-lesson-host .quiz-feedback.correct, .azure-architect-lesson-host .quiz-explanation.correct { background: var(--green-50); color: var(--green); }
.azure-architect-lesson-host .quiz-feedback.incorrect, .azure-architect-lesson-host .quiz-explanation.incorrect { background: var(--red-50); color: var(--red); }
.azure-architect-lesson-host .quiz-actions { margin-top: 1rem; display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center; }
.azure-architect-lesson-host .quiz-score { font-size: 0.9rem; font-weight: 600; color: var(--text-muted); }

/* Buttons (quiz submit/reset) */
.azure-architect-lesson-host .btn {
  display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.85rem; font-weight: 600;
  padding: 0.5rem 1.1rem; border: 1px solid transparent; border-radius: var(--r-sm); cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}
.azure-architect-lesson-host .btn-primary { background: var(--blue); color: #fff; border-color: var(--blue); }
.azure-architect-lesson-host .btn-primary:hover { background: #6457e8; border-color: #6457e8; }
.azure-architect-lesson-host .btn-secondary { background: transparent; color: var(--blue); border-color: var(--blue); }
.azure-architect-lesson-host .btn-secondary:hover { background: var(--blue-50); }
.azure-architect-lesson-host .btn-ghost { background: transparent; color: var(--text-muted); border-color: var(--border); }
.azure-architect-lesson-host .btn-ghost:hover { background: var(--bg-alt); color: var(--text-base); }
.azure-architect-lesson-host .btn:disabled { opacity: 0.5; cursor: default; }

/* Collapsible accordions */
.azure-architect-lesson-host .collapsible { border: 1px solid var(--border); border-radius: var(--r-md); margin: 1.25rem 0; overflow: hidden; }
.azure-architect-lesson-host .collapsible-header, .azure-architect-lesson-host .collapsible-toggle {
  display: flex; justify-content: space-between; align-items: center; padding: 0.85rem 1.1rem;
  background: var(--bg-alt); cursor: pointer; font-size: 0.95rem; font-weight: 600; color: var(--text-base);
  border: none; width: 100%; text-align: left; transition: background 0.15s;
}
.azure-architect-lesson-host .collapsible-header:hover { background: var(--bg-card); }
.azure-architect-lesson-host .collapsible-arrow { font-style: normal; transition: transform 0.2s; display: inline-block; font-size: 0.7rem; color: var(--text-muted); }
.azure-architect-lesson-host .collapsible.open .collapsible-arrow { transform: rotate(90deg); }
.azure-architect-lesson-host .collapsible-body, .azure-architect-lesson-host .collapsible-content { padding: 0; max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease; }
.azure-architect-lesson-host .collapsible.open .collapsible-body, .azure-architect-lesson-host .collapsible.open .collapsible-content { padding: 1rem 1.1rem; max-height: 3000px; }

/* Scroll-reveal targets: the source animates these in via IntersectionObserver
   (ScrollReveal.init adds .visible on first intersection). Almost every
   section in this course is wrapped in .fade-in, which means most of a
   lesson would sit at opacity:0 until manually scrolled past — a bad
   default for a reading experience (and invisible entirely on a fast
   scroll, print, or if JS is slow). Content stays fully visible by
   default here; only apply a subtle one-time transition on the .visible
   flip so the effect is a light touch rather than a hide/reveal gate. */
.azure-architect-lesson-host .fade-in,
.azure-architect-lesson-host .slide-in-left,
.azure-architect-lesson-host .slide-in-right,
.azure-architect-lesson-host .stagger-children > * {
  opacity: 1;
  transform: none;
  transition: opacity 0.4s ease, transform 0.4s ease;
}

/* Progress bars (data-progress, animated via ProgressBar.setAll) */
.azure-architect-lesson-host .progress-bar { height: 6px; background: var(--bg-alt); border-radius: 999px; overflow: hidden; margin: 1rem 0; }
.azure-architect-lesson-host .progress-bar > * { height: 100%; background: var(--blue); border-radius: 999px; transition: width 0.6s ease; }

/* Bottom nav (React-rendered, outside .azure-architect-lesson-host) */
.azure-architect-lesson-bottom-nav { background: #0f1117; border-top: 1px solid #2e3350; }
.azure-architect-lesson-bottom-nav-inner { max-width: 760px; margin: 0 auto; padding: 24px 32px; display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.azure-architect-lesson-nav-link { display: flex; flex-direction: column; gap: 4px; padding: 12px 16px; border: 1px solid #2e3350; border-radius: 8px; text-decoration: none; transition: border-color 0.15s, background 0.15s; flex: 1; min-width: 160px; max-width: 280px; }
.azure-architect-lesson-nav-link:hover { border-color: #7c6ff7; background: #1a1d27; }
.azure-architect-lesson-nav-link--next { text-align: right; margin-left: auto; }
.azure-architect-lesson-nav-link--complete { cursor: default; opacity: 0.6; }
.azure-architect-lesson-nav-link--complete:hover { border-color: #2e3350; background: transparent; }
.azure-architect-lesson-nav-dir { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: #7c6ff7; text-transform: uppercase; letter-spacing: 0.06em; }
.azure-architect-lesson-nav-title { font-family: 'Inter', system-ui, sans-serif; font-size: 0.88rem; color: #e2e4f0; font-weight: 500; }

@media (max-width: 640px) {
  .azure-architect-lesson-host { padding: 0 1rem 4rem; }
}
`;
