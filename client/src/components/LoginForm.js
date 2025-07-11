import React, { useState } from 'react';
import { useUser } from "../context/UserContext";

import {
  Sheet,
  Typography,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Divider,
  Alert,
  IconButton,
  Stack,
  Box,
} from '@mui/joy';
import { Coffee, Github, Eye, EyeOff } from 'lucide-react';

export default function LoginForm({
  onLogin,
  onGitHubAuth,
}) {
  const { loading, error, handleClearError, handleSignup } = useUser();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) handleClearError();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isSignUp ? handleSignup(formData) : onLogin(formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Sheet
      variant="outlined"
      sx={{
        width: 400,
        py: 4,
        px: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'lg',
        boxShadow: 'lg',
        backgroundColor: 'background.surface',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Coffee size={48} color="var(--joy-palette-primary-500)" />
        </Box>
        <Typography level="h3" component="h1" sx={{ mb: 1 }}>
          ☕ CoffeeBook
        </Typography>
        <Typography level="body-sm" color="neutral">
          {isSignUp
            ? 'Join the community of coffee enthusiasts'
            : 'Welcome back! Sign in to rate your favorite coffees'}
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert color="danger" variant="soft" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Login Form */}
      <Stack spacing={2}>
        <FormControl required>
          <FormLabel>Username</FormLabel>
          <Input
            name="username"
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleInputChange}
            disabled={loading}
            sx={{ '--Input-focusedThickness': '2px' }}
          />
        </FormControl>

        <FormControl required>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            disabled={loading}
            endDecorator={
              <IconButton
                variant="plain"
                size="sm"
                onClick={togglePasswordVisibility}
                sx={{ mr: -1 }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </IconButton>
            }
            sx={{ '--Input-focusedThickness': '2px' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit(e);
            }}
          />
        </FormControl>

        <Button
          onClick={handleSubmit}
          loading={loading}
          fullWidth
          size="lg"
          disabled={!formData.username || !formData.password}
          sx={{
            mt: 2,
            bgcolor: 'primary.500',
            '&:hover': { bgcolor: 'primary.600' },
          }}
        >
          {isSignUp ? 'Create Account' : 'Sign In'}
        </Button>
      </Stack>

      {/* Divider */}
      <Divider sx={{ my: 2 }}>or</Divider>

      {/* GitHub OAuth */}
      <Button
  variant="outlined"
  fullWidth
  size="lg"
  startDecorator={<Github size={20} />}
  onClick={(e) => {
    console.log('GitHub button clicked!');
    console.log('onGitHubAuth function:', onGitHubAuth);
    console.log('onGitHubAuth type:', typeof onGitHubAuth);
    
    if (onGitHubAuth) {
      onGitHubAuth(e);
    } else {
      console.error('onGitHubAuth is not defined!');
    }
  }}
  disabled={loading}
  sx={{
    borderColor: 'neutral.300',
    color: 'neutral.700',
    '&:hover': {
      borderColor: 'neutral.400',
      backgroundColor: 'neutral.50',
    },
  }}
>
  Continue with GitHub
</Button>

      {/* Toggle */}
      <Typography
        level="body-sm"
        sx={{
          alignSelf: 'center',
          mt: 2,
          color: 'text.secondary',
        }}
      >
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <Link
          component="button"
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            handleClearError();
            setFormData({ username: '', password: '' });
          }}
          sx={{ fontWeight: 'md' }}
        >
          {isSignUp ? 'Sign in' : 'Sign up'}
        </Link>
      </Typography>

      {/* Footer */}
      <Typography
        level="body-xs"
        sx={{
          textAlign: 'center',
          mt: 3,
          color: 'text.tertiary',
        }}
      >
        Discover, rate, and share your favorite coffee experiences
      </Typography>
    </Sheet>
  );
}
