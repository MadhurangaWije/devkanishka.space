// Inlined verbatim from generated-lessons/ai-engineering/assets/diagrams.js —
// pure SVG + CSS, no external dependencies. Colors already match the site's
// dark theme (#0f1117 bg, #6366f1 accent), so this ships unmodified.
export const AI_ENGINEERING_DIAGRAMS_JS = `
(function () {
  'use strict';

  const SVG_NS = 'http://www.w3.org/2000/svg';

  const COLORS = {
    bg: '#0f1117',
    surface: '#1a1d27',
    surface2: '#252836',
    border: '#2e3148',
    accent: '#6366f1',
    accent2: '#22d3ee',
    text: '#e2e8f0',
    textMuted: '#94a3b8',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
  };

  function svgEl(tag, attrs) {
    const el = document.createElementNS(SVG_NS, tag);
    if (attrs) {
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    }
    return el;
  }

  function createSVG(width, height) {
    const svg = svgEl('svg', {
      width: String(width),
      height: String(height),
      viewBox: \`0 0 \${width} \${height}\`,
      xmlns: SVG_NS,
    });
    svg.style.maxWidth = '100%';
    svg.style.height = 'auto';
    return svg;
  }

  function addText(parent, x, y, text, opts = {}) {
    const el = svgEl('text', {
      x: String(x),
      y: String(y),
      fill: opts.fill || COLORS.text,
      'font-size': opts.fontSize || '14',
      'font-family': '-apple-system, BlinkMacSystemFont, sans-serif',
      'text-anchor': opts.anchor || 'middle',
      'dominant-baseline': opts.baseline || 'middle',
      'font-weight': opts.fontWeight || '500',
    });
    el.textContent = text;
    parent.appendChild(el);
    return el;
  }

  function addArrow(parent, x1, y1, x2, y2, color) {
    const markerId = 'arrow-' + Math.random().toString(36).slice(2, 8);
    let defs = parent.querySelector('defs');
    if (!defs) {
      defs = svgEl('defs');
      parent.prepend(defs);
    }
    const marker = svgEl('marker', {
      id: markerId,
      viewBox: '0 0 10 10',
      refX: '10',
      refY: '5',
      markerWidth: '6',
      markerHeight: '6',
      orient: 'auto-start-reverse',
    });
    const path = svgEl('path', {
      d: 'M 0 0 L 10 5 L 0 10 z',
      fill: color || COLORS.accent,
    });
    marker.appendChild(path);
    defs.appendChild(marker);

    const line = svgEl('line', {
      x1: String(x1),
      y1: String(y1),
      x2: String(x2),
      y2: String(y2),
      stroke: color || COLORS.accent,
      'stroke-width': '2',
      'marker-end': \`url(#\${markerId})\`,
    });
    parent.appendChild(line);
    return line;
  }

  function createFlowDiagram(container, steps) {
    if (typeof container === 'string') container = document.querySelector(container);
    if (!container || !steps || !steps.length) return;

    const boxW = 140;
    const boxH = 60;
    const gap = 60;
    const totalW = steps.length * boxW + (steps.length - 1) * gap;
    const padding = 30;
    const svgW = totalW + padding * 2;
    const svgH = boxH + padding * 2 + 20;

    const svg = createSVG(svgW, svgH);
    const startY = padding + 10;

    steps.forEach((step, i) => {
      const x = padding + i * (boxW + gap);
      const cx = x + boxW / 2;
      const cy = startY + boxH / 2;

      const rect = svgEl('rect', {
        x: String(x),
        y: String(startY),
        width: String(boxW),
        height: String(boxH),
        rx: '10',
        ry: '10',
        fill: COLORS.surface2,
        stroke: COLORS.accent,
        'stroke-width': '1.5',
      });
      svg.appendChild(rect);

      addText(svg, cx, cy - (step.sublabel ? 6 : 0), step.label || step, {
        fontSize: '13',
        fontWeight: '600',
      });

      if (step.sublabel) {
        addText(svg, cx, cy + 12, step.sublabel, {
          fontSize: '11',
          fill: COLORS.textMuted,
        });
      }

      if (i < steps.length - 1) {
        addArrow(svg, x + boxW + 6, startY + boxH / 2, x + boxW + gap - 6, startY + boxH / 2, COLORS.accent);
      }
    });

    container.appendChild(svg);
    return svg;
  }

  function createLayerDiagram(container, layers) {
    if (typeof container === 'string') container = document.querySelector(container);
    if (!container || !layers || !layers.length) return;

    const layerW = 320;
    const layerH = 50;
    const gap = 12;
    const padding = 30;
    const totalH = layers.length * layerH + (layers.length - 1) * gap;
    const svgW = layerW + padding * 2;
    const svgH = totalH + padding * 2;

    const svg = createSVG(svgW, svgH);

    layers.forEach((layer, i) => {
      const x = padding;
      const y = padding + i * (layerH + gap);
      const cx = x + layerW / 2;
      const cy = y + layerH / 2;
      const color = layer.color || COLORS.accent;

      const rect = svgEl('rect', {
        x: String(x),
        y: String(y),
        width: String(layerW),
        height: String(layerH),
        rx: '8',
        ry: '8',
        fill: COLORS.surface2,
        stroke: color,
        'stroke-width': '1.5',
      });
      svg.appendChild(rect);

      const bar = svgEl('rect', {
        x: String(x),
        y: String(y),
        width: '4',
        height: String(layerH),
        rx: '2',
        fill: color,
      });
      svg.appendChild(bar);

      addText(svg, cx, cy - (layer.sublabel ? 6 : 0), layer.label || layer, {
        fontSize: '14',
        fontWeight: '600',
      });

      if (layer.sublabel) {
        addText(svg, cx, cy + 13, layer.sublabel, {
          fontSize: '11',
          fill: COLORS.textMuted,
        });
      }
    });

    container.appendChild(svg);
    return svg;
  }

  function createAnimatedLoop(container, steps, opts = {}) {
    if (typeof container === 'string') container = document.querySelector(container);
    if (!container || !steps || !steps.length) return;

    const interval = opts.interval || 2000;
    const boxW = 130;
    const boxH = 50;
    const padding = 40;

    const gap = 50;
    const totalW = steps.length * boxW + (steps.length - 1) * gap;
    const svgW = totalW + padding * 2;
    const svgH = boxH + padding * 2 + 40;

    const svg = createSVG(svgW, svgH);
    const startY = padding;
    const rects = [];

    steps.forEach((step, i) => {
      const x = padding + i * (boxW + gap);
      const cx = x + boxW / 2;
      const cy = startY + boxH / 2;

      const rect = svgEl('rect', {
        x: String(x),
        y: String(startY),
        width: String(boxW),
        height: String(boxH),
        rx: '10',
        ry: '10',
        fill: COLORS.surface2,
        stroke: COLORS.border,
        'stroke-width': '2',
      });
      svg.appendChild(rect);
      rects.push(rect);

      addText(svg, cx, cy, step.label || step, {
        fontSize: '12',
        fontWeight: '600',
      });

      if (i < steps.length - 1) {
        addArrow(svg, x + boxW + 6, startY + boxH / 2, x + boxW + gap - 6, startY + boxH / 2, COLORS.border);
      }
    });

    const firstX = padding + boxW / 2;
    const lastX = padding + (steps.length - 1) * (boxW + gap) + boxW / 2;
    const returnY = startY + boxH + 25;
    const returnPath = svgEl('path', {
      d: \`M \${lastX} \${startY + boxH + 4} C \${lastX} \${returnY}, \${firstX} \${returnY}, \${firstX} \${startY + boxH + 4}\`,
      fill: 'none',
      stroke: COLORS.textMuted,
      'stroke-width': '1.5',
      'stroke-dasharray': '4,4',
    });
    svg.appendChild(returnPath);

    addText(svg, (firstX + lastX) / 2, returnY + 4, '\\u21ba repeat', {
      fontSize: '11',
      fill: COLORS.textMuted,
    });

    let active = 0;
    function tick() {
      rects.forEach((r, i) => {
        if (i === active) {
          r.setAttribute('stroke', COLORS.accent2);
          r.setAttribute('fill', COLORS.surface);
        } else {
          r.setAttribute('stroke', COLORS.border);
          r.setAttribute('fill', COLORS.surface2);
        }
      });
      active = (active + 1) % steps.length;
    }
    tick();
    const timer = setInterval(tick, interval);

    const observer = new MutationObserver(() => {
      if (!document.contains(svg)) {
        clearInterval(timer);
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    container.appendChild(svg);
    return svg;
  }

  function createComparisonBar(container, items) {
    if (typeof container === 'string') container = document.querySelector(container);
    if (!container || !items || !items.length) return;

    const barMaxW = 360;
    const barH = 28;
    const gap = 16;
    const labelW = 120;
    const valueW = 60;
    const padding = 20;
    const totalH = items.length * (barH + gap) - gap + padding * 2;
    const svgW = labelW + barMaxW + valueW + padding * 2;
    const svgH = totalH;

    const svg = createSVG(svgW, svgH);

    const maxVal = items.reduce((m, item) => Math.max(m, item.max || item.value), 0);

    items.forEach((item, i) => {
      const y = padding + i * (barH + gap);
      const barW = (item.value / maxVal) * barMaxW;
      const color = item.color || COLORS.accent;

      addText(svg, padding + labelW - 10, y + barH / 2, item.label, {
        fontSize: '13',
        anchor: 'end',
        fill: COLORS.text,
        fontWeight: '500',
      });

      const track = svgEl('rect', {
        x: String(padding + labelW),
        y: String(y + 4),
        width: String(barMaxW),
        height: String(barH - 8),
        rx: '4',
        fill: COLORS.surface2,
      });
      svg.appendChild(track);

      const bar = svgEl('rect', {
        x: String(padding + labelW),
        y: String(y + 4),
        width: String(barW),
        height: String(barH - 8),
        rx: '4',
        fill: color,
        opacity: '0.85',
      });
      svg.appendChild(bar);

      const anim = svgEl('animate', {
        attributeName: 'width',
        from: '0',
        to: String(barW),
        dur: '0.8s',
        fill: 'freeze',
        begin: \`\${i * 0.15}s\`,
      });
      bar.appendChild(anim);
      bar.setAttribute('width', '0');

      addText(svg, padding + labelW + barMaxW + 10, y + barH / 2, String(item.value) + (item.unit || ''), {
        fontSize: '12',
        anchor: 'start',
        fill: COLORS.textMuted,
        fontWeight: '600',
      });
    });

    container.appendChild(svg);
    return svg;
  }

  window.Diagrams = {
    createFlowDiagram: createFlowDiagram,
    createLayerDiagram: createLayerDiagram,
    createAnimatedLoop: createAnimatedLoop,
    createComparisonBar: createComparisonBar,
    COLORS: COLORS,
  };
})();
`;
