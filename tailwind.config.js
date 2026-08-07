/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          50: '#e8eaf0',
          100: '#c5c9d9',
          200: '#9ea5bf',
          300: '#7780a5',
          400: '#596491',
          500: '#3b497d',
          600: '#354275',
          700: '#2d396a',
          800: '#1a2340',
          900: '#0c1220',
          950: '#060910',
        },
        champagne: {
          50: '#fdf8ef',
          100: '#f8edda',
          200: '#f0dbb5',
          300: '#e8d5a3',
          400: '#dfc47e',
          500: '#c9a96e',
          600: '#b8935a',
          700: '#a07d4b',
          800: '#876840',
          900: '#6e5535',
        },
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Outfit', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-mesh': 'radial-gradient(at 40% 20%, hsla(220,70%,8%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(38,50%,30%,0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(220,70%,12%,1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(38,60%,20%,0.1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(220,70%,8%,1) 0px, transparent 50%)',
        'gradient-mesh-alt': 'radial-gradient(at 20% 80%, hsla(220,70%,10%,1) 0px, transparent 50%), radial-gradient(at 80% 20%, hsla(38,50%,25%,0.12) 0px, transparent 50%), radial-gradient(at 50% 50%, hsla(220,60%,8%,1) 0px, transparent 70%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.7s ease-out',
        'slide-in-left': 'slideInLeft 0.7s ease-out',
        'slide-in-right': 'slideInRight 0.7s ease-out',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201,169,110,0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(201,169,110,0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(201,169,110,0.2)' },
          '50%': { borderColor: 'rgba(201,169,110,0.5)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
