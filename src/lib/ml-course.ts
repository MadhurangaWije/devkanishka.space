import fs from 'fs';
import path from 'path';
import type { LessonMeta, PhaseMeta } from '@/lib/backend-course';

export type { LessonMeta as MLLessonMeta, PhaseMeta as MLPhaseMeta };

export type MLLessonData = LessonMeta & {
  phaseNumber: number;
  phaseName: string;
  bodyHtml: string;
  script: string;
  prev: { slug: string; title: string; urlSegment: string } | null;
  next: { slug: string; title: string; urlSegment: string } | null;
};

// ── Phase definitions ──────────────────────────────────────────────────────

export const ML_PHASES: PhaseMeta[] = [
  {
    number: 1,
    name: 'Phase 1 — Data Science Foundations',
    urlSegment: 'phase-1',
    contentDir: 'ml-mastery',
    lessons: [
      { slug: 'numpy-arrays-fundamentals',     title: 'NumPy Arrays & Shapes',          subtitle: 'The backbone of every ML library — how Python represents numbers at speed, and why it matters for every algorithm you\'ll ever build.', number: 1, file: '0001-numpy-arrays-fundamentals.html' },
      { slug: 'numpy-operations-broadcasting', title: 'NumPy Operations & Broadcasting', subtitle: 'How NumPy does math on millions of numbers at once — the engine behind matrix multiplication, gradient computation, and feature normalization.', number: 2, file: '0002-numpy-operations-broadcasting.html' },
      { slug: 'pandas-dataframes',             title: 'Pandas DataFrames & Series',     subtitle: 'The tool every ML engineer uses to load, inspect, and understand raw data — before any model is trained.', number: 3, file: '0003-pandas-dataframes.html' },
      { slug: 'pandas-data-cleaning',          title: 'Pandas Data Cleaning & EDA',     subtitle: 'The work that makes or breaks every ML project — handling missing values, fixing data types, and extracting insights before you touch a model.', number: 4, file: '0004-pandas-data-cleaning.html' },
    ],
  },
];

// ── Nav link rewriting ─────────────────────────────────────────────────────

const COURSE_BASE = '/tutorials/ml-and-dl-mastery';

const NAV_LINK_MAP: Record<string, string> = {
  '0000-overview.html':                       `${COURSE_BASE}`,
  '0001-numpy-arrays-fundamentals.html':      `${COURSE_BASE}/phase-1/numpy-arrays-fundamentals`,
  '0002-numpy-operations-broadcasting.html':  `${COURSE_BASE}/phase-1/numpy-operations-broadcasting`,
  '0003-pandas-dataframes.html':              `${COURSE_BASE}/phase-1/pandas-dataframes`,
  '0004-pandas-data-cleaning.html':           `${COURSE_BASE}/phase-1/pandas-data-cleaning`,
};

function replaceNavLinks(html: string): string {
  let result = html;
  for (const [file, route] of Object.entries(NAV_LINK_MAP)) {
    result = result.split(`href="${file}"`).join(`href="${route}"`);
    result = result.split(`href="./${file}"`).join(`href="${route}"`);
    result = result.split(`href="../${file}"`).join(`href="${route}"`);
  }
  return result;
}

// ── Quiz widget (inlined from assets/quiz.js) ──────────────────────────────

