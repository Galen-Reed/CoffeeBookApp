import { CssVarsProvider } from '@mui/joy/styles';
import theme from "../components/theme";
import { UserProvider, useUser } from "../context/UserContext";
import Login from "../Pages/Login";
import NavBar from "../components/NavBar";
import { Routes, Route } from "react-router-dom";
import Cafes from "../Pages/Cafes";
import UserCoffees from "../Pages/UserCoffees";
import NoteFormPage from "../Pages/NoteFormPage";
import CafeFormPage from "../Pages/CafeFormPage";

function InnerApp() {
  const { 
    user, 
    loading, 
    error, 
    handleLogin, 
    handleSignup, 
    handleGitHubAuth, 
    handleClearError, 
    handleLogout
  } = useUser();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <Login
        onLogin={handleLogin}
        onSignup={handleSignup}
        onGitHubAuth={handleGitHubAuth}
        loading={loading}
        error={error}
        onClearError={handleClearError}
      />
    );
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<UserCoffees />} />
        <Route path="/cafes" element={<Cafes />} />
        <Route path="/cafes/new" element={<CafeFormPage />} />
        <Route path="/notes/new" element={<NoteFormPage />} />
        <Route path="/notes/:id/edit" element={<NoteFormPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <CssVarsProvider theme={theme}>
      <UserProvider>
        <InnerApp />
      </UserProvider>
    </CssVarsProvider>
  );
}

export default App;