import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Stack,
  useColorScheme,
} from '@mui/joy';

import {
  Coffee,
  Sun,
  Moon,
  User,
  LogOut,
} from 'lucide-react';

// Import MUI icons for notes and cafes
import ArticleIcon from '@mui/icons-material/Article';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleModeChange = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton
      variant="plain"
      size="sm"
      onClick={handleModeChange}
      sx={{
        color: 'text.secondary',
        '&:hover': {
          bgcolor: 'background.level1',
        },
      }}
    >
      {mode === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </IconButton>
  );
}

function NavBar({ user, setUser, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setUser(null);
  };

  const navigationItems = [
    { label: 'My Coffee Notes', icon: <ArticleIcon fontSize="small" />, path: '/' },
    { label: 'Cafes', icon: <LocalCafeIcon fontSize="small" />, path: '/cafes' },
  ];

  return (
    <Box
      component="nav"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        bgcolor: 'background.surface',
        borderBottom: '1px solid',
        borderColor: 'divider',
        backdropFilter: 'blur(8px)',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? theme.palette.neutral[900]
            : theme.palette.background.surface,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 1.5,
          px: { xs: 2, md: 4 },
          maxWidth: 1200,
          mx: 'auto',
        }}
      >
        {/* Logo & Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              p: 0.5,
              borderRadius: 'sm',
              bgcolor: 'primary.500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Coffee size={24} color="white" />
          </Box>
          <Typography
            level="h4"
            component="h1"
            sx={{
              color: 'text.primary',
              fontWeight: 'bold',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Coffeebook
          </Typography>
        </Box>

        {/* Navigation Links - Desktop */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
          }}
        >
          {navigationItems.map((item) => (
            <Button
              key={item.label}
              variant="plain"
              size="sm"
              startDecorator={item.icon}
              onClick={() => navigate(item.path)}
              sx={{
                minHeight: 40,
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: 'background.level1',
                  color: 'text.primary',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>

        {/* Right Side Actions */}
        <Stack direction="row" spacing={0.5} alignItems="center">

          {/* Theme Toggle */}
          <ModeToggle />

          {/* User Menu */}
          <Dropdown>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{
                root: {
                  variant: 'plain',
                  size: 'sm',
                  sx: { ml: 1 },
                },
              }}
            >
              <Avatar
                size="sm"
                src={user?.avatar}
                sx={{
                  bgcolor: 'primary.500',
                  color: 'primary.50',
                }}
              >
                {user?.username?.[0]?.toUpperCase() || <User size={16} />}
              </Avatar>
            </MenuButton>
            <Menu
              placement="bottom-end"
              sx={{
                minWidth: 200,
                boxShadow: 'lg',
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.surface',
              }}
            >
              <MenuItem>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography level="body-sm" sx={{ fontWeight: 'md', color: 'text.primary' }}>
                    {user?.username || 'User'}
                  </Typography>
                  <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
                    {user?.email || ''}
                  </Typography>
                </Box>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: 'danger.500' }}>
                <LogOut size={16} />
                Sign Out
              </MenuItem>
            </Menu>
          </Dropdown>
        </Stack>
      </Box>

      {/* Mobile Navigation */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.surface',
          px: 2,
          py: 1,
        }}
      >
        <Stack direction="row" spacing={0} sx={{ width: '100%' }}>
          {navigationItems.map((item) => (
            <Button
              key={item.label}
              variant="plain"
              size="sm"
              sx={{
                flex: 1,
                flexDirection: 'column',
                gap: 0.5,
                py: 1,
                minHeight: 48,
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: 'background.level1',
                  color: 'text.primary',
                },
              }}
            >
              {item.icon}
              <Typography level="body-xs" sx={{ color: 'inherit' }}>
                {item.label}
              </Typography>
            </Button>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default NavBar;
