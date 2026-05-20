import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Activity, Zap } from 'lucide-react';

function Marketplace() {
  const [apis, setApis] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          <h1>Discover the <span className="text-gradient">Future</span> of APIs</h1>
          <p>Integrate high-demand IT and Developer APIs seamlessly. Built for scale, totally free and open source.</p>
          
          <div className="search-container">
            <div className="search-bar">
              <Search className="search-icon" size={24} />
              <input 
                type="text" 
                placeholder="Search by name or description..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        {loading ? (
          <div className="api-grid">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="api-card skeleton" style={{ height: '280px' }}></div>
            ))}
          </div>
        ) : (
          <div className="api-grid">
            {filteredApis.map((api, index) => (
              <Link 
                to={`/api/${api.id}`} 
                key={api.id} 
                className={`api-card animate-fade-in delay-${(index % 3) + 1}`}
                style={{ textDecoration: 'none' }}
              >
                <div className="api-card-header">
                  <h3 className="api-title">{api.name}</h3>
                  <span className="api-category">{api.category}</span>
                </div>
                <p className="api-description">{api.description}</p>
                <div className="api-card-footer">
                  <span className="api-method">{api.method}</span>
                  <div className="btn-icon">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {!loading && filteredApis.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '60px 0' }}>
            <Zap size={48} style={{ opacity: 0.2, marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.5rem', color: 'white' }}>No results found</h3>
            <p>Try adjusting your search terms.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Marketplace;
