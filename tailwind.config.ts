import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F2EC',
        ivory: '#FAF8F4',
        sage: '#EDEEE8',
        copper: '#C4875B',
        'copper-light': '#D4A07A',
        'brown-dark': '#5C4A3A',
        'brown-footer': '#6B5A48',
        charcoal: '#3A3A3A',
        'text-light': '#8A8078',
        'text-body': '#6B6560',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Lato', 'Helvetica Neue', 'sans-serif'],
      },
      letterSpacing: {
        'wide-caps': '0.18em',
        'wider-caps': '0.35em',
      },
    },
  },
  plugins: [],
};

export default config;
