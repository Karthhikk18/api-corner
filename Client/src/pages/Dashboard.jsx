import React from 'react';
import { Copy, RefreshCw, Trash2, Activity, Database, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ isAuthenticated }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="container" style={{ padding: '120px 0 80px' }}>
      <div className="animate-fade-in">
        <h1 className="details-title text-gradient" style={{ marginBottom: '40px' }}>Dashboard</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '60px' }}>
          <div className="dashboard-stat-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
              <Activity size={20} /> Total Requests
            </div>
            <div className="stat-value neon">124,592</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--success)' }}>+14% this week</div>
          </div>
          
          <div className="dashboard-stat-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
              <Database size={20} /> Data Transfer
            </div>
            <div className="stat-value text-gradient">42.8 GB</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Limit: 100 GB</div>
          </div>
          
          <div className="dashboard-stat-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
              <Shield size={20} /> Failed Requests
            </div>
            <div className="stat-value" style={{ color: 'var(--error)' }}>23</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>0.01% error rate</div>
          </div>
        </div>

        <h2 className="section-title">API Keys</h2>
        <div style={{ background: 'var(--surface-color)', padding: '30px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Manage your API keys for authentication.</p>
            <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>+ Generate New Key</button>
          </div>
          
          <div className="api-key-box">
            <span>Production Key</span>
            <span>sk_live_...4f9a</span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Copy size={18} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
              <RefreshCw size={18} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
              <Trash2 size={18} style={{ cursor: 'pointer', color: 'var(--error)' }} />
            </div>
          </div>
          
          <div className="api-key-box" style={{ opacity: 0.7 }}>
            <span>Development Key</span>
            <span>sk_test_...8x2b</span>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Copy size={18} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
              <RefreshCw size={18} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} />
              <Trash2 size={18} style={{ cursor: 'pointer', color: 'var(--error)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
