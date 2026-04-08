/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme colors (default)
        bg: {
          DEFAULT: '#0a0a0f',
          2: '#111118',
          3: '#18181f',
          4: '#202028',
        },
        surface: {
          DEFAULT: '#1e1e28',
          2: '#252533',
        },
        text: {
          DEFAULT: '#f0f0f5',
          2: '#9090a8',
          3: '#5a5a72',
        },
        accent: '#c9ff57',
        'accent-2': '#57c9ff',
        income: '#57ffc9',
        expense: '#ff6b8a',
      },
      fontFamily: {
        display: ["'Syne'", 'sans-serif'],
        mono: ["'DM Mono'", 'monospace'],
        serif: ["'Instrument Serif'", 'serif'],
      },
      borderRadius: {
        'lg': '16px',
        'sm': '10px',
      },
      spacing: {
        'sidebar-w': '240px',
        'topbar-h': '64px',
      },
      boxShadow: {
        'elevation': '0 4px 32px rgba(0,0,0,0.5)',
      },
      backdropFilter: {
        'blur': 'blur(10px)',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'toast-in': 'toastIn 0.3s ease-out',
        'overlay-in': 'overlayIn 0.2s ease-out',
        'modal-in': 'modalIn 0.3s ease-out',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          'from': { opacity: '0', transform: 'translateX(-8px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        toastIn: {
          'from': { opacity: '0', transform: 'translateX(20px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        overlayIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        modalIn: {
          'from': { opacity: '0', transform: 'scale(0.92) translateY(10px)' },
          'to': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
