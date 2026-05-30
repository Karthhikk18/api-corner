import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Server, Copy, CheckCircle2 } from 'lucide-react';

function ApiDetails({ token, isAuthenticated }) {
  const { id } = useParams();
  const [api, setApi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testResult, setTestResult] = useState(null);
  const [testLoading, setTestLoading] = useState(false);
  const [testParams, setTestParams] = useState({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const apiUrl = import.meta.env.DEV ? `http://localhost:5000/api/directory/${id}` : `/api/directory/${id}`;
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setApi(data);
        const defaultParams = {};
        if (data.parameters) {
          data.parameters.forEach(p => {
            if (p.name === 'city') defaultParams[p.name] = 'London';
            if (p.name === 'count') defaultParams[p.name] = '3';
            if (p.name === 'prompt') defaultParams[p.name] = 'What is the future of AI?';
            if (p.name === 'language') defaultParams[p.name] = 'python';
            if (p.name === 'code') defaultParams[p.name] = 'print("Hello World")';
            if (p.name === 'ip') defaultParams[p.name] = '192.168.1.1';
            if (p.name === 'investment') defaultParams[p.name] = '50000';
            if (p.name === 'returns') defaultParams[p.name] = '120000';
            if (p.name === 'branch') defaultParams[p.name] = 'CSE';
            if (p.name === 'year') defaultParams[p.name] = '3';
            if (p.name === 'goals') defaultParams[p.name] = 'Product-based companies';
            if (p.name === 'topic') defaultParams[p.name] = 'OS Scheduling';
            if (p.name === 'skills') defaultParams[p.name] = 'Java, React, Node';
            if (p.name === 'role') defaultParams[p.name] = 'Frontend Developer';
            if (p.name === 'hours') defaultParams[p.name] = '3';
          });
        }
        setTestParams(defaultParams);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleTest = async () => {
    if (!api) return;
    
    setTestLoading(true);
    setTestResult(null);
    let statusCode = 200;
    try {
      const queryParams = new URLSearchParams(testParams).toString();
      const baseUrl = import.meta.env.DEV ? 'http://localhost:5000' : '';
      const url = `${baseUrl}${api.endpoint}${queryParams ? `?${queryParams}` : ''}`;
      
      const res = await fetch(url);
      statusCode = res.status;
      const data = await res.json();
      setTestResult(data);

      // Record sandbox request history if user is authenticated
      if (isAuthenticated && token) {
        try {
          await fetch(`${baseUrl}/api/history`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              apiId: api.id,
              apiName: api.name,
              endpoint: api.endpoint,
              method: api.method,
              parameters: testParams,
              status: statusCode
            })
          });
        } catch (historyErr) {
          console.error('Error logging playground run to history:', historyErr);
        }
      }
    } catch (err) {
      setTestResult({ error: "Failed to fetch from API" });
    }
    setTestLoading(false);
  };

  const handleParamChange = (name, value) => {
    setTestParams(prev => ({ ...prev, [name]: value }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(testResult || api?.exampleResponse, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <div className="container details-page"><div className="skeleton" style={{ height: '400px' }}></div></div>;
  if (!api || api.error) return <div className="container details-page">API not found.</div>;

  const baseUrl = import.meta.env.DEV ? 'http://localhost:5000' : window.location.origin;

  return (
    <div className="container details-page animate-fade-in">
      <Link to="/" className="back-link">
        <ArrowLeft size={18} /> Back to Marketplace
      </Link>
      
      <div className="details-header">
        <h1 className="details-title text-gradient">{api.name}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '800px', lineHeight: '1.8' }}>
          {api.description}
        </p>
      </div>

      <div className="endpoint-box">
        <span className="api-method">{api.method}</span>
        <span className="endpoint-url">{baseUrl}{api.endpoint}</span>
      </div>

      <h2 className="section-title">Parameters</h2>
      {api.parameters && api.parameters.length > 0 ? (
        <table className="params-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {api.parameters.map((param, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'Outfit, monospace', color: 'var(--secondary-color)', fontWeight: 600 }}>{param.name}</td>
                <td style={{ fontFamily: 'Outfit, monospace', color: 'var(--text-secondary)' }}>{param.type}</td>
                <td>{param.required ? <span className="badge-required">Yes</span> : <span style={{ color: 'var(--text-muted)' }}>No</span>}</td>
                <td>{param.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginBottom: '50px', color: 'var(--text-muted)' }}>This endpoint does not require any parameters.</p>
      )}

      <h2 className="section-title">Example Response</h2>
      <div className="code-block relative">
        <button 
          onClick={handleCopy}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
          title="Copy JSON"
        >
          {copied ? <CheckCircle2 size={20} color="var(--success)" /> : <Copy size={20} />}
        </button>
        <pre><code style={{ color: '#a5d6ff' }}>{JSON.stringify(api.exampleResponse, null, 2)}</code></pre>
      </div>

      <h2 className="section-title">Interactive Playground</h2>
      <div className="playground">
        <p style={{ marginBottom: '30px', color: 'var(--text-secondary)' }}>Test this API endpoint directly from your browser in real-time.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          {api.parameters && api.parameters.map((param, i) => (
            <div key={i} className="playground-input-group">
              <label className="playground-label">
                {param.name} {param.required && <span style={{ color: 'var(--error)' }}>*</span>}
              </label>
              <input 
                type="text" 
                className="playground-input"
                placeholder={`e.g. ${testParams[param.name] || ''}`}
                value={testParams[param.name] || ''}
                onChange={(e) => handleParamChange(param.name, e.target.value)}
              />
            </div>
          ))}
        </div>
        
        <button className="btn btn-primary" onClick={handleTest} disabled={testLoading}>
          {testLoading ? <Server size={20} style={{ animation: 'spin 1.5s linear infinite' }} /> : <Play size={20} />}
          {testLoading ? 'Processing Request...' : 'Send Request'}
        </button>
        
        {testLoading && (
          <div className="playground-pulse-track">
            <div className="playground-pulse-bar"></div>
          </div>
        )}
        
        {testResult && (
          <div className="playground-result animate-fade-in">
            <div style={{ position: 'absolute', top: '10px', right: '16px', fontSize: '0.8rem', color: 'var(--success)', fontFamily: 'Inter', fontWeight: 600 }}>
              200 OK
            </div>
            <pre><code>{JSON.stringify(testResult, null, 2)}</code></pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApiDetails;
