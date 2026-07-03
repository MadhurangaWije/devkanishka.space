import fs from 'fs';
import path from 'path';
import { extractHeadingsAndInjectIds, type LessonHeading } from '@/lib/lesson-toc';

export type LessonMeta = {
  slug: string;
  title: string;
  subtitle: string;
  number: number;
  file: string;
};

export type PhaseMeta = {
  number: number;
  name: string;
  urlSegment: string;
  contentDir: string;
  lessons: LessonMeta[];
};

export type LessonData = LessonMeta & {
  phaseNumber: number;
  phaseName: string;
  lessonCss: string;
  bodyHtml: string;
  script: string;
  headings: LessonHeading[];
  prev: { slug: string; title: string; urlSegment: string } | null;
  next: { slug: string; title: string; urlSegment: string } | null;
};

// ── Phase definitions ──────────────────────────────────────────────────────
// The source curriculum (52 lessons planned) has a gap at lessons 31-34
// (Dataclasses, Metaclasses, Memory, Testing) which were never written, so
// "Advanced" only lists the 6 lessons that actually exist. FastAPI and
// Python-in-ML/AI are entirely unwritten and shown as coming-soon phases.

export const PHASES: PhaseMeta[] = [
  {
    number: 1,
    name: 'Phase 1 — Python Foundations',
    urlSegment: 'phase-1',
    contentDir: 'python-a-to-z',
    lessons: [
      { slug: 'setup-and-hello-world',    title: 'Setup & Your First Program',    subtitle: "Install Python, meet the REPL, and run your first script.",              number: 1,  file: '0001-setup-and-hello-world.html' },
      { slug: 'variables-and-data-types', title: 'Variables & Data Types',        subtitle: "Names, values, and Python's dynamic typing model.",                       number: 2,  file: '0002-variables-and-data-types.html' },
      { slug: 'strings',                  title: 'Strings & String Methods',      subtitle: "Slicing, formatting, and the string methods you'll use daily.",           number: 3,  file: '0003-strings.html' },
      { slug: 'numbers-and-operators',    title: 'Numbers & Operators',           subtitle: "Arithmetic, operator precedence, and the quirks of floating point.",      number: 4,  file: '0004-numbers-and-operators.html' },
      { slug: 'booleans-and-comparisons', title: 'Booleans & Comparisons',        subtitle: "Truthiness, comparison chains, and short-circuit logic.",                 number: 5,  file: '0005-booleans-and-comparisons.html' },
      { slug: 'lists',                    title: 'Lists',                         subtitle: "Python's core mutable sequence — indexing, slicing, and key methods.",    number: 6,  file: '0006-lists.html' },
      { slug: 'tuples-and-sets',          title: 'Tuples & Sets',                 subtitle: "Immutability, uniqueness, and when to reach for each.",                   number: 7,  file: '0007-tuples-and-sets.html' },
      { slug: 'dictionaries',             title: 'Dictionaries',                  subtitle: "Key-value storage, the workhorse data structure of real Python code.",    number: 8,  file: '0008-dictionaries.html' },
      { slug: 'control-flow',             title: 'Control Flow (if / elif / else)', subtitle: "Branching logic and Python's indentation-based blocks.",                number: 9,  file: '0009-control-flow.html' },
      { slug: 'loops',                    title: 'Loops (for & while)',           subtitle: "Iterating with for and while — plus break, continue, and else.",          number: 10, file: '0010-loops.html' },
      { slug: 'functions',                title: 'Functions',                     subtitle: "Reusable, named blocks of logic — arguments, returns, and defaults.",     number: 11, file: '0011-functions.html' },
      { slug: 'scope',                    title: 'Scope & Namespaces',            subtitle: "Where names live, and how Python resolves them (LEGB).",                  number: 12, file: '0012-scope.html' },
      { slug: 'modules-and-imports',      title: 'Modules & Imports',             subtitle: "Organizing code across files and using the standard library.",            number: 13, file: '0013-modules-and-imports.html' },
    ],
  },
  {
    number: 2,
    name: 'Phase 2 — Intermediate Python',
    urlSegment: 'phase-2',
    contentDir: 'python-a-to-z',
    lessons: [
      { slug: 'file-io',              title: 'File I/O',                     subtitle: "Reading and writing files safely with context managers.",                number: 14, file: '0014-file-io.html' },
      { slug: 'exceptions',           title: 'Exceptions & Error Handling',  subtitle: "try/except/finally, and designing for failure on purpose.",              number: 15, file: '0015-exceptions.html' },
      { slug: 'comprehensions',       title: 'Comprehensions',               subtitle: "List, dict, and set comprehensions — Python's compact iteration syntax.", number: 16, file: '0016-comprehensions.html' },
      { slug: 'functional-tools',     title: 'Lambda, map, filter, reduce',  subtitle: "Functional-style tools for transforming data without writing loops.",    number: 17, file: '0017-functional-tools.html' },
      { slug: 'decorators',           title: 'Decorators',                   subtitle: "Wrapping functions to add behavior without changing their code.",         number: 18, file: '0018-decorators.html' },
      { slug: 'generators',           title: 'Generators & Iterators',       subtitle: "Lazy iteration with yield, and the protocol that powers for loops.",      number: 19, file: '0019-generators.html' },
      { slug: 'classes-basics',       title: 'Classes & OOP Basics',         subtitle: "Defining your own types — attributes, methods, and __init__.",           number: 20, file: '0020-classes-basics.html' },
      { slug: 'inheritance',          title: 'Inheritance & Polymorphism',   subtitle: "Sharing behavior across classes and overriding what changes.",           number: 21, file: '0021-inheritance.html' },
      { slug: 'magic-methods',        title: 'Magic Methods (Dunder)',       subtitle: "Making your objects behave like Python's built-in types.",              number: 22, file: '0022-magic-methods.html' },
      { slug: 'context-managers',     title: 'Context Managers',             subtitle: "The mechanics behind `with`, and writing your own.",                     number: 23, file: '0023-context-managers.html' },
      { slug: 'regex',                title: 'Regular Expressions',          subtitle: "Pattern matching with re — searching, extracting, and validating text.", number: 24, file: '0024-regex.html' },
      { slug: 'json-csv',             title: 'JSON & CSV Handling',          subtitle: "Reading and writing the two data formats you'll hit constantly.",        number: 25, file: '0025-json-csv.html' },
      { slug: 'venv-and-pip',         title: 'Virtual Environments & pip',   subtitle: "Isolating dependencies per project instead of polluting system Python.", number: 26, file: '0026-venv-and-pip.html' },
    ],
  },
  {
    number: 3,
    name: 'Phase 3 — Advanced Python',
    urlSegment: 'phase-3',
    contentDir: 'python-a-to-z',
    lessons: [
      { slug: 'threading',   title: 'Threading & the GIL',    subtitle: "Concurrency in Python, and why the GIL changes the rules.",           number: 27, file: '0027-threading.html' },
      { slug: 'multiprocessing', title: 'Multiprocessing',    subtitle: "True parallelism by sidestepping the GIL with separate processes.",    number: 28, file: '0028-multiprocessing.html' },
      { slug: 'asyncio',     title: 'Async / Await (asyncio)', subtitle: "Cooperative concurrency for I/O-bound work, without threads.",          number: 29, file: '0029-asyncio.html' },
      { slug: 'type-hints',  title: 'Type Hints & mypy',      subtitle: "Adding static types to Python without giving up dynamism.",             number: 30, file: '0030-type-hints.html' },
      { slug: 'logging',     title: 'Logging & Debugging',    subtitle: "Replacing print-debugging with proper, structured logging.",            number: 35, file: '0035-logging.html' },
      { slug: 'packaging',   title: 'Packaging & pyproject.toml', subtitle: "Turning a project into an installable, distributable package.",     number: 36, file: '0036-packaging.html' },
    ],
  },
];

