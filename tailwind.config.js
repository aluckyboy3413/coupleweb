/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'days-yellow': '#FFDD00', // 顶部和底部横幅的黄色
        'days-green': '#00C27A',  // 中间面板的绿色
        'days-red': '#FF4D4D',    // 右侧面板的红色
        'days-blue': '#5D7BFA',   // 左侧面板的蓝色
        'days-black': '#000000',  // 文字黑色
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        script: ['var(--font-dancing-script)', 'cursive'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 