import React from 'react';
import { GitBranch, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Auth({ onLogin }) {
  const navigate = useNavigate();

  const handleLogin = (method) => {
    // Mock login functionality
    console.log(`Logging in with ${method}`);
    onLogin();
    navigate('/dashboard');
  };

  return (
    <div className="container" style={{ padding: '160px 0 100px', minHeight: '80vh' }}>
      <div className="auth-box animate-fade-in">
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '10px' }}>Welcome Back</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '40px' }}>
          Sign in to access your dashboard and API keys.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button 
            className="btn btn-secondary" 
            style={{ width: '100%', padding: '16px', justifyContent: 'center' }}
            onClick={() => handleLogin('github')}
          >
            <GitBranch size={20} style={{ marginRight: '8px' }} />
            Sign in with Git Account
          </button>
          
          <button 
            className="btn btn-secondary" 
            style={{ width: '100%', padding: '16px', justifyContent: 'center' }}
            onClick={() => handleLogin('mail')}
          >
            <Mail size={20} style={{ marginRight: '8px' }} />
            Sign in with Email
          </button>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Don't have an account? <span className="text-neon" style={{ cursor: 'pointer', fontWeight: 'bold' }}>Sign up <ArrowRight size={14} style={{ verticalAlign: 'middle' }} /></span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