export const COMING_SOON_PHASES = [
  'Phase 4 — FastAPI & Web APIs',
  'Phase 5 — Python for ML & AI',
];

// Flat lesson list for quick lookups
export const ALL_LESSONS: (LessonMeta & { phaseNumber: number; urlSegment: string })[] =
  PHASES.flatMap((p) => p.lessons.map((l) => ({ ...l, phaseNumber: p.number, urlSegment: p.urlSegment })));

// ── Shared client-side JS ported from the source course's assets/ ─────────
// (quiz.js + highlight.js). Declared with `var` rather than `const` at the
// top level so repeated injection across client-side lesson navigations
// doesn't throw "already declared" redeclaration errors.

const PY_QUIZ_JS = `var QuizWidget = (function () {
  "use strict";

  var quizState = {};
  var Q = String.fromCharCode(39); // a literal single-quote, kept out of the
                                    // onclick="..." attribute strings below so
                                    // nothing needs escaping at either the JS
                                    // or the outer-template-literal level.

  function render(containerId, questions) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var id = containerId;
    quizState[id] = { answers: {}, total: questions.length, correct: 0, questions: questions };

    var html = "" +
      "<h2>🧪 Quiz</h2>" +
      '<div class="quiz-score-bar">' +
        '<div class="quiz-progress"><div class="quiz-progress-fill" id="' + id + '-progress"></div></div>' +
        '<span class="quiz-score-text" id="' + id + '-score">0 / ' + questions.length + '</span>' +
      "</div>";

    questions.forEach(function (q, qi) {
      html += '<div class="quiz-question" id="' + id + '-q' + qi + '">';
      html += '<div class="quiz-q-text"><span class="quiz-q-number">Q' + (qi + 1) + '</span> ' + escHtml(q.question) + '</div>';
      html += '<div class="quiz-options">';

      q.options.forEach(function (opt, oi) {
        html += "" +
          '<div class="quiz-option" id="' + id + '-q' + qi + '-o' + oi + '"' +
          ' onclick="QuizWidget.select(' + Q + id + Q + ', ' + qi + ', ' + oi + ', ' + q.correct + ', ' + Q + escAttr(q.explanation) + Q + ')">' +
            '<span class="quiz-option-icon" id="' + id + '-q' + qi + '-o' + oi + '-icon">○</span>' +
            '<span>' + escHtml(opt) + '</span>' +
          '</div>';
      });

      html += '</div>';
      html += '<div class="quiz-explanation" id="' + id + '-q' + qi + '-exp">' + escHtml(q.explanation) + '</div>';
      html += '</div>';
    });

    html += "" +
      '<button class="quiz-btn" onclick="QuizWidget.reset(' + Q + id + Q + ')">' +
        '↺ Reset Quiz' +
      '</button>' +
      '<div class="quiz-result" id="' + id + '-result"></div>';

    container.innerHTML = html;
  }

  function select(containerId, questionIdx, optionIdx, correctIdx, explanation) {
    var id = containerId;
    var state = quizState[id];
    if (!state || state.answers[questionIdx] !== undefined) return;

    state.answers[questionIdx] = optionIdx;
    var isCorrect = optionIdx === correctIdx;
    if (isCorrect) state.correct++;

    var options = document.querySelectorAll('#' + id + '-q' + questionIdx + ' .quiz-option');
    options.forEach(function (el, i) {
      el.classList.add('answered');
      if (i === correctIdx) {
        el.classList.add(isCorrect && i === optionIdx ? 'correct' : 'reveal');
        el.querySelector('.quiz-option-icon').textContent = '✓';
      }
      if (i === optionIdx && !isCorrect) {
        el.classList.add('incorrect');
        el.querySelector('.quiz-option-icon').textContent = '✗';
      }
    });

    var expEl = document.getElementById(id + '-q' + questionIdx + '-exp');
    if (expEl) expEl.classList.add('visible');

    updateScore(id, state);
  }

  function updateScore(id, state) {
    var answered = Object.keys(state.answers).length;
    var pct = (answered / state.total) * 100;
    var progressEl = document.getElementById(id + '-progress');
    if (progressEl) progressEl.style.width = pct + '%';

    var scoreEl = document.getElementById(id + '-score');
    if (scoreEl) scoreEl.textContent = state.correct + ' / ' + state.total;

    if (answered === state.total) showResult(id, state);
  }

  function showResult(id, state) {
    var resultEl = document.getElementById(id + '-result');
    if (!resultEl) return;
    var pct = Math.round((state.correct / state.total) * 100);
    var pass = pct >= 60;
    resultEl.className = 'quiz-result visible ' + (pass ? 'pass' : 'fail');
    if (pass) {
      resultEl.textContent = '🎉 Great work! You scored ' + state.correct + '/' + state.total + ' (' + pct + '%). Ready for the next lesson!';
    } else {
      resultEl.textContent = '📚 You scored ' + state.correct + '/' + state.total + ' (' + pct + '%). Review the lesson and try again!';
    }
  }

  function reset(id) {
    var questions = quizState[id] && quizState[id].questions;
    if (!questions) return;
    render(id, questions);
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escAttr(str) {
    return String(str).replace(/'/g, "\\\\'").replace(/\\n/g, ' ');
  }

  return { render: render, select: select, reset: reset };
})();`;

