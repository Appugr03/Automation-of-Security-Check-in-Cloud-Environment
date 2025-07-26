import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Sidebar from './components/Sidebar/Sidebar';
import ServiceDetailsPage from './components/pages/ServiceDetailsPage';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Router>
      <div className="app">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard activeTab={activeTab} />} />
            <Route path="/service/:id" element={<ServiceDetailsPage />} />
            <Route path="/service/:id/policies" element={<ServiceDetailsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;