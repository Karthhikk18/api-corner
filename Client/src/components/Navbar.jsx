import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, LogOut, LayoutDashboard, User } from 'lucide-react';

function Navbar({ isAuthenticated, user, onLogout }) {
  // Extract user display name from email (e.g. "john" from "john@gmail.com")
  const displayName = user?.email ? user.email.split('@')[0] : 'Developer';

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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', border: '1px solid var(--border-color)', borderRadius: '20px', background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <User size={14} className="text-neon" />
                <span style={{ fontWeight: 500 }}>{displayName}</span>
              </div>
              
              <Link to="/dashboard" className="btn btn-secondary">
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              
              <button onClick={onLogout} className="btn btn-secondary" style={{ color: 'var(--error)' }} title="Log Out">
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
