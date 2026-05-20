import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, LogOut, LayoutDashboard, User } from 'lucide-react';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-icon">
            <Terminal size={24} />
          </span>
          <span>API Corner</span>
        </Link>
        <div className="navbar-links" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Link to="/" className="btn btn-secondary" style={{ border: 'none' }}>Marketplace</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="btn btn-secondary">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary" style={{ color: 'var(--error)' }} title="Log Out">
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="btn btn-secondary">Sign In</Link>
              <Link to="/auth" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

