import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Activity } from 'lucide-react';

function Marketplace() {
  const [apis, setApis] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch APIs from backend
    const apiUrl = import.meta.env.DEV ? 'http://localhost:5000/api/directory' : '/api/directory';
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setApis(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch APIs", err);
        setLoading(false);
      });
  }, []);

  const filteredApis = apis.filter(api => 
    api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    api.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <section className="hero">
        <div className="container animate-fade-in">
          <h1>API Corner</h1>
          <p>Discover, test, and integrate high-demand IT and Developer APIs for your next project. Totally free and open source.</p>
          
          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search APIs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Activity className="animate-spin" size={40} style={{ color: 'var(--primary-color)', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <div className="api-grid">
            {filteredApis.map((api, index) => (
              <div 
                key={api.id} 
                className="api-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="api-card-header">
                  <h3 className="api-title">{api.name}</h3>
                  <span className="api-category">{api.category}</span>
                </div>
                <p className="api-description">{api.description}</p>
                <div className="api-card-footer">
                  <span className="api-method">{api.method}</span>
                  <Link to={`/api/${api.id}`} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                    View Docs <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && filteredApis.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            <p>No APIs found matching your search.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Marketplace;
