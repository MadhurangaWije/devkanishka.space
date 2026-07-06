'use client';

import { useEffect, useRef, useState } from 'react';
import { useCompletion } from '@ai-sdk/react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { renderSimpleMarkdown } from '@/lib/simple-markdown';

type Exchange = { question: string; answer: string };

type Props = {
  courseSlug: string;
};

export function LessonChatWidget({ courseSlug }: Props) {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<Exchange[]>([]);
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { completion, input, handleInputChange, handleSubmit, isLoading, error, setCompletion } = useCompletion({
    api: '/api/chat',
    streamProtocol: 'text',
    body: { courseSlug, lessonUrl: pathname },
    onFinish: (question, answer) => {
      setHistory((prev) => [...prev, { question, answer }]);
      setCompletion('');
    },
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history, completion]);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        title={open ? 'Close chat' : 'Ask about this guide'}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-3.5 py-2 bg-surface border border-site-border rounded-full font-mono text-xs text-text-secondary hover:text-accent hover:border-accent/30 transition-colors shadow-lg"
      >
        {open ? '× close' : '💬 ask'}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-20 left-6 z-50 w-[min(400px,calc(100vw-3rem))] h-[min(560px,calc(100vh-8rem))] bg-bg border border-site-border rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-site-border shrink-0">
              <p className="font-mono text-xs text-accent uppercase tracking-widest">Ask about this guide</p>
              <p className="font-mono text-[11px] text-text-muted mt-0.5">
                Answers come only from these lessons — not general knowledge.
              </p>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
              {history.length === 0 && !completion && (
                <p className="font-mono text-xs text-text-muted leading-relaxed">
                  Ask a question about what you&apos;re reading — e.g. &quot;what&apos;s the difference between X and Y&quot;.
                </p>
              )}
              {history.map((ex, i) => (
                <div key={i} className="space-y-1.5">
                  <p className="font-mono text-xs text-text-primary font-semibold">{ex.question}</p>
                  <div
                    className="chat-answer font-mono text-xs text-text-secondary leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-2 [&_li]:mb-1 [&_strong]:text-text-primary [&_strong]:font-semibold [&_code]:text-accent [&_code]:bg-surface [&_code]:px-1 [&_code]:rounded [&_pre]:bg-surface [&_pre]:p-2 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:mb-2 [&_a]:text-accent [&_a]:underline"
                    dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(ex.answer) }}
                  />
                </div>
              ))}
              {(isLoading || completion) && (
                <div className="space-y-1.5">
                  <p className="font-mono text-xs text-text-primary font-semibold">{input || history.at(-1)?.question}</p>
                  {completion ? (
                    <div
                      className="chat-answer font-mono text-xs text-text-secondary leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-2 [&_li]:mb-1 [&_strong]:text-text-primary [&_strong]:font-semibold [&_code]:text-accent [&_code]:bg-surface [&_code]:px-1 [&_code]:rounded [&_pre]:bg-surface [&_pre]:p-2 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:mb-2 [&_a]:text-accent [&_a]:underline"
                      dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(completion) }}
                    />
                  ) : (
                    <p className="font-mono text-xs text-text-secondary">…</p>
                  )}
                </div>
              )}
              {error && (
                <p className="font-mono text-xs text-red-400 leading-relaxed">
                  {error.message || 'Something went wrong — try again.'}
                </p>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-site-border p-3 flex items-center gap-2 shrink-0">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask a question…"
                disabled={isLoading}
                maxLength={500}
                className="flex-1 bg-surface border border-site-border rounded px-3 py-2 font-mono text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-3 py-2 bg-accent text-bg font-mono text-xs font-semibold rounded hover:bg-accent-dim transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isLoading ? '…' : '→'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
