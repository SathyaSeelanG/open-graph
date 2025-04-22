/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f7f7f8',
          100: '#eeeef1',
          200: '#d9d9e0',
          300: '#b9b9c6',
          400: '#8f8fa3',
          500: '#6e6e87',
          600: '#5a5a70',
          700: '#4a4a5c',
          800: '#40404e',
          900: '#383844',
          950: '#25252d',
        },
        accent: {
          50: '#edfcf4',
          100: '#d4f7e3',
          200: '#aceecb',
          300: '#75e0ac',
          400: '#39c883',
          500: '#1ea766',
          600: '#158751',
          700: '#146b43',
          800: '#145537',
          900: '#13462f',
          950: '#0a2a1d',
        }
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.1), 0 10px 20px -2px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
};