/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./docs/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./blog/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-black': '#000000',
        'gray-100': '#111111',
        'gray-200': '#222222',
        'gray-300': '#333333',
        'gray-400': '#444444',
        'gray-500': '#555555',
        'gray-600': '#666666',
        'gray-700': '#777777',
        'gray-800': '#888888',
        'gray-900': '#999999',
      },
      fontFamily: {
        'sora': ['Sora', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'syncopate': ['Syncopate', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
