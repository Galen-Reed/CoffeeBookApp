import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [allCoffees, setAllCoffees] = useState([]);
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    fetchCafes();
    fetchAllCoffees();
  }, []);

  const fetchCafes = async () => {
    try {
      const response = await fetch('/cafes', { credentials: 'same-origin' });
      if (response.ok) {
        const data = await response.json();
        setCafes(data);
      }
    } catch (error) {
      console.error('Error fetching cafes:', error);
    }
  };

  const fetchAllCoffees = () => {
  fetch("/coffees", { credentials: "same-origin" })
    .then((r) => r.json())
    .then(setAllCoffees)
    .catch((e) => console.error("Failed to fetch all coffees", e));
};

  const fetchUser = async () => {
    try {
      const res = await fetch("/check_session", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error fetching session:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (formData) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
        navigate("/");
      } else {
        const errData = await res.json();
        throw new Error(errData.error || 'Login failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (formData) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
        navigate("/");
      } else {
        const errData = await res.json();
        throw new Error(errData.error || 'Signup failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/logout", {
      method: "DELETE",
      credentials: "include",
    });
    setUser(null);
    navigate("/");
  };

  const handleGitHubAuth = () => {
    window.location.replace("http://localhost:5555/auth/github");
  };

  const handleClearError = () => setError('');

  const value = {
    user,
    setUser,
    loading,
    error,
    cafes,
    setCafes,
    coffees: user?.coffees || [],
    allCoffees,
    setAllCoffees,
    handleLogin,
    handleSignup,
    handleLogout,
    handleGitHubAuth,
    handleClearError,
    fetchUser,
    fetch
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}