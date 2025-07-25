/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        Lazy: {
          'old-primary': '#01e5ff',
          primary: 'var(--color-primary)',
          text: 'var(--color-text)',
          'text-secondary': 'var(--color-text-secondary)',
          'text-muted': 'var(--color-text-muted)',
          bg: 'var(--color-bg)',
          card: 'var(--color-card)',
          border: 'var(--color-border)',
          secondary: 'var(--color-secondary)',
          accent: 'var(--color-accent)',
          'border-secondary': 'var(--color-border-secondary)',
          'old-secondary': '#005FFF',
          gradient: {
            start: '#4e54c8', // Blue
            end: '#8f94fb'   // Purple
          }
        }
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px'
      },
      animation: {
        gradient: 'gradient 3s ease infinite',
        pulseOrb: 'pulseOrb 2s infinite'
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        pulseOrb: {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.2)', opacity: 0.8 }
        }
      }
    }
  }
}
