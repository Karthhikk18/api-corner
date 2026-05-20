import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-icon">
            <Terminal size={24} color="white" />
          </span>
          <span>API Corner</span>
        </Link>
        <div className="navbar-links" style={{ display: 'flex', gap: '16px' }}>
          <Link to="/" className="btn btn-secondary">Documentation</Link>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="btn btn-primary">GitHub</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
