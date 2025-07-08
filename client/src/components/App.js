import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { CssVarsProvider } from '@mui/joy/styles';
import theme from "../components/theme";
import Login from "../Pages/Login";
import NavBar from "../components/NavBar";
import UserCoffees from "../Pages/UserCoffees";
import Cafes from "../Pages/Cafes";

function App() {
  const [user, setUser] = useState(null);
  const [cafes, setCafes] = useState([]);
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/cafes")
    .then((response) => response.json())
    .then((data) => setCafes(data));
  }, []);

  useEffect(() => {
    fetch("/coffees")
    .then((response) => response.json())
    .then((data) => setCoffees(data));
  }, []);

  // Handle OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const authStatus = urlParams.get('auth');
    const errorMessage = urlParams.get('message');
    const isNewUser = urlParams.get('new_user');

    if (authStatus === 'success') {
      // OAuth was successful, check session
      fetch("/check_session", {
        method: "GET",
        credentials: "same-origin",
      }).then((r) => {
        if (r.ok) {
          r.json().then((userData) => {
            setUser(userData);
            // Clear URL parameters
            navigate('/', { replace: true });
            // Optionally show success message
            if (isNewUser) {
              console.log('Welcome! Your account has been created.');
            } else {
              console.log('Welcome back!');
            }
          });
        }
      });
    } else if (authStatus === 'error') {
      // OAuth failed
      let errorText = 'Authentication failed';
      if (errorMessage === 'username_conflict') {
        errorText = 'Username already exists with a different authentication method';
      } else if (errorMessage === 'oauth_failed') {
        errorText = 'GitHub authentication failed. Please try again.';
      }
      setError(errorText);
      // Clear URL parameters
      navigate('/', { replace: true });
    } else {
      // Normal session check
      fetch("/check_session", {
        method: "GET",
        credentials: "same-origin",
      }).then((r) => {
        if (r.ok) {
          r.json().then((userData) => {
            setUser(userData);
          });
        }
      });
    }
  }, [location.search, navigate]);

  const handleLogin = (formData) => {
    setLoading(true);
    setError('');
    
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(formData),
    })
    .then((r) => {
      if (r.ok) {
        return r.json();
      } else {
        return r.json().then(data => {
          throw new Error(data.error || 'Login failed');
        });
      }
    })
    .then((userData) => {
      setUser(userData);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  };

  const handleSignup = (formData) => {
    setLoading(true);
    setError('');
    
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(formData),
    })
    .then((r) => {
      if (r.ok) {
        return r.json();
      } else {
        return r.json().then(data => {
          throw new Error(data.error || 'Signup failed');
        });
      }
    })
    .then((userData) => {
      setUser(userData);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  };

  const handleGitHubAuth = () => {
    window.location.href = "/auth/github";
  };

  const handleClearError = () => {
    setError('');
  };

  if (!user) {
    return (
      <CssVarsProvider>
        <Login
          onLogin={handleLogin}
          onSignup={handleSignup}
          onGitHubAuth={handleGitHubAuth}
          loading={loading}
          error={error}
          onClearError={handleClearError}
        />
      </CssVarsProvider>
    );
  }

  return (
    <CssVarsProvider theme={theme}>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<UserCoffees coffees={coffees} setCoffees={setCoffees} user={user} setUser={setUser} />} />
        <Route path="/cafes" element={<Cafes cafes={cafes} setCafes={setCafes} coffees={coffees} setCoffees={setCoffees} />} />
      </Routes>
    </CssVarsProvider>
  );
}

export default App;