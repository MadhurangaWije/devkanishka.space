import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0F0F0F',
        surface: {
          DEFAULT: '#161616',
          elevated: '#1C1C1C',
        },
        'site-border': {
          DEFAULT: '#2A2A2A',
          subtle: '#1E1E1E',
        },
        'text-primary': '#EBEBEB',
        'text-secondary': '#777777',
        'text-muted': '#4A4A4A',
        accent: {
          DEFAULT: '#00E87A',
          dim: '#00994F',
          glow: 'rgba(0, 232, 122, 0.12)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.03em',
        label: '0.08em',
      },
      maxWidth: {
        site: '1280px',
      },
      animation: {
        'cursor-blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
