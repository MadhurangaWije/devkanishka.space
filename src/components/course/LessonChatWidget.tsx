'use client';

import { useEffect, useRef, useState } from 'react';
import { useCompletion } from '@ai-sdk/react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { renderSimpleMarkdown } from '@/lib/simple-markdown';

type Exchange = { question: string; answer: string };

type Props = {
  courseSlug: string;
};

const LOADING_MESSAGES = [
  'Reading the lesson…',
  'Digging through the guide…',
  'Connecting the dots…',
  'Checking the excerpts…',
  'Almost there…',
];

export function LessonChatWidget({ courseSlug }: Props) {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [history, setHistory] = useState<Exchange[]>([]);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [pendingQuestion, setPendingQuestion] = useState('');
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { completion, input, setInput, handleInputChange, handleSubmit, isLoading, error, setCompletion } = useCompletion({
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

  // Auto-grow the textarea as the user types multi-line questions, capped
  // so it can't push the message list off-screen.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input]);

  const submitQuestion = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    setPendingQuestion(input);
    handleSubmit();
    // useCompletion doesn't reliably clear `input` on its own — clear it
    // ourselves. Safe: handleSubmit() above already closed over the current
    // input value before this runs.
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitQuestion();
    }
  };

  // Cycles a short, friendly status line while waiting for the first token —
  // resets to the first message at the start of every new question.
  useEffect(() => {
    if (!isLoading) return;
    setLoadingMsgIndex(0);
    const id = setInterval(() => {
      setLoadingMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1600);
    return () => clearInterval(id);
  }, [isLoading]);

  return (
    <>
      <motion.button
        onClick={() => {
          setOpen((v) => !v);
          setHasOpened(true);
        }}
        title={open ? 'Close chat' : 'Ask K.ai about this guide'}
        className="fixed bottom-24 right-6 lg:bottom-6 z-50 w-14 h-14 rounded-full overflow-hidden shadow-lg"
        animate={
          !hasOpened
            ? {
                y: [0, -10, 0, -5, 0],
                boxShadow: [
                  '0 0 0 0 rgba(0, 232, 122, 0.5)',
                  '0 0 0 10px rgba(0, 232, 122, 0)',
                  '0 0 0 0 rgba(0, 232, 122, 0)',
                  '0 0 0 10px rgba(0, 232, 122, 0)',
                  '0 0 0 0 rgba(0, 232, 122, 0)',
                ],
              }
            : { y: 0, boxShadow: '0 0 0 0 rgba(0, 232, 122, 0)' }
        }
        transition={
          !hasOpened
            ? { duration: 1.4, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }
            : { duration: 0.2 }
        }
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image src="/kai-logo.png" alt="Ask K.ai" fill sizes="56px" className="object-cover" priority />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-40 right-6 lg:bottom-20 z-50 w-[min(400px,calc(100vw-3rem))] h-[min(560px,calc(100vh-8rem))] bg-bg border border-site-border rounded-lg shadow-2xl flex flex-col overflow-hidden"
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
                  <p className="font-mono text-xs text-text-primary font-semibold whitespace-pre-wrap">{pendingQuestion}</p>
                  {completion ? (
                    <div
                      className="chat-answer font-mono text-xs text-text-secondary leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:mb-2 [&_li]:mb-1 [&_strong]:text-text-primary [&_strong]:font-semibold [&_code]:text-accent [&_code]:bg-surface [&_code]:px-1 [&_code]:rounded [&_pre]:bg-surface [&_pre]:p-2 [&_pre]:rounded [&_pre]:overflow-x-auto [&_pre]:mb-2 [&_a]:text-accent [&_a]:underline"
                      dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(completion) }}
                    />
                  ) : (
                    <div className="flex items-center gap-2 py-1">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-accent"
                            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                          />
                        ))}
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={loadingMsgIndex}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.25 }}
                          className="font-mono text-xs text-text-muted italic"
                        >
                          {LOADING_MESSAGES[loadingMsgIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </div>
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
            <form onSubmit={submitQuestion} className="border-t border-site-border p-3 flex items-end gap-2 shrink-0">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question… (Shift+Enter for a new line)"
                disabled={isLoading}
                maxLength={500}
                rows={1}
                className="flex-1 resize-none max-h-[120px] overflow-y-auto bg-surface border border-site-border rounded px-3 py-2 font-mono text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40"
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
