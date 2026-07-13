/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        plum: {
          50:  '#f7f0f4',
          100: '#eddde8',
          200: '#dbbcd1',
          300: '#c293b4',
          400: '#a86c95',
          500: '#7B4B6A', // Dusty Plum — primary accent
          600: '#6a3d59',
          700: '#573049',
          800: '#44243a',
          900: '#33192b',
        },
        gold: {
          50:  '#fdf8ec',
          100: '#faf0d0',
          200: '#f4dfa0',
          300: '#edc866',
          400: '#C9A227', // Luxury Gold — secondary accent
          500: '#b08e1e',
          600: '#8f7018',
          700: '#6f5512',
          800: '#4e3c0d',
          900: '#332807',
        },
        forest: {
          50:  '#eef4f0',
          100: '#d5e8db',
          200: '#aacfb7',
          300: '#75af8e',
          400: '#3d8a63',
          500: '#2d6b4c', // Forest Green — brand accent
          600: '#245640',
          700: '#1c4332',
          800: '#133025',
          900: '#0c1f18',
        },
        ivory: {
          50:  '#FDFAF5', // Warm Ivory background
          100: '#FAF5EC',
          200: '#F4EBDA',
          300: '#EAD9C0',
          400: '#DCC9A8',
        },
        charcoal: {
          50:  '#f5f5f5',
          100: '#e8e8e8',
          200: '#d1d1d1',
          300: '#a8a8a8',
          400: '#808080',
          500: '#2C2C2C', // Charcoal text
          600: '#242424',
          700: '#1c1c1c',
          800: '#141414',
          900: '#0a0a0a',
        },
      },
      fontFamily: {
        // Elegant pairing: Playfair Display (headings) + Lato (body)
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Lato"', 'system-ui', 'sans-serif'],
        sans:    ['"Lato"', 'system-ui', 'sans-serif'],
        serif:   ['"Playfair Display"', 'Georgia', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        'soft':   '0 2px 16px 0 rgba(123, 75, 106, 0.08)',
        'card':   '0 4px 24px 0 rgba(44, 44, 44, 0.10)',
        'hover':  '0 8px 32px 0 rgba(123, 75, 106, 0.18)',
        'gold':   '0 4px 20px 0 rgba(201, 162, 39, 0.25)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
