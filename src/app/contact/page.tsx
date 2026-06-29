import { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch to discuss projects, roles, or just say hello.',
};

const SOCIAL_LINKS = [
  {
    label: 'Email',
    value: 'hi@kanishka.dev',
    href: 'mailto:hi@kanishka.dev',
  },
  {
    label: 'GitHub',
    value: 'github.com/kanishka',
    href: 'https://github.com/kanishka',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/kanishka',
    href: 'https://linkedin.com/in/kanishka',
  },
  {
    label: 'Twitter',
    value: 'twitter.com/kanishka',
    href: 'https://twitter.com/kanishka',
  },
];

const WORK_TYPES = [
  'Senior backend/DevOps roles at product-focused startups',
  'Freelance: systems design, API architecture, DevOps setup',
  'Technical consultations and code reviews',
  'Advisory / fractional engineering roles',
];

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — info */}
          <div>
            <p className="label text-accent mb-4">get in touch</p>
            <h1 className="font-sans text-5xl md:text-6xl font-black tracking-tighter mb-6">
              Let&apos;s build something.
            </h1>
            <p className="font-mono text-base text-text-secondary leading-relaxed mb-12">
              I&apos;m selective about the work I take on. If you&apos;re building
              something with real technical depth, I&apos;d love to hear about it.
            </p>

            {/* What I'm open to */}
            <div className="mb-12">
              <p className="label mb-5">currently open to</p>
              <ul className="space-y-3">
                {WORK_TYPES.map((type) => (
                  <li key={type} className="flex items-start gap-3 font-mono text-sm text-text-secondary">
                    <span className="text-accent shrink-0 mt-0.5">→</span>
                    {type}
                  </li>
                ))}
              </ul>
            </div>

            {/* Social links */}
            <div>
              <p className="label mb-5">elsewhere</p>
              <div className="space-y-3">
                {SOCIAL_LINKS.map((link) => (
                  <div key={link.label} className="flex items-center gap-4">
                    <span className="label w-20 shrink-0">{link.label}</span>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="font-mono text-sm text-text-secondary hover:text-accent transition-colors"
                    >
                      {link.value} ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <div className="border border-site-border rounded-lg p-8">
              <p className="label mb-8">send a message</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
