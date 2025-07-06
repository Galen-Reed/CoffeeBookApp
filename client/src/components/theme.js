// theme.js
import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#FFF8DC',
          100: '#F5DEB3',
          200: '#DEB887',
          300: '#D2B48C',
          400: '#CD853F',
          500: '#8B4513',
          600: '#A0522D',
          700: '#654321',
          800: '#4A2C2A',
          900: '#2F1B1B',
        },
        background: {
          body: '#FEFDFB',
          surface: '#FFFFFF',
        },
        text: {
          primary: '#2F1B1B',
          secondary: '#654321',
          tertiary: '#8B4513',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          50: '#2F1B1B',
          100: '#4A2C2A',
          200: '#654321',
          300: '#8B4513',
          400: '#A0522D',
          500: '#D2691E',
          600: '#F4A460',
          700: '#DEB887',
          800: '#F5DEB3',
          900: '#FFF8DC',
        },
        background: {
          body: '#1A0F0F',
          surface: '#2F1B1B',
        },
        text: {
          primary: '#F5DEB3',
          secondary: '#DEB887',
          tertiary: '#D2691E',
        },
        neutral: {
          50: '#F5DEB3',
          100: '#DEB887',
          200: '#D2B48C',
          300: '#CD853F',
          400: '#A0522D',
          500: '#8B4513',
          600: '#654321',
          700: '#4A2C2A',
          800: '#2F1B1B',
          900: '#1A0F0F',
        },
      },
    },
  },
});

export default theme;
