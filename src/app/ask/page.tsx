import { Metadata } from 'next';
import { AskForm } from '@/components/ask/AskForm';

export const metadata: Metadata = {
  title: 'Ask Me',
  description:
    "Stuck on something in one of the guides, or on anything you're building? Ask directly — there's no such thing as a stupid question.",
};

const HOW_IT_WORKS = [
  { step: '01', text: 'Write your question — paste in code, error messages, whatever helps explain it.' },
  { step: '02', text: 'Attach a screenshot, file, or snippet if it makes things clearer.' },
  { step: '03', text: 'Leave your email so I can reply and we can keep talking.' },
  { step: '04', text: 'I get back to you based on my availability — usually within a few days.' },
];

export default function AskPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — the idea */}
          <div>
            <p className="label text-accent mb-4">ask me anything</p>
            <h1 className="font-sans text-5xl md:text-6xl font-black tracking-tighter mb-6">
              Stuck? Let&apos;s figure it out.
            </h1>

            <div className="font-mono text-base text-text-secondary leading-relaxed space-y-5 mb-12 max-w-xl">
              <p>
                Teaching what I know, while still learning new things myself, is something
                I&apos;ve been doing since school — it&apos;s just how I like to work through
                problems. This page is that same habit, opened up a little further.
              </p>
              <p>
                If you&apos;re working through any of the guides on this site — or honestly,
                anything else you&apos;re building — and you hit a wall, this is a direct line
                to me. I&apos;m more than willing to share what I&apos;ve learned.
              </p>
              <p>
                There&apos;s no such thing as a stupid question. A concept that isn&apos;t
                clicking, a bug you can&apos;t shake, a decision you&apos;re second-guessing —
                send it over.
              </p>
              <p>
                I&apos;ll reply based on my availability, straight to your inbox, and we can
                keep the conversation going from there.
              </p>
            </div>

            {/* How it works */}
            <div>
              <p className="label mb-5">how it works</p>
              <ul className="space-y-4">
                {HOW_IT_WORKS.map((item) => (
                  <li key={item.step} className="flex items-start gap-4">
                    <span className="font-mono text-xs text-accent shrink-0 mt-0.5">{item.step}</span>
                    <span className="font-mono text-sm text-text-secondary leading-relaxed">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <div className="border border-site-border rounded-lg p-8">
              <p className="label mb-8">ask your question</p>
              <AskForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
