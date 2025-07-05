import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssVarsProvider } from '@mui/joy/styles';
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

  useEffect(() => {
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
  }, []);

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
        throw new Error('Login failed');
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
        throw new Error('Signup failed');
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
    <CssVarsProvider>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/user-coffees" element={<UserCoffees coffees={coffees} setCoffees={setCoffees} />} />
        <Route path="/cafes" element={<Cafes cafes={cafes} setCafes={setCafes} coffees={coffees} setCoffees={setCoffees} />} />
      </Routes>
    </CssVarsProvider>
  );
}

export default App;