'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';

type Line = {
  id: number;
  type: 'input' | 'output' | 'welcome';
  text: string;
};

const COMMANDS: Record<string, string> = {
  help: `commands:

  whoami      → about me
  skills      → tech stack
  work        → selected projects
  blog        → recent writing
  guides      → learning resources
  contact     → get in touch
  clear       → clear terminal`,

  whoami: `Kanishka
Full-Stack Engineer · 6+ years in production

Driven by curiosity. I master new technologies at speed
to re-engineer, optimize, and scale production systems.

Specialties: backend architecture, DevOps, distributed systems
Also: hobbyist ML/DL/AI researcher

Status: open to senior roles and select freelance projects`,

  skills: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BACKEND      Go · Python · Node.js · Rust
DEVOPS       Kubernetes · Docker · Terraform · AWS · GCP
DATABASES    PostgreSQL · Redis · ClickHouse · MongoDB
ML / AI      PyTorch · TensorFlow · HuggingFace · LangChain
FRONTEND     Next.js · React · TypeScript · Tailwind
OBSERV.      Prometheus · Grafana · OpenTelemetry · Jaeger
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

  work: `selected projects:

→  Industrial Process Analytics Platform   Go · Python · Kubernetes
   Distributed analytics platform + AI agent layer for industrial ops

→  Serverless Data Hub Platform            AWS Lambda · Glue · Kafka
   Fully serverless data platform at airline scale

→  Internal Developer Portal               Kubernetes · GitOps · Low-Code
   Self-service platform for shipping services faster

run: open /work  to see full case studies`,

  blog: `writing:

No posts yet — the first ones are still being written.

Topics: gnarly production bugs, tricky migrations, incidents,
and the not-so-straightforward problems I had to think my way
out of.

run: open /blog  for details`,

  guides: `learning resources:

→  Distributed Systems from Scratch  [advanced · 14h]
→  Go for Python Developers          [intermediate · 8h]
→  Building a K8s Operator           [advanced · 10h]
→  JWT Auth in Go from Scratch       [intermediate · 6h]
→  Docker Best Practices             [beginner · 5h]

run: open /tutorials  to start learning`,

  contact: `get in touch:

Email:    hi@devkanishka.space
GitHub:   github.com/kanishka
LinkedIn: linkedin.com
Twitter:  twitter.com/kanishka

or run: open /contact  for the full form`,
};

let lineCounter = 0;
const mkLine = (type: Line['type'], text: string): Line => ({
  id: lineCounter++,
  type,
  text,
});

const WELCOME = `Welcome. Type 'help' to see available commands.`;

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([mkLine('welcome', WELCOME)]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [focused, setFocused] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const inputLine = mkLine('input', `visitor@kanishka:~$ ${raw}`);

    if (cmd === 'clear') {
      setLines([mkLine('welcome', WELCOME)]);
    } else if (cmd === '' ) {
      setLines((prev) => [...prev, inputLine]);
    } else if (cmd in COMMANDS) {
      setLines((prev) => [
        ...prev,
        inputLine,
        mkLine('output', COMMANDS[cmd]),
      ]);
    } else if (cmd.startsWith('open ')) {
      setLines((prev) => [
        ...prev,
        inputLine,
        mkLine('output', `opening ${cmd.slice(5)} in browser...`),
      ]);
      const path = cmd.slice(5).replace(/^\//, '');
      setTimeout(() => {
        window.location.href = `/${path}`;
      }, 600);
    } else {
      setLines((prev) => [
        ...prev,
        inputLine,
        mkLine('output', `command not found: '${cmd}'\nType 'help' for available commands.`),
      ]);
    }

    if (cmd && cmd !== 'clear') {
      setCmdHistory((prev) => [raw, ...prev.slice(0, 49)]);
    }
    setHistoryIdx(-1);
    setInput('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? '' : cmdHistory[next]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.trim().toLowerCase();
      const matches = Object.keys(COMMANDS).filter((c) => c.startsWith(partial));
      if (matches.length === 1) setInput(matches[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full rounded-lg border border-site-border overflow-hidden bg-[#0A0A0A] shadow-2xl"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-site-border/60 bg-surface">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
        </div>
        <span className="font-mono text-xs text-text-muted">visitor@kanishka:~</span>
        <div className="w-16" />
      </div>

      {/* Output area */}
      <div ref={outputRef} className="p-5 h-72 overflow-y-auto font-mono text-sm leading-relaxed">
        {lines.map((line) => (
          <div key={line.id} className="mb-1">
            {line.type === 'welcome' && (
              <span className="text-text-muted">{line.text}</span>
            )}
            {line.type === 'input' && (
              <span className="text-accent/80">{line.text}</span>
            )}
            {line.type === 'output' && (
              <pre className="text-text-secondary whitespace-pre-wrap">{line.text}</pre>
            )}
          </div>
        ))}
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2 px-5 py-3 border-t border-site-border/40">
        <span className="font-mono text-sm text-accent shrink-0">visitor@kanishka:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent font-mono text-sm text-text-primary outline-none caret-accent"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Terminal input"
        />
        {focused && (
          <span className="w-2 h-4 bg-accent animate-cursor-blink shrink-0" />
        )}
      </div>
    </motion.div>
  );
}
