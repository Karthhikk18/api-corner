import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Trash2, Activity, Shield, Key, History, Terminal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ isAuthenticated, token, user }) {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const fetchHistory = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const baseUrl = import.meta.env.DEV ? 'http://localhost:5000' : '';
      const res = await fetch(`${baseUrl}/api/history`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (err) {
      console.error('Error fetching request history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else {
      fetchHistory();
    }
  }, [isAuthenticated, navigate, token]);

  const handleClearHistory = async () => {
    if (!window.confirm('Are you sure you want to clear your entire API sandbox request history?')) {
      return;
    }
    setClearing(true);
    try {
      const baseUrl = import.meta.env.DEV ? 'http://localhost:5000' : '';
      const res = await fetch(`${baseUrl}/api/history`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        setLogs([]);
      }
    } catch (err) {
      console.error('Error clearing history:', err);
    } finally {
      setClearing(false);
    }
  };

  const handleCopy = (text, keyType) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyType);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!isAuthenticated) return null;

  // Calculate live stats
  const totalRequests = logs.length;
  const failedRequests = logs.filter(log => log.status >= 400).length;
  const successRate = totalRequests > 0 
    ? (((totalRequests - failedRequests) / totalRequests) * 100).toFixed(1) 
    : '100';

  const userDisplayName = user?.email ? user.email : 'Developer';

  return (
    <div className="container" style={{ padding: '120px 0 80px' }}>
      <div className="animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 className="details-title text-gradient" style={{ marginBottom: '10px' }}>Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Welcome back, <span className="text-neon" style={{ fontWeight: 600 }}>{userDisplayName}</span></p>
          </div>
          <button 
            className="btn btn-secondary" 
            onClick={fetchHistory} 
            disabled={loading}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh Logs
          </button>
        </div>
        
        {/* Statistics Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '50px' }}>
          <div className="dashboard-stat-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <Activity size={20} className="text-neon" /> Sandbox Request Logs
            </div>
            <div className="stat-value neon">{totalRequests}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total tests initiated</div>
          </div>
          
          <div className="dashboard-stat-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <Terminal size={20} style={{ color: 'var(--success)' }} /> API Success Rate
            </div>
            <div className="stat-value text-gradient">{successRate}%</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--success)' }}>Active endpoints operational</div>
          </div>
          
          <div className="dashboard-stat-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <Shield size={20} style={{ color: 'var(--error)' }} /> Failed Queries
            </div>
            <div className="stat-value" style={{ color: failedRequests > 0 ? 'var(--error)' : 'var(--text-muted)' }}>{failedRequests}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Request status errors (400+)</div>
          </div>
        </div>

        {/* API Credentials */}
        <h2 className="section-title" style={{ marginBottom: '24px' }}>API Keys</h2>
        <div style={{ background: 'var(--surface-color)', padding: '30px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '50px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Use these secret keys to authenticate queries directly against our production Gateway.</p>
            <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>+ Generate Key</button>
          </div>
          
          <div className="api-key-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Key size={16} />
              <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Production Key</span>
            </div>
            <span style={{ fontFamily: 'monospace', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>sk_live_2026_9281a_api_corner</span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => handleCopy('sk_live_2026_9281a_api_corner', 'live')}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: copiedKey === 'live' ? 'var(--primary-color)' : 'var(--text-secondary)' }}
                title="Copy Key"
              >
                <Copy size={18} />
              </button>
            </div>
          </div>
          
          <div className="api-key-box" style={{ opacity: 0.7 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Key size={16} />
              <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Development Key</span>
            </div>
            <span style={{ fontFamily: 'monospace', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>sk_test_2026_8192x_api_corner</span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => handleCopy('sk_test_2026_8192x_api_corner', 'test')}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: copiedKey === 'test' ? 'var(--primary-color)' : 'var(--text-secondary)' }}
                title="Copy Key"
              >
                <Copy size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Request History Log */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 className="section-title" style={{ margin: 0 }}>
            <History size={22} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Request History
          </h2>
          {logs.length > 0 && (
            <button 
              className="btn btn-secondary" 
              style={{ color: 'var(--error)', border: '1px solid rgba(255, 51, 102, 0.2)', padding: '8px 16px', fontSize: '0.9rem' }}
              onClick={handleClearHistory}
              disabled={clearing}
            >
              <Trash2 size={16} />
              {clearing ? 'Clearing...' : 'Clear History'}
            </button>
          )}
        </div>

        {loading ? (
          <div className="skeleton" style={{ height: '200px', width: '100%' }}></div>
        ) : logs.length === 0 ? (
          <div style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '50px', textAlign: 'center' }}>
            <Terminal size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No request history found</h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
              Test any API in the interactive sandbox playground and your requests will be listed here.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'var(--surface-color)' }}>
            <table className="params-table" style={{ margin: 0, background: 'transparent', border: 'none' }}>
              <thead>
                <tr>
                  <th>API Endpoint</th>
                  <th>Method</th>
                  <th>Submitted Parameters</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => {
                  const isErr = log.status >= 400;
                  const date = new Date(log.timestamp).toLocaleString();
                  return (
                    <tr key={log.id || log._id}>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{log.apiName}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontFamily: 'monospace', marginTop: '2px' }}>{log.endpoint}</div>
                      </td>
                      <td>
                        <span className="api-method" style={{ fontSize: '0.75rem', padding: '4px 8px' }}>{log.method}</span>
                      </td>
                      <td>
                        {Object.keys(log.parameters || {}).length > 0 ? (
                          <pre style={{ margin: 0, fontSize: '0.8rem', padding: '6px 10px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', fontFamily: 'monospace', border: '1px solid rgba(255,255,255,0.03)', maxWidth: '280px', overflowX: 'auto', color: '#a5d6ff' }}>
                            {JSON.stringify(log.parameters, null, 1)}
                          </pre>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No params</span>
                        )}
                      </td>
                      <td>
                        <span style={{ 
                          color: isErr ? 'var(--error)' : 'var(--primary-color)',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          fontFamily: 'monospace',
                          textShadow: isErr ? 'none' : '0 0 5px var(--primary-glow)'
                        }}>
                          {log.status} {isErr ? 'Error' : 'OK'}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {date}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
