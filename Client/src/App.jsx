import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Marketplace from './pages/Marketplace';
import ApiDetails from './pages/ApiDetails';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function TerminalLoader() {
  const [lines, setLines] = useState([]);
  const allLines = [
    { text: 'SYSTEM: Initializing API Corner core handshake...', type: 'info' },
    { text: 'STATUS: Establishing secure TLS 1.3 session tunnel...', type: 'info' },
    { text: 'MODULES: Loading interactive developer playground...', type: 'info' },
    { text: 'KEYS: Injecting production credentials & routing tables...', type: 'info' },
    { text: 'SUCCESS: Sandbox env operational. Welcome back, Developer.', type: 'success' }
  ];

  useEffect(() => {
    let currentLine = 0;
    // Speed up display of lines so it fits within 1.5 seconds nicely
    const interval = setInterval(() => {
      if (currentLine < allLines.length) {
        setLines(prev => [...prev, allLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#050505', padding: '20px' }}>
      <div className="terminal-loader">
        <div className="terminal-header-buttons">
          <span className="terminal-dot dot-red"></span>
          <span className="terminal-dot dot-yellow"></span>
          <span className="terminal-dot dot-green"></span>
          <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#555', fontFamily: 'monospace' }}>bash - 80x24</span>
        </div>
        <div className="terminal-body">
          {lines.map((line, idx) => (
            <div key={idx} className={`terminal-line ${line.type === 'success' ? 'terminal-line-success' : ''}`}>
              <span className="terminal-prompt">$</span>{line.text}
            </div>
          ))}
          {lines.length < allLines.length && (
            <div className="terminal-line">
              <span className="terminal-prompt">$</span><span className="terminal-cursor">█</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('api_corner_token') || '');
  const [loading, setLoading] = useState(true);

  // Authenticate user on load if token is available
  useEffect(() => {
    const fetchUserProfile = async () => {
      const startTime = Date.now();
      
      const enforceDelay = async () => {
        const elapsed = Date.now() - startTime;
        if (elapsed < 1500) {
          await new Promise(resolve => setTimeout(resolve, 1500 - elapsed));
        }
      };

      if (!token) {
        await enforceDelay();
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
        await enforceDelay();
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
    return <TerminalLoader />;
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
