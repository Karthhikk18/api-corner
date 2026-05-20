import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Marketplace from './pages/Marketplace';
import ApiDetails from './pages/ApiDetails';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <main>
          <Routes>
            <Route path="/" element={<Marketplace />} />
            <Route path="/api/:id" element={<ApiDetails />} />
            <Route path="/auth" element={<Auth onLogin={() => setIsAuthenticated(true)} />} />
            <Route path="/dashboard" element={<Dashboard isAuthenticated={isAuthenticated} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

