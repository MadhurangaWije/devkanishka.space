import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import '@/styles/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8FHZD85CJ1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8FHZD85CJ1');
          `}
        </Script>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
