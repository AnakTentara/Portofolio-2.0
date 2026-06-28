export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // HaikalDev 3.0 — Liquid Glass Design System
        primary: {
          DEFAULT: '#3B82F6',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
        accent: {
          DEFAULT: '#8B5CF6',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
        teal: {
          DEFAULT: '#06B6D4',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
        surface: {
          DEFAULT: '#0F172A',
          2: '#1E293B',
          3: '#334155',
        },
        dark: {
          DEFAULT: '#080C18',
          2: '#0B1120',
        }
      },
      fontFamily: {
        heading: ['Archivo', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
        sans: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
        'grad-hero':    'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
        'grad-teal':    'linear-gradient(135deg, #06B6D4, #3B82F6)',
        'grad-subtle':  'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))',
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'morph':       'morph 8s ease-in-out infinite',
        'iridescent':  'iridescent 6s ease infinite',
        'status-ping': 'status-ping 2s ease-in-out infinite',
        'slide-up':    'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(1deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%': { borderRadius: '50% 60% 30% 60% / 30% 40% 70% 50%' },
          '75%': { borderRadius: '40% 60% 70% 30% / 60% 30% 50% 70%' },
        },
        iridescent: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'status-ping': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(6,182,212,0.5)' },
          '50%': { boxShadow: '0 0 0 6px rgba(6,182,212,0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '80px',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
  },
  plugins: [],
}