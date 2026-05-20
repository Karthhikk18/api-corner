import React from 'react';

function Footer() {
  return (
    <footer className="footer animate-fade-in delay-3">
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div className="navbar-logo" style={{ fontSize: '1.5rem' }}>
            <span className="navbar-logo-icon" style={{ padding: '4px', borderRadius: '8px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
            </span>
            <span>API Corner</span>
          </div>
          <p>The premium open-source marketplace for high-demand developer APIs.</p>
          <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
            <a href="#" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--primary-color)'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}>Documentation</a>
            <a href="#" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--primary-color)'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}>Status</a>
            <a href="#" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--primary-color)'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}>Terms</a>
          </div>
          <p style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>© {new Date().getFullYear()} API Corner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
