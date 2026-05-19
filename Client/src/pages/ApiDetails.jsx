import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Server } from 'lucide-react';

function ApiDetails() {
  const { id } = useParams();
  const [api, setApi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testResult, setTestResult] = useState(null);
  const [testLoading, setTestLoading] = useState(false);
  const [testParams, setTestParams] = useState({});

  useEffect(() => {
    const apiUrl = import.meta.env.DEV ? `http://localhost:5000/api/directory/${id}` : `/api/directory/${id}`;
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setApi(data);
        // Initialize default test params
        const defaultParams = {};
        if (data.parameters) {
          data.parameters.forEach(p => {
            if (p.name === 'city') defaultParams[p.name] = 'London';
            if (p.name === 'count') defaultParams[p.name] = '3';
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
    try {
      // Build query string
      const queryParams = new URLSearchParams(testParams).toString();
      const baseUrl = import.meta.env.DEV ? 'http://localhost:5000' : '';
      const url = `${baseUrl}${api.endpoint}${queryParams ? `?${queryParams}` : ''}`;
      
      const res = await fetch(url);
      const data = await res.json();
      setTestResult(data);
    } catch (err) {
      setTestResult({ error: "Failed to fetch from API" });
    }
    setTestLoading(false);
  };

  const handleParamChange = (name, value) => {
    setTestParams(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>Loading...</div>;
  if (!api || api.error) return <div className="container" style={{ padding: '60px 0' }}>API not found.</div>;

  return (
    <div className="container details-page animate-fade-in">
      <Link to="/" className="back-link">
        <ArrowLeft size={20} /> Back to Marketplace
      </Link>
      
      <div className="details-header">
        <h1 className="details-title">{api.name}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>{api.description}</p>
      </div>

      <div className="endpoint-box">
        <span className="api-method">{api.method}</span>
        <span>{import.meta.env.DEV ? 'http://localhost:5000' : window.location.origin}{api.endpoint}</span>
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
                <td style={{ fontFamily: 'monospace', color: 'var(--primary-color)' }}>{param.name}</td>
                <td style={{ fontFamily: 'monospace' }}>{param.type}</td>
                <td>{param.required ? <span className="badge-required">Yes</span> : 'No'}</td>
                <td>{param.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginBottom: '40px', color: 'var(--text-secondary)' }}>This endpoint does not require any parameters.</p>
      )}

      <h2 className="section-title">Example Response</h2>
      <div className="code-block">
        <pre><code>{JSON.stringify(api.exampleResponse, null, 2)}</code></pre>
      </div>

      <h2 className="section-title">Interactive Playground</h2>
      <div className="playground">
        <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>Test this API endpoint directly from your browser.</p>
        
        {api.parameters && api.parameters.map((param, i) => (
          <div key={i}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {param.name} {param.required && '*'}
            </label>
            <input 
              type="text" 
              className="playground-input"
              placeholder={`Enter ${param.name}`}
              value={testParams[param.name] || ''}
              onChange={(e) => handleParamChange(param.name, e.target.value)}
            />
          </div>
        ))}
        
        <button className="btn btn-primary" onClick={handleTest} disabled={testLoading}>
          {testLoading ? <Server className="animate-spin" size={18} /> : <Play size={18} />}
          Send Request
        </button>
        
        {testResult && (
          <div className="playground-result animate-fade-in">
            <pre><code>{JSON.stringify(testResult, null, 2)}</code></pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApiDetails;
