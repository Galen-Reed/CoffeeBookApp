import React, { useState } from 'react';
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
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Star,
  PlusCircle,
  Home,
  TrendingUp,
} from 'lucide-react';

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
  const [searchValue, setSearchValue] = useState('');

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setUser(null);
  };

  const navigationItems = [
    { label: 'My Coffee Notes', icon: <Home size={18} />, path: '/user-coffees' },
    { label: 'Cafes', icon: <TrendingUp size={18} />, path: '/cafes' },
    { label: 'My Reviews', icon: <Star size={18} />, path: '/my-reviews' },
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
        backgroundColor: 'rgba(var(--joy-palette-background-surface-channel) / 0.8)',
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

        {/* Search Bar - Hidden on mobile */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            position: 'relative',
            maxWidth: 300,
            flex: 1,
            mx: 3,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              '& input': {
                pl: 5,
                pr: 2,
                py: 1,
                borderRadius: 'md',
                border: '1px solid',
                borderColor: 'neutral.300',
                bgcolor: 'background.level1',
                fontSize: 'sm',
                '&:focus': {
                  outline: 'none',
                  borderColor: 'primary.500',
                  boxShadow: '0 0 0 2px rgba(var(--joy-palette-primary-500-channel) / 0.2)',
                },
                '&::placeholder': {
                  color: 'text.tertiary',
                },
              },
            }}
          >
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--joy-palette-text-tertiary)',
                zIndex: 1,
              }}
            />
            <input
              type="text"
              placeholder="Search coffees, brands, reviews..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
              }}
            />
          </Box>
        </Box>

        {/* Right Side Actions */}
        <Stack direction="row" spacing={0.5} alignItems="center">
          {/* Add Review Button */}
          <Button
            variant="soft"
            size="sm"
            startDecorator={<PlusCircle size={16} />}
            sx={{
              bgcolor: 'primary.100',
              color: 'primary.700',
              '&:hover': {
                bgcolor: 'primary.200',
              },
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            Add Review
          </Button>

          {/* Search Icon - Mobile */}
          <IconButton
            variant="plain"
            size="sm"
            sx={{
              display: { xs: 'flex', md: 'none' },
              color: 'text.secondary',
            }}
          >
            <Search size={18} />
          </IconButton>

          {/* Notifications */}
          <IconButton
            variant="plain"
            size="sm"
            sx={{
              color: 'text.secondary',
              position: 'relative',
            }}
          >
            <Bell size={18} />
            {/* Notification badge */}
            <Box
              sx={{
                position: 'absolute',
                top: 4,
                right: 4,
                width: 8,
                height: 8,
                bgcolor: 'danger.500',
                borderRadius: '50%',
                border: '2px solid',
                borderColor: 'background.surface',
              }}
            />
          </IconButton>

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
              }}
            >
              <MenuItem>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <Typography level="body-sm" sx={{ fontWeight: 'md' }}>
                    {user?.username || 'User'}
                  </Typography>
                  <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
                    {user?.email || 'user@example.com'}
                  </Typography>
                </Box>
              </MenuItem>
              <Divider />
              <MenuItem>
                <User size={16} />
                Profile
              </MenuItem>
              <MenuItem>
                <Star size={16} />
                My Reviews
              </MenuItem>
              <MenuItem>
                <Settings size={16} />
                Settings
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
              <Typography level="body-xs">{item.label}</Typography>
            </Button>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default NavBar;