import React, { useState, useEffect } from 'react';
import { CssVarsProvider, useColorScheme, extendTheme } from '@mui/joy/styles';
import { Box, IconButton } from '@mui/joy';
import { Sun, Moon } from 'lucide-react';
import LoginForm from '../components/LoginForm';

// Custom theme with coffee-inspired colors
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
          body: '#1A0F0F', // Very dark coffee brown
          surface: '#2F1B1B', // Dark coffee brown for cards/surfaces
        },
        text: {
          primary: '#F5DEB3', // Light coffee cream
          secondary: '#DEB887', // Medium coffee cream
          tertiary: '#D2691E', // Orange-brown accent
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

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleModeChange = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const getIcon = () => {
    return mode === 'light' ? <Sun size={20} /> : <Moon size={20} />;
  };
  return (
    <IconButton
      variant="outlined"
      size="sm"
      onClick={handleModeChange}
      sx={{ position: 'absolute', top: 16, right: 16 }}
    >
      {getIcon()}
    </IconButton>
  );
}

function Login({ onLogin, onSignup, onGitHubAuth, loading = false, error = '', onClearError }) {
  return (
    <CssVarsProvider theme={theme} defaultMode="light" disableNestedContext>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.body',
          position: 'relative',
        }}
      >
        <ModeToggle />
        <LoginForm
          onLogin={onLogin}
          onSignup={onSignup}
          onGitHubAuth={onGitHubAuth}
          loading={loading}
          error={error}
          onClearError={onClearError}
        />
      </Box>
    </CssVarsProvider>
  );
}

export default Login;