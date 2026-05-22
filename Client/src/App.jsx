import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Marketplace from './pages/Marketplace';
import ApiDetails from './pages/ApiDetails';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('api_corner_token') || '');
  const [loading, setLoading] = useState(true);

  // Authenticate user on load if token is available
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const baseUrl = import.meta.env.DEV ? 'http://localhost:5000' : '';
        const res = await fetch(`${baseUrl}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          // Token expired or invalid
          localStorage.removeItem('api_corner_token');
          setToken('');
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Error verifying user token:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleLogin = (jwtToken, userData) => {
    localStorage.setItem('api_corner_token', jwtToken);
    setToken(jwtToken);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('api_corner_token');
    setToken('');
    setUser(null);
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#050505', color: '#00f3ff', fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', letterSpacing: '2px' }}>
        LOADING API CORNER...
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Marketplace />} />
            <Route path="/api/:id" element={<ApiDetails token={token} isAuthenticated={isAuthenticated} />} />
            <Route path="/auth" element={<Auth isAuthenticated={isAuthenticated} onLogin={handleLogin} />} />
            <Route path="/dashboard" element={<Dashboard isAuthenticated={isAuthenticated} token={token} user={user} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
