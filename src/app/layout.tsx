import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ReadingModeProvider } from '@/components/course/ReadingModeContext';
import { ContentWidthProvider } from '@/components/course/ContentWidthContext';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Kanishka — Backend & DevOps Engineer',
    template: '%s — Kanishka',
  },
  description:
    'Full-stack engineer specializing in backend architecture, DevOps, and high-scale systems. 6+ years building things that survive production.',
  keywords: ['backend engineer', 'devops', 'go', 'kubernetes', 'distributed systems'],
  authors: [{ name: 'Kanishka' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devkanishka.space',
    siteName: 'Kanishka',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-text-primary font-mono antialiased">
        <ReadingModeProvider>
          <ContentWidthProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ContentWidthProvider>
        </ReadingModeProvider>
      </body>
      <GoogleAnalytics gaId="G-8FHZD85CJ1" />
    </html>
  );
}
