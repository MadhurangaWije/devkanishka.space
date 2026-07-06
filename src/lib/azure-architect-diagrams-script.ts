// Inlined verbatim from generated-lessons/azure-solution-architecture/assets/diagrams.js
// Zero dependencies. Provides BoxDiagram (renders box-and-arrow SVG from
// data-diagram='{...}' JSON specs), ScrollReveal (fade/slide-in on scroll),
// Quiz (self-scoring radio-button quizzes), Collapsible (accordions), and
// ProgressBar — then auto-wires all of it via its own bottom-of-file
// readyState check the moment this script is appended to the page.
export const AZURE_ARCHITECT_DIAGRAMS_JS = `
(function (global) {
  'use strict';

  const SVG_NS = 'http://www.w3.org/2000/svg';

  function svgEl(tag, attrs) {
    const el = document.createElementNS(SVG_NS, tag);
    Object.entries(attrs || {}).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
  }

  function svgText(content, attrs) {
    const el = svgEl('text', attrs);
    el.textContent = content;
    return el;
  }

  function wrapText(textEl, words, maxChars, x, startY, lineHeight) {
    let line = '';
    let dy = 0;
    words.forEach((word, i) => {
      const test = line ? line + ' ' + word : word;
      if (test.length > maxChars && line) {
        const ts = svgEl('tspan', { x, dy: dy === 0 ? 0 : lineHeight });
        ts.textContent = line;
        textEl.appendChild(ts);
        line = word;
        dy = lineHeight;
      } else {
        line = test;
      }
      if (i === words.length - 1) {
        const ts = svgEl('tspan', { x, dy: dy === 0 ? 0 : lineHeight });
        ts.textContent = line;
        textEl.appendChild(ts);
      }
    });
  }

  const BoxDiagram = {

    _defaults: {
      node: { w: 140, h: 52, color: '#0066cc', textColor: '#ffffff', shape: 'rounded' },
      edge: { color: '#555555', style: 'solid', arrowSize: 8, bidirectional: false },
    },

    render(container, spec) {
      if (typeof container === 'string') container = document.querySelector(container);
      if (!container) { console.warn('BoxDiagram: container not found'); return null; }

      container.innerHTML = '';

      const W = spec.width  || 700;
      const H = spec.height || 300;

      const svg = svgEl('svg', {
        viewBox: '0 0 ' + W + ' ' + H,
        width:   '100%',
        role:    'img',
        'aria-label': spec.title || 'Architecture diagram',
        style:   'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; overflow: visible;',
      });

      const defs = svgEl('defs');
      defs.appendChild(this._makeArrow('arrow-default', '#555555'));
      defs.appendChild(this._makeArrow('arrow-accent',  '#0066cc'));
      defs.appendChild(this._makeArrow('arrow-success', '#28a745'));
      defs.appendChild(this._makeArrow('arrow-warn',    '#f59e0b'));
      defs.appendChild(this._makeShadowFilter());
      svg.appendChild(defs);

      (spec.groups || []).forEach(g => svg.appendChild(this._renderGroup(g)));

      const nodeMap = {};
      (spec.nodes || []).forEach(n => { nodeMap[n.id] = n; });

      const edgeLayer = svgEl('g', { class: 'edges' });
      (spec.edges || []).forEach(e => edgeLayer.appendChild(this._renderEdge(e, nodeMap)));
      svg.appendChild(edgeLayer);

      const nodeLayer = svgEl('g', { class: 'nodes' });
      (spec.nodes || []).forEach(n => nodeLayer.appendChild(this._renderNode(n)));
      svg.appendChild(nodeLayer);

      container.appendChild(svg);
      return svg;
    },

    _makeArrow(id, color) {
      const marker = svgEl('marker', {
        id, markerWidth: '10', markerHeight: '7',
        refX: '9', refY: '3.5', orient: 'auto',
      });
      marker.appendChild(svgEl('polygon', {
        points: '0 0, 10 3.5, 0 7',
        fill: color,
      }));
      return marker;
    },

    _makeShadowFilter() {
      const filter = svgEl('filter', { id: 'node-shadow', x: '-10%', y: '-10%', width: '120%', height: '130%' });
      const blur = svgEl('feDropShadow', { dx: '0', dy: '2', stdDeviation: '2', 'flood-opacity': '0.12' });
      filter.appendChild(blur);
      return filter;
    },

    _renderGroup(g) {
      const el = svgEl('g', { class: 'diagram-group' });
      el.appendChild(svgEl('rect', {
        x: g.x, y: g.y, width: g.w, height: g.h,
        rx: 10, ry: 10,
        fill: g.color || '#f0f4ff',
        stroke: g.borderColor || '#4285f4',
        'stroke-width': '1.5',
        'stroke-dasharray': '6,3',
      }));
      if (g.label) {
        el.appendChild(svgText(g.label, {
          x: g.x + 10,
          y: g.y + 16,
          'font-size': '11',
          'font-weight': '600',
          fill: g.borderColor || '#4285f4',
          'text-anchor': 'start',
        }));
      }
      return el;
    },

    _renderNode(n) {
      const d = this._defaults.node;
      const x    = n.x, y = n.y;
      const w    = n.w    || d.w;
      const h    = n.h    || d.h;
      const fill = n.color     || d.color;
      const fg   = n.textColor || d.textColor;
      const cx   = x + w / 2;
      const cy   = y + h / 2;

      const g = svgEl('g', { class: 'diagram-node', transform: 'translate(0,0)' });

      let shape;
      switch (n.shape || d.shape) {
        case 'rect':
          shape = svgEl('rect', { x, y, width: w, height: h, fill, filter: 'url(#node-shadow)' });
          break;
        case 'cylinder':
          shape = this._cylinderPath(x, y, w, h, fill);
          break;
        case 'diamond':
          shape = this._diamondPath(cx, cy, w, h, fill);
          break;
        default:
          shape = svgEl('rect', { x, y, width: w, height: h, rx: 8, ry: 8, fill, filter: 'url(#node-shadow)' });
      }
      g.appendChild(shape);

      if (n.icon) {
        g.appendChild(svgText(n.icon, {
          x: cx, y: cy - (n.label ? 6 : 0),
          'text-anchor': 'middle',
          'dominant-baseline': 'middle',
          'font-size': '16',
        }));
      }

      if (n.label) {
        const labelY = n.icon ? cy + 12 : cy;
        const textEl = svgEl('text', {
          x: cx, y: labelY,
          'text-anchor': 'middle',
          'dominant-baseline': 'middle',
          'font-size': '12',
          'font-weight': '600',
          fill: fg,
        });
        const words = n.label.split(' ');
        const maxCharsPerLine = Math.floor(w / 7);
        if (n.label.length > maxCharsPerLine) {
          wrapText(textEl, words, maxCharsPerLine, cx, labelY, 14);
        } else {
          textEl.textContent = n.label;
        }
        g.appendChild(textEl);
      }

      if (n.tooltip || n.description) {
        const title = svgEl('title');
        title.textContent = n.tooltip || n.description;
        g.insertBefore(title, g.firstChild);
      }

      return g;
    },

    _cylinderPath(x, y, w, h, fill) {
      const rx = w / 2, ry = 8;
      const cx = x + rx;
      const path = svgEl('g');
      path.appendChild(svgEl('rect', {
        x, y: y + ry, width: w, height: h - ry,
        fill, filter: 'url(#node-shadow)',
      }));
      path.appendChild(svgEl('ellipse', { cx, cy: y + ry, rx, ry, fill }));
      path.appendChild(svgEl('ellipse', { cx, cy: y + h, rx, ry, fill: 'none', stroke: fill, 'stroke-width': 0 }));
      return path;
    },

    _diamondPath(cx, cy, w, h, fill) {
      const hw = w / 2, hh = h / 2;
      return svgEl('polygon', {
        points: cx + ',' + (cy - hh) + ' ' + (cx + hw) + ',' + cy + ' ' + cx + ',' + (cy + hh) + ' ' + (cx - hw) + ',' + cy,
        fill, filter: 'url(#node-shadow)',
      });
    },

    _renderEdge(e, nodeMap) {
      const src = nodeMap[e.from];
      const dst = nodeMap[e.to];
      if (!src || !dst) return svgEl('g');

      const d  = this._defaults.edge;
      const sw = src.w || this._defaults.node.w;
      const sh = src.h || this._defaults.node.h;
      const dw = dst.w || this._defaults.node.w;
      const dh = dst.h || this._defaults.node.h;

      const x1 = src.x + sw / 2, y1 = src.y + sh / 2;
      const x2 = dst.x + dw / 2, y2 = dst.y + dh / 2;

      const p1 = this._portOnRect(src.x, src.y, sw, sh, x1, y1, x2, y2);
      const p2 = this._portOnRect(dst.x, dst.y, dw, dh, x2, y2, x1, y1);
      const ex1 = p1[0], ey1 = p1[1], ex2 = p2[0], ey2 = p2[1];

      const color     = e.color || d.color;
      const dashArray = (e.style || d.style) === 'dashed' ? '6,4' : null;
      const markerId  = color === '#0066cc' ? 'arrow-accent'
                      : color === '#28a745' ? 'arrow-success'
                      : color === '#f59e0b' ? 'arrow-warn'
                      : 'arrow-default';

      const g = svgEl('g', { class: 'diagram-edge' });

      const lineAttrs = {
        x1: ex1, y1: ey1, x2: ex2, y2: ey2,
        stroke: color, 'stroke-width': e.width || 1.5,
        fill: 'none',
        'marker-end': 'url(#' + markerId + ')',
      };
      if (e.bidirectional) lineAttrs['marker-start'] = 'url(#' + markerId + ')';
      if (dashArray)        lineAttrs['stroke-dasharray'] = dashArray;

      g.appendChild(svgEl('line', lineAttrs));

      if (e.label) {
        const mx = (ex1 + ex2) / 2, my = (ey1 + ey2) / 2;
        const bg = svgEl('rect', {
          x: mx - 28, y: my - 9, width: 56, height: 14,
          fill: '#fffff8', rx: 3, opacity: '0.85',
        });
        const lt = svgText(e.label, {
          x: mx, y: my,
          'text-anchor': 'middle',
          'dominant-baseline': 'middle',
          'font-size': '10',
          fill: color,
          'font-weight': '600',
        });
        g.appendChild(bg);
        g.appendChild(lt);
      }

      return g;
    },

    _portOnRect(rx, ry, rw, rh, cx, cy, tx, ty) {
      const dx = tx - cx, dy = ty - cy;
      const halfW = rw / 2, halfH = rh / 2;
      if (dx === 0 && dy === 0) return [cx, cy];
      const absDx = Math.abs(dx), absDy = Math.abs(dy);
      let px, py;
      if (absDx / halfW >= absDy / halfH) {
        const t = halfW / absDx;
        px = cx + Math.sign(dx) * halfW;
        py = cy + dy * t;
      } else {
        const t = halfH / absDy;
        px = cx + dx * t;
        py = cy + Math.sign(dy) * halfH;
      }
      return [px, py];
    },
  };

  const ScrollReveal = {
    _observer: null,

    init(rootMargin) {
      rootMargin = rootMargin || '0px 0px -60px 0px';
      if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .stagger-children')
          .forEach(el => el.classList.add('visible'));
        return;
      }

      this._observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this._observer.unobserve(entry.target);
          }
        });
      }, { rootMargin });

      document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .stagger-children')
        .forEach(el => this._observer.observe(el));
    },

    observe(el) {
      if (this._observer) this._observer.observe(el);
      else el.classList.add('visible');
    },
  };

  const Quiz = {

    init(container) {
      const submit = container.querySelector('.quiz-submit');
      const reset  = container.querySelector('.quiz-reset');
      if (submit) submit.addEventListener('click', () => this.grade(container));
      if (reset)  reset.addEventListener('click',  () => this.reset(container));
    },

    grade(container) {
      const questions = container.querySelectorAll('.quiz-question');
      let correct = 0;

      questions.forEach(q => {
        const rightAnswer = (q.dataset.correct || '').trim().toLowerCase();
        const rightSet = new Set(rightAnswer.split(',').map(s => s.trim()).filter(Boolean));

        const options = q.querySelectorAll('.quiz-options li');
        const feedback = q.querySelector('.quiz-feedback');

        const checked = new Set();
        q.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked')
          .forEach(inp => checked.add(inp.value.trim().toLowerCase()));

        let questionCorrect = false;
        if (rightSet.size && checked.size) {
          questionCorrect = [...rightSet].every(v => checked.has(v)) &&
                            [...checked].every(v => rightSet.has(v));
        }

        options.forEach(li => {
          const val = (li.dataset.value || '').trim().toLowerCase();
          li.classList.remove('correct', 'incorrect');
          if (checked.has(val)) {
            li.classList.add(rightSet.has(val) ? 'correct' : 'incorrect');
          } else if (rightSet.has(val)) {
            li.classList.add('correct');
          }
        });

        if (feedback) {
          feedback.classList.remove('show', 'correct', 'incorrect');
          if (checked.size) {
            const explanation = q.dataset.explanation || (questionCorrect
              ? '\\u2713 Correct!'
              : '\\u2717 Incorrect. The correct answer' + (rightSet.size > 1 ? 's are' : ' is') + ': ' + [...rightSet].join(', ').toUpperCase() + '.');
            feedback.textContent = explanation;
            feedback.classList.add('show', questionCorrect ? 'correct' : 'incorrect');
          }
        }

        if (questionCorrect) correct++;
      });

      const scoreEl = container.querySelector('.quiz-score');
      if (scoreEl) {
        const pct = questions.length ? Math.round((correct / questions.length) * 100) : 0;
        scoreEl.textContent = correct + ' / ' + questions.length + ' correct (' + pct + '%)';
        scoreEl.style.color = pct === 100 ? 'var(--color-success-fg)'
                             : pct >= 60  ? '#856404'
                             : 'var(--color-danger-fg)';
      }

      const submit = container.querySelector('.quiz-submit');
      if (submit) submit.disabled = true;

      return { correct, total: questions.length };
    },

    reset(container) {
      container.querySelectorAll('input[type="radio"], input[type="checkbox"]')
        .forEach(inp => { inp.checked = false; });
      container.querySelectorAll('.quiz-options li')
        .forEach(li => li.classList.remove('correct', 'incorrect'));
      container.querySelectorAll('.quiz-feedback')
        .forEach(fb => { fb.classList.remove('show', 'correct', 'incorrect'); fb.textContent = ''; });
      const scoreEl = container.querySelector('.quiz-score');
      if (scoreEl) { scoreEl.textContent = ''; scoreEl.style.color = ''; }
      const submit = container.querySelector('.quiz-submit');
      if (submit) submit.disabled = false;
    },

    initAll() {
      document.querySelectorAll('.quiz').forEach(q => this.init(q));
    },
  };

  const Collapsible = {

    init(el) {
      const header = el.querySelector('.collapsible-header');
      if (!header) return;
      header.addEventListener('click', () => this.toggle(el));
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.toggle(el); }
      });
      if (!header.hasAttribute('tabindex')) header.setAttribute('tabindex', '0');
      header.setAttribute('aria-expanded', el.classList.contains('open') ? 'true' : 'false');
    },

    toggle(el) {
      el.classList.toggle('open');
      const header = el.querySelector('.collapsible-header');
      if (header) header.setAttribute('aria-expanded', el.classList.contains('open') ? 'true' : 'false');
    },

    open(el)  { el.classList.add('open');    },
    close(el) { el.classList.remove('open'); },

    initAll() {
      document.querySelectorAll('.collapsible').forEach(el => this.init(el));
    },
  };

  const ProgressBar = {
    set(selector, pct) {
      const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
      if (!el) return;
      const clamped = Math.min(100, Math.max(0, pct));
      requestAnimationFrame(() => { el.style.width = clamped + '%'; });
    },
    setAll() {
      document.querySelectorAll('.progress-bar[data-progress]').forEach(el => {
        this.set(el, parseFloat(el.dataset.progress) || 0);
      });
    },
  };

  const _namedSpecs = {};

  const Diagrams = {
    register(id, spec) { _namedSpecs[id] = spec; },

    render(containerOrSelector, spec) {
      return BoxDiagram.render(containerOrSelector, spec);
    },

    renderAll() {
      document.querySelectorAll('[data-diagram]').forEach(el => {
        try {
          const spec = JSON.parse(el.dataset.diagram);
          BoxDiagram.render(el, spec);
        } catch (err) {
          console.warn('BoxDiagram: invalid JSON in data-diagram', err);
        }
      });

      document.querySelectorAll('[data-diagram-id]').forEach(el => {
        const spec = _namedSpecs[el.dataset.diagramId];
        if (spec) BoxDiagram.render(el, spec);
        else console.warn('BoxDiagram: no registered spec for id', el.dataset.diagramId);
      });
    },
  };

  function wireNodeHover(svgElement) {
    svgElement.querySelectorAll('.diagram-node').forEach(node => {
      let origFill = null;
      const shape = node.querySelector('rect, polygon, ellipse, path');
      node.style.cursor = 'pointer';
      node.addEventListener('mouseenter', () => {
        if (!shape) return;
        origFill = shape.getAttribute('fill');
        shape.setAttribute('opacity', '0.82');
        node.style.filter = 'brightness(1.15)';
      });
      node.addEventListener('mouseleave', () => {
        if (!shape) return;
        shape.setAttribute('opacity', '1');
        node.style.filter = '';
      });
    });
  }

  const _origRender = BoxDiagram.render.bind(BoxDiagram);
  BoxDiagram.render = function (container, spec) {
    const svg = _origRender(container, spec);
    if (svg) wireNodeHover(svg);
    return svg;
  };

  function init() {
    Diagrams.renderAll();
    ScrollReveal.init();
    Quiz.initAll();
    Collapsible.initAll();
    ProgressBar.setAll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  global.AzureLessons = {
    renderDiagram: Diagrams.render.bind(Diagrams),
    registerDiagram: Diagrams.register.bind(Diagrams),
    renderAllDiagrams: Diagrams.renderAll.bind(Diagrams),
    ScrollReveal,
    Quiz,
    Collapsible,
    ProgressBar,
    BoxDiagram,
    init,
  };

}(typeof window !== 'undefined' ? window : this));
`;
