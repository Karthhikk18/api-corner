import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <Terminal size={28} />
          <span>API Corner</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className="btn btn-secondary" style={{ marginRight: '10px' }}>Documentation</Link>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="btn btn-primary">GitHub</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
