/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        vault: {
          950: '#06070A',
          900: '#090A0F',
          850: '#0F1118',
          800: '#141722',
          750: '#1A1E2B',
          700: '#222738',
          600: '#32394E',
          500: '#47516B',
        },
        gold: {
          50: '#FBF8EE',
          100: '#F7F0D8',
          200: '#EFE1B0',
          300: '#E5D084',
          400: '#DDBE59',
          500: '#D4AF37', // Classic Champagne Gold
          600: '#B89223',
          700: '#8E6F16',
          800: '#644E10',
          900: '#3D2F09',
        },
      },
      fontFamily: {
        sans: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
        cinzel: ['"Cinzel"', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.25)',
        'gold-sm': '0 0 15px -3px rgba(212, 175, 55, 0.18)',
        'dark-card': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}