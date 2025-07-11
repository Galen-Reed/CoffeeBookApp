import React, { useState, useEffect } from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import { Box, IconButton } from '@mui/joy';
import { Sun, Moon } from 'lucide-react';
import LoginForm from '../components/LoginForm';
import theme from "../components/theme";

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

function Login() {

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
        <LoginForm/>
      </Box>
    </CssVarsProvider>
  );
}

export default Login;