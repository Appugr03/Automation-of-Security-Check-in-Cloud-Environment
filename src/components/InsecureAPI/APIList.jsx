import React, { useState, useEffect } from 'react';
import './APIList.css';

const APIList = ({ onViewDetails }) => {
  const [apis, setApis] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for insecure APIs
  const mockApis = [
    {
      id: 1,
      name: 'User Authentication API',
      endpoint: '/api/auth/login',
      method: 'POST',
      severity: 'high',
      vulnerabilities: ['No rate limiting', 'Weak password policy', 'No MFA'],
      vulnerability: 'Weak Password Policy',
      status: 'vulnerable',
      lastTested: '2024-01-15',
      description: 'Authentication endpoint with multiple security issues',
      riskLevel: 'HIGH',
      example: 'POST /api/auth/login\n{\n  "username": "admin",\n  "password": "123"\n}'
    },
    {
      id: 2,
      name: 'User Data API',
      endpoint: '/api/users/{id}',
      method: 'GET',
      severity: 'critical',
      vulnerabilities: ['SQL Injection', 'No input validation', 'IDOR vulnerability'],
      vulnerability: 'SQL Injection',
      status: 'critical',
      lastTested: '2024-01-14',
      description: 'User data retrieval with direct object reference issues',
      riskLevel: 'CRITICAL',
      example: 'GET /api/users/1\' OR \'1\'=\'1\' --'
    },
    {
      id: 3,
      name: 'File Upload API',
      endpoint: '/api/upload',
      method: 'POST',
      severity: 'high',
      vulnerabilities: ['No file type validation', 'No size limits', 'Path traversal'],
      vulnerability: 'Unrestricted File Upload',
      status: 'vulnerable',
      lastTested: '2024-01-13',
      description: 'File upload endpoint with insufficient validation',
      riskLevel: 'HIGH',
      example: 'POST /api/upload\nContent-Type: multipart/form-data\n\n[file: malicious.exe]'
    },
    {
      id: 4,
      name: 'Admin Panel API',
      endpoint: '/api/admin/users',
      method: 'GET',
      severity: 'critical',
      vulnerabilities: ['Broken access control', 'No authorization checks'],
      vulnerability: 'Broken Access Control',
      status: 'critical',
      lastTested: '2024-01-12',
      description: 'Admin functionality accessible without proper authorization',
      riskLevel: 'CRITICAL',
      example: 'GET /api/admin/users\nAuthorization: Bearer invalid_token'
    },
    {
      id: 5,
      name: 'Payment API',
      endpoint: '/api/payments',
      method: 'POST',
      severity: 'medium',
      vulnerabilities: ['Insufficient logging', 'No transaction verification'],
      vulnerability: 'Information Disclosure',
      status: 'warning',
      lastTested: '2024-01-11',
      description: 'Payment processing with logging and verification issues',
      riskLevel: 'MEDIUM',
      example: 'POST /api/payments\n{\n  "amount": -100,\n  "account": "123"\n}'
    },
    {
      id: 6,
      name: 'Search API',
      endpoint: '/api/search',
      method: 'GET',
      severity: 'low',
      vulnerabilities: ['Information disclosure', 'No rate limiting'],
      vulnerability: 'No Rate Limiting',
      status: 'info',
      lastTested: '2024-01-10',
      description: 'Search functionality with minor security concerns',
      riskLevel: 'LOW',
      example: 'GET /api/search?q=sensitive_data'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setApis(mockApis);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#dc3545';
      case 'high': return '#fd7e14';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return '#dc3545';
      case 'vulnerable': return '#fd7e14';
      case 'warning': return '#ffc107';
      case 'info': return '#17a2b8';
      default: return '#6c757d';
    }
  };

  const filteredApis = apis.filter(api => {
    const matchesFilter = filter === 'all' || api.severity === filter;
    const matchesSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         api.endpoint.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleRescan = (apiId) => {
    setApis(prev => prev.map(api => 
      api.id === apiId 
        ? { ...api, lastTested: new Date().toISOString().split('T')[0] }
        : api
    ));
  };

  return (
    <div className="api-list-container">
      <div className="api-list-header">
        <h2>Insecure API Detection</h2>
        <p>Monitor and manage API security vulnerabilities</p>
      </div>

      {/* Controls */}
      <div className="api-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search APIs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="api-stats">
        <div className="stat-card critical">
          <h3>{apis.filter(api => api.severity === 'critical').length}</h3>
          <p>Critical</p>
        </div>
        <div className="stat-card high">
          <h3>{apis.filter(api => api.severity === 'high').length}</h3>
          <p>High</p>
        </div>
        <div className="stat-card medium">
          <h3>{apis.filter(api => api.severity === 'medium').length}</h3>
          <p>Medium</p>
        </div>
        <div className="stat-card low">
          <h3>{apis.filter(api => api.severity === 'low').length}</h3>
          <p>Low</p>
        </div>
      </div>

      {/* API List */}
      <div className="api-list">
        {filteredApis.map(api => (
          <div key={api.id} className="api-card">
            <div className="api-card-header">
              <div className="api-info">
                <h3>{api.name}</h3>
                <div className="api-endpoint">
                  <span className="method" style={{ backgroundColor: getStatusColor(api.status) }}>
                    {api.method}
                  </span>
                  <span className="endpoint">{api.endpoint}</span>
                </div>
              </div>
              <div className="api-severity">
                <span 
                  className="severity-badge"
                  style={{ backgroundColor: getSeverityColor(api.severity) }}
                >
                  {api.severity.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="api-card-body">
              <p className="api-description">{api.description}</p>
              
              <div className="vulnerabilities">
                <h4>Vulnerabilities:</h4>
                <ul>
                  {api.vulnerabilities.map((vuln, index) => (
                    <li key={index}>{vuln}</li>
                  ))}
                </ul>
              </div>

              <div className="api-meta">
                <span className="last-tested">Last tested: {api.lastTested}</span>
                <div className="api-actions">
                  <button 
                    className="btn-rescan"
                    onClick={() => handleRescan(api.id)}
                  >
                    Rescan
                  </button>
                  <button 
                    className="btn-details"
                    onClick={() => onViewDetails(api)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredApis.length === 0 && (
        <div className="no-results">
          <p>No APIs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default APIList;