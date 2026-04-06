/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.06), 0 20px 40px rgba(2,6,23,0.22)',
        soft: '0 10px 30px rgba(15,23,42,0.08)'
      },
      backgroundImage: {
        'mesh-light': 'radial-gradient(circle at top left, rgba(56,189,248,0.14), transparent 30%), radial-gradient(circle at 80% 20%, rgba(34,197,94,0.10), transparent 25%), linear-gradient(180deg, rgba(248,250,252,1), rgba(241,245,249,1))',
        'mesh-dark': 'radial-gradient(circle at top left, rgba(14,165,233,0.22), transparent 24%), radial-gradient(circle at 80% 10%, rgba(16,185,129,0.14), transparent 22%), linear-gradient(180deg, rgba(2,6,23,1), rgba(15,23,42,1))'
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      },
      animation: {
        shimmer: 'shimmer 1.8s linear infinite',
        float: 'float 6s ease-in-out infinite'
      }
    }
  },
  plugins: []
};