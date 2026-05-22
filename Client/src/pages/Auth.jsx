import React, { useState, useEffect } from 'react';
import { Mail, Lock, ArrowRight, Server, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Auth({ isAuthenticated, onLogin }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Input Validations
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    
    try {
      const baseUrl = import.meta.env.DEV ? 'http://localhost:5000' : '';
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setSuccess(isLogin ? 'Login successful!' : 'Account created successfully!');
      
      // Delay navigation slightly to show success checkmark
      setTimeout(() => {
        onLogin(data.token, data.user);
        navigate('/dashboard');
      }, 800);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '160px 0 100px', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="auth-box animate-fade-in" style={{ width: '100%' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '10px', fontWeight: 800 }} className="text-gradient">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '30px' }}>
          {isLogin ? 'Sign in to access your dashboard and API keys.' : 'Sign up to register credentials and request history.'}
        </p>

        {error && (
          <div style={{ backgroundColor: 'rgba(255, 51, 102, 0.1)', border: '1px solid var(--error)', color: 'var(--error)', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 'bold' }}>⚠️</span> {error}
          </div>
        )}

        {success && (
          <div style={{ backgroundColor: 'rgba(0, 243, 255, 0.1)', border: '1px solid var(--primary-color)', color: 'var(--primary-color)', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', textShadow: '0 0 5px var(--primary-glow)' }}>
            <span style={{ fontWeight: 'bold' }}>✓</span> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="playground-input-group" style={{ marginBottom: 0 }}>
            <label className="playground-label" style={{ fontSize: '0.8rem' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="email" 
                className="playground-input"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ paddingLeft: '48px' }}
                disabled={loading}
              />
            </div>
          </div>

          <div className="playground-input-group" style={{ marginBottom: 0 }}>
            <label className="playground-label" style={{ fontSize: '0.8rem' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="playground-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingLeft: '48px', paddingRight: '48px' }}
                disabled={loading}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="playground-input-group" style={{ marginBottom: 0 }}>
              <label className="playground-label" style={{ fontSize: '0.8rem' }}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="playground-input"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={{ paddingLeft: '48px' }}
                  disabled={loading}
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '16px', justifyContent: 'center', marginTop: '10px' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Server className="animate-spin" size={20} />
                Processing...
              </>
            ) : (
              <>
                {isLogin ? 'Sign In' : 'Sign Up'}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '30px', textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span 
              className="text-neon" 
              style={{ cursor: 'pointer', fontWeight: 'bold' }}
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccess('');
              }}
            >
              {isLogin ? 'Sign up' : 'Sign in'} <ArrowRight size={14} style={{ verticalAlign: 'middle' }} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