const ML_QUIZ_JS = `class MLQuiz {
  constructor(containerId, questions) {
    this.id = containerId;
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.questions = questions;
    this.state = questions.map(() => ({ selected: null, locked: false }));
    this._render();
  }
  _render() {
    const c = this.container;
    c.className = 'quiz';
    c.innerHTML = '';
    const title = this._el('div', 'quiz-title');
    title.innerHTML = '<span>&#x1F9E0;</span> Knowledge Check — ' + this.questions.length + ' Questions';
    c.appendChild(title);
    this.questions.forEach((q, qi) => c.appendChild(this._renderQ(q, qi)));
    const footer = this._el('div', 'quiz-footer');
    footer.id = this.id + '--footer';
    const btn = this._el('button', 'quiz-submit-btn');
    btn.textContent = 'Check My Answers';
    btn.disabled = true;
    btn.addEventListener('click', () => this._submitAll());
    footer.appendChild(btn);
    c.appendChild(footer);
  }
  _renderQ(q, qi) {
    const card = this._el('div', 'quiz-question');
    card.id = this.id + '--q' + qi;
    const header = this._el('div', 'quiz-question-header');
    const num = this._el('span', 'quiz-q-number');
    num.textContent = 'Q' + (qi + 1);
    const text = this._el('span', 'quiz-q-text');
    text.textContent = q.question;
    header.appendChild(num); header.appendChild(text);
    card.appendChild(header);
    const opts = this._el('div', 'quiz-options');
    q.options.forEach((opt, oi) => {
      const optEl = this._el('div', 'quiz-option');
      optEl.id = this.id + '--q' + qi + '--o' + oi;
      optEl.dataset.qi = qi; optEl.dataset.oi = oi;
      const letter = this._el('span', 'quiz-option-letter');
      letter.textContent = String.fromCharCode(65 + oi);
      const txt = this._el('span', 'quiz-option-text');
      txt.textContent = opt;
      optEl.appendChild(letter); optEl.appendChild(txt);
      optEl.addEventListener('click', () => this._select(qi, oi));
      opts.appendChild(optEl);
    });
    card.appendChild(opts);
    const expl = this._el('div', 'quiz-explanation hidden');
    expl.id = this.id + '--q' + qi + '--expl';
    card.appendChild(expl);
    return card;
  }
  _select(qi, oi) {
    if (this.state[qi].locked) return;
    this.state[qi].selected = oi;
    this.questions[qi].options.forEach((_, i) => {
      const el = document.getElementById(this.id + '--q' + qi + '--o' + i);
      if (el) el.classList.toggle('selected', i === oi);
    });
    this._updateSubmitBtn();
  }
  _updateSubmitBtn() {
    const allAnswered = this.state.every(s => s.selected !== null);
    const btn = document.querySelector('#' + this.id + '--footer .quiz-submit-btn');
    if (btn) btn.disabled = !allAnswered;
  }
  _submitAll() {
    let correct = 0;
    this.questions.forEach((q, qi) => {
      const s = this.state[qi];
      if (s.selected === null) return;
      s.locked = true;
      const isCorrect = s.selected === q.correct;
      if (isCorrect) correct++;
      const card = document.getElementById(this.id + '--q' + qi);
      card.classList.add(isCorrect ? 'answered-correct' : 'answered-wrong');
      q.options.forEach((_, oi) => {
        const el = document.getElementById(this.id + '--q' + qi + '--o' + oi);
        if (!el) return;
        el.classList.remove('selected');
        if (oi === q.correct) el.classList.add('correct');
        else if (oi === s.selected) el.classList.add('wrong');
      });
      const expl = document.getElementById(this.id + '--q' + qi + '--expl');
      if (expl) {
        expl.className = 'quiz-explanation ' + (isCorrect ? 'correct' : 'wrong');
        expl.innerHTML = '<strong>' + (isCorrect ? '\\u2713 Correct!' : '\\u2717 Not quite. The answer is ' + String.fromCharCode(65 + q.correct) + '.') + '</strong> ' + q.explanation;
      }
    });
    const total = this.questions.length;
    const pct = Math.round((correct / total) * 100);
    const grade = pct >= 80 ? 'great' : pct >= 60 ? 'ok' : 'review';
    const msgs = { great: '\\uD83C\\uDF89 Excellent work! You\\'re ready to move on.', ok: '\\uD83D\\uDC4D Solid effort. Read the explanations above, then move on.', review: '\\uD83D\\uDCDA Review the lesson and try again when you\\'re ready.' };
    const footer = document.getElementById(this.id + '--footer');
    footer.innerHTML = '<div class="quiz-result"><span class="quiz-score">' + correct + ' / ' + total + ' correct (' + pct + '%)</span><span class="quiz-feedback">' + msgs[grade] + '</span><button class="quiz-retry-btn" onclick="location.reload()">↺ Try Again</button></div>';
  }
  _el(tag, cls) { const el = document.createElement(tag); el.className = cls; return el; }
}`;

// ── HTML parsing ───────────────────────────────────────────────────────────

function parseMLLesson(rawHtml: string): { bodyHtml: string; script: string } {
  // Extract <main class="lesson-main"> … </main>
  const mainStart = rawHtml.indexOf('<main class="lesson-main">');
  const mainEnd   = rawHtml.lastIndexOf('</main>');
  let bodyHtml =
    mainStart !== -1 && mainEnd !== -1
      ? rawHtml.slice(mainStart, mainEnd + '</main>'.length)
      : rawHtml.slice(rawHtml.indexOf('<body>') + '<body>'.length, rawHtml.indexOf('</body>')).trim();

  bodyHtml = replaceNavLinks(bodyHtml);

  // Extract inline scripts only (ignore src= scripts and Prism CDN)
  const inlineScripts: string[] = [];
  const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g;
  let match: RegExpExecArray | null;
  while ((match = scriptRegex.exec(rawHtml)) !== null) {
    const content = match[1].trim();
    if (content) inlineScripts.push(content);
  }

  // Deduplicate (some lessons have duplicate blocks)
  const seen = new Set<string>();
  const uniqueScripts = inlineScripts.filter((s) => {
    if (seen.has(s)) return false;
    seen.add(s);
    return true;
  });

  const script = ML_QUIZ_JS + '\n\n' + uniqueScripts.join('\n\n');
  return { bodyHtml, script };
}

// ── Public API ─────────────────────────────────────────────────────────────

export function getMLLessonData(phaseNumber: number, slug: string): MLLessonData {
  const phase = ML_PHASES.find((p) => p.number === phaseNumber);
  if (!phase) throw new Error(`ML phase not found: ${phaseNumber}`);

  const lessonIndex = phase.lessons.findIndex((l) => l.slug === slug);
  if (lessonIndex === -1) throw new Error(`ML lesson not found: ${slug}`);

  const meta = phase.lessons[lessonIndex];
  const contentDir = path.join(process.cwd(), 'src', 'content', phase.contentDir);
  const rawHtml = fs.readFileSync(path.join(contentDir, meta.file), 'utf-8');
  const { bodyHtml, script } = parseMLLesson(rawHtml);

  const prevLesson = lessonIndex > 0 ? phase.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < phase.lessons.length - 1 ? phase.lessons[lessonIndex + 1] : null;

  return {
    ...meta,
    phaseNumber: phase.number,
    phaseName: phase.name,
    bodyHtml,
    script,
    prev: prevLesson ? { ...prevLesson, urlSegment: phase.urlSegment } : null,
    next: nextLesson ? { ...nextLesson, urlSegment: phase.urlSegment } : null,
  };
}
