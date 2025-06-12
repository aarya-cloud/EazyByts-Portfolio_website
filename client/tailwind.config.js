module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Must include all JS files
  ],
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    }
  },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Ensure your color schemes match these
        blue: {
          600: '#2563eb',
          700: '#1d4ed8'
        },
        green: {
          600: '#16a34a',
          700: '#15803d'
        },
        purple: {
          600: '#9333ea',
          700: '#7e22ce'
        }
      }
    }
  }
}