const PY_HIGHLIGHT_JS = `(function () {
  "use strict";

  var PYTHON_KEYWORDS = new Set([
    "and","as","assert","async","await","break","class","continue","def","del",
    "elif","else","except","finally","for","from","global","if","import","in",
    "is","lambda","nonlocal","not","or","pass","raise","return","try","while",
    "with","yield","match","case"
  ]);

  var PYTHON_BUILTINS = new Set([
    "print","type","len","range","input","int","str","float","bool","list",
    "dict","set","tuple","open","super","object","property","staticmethod",
    "classmethod","enumerate","sorted","min","max","sum","zip","round","abs",
    "pow","divmod","isinstance","issubclass","all","any","map","filter",
    "reversed","next","iter","hash","id","repr","format","help","dir",
    "getattr","setattr","hasattr","callable","vars","globals","locals",
    "frozenset","namedtuple","ValueError","TypeError","KeyError","IndexError",
    "RuntimeError","StopIteration","Exception","ZeroDivisionError","AttributeError"
  ]);

  var PYTHON_CONSTANTS = new Set(["True", "False", "None"]);

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function tokenizePython(source) {
    var tokens = [];
    var i = 0;
    var len = source.length;

    while (i < len) {
      if ((source.startsWith('"""', i) || source.startsWith("'''", i))) {
        var quote3 = source.substring(i, i + 3);
        var end3 = source.indexOf(quote3, i + 3);
        if (end3 === -1) end3 = len - 3;
        end3 += 3;
        tokens.push({ type: "string", text: source.substring(i, end3) });
        i = end3;
      }
      else if (source[i] === '"' || source[i] === "'") {
        var quote = source[i];
        var j = i + 1;
        while (j < len && source[j] !== quote) {
          if (source[j] === '\\\\') j++;
          j++;
        }
        j++;
        tokens.push({ type: "string", text: source.substring(i, j) });
        i = j;
      }
      else if ((source[i] === 'f' || source[i] === 'r' || source[i] === 'b') &&
               (source[i + 1] === '"' || source[i + 1] === "'")) {
        var quote2 = source[i + 1];
        if (source[i + 1] === source[i + 2] && source[i + 2] === source[i + 3]) {
          var tripleQuote = source.substring(i + 1, i + 4);
          var end2 = source.indexOf(tripleQuote, i + 4);
          if (end2 === -1) end2 = len - 3;
          end2 += 3;
          tokens.push({ type: "string", text: source.substring(i, end2 + 1) });
          i = end2 + 1;
        } else {
          var j2 = i + 2;
          while (j2 < len && source[j2] !== quote2) {
            if (source[j2] === '\\\\') j2++;
            j2++;
          }
          j2++;
          tokens.push({ type: "string", text: source.substring(i, j2) });
          i = j2;
        }
      }
      else if (source[i] === '#') {
        var j3 = i;
        while (j3 < len && source[j3] !== '\\n') j3++;
        tokens.push({ type: "comment", text: source.substring(i, j3) });
        i = j3;
      }
      else {
        var j4 = i;
        while (j4 < len &&
               source[j4] !== '#' &&
               source[j4] !== '"' &&
               source[j4] !== "'" &&
               !((source[j4] === 'f' || source[j4] === 'r' || source[j4] === 'b') &&
                 (source[j4 + 1] === '"' || source[j4 + 1] === "'"))) {
          j4++;
        }
        if (j4 === i) j4++;
        tokens.push({ type: "code", text: source.substring(i, j4) });
        i = j4;
      }
    }
    return tokens;
  }

  function highlightPythonCode(text) {
    return text.replace(/(@\\w+)/g, '<span style="color:#ffd343">$1</span>')
      .replace(/\\b(\\w+)\\b/g, function (match) {
        if (PYTHON_CONSTANTS.has(match)) return '<span style="color:#ff5370">' + match + '</span>';
        if (PYTHON_KEYWORDS.has(match)) return '<span style="color:#c792ea">' + match + '</span>';
        if (PYTHON_BUILTINS.has(match)) return '<span style="color:#80cbc4">' + match + '</span>';
        return match;
      })
      .replace(/\\b(\\d+\\.?\\d*(?:e[+-]?\\d+)?)\\b/gi, '<span style="color:#f78c6c">$1</span>');
  }

  function highlightPython(source) {
    var tokens = tokenizePython(source);
    var result = "";
    for (var t = 0; t < tokens.length; t++) {
      var token = tokens[t];
      if (token.type === "string") {
        result += '<span style="color:#c3e88d">' + escapeHtml(token.text) + '</span>';
      } else if (token.type === "comment") {
        result += '<span style="color:#546e7a;font-style:italic">' + escapeHtml(token.text) + '</span>';
      } else {
        result += highlightPythonCode(escapeHtml(token.text));
      }
    }
    return result;
  }

  function highlightBash(source) {
    var lines = source.split('\\n');
    return lines.map(function (line) {
      var commentIdx = line.indexOf('#');
      if (commentIdx === 0) {
        return '<span style="color:#546e7a;font-style:italic">' + escapeHtml(line) + '</span>';
      }
      var code = commentIdx > 0 ? line.substring(0, commentIdx) : line;
      var comment = commentIdx > 0 ? line.substring(commentIdx) : "";

      code = escapeHtml(code)
        .replace(/\\b(python3?|brew|sudo|apt|dnf|pip3?|cd|ls|mkdir|rm|cp|mv|cat|echo|export|source|chmod)\\b/g,
          '<span style="color:#80cbc4">$1</span>')
        .replace(/(".*?"|'.*?')/g, '<span style="color:#c3e88d">$1</span>');

      if (comment) {
        comment = '<span style="color:#546e7a;font-style:italic">' + escapeHtml(comment) + '</span>';
      }
      return code + comment;
    }).join('\\n');
  }

  function highlightAll() {
    document.querySelectorAll("pre code").forEach(function (block) {
      var lang = block.className.includes("language-python") ? "python"
               : block.className.includes("language-bash") ? "bash"
               : null;
      if (!lang) return;

      var source = block.textContent;
      if (lang === "python") {
        block.innerHTML = highlightPython(source);
      } else if (lang === "bash") {
        block.innerHTML = highlightBash(source);
      }
    });
  }

  highlightAll();
})();`;

// ── HTML parsing ───────────────────────────────────────────────────────────

function parseLesson(rawHtml: string): { lessonCss: string; bodyHtml: string; script: string } {
  // At most one lesson-local <style> block (the shared course stylesheet is
  // linked externally in the source, not inlined, so there's nothing to skip).
  const styleMatch = rawHtml.match(/<style>([\s\S]*?)<\/style>/);
  const lessonCss = styleMatch ? styleMatch[1].trim() : '';

  // Body: from <body> up to the first bare <script> tag (the lesson's own
  // inline script). The bare "<script>" substring search itself correctly
  // lands past the four `<script src="...">` asset tags, but those tags
  // still sit textually *within* the sliced range and must be stripped
  // explicitly — otherwise the browser tries to fetch them relative to our
  // own site's URL (they only ever existed on the original static site).
  const bodyStart = rawHtml.indexOf('<body>');
  const scriptStart = rawHtml.indexOf('<script>', bodyStart);
  let bodyHtml =
    bodyStart !== -1 && scriptStart !== -1
      ? rawHtml.slice(bodyStart + '<body>'.length, scriptStart).trim()
      : '';

  bodyHtml = bodyHtml.replace(/<script\s+src="[^"]*"[^>]*>\s*<\/script>\s*/g, '');

  // The source's h2 tags already carry their own `id` attributes; strip them
  // so extractHeadingsAndInjectIds can inject its own toc-h-N ids without
  // producing a duplicate id attribute.
  bodyHtml = bodyHtml.replace(/<h2\s+id="[^"]*"/g, '<h2');

  // Script: content of the first bare <script> block, with the
  // buildLessonFooter() call stripped — that function comes from the
  // source's nav.js, which we don't load (prev/next nav is React-rendered).
  const scriptEnd = rawHtml.indexOf('</script>', scriptStart);
  let script =
    scriptStart !== -1 && scriptEnd !== -1
      ? rawHtml.slice(scriptStart + '<script>'.length, scriptEnd).trim()
      : '';
  script = script.replace(/\s*buildLessonFooter\(\);?/g, '');

  return { lessonCss, bodyHtml, script };
}

// ── Public API ─────────────────────────────────────────────────────────────

export function getLessonData(phaseNumber: number, slug: string): LessonData {
  const phase = PHASES.find((p) => p.number === phaseNumber);
  if (!phase) throw new Error(`Phase not found: ${phaseNumber}`);

  const lessonIndex = phase.lessons.findIndex((l) => l.slug === slug);
  if (lessonIndex === -1) throw new Error(`Lesson not found: ${slug}`);

  const meta = phase.lessons[lessonIndex];
  const contentDir = path.join(process.cwd(), 'src', 'content', phase.contentDir);
  const rawHtml = fs.readFileSync(path.join(contentDir, meta.file), 'utf-8');
  const { lessonCss, bodyHtml: parsedBodyHtml, script: lessonScript } = parseLesson(rawHtml);
  const { bodyHtml, headings } = extractHeadingsAndInjectIds(parsedBodyHtml);

  const script = PY_HIGHLIGHT_JS + '\n\n' + PY_QUIZ_JS + '\n\n' + lessonScript;

  const prevLesson = lessonIndex > 0 ? phase.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < phase.lessons.length - 1 ? phase.lessons[lessonIndex + 1] : null;

  return {
    ...meta,
    phaseNumber: phase.number,
    phaseName: phase.name,
    lessonCss,
    bodyHtml,
    script,
    headings,
    prev: prevLesson ? { ...prevLesson, urlSegment: phase.urlSegment } : null,
    next: nextLesson ? { ...nextLesson, urlSegment: phase.urlSegment } : null,
  };
}
