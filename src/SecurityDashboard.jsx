import React, { useState, useEffect } from 'react';
import { Shield, Server, Users, AlertTriangle, Lock, Eye, Activity, Network, Code, Bug } from 'lucide-react';

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'services', label: 'Services', icon: Server },
    { id: 'network', label: 'Network', icon: Network },
    { id: 'threats', label: 'Threats', icon: AlertTriangle },
    { id: 'access', label: 'Access Control', icon: Lock },
    { id: 'monitoring', label: 'Monitoring', icon: Eye },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'apilist', label: 'Insecure APIs', icon: Bug }
  ];

  return (
    <>
      <style>{`
        .sidebar {
          width: 280px;
          background: linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%);
          border-right: 1px solid #333;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
          height: 100vh;
        }

        .sidebar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00ff88, transparent);
          opacity: 0.5;
        }

        .sidebar-header {
          padding: 2rem 1.5rem;
          border-bottom: 1px solid #333;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .logo-icon {
          color: #00ff88;
          filter: drop-shadow(0 0 10px rgba(0, 255, 136, 0.3));
        }

        .logo-text h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.25rem;
          margin: 0;
        }

        .logo-text span {
          font-size: 0.875rem;
          color: #888;
          font-weight: 400;
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.875rem 1.5rem;
          background: none;
          border: none;
          color: #ccc;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          text-align: left;
        }

        .nav-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #00ff88;
          transform: scaleY(0);
          transition: transform 0.2s ease;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          transform: translateX(4px);
        }

        .nav-item:hover::before {
          transform: scaleY(1);
        }

        .nav-item.active {
          background: linear-gradient(90deg, rgba(0, 255, 136, 0.1), transparent);
          color: #00ff88;
          border-right: 2px solid #00ff88;
        }

        .nav-item.active::before {
          transform: scaleY(1);
        }

        .nav-item svg {
          transition: all 0.2s ease;
        }

        .nav-item:hover svg, .nav-item.active svg {
          filter: drop-shadow(0 0 5px currentColor);
        }

        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid #333;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #888;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00ff88;
          animation: pulse 2s infinite;
          box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 240px;
          }
          
          .sidebar-header {
            padding: 1.5rem 1rem;
          }
          
          .nav-item {
            padding: 0.75rem 1rem;
          }
        }
      `}</style>
      
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <Shield className="logo-icon" />
            <div className="logo-text">
              <h2>Zero Trust</h2>
              <span>Security Dashboard</span>
            </div>
          </div>
        </div>
               
        <nav className="sidebar-nav">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
 
        <div className="sidebar-footer">
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span>System Secure</span>
          </div>
        </div>
      </div>
    </>
  );
};

// APIDetails Component
const APIDetails = ({ api }) => {
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(false);

  const vulnerabilityDetails = {
    "No Authentication": {
      impact: "Complete data exposure, unauthorized access to sensitive information",
      fix: "Implement proper authentication (JWT, OAuth, API keys)",
      owasp: "OWASP API1:2023 - Broken Object Level Authorization"
    },
    "Broken Access Control": {
      impact: "Privilege escalation, unauthorized actions, data manipulation",
      fix: "Implement role-based access control (RBAC) and proper authorization checks",
      owasp: "OWASP API5:2023 - Broken Function Level Authorization"
    },
    "SQL Injection": {
      impact: "Database compromise, data theft, server takeover",
      fix: "Use parameterized queries, input validation, and ORM frameworks",
      owasp: "OWASP API8:2023 - Security Misconfiguration"
    },
    "Unrestricted File Upload": {
      impact: "Remote code execution, malware distribution, server compromise",
      fix: "Validate file types, scan uploads, restrict execution permissions",
      owasp: "OWASP API4:2023 - Unrestricted Resource Consumption"
    },
    "Weak Password Policy": {
      impact: "Account compromise, brute force attacks, credential stuffing",
      fix: "Enforce strong password policies, implement account lockouts",
      owasp: "OWASP API2:2023 - Broken Authentication"
    },
    "Information Disclosure": {
      impact: "Sensitive data exposure, credential theft, further attacks",
      fix: "Remove sensitive data from responses, implement proper error handling",
      owasp: "OWASP API3:2023 - Broken Object Property Level Authorization"
    },
    "No Rate Limiting": {
      impact: "DoS attacks, resource exhaustion, service unavailability",
      fix: "Implement rate limiting, throttling, and request quotas",
      owasp: "OWASP API4:2023 - Unrestricted Resource Consumption"
    },
    "Information Leakage": {
      impact: "System information exposure, attack vector discovery",
      fix: "Disable debug mode in production, sanitize error messages",
      owasp: "OWASP API9:2023 - Improper Inventory Management"
    }
  };

  const simulateTest = async () => {
    setTesting(true);
    
    // Simulate API testing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResults = {
      1: { status: "VULNERABLE", response: "200 OK", data: "[{\"id\":1,\"name\":\"John\",\"email\":\"john@email.com\",\"ssn\":\"123-45-6789\"}]" },
      2: { status: "VULNERABLE", response: "200 OK", data: "{\"message\":\"User deleted successfully\"}" },
      3: { status: "VULNERABLE", response: "500 Error", data: "MySQL Error: You have an error in your SQL syntax" },
      4: { status: "VULNERABLE", response: "200 OK", data: "{\"message\":\"File uploaded: malicious.exe\"}" },
      5: { status: "VULNERABLE", response: "200 OK", data: "{\"message\":\"Password updated to: 123\"}" },
      6: { status: "VULNERABLE", response: "200 OK", data: "{\"api_key\":\"sk-1234567890abcdef\",\"secret\":\"SECRET123\"}" },
      7: { status: "VULNERABLE", response: "200 OK", data: "{\"message\":\"1000 emails sent in 1 second\"}" },
      8: { status: "VULNERABLE", response: "200 OK", data: "{\"server\":\"Apache/2.4.41\",\"php\":\"7.4.3\",\"path\":\"/var/www/html\"}" }
    };
    
    setTestResult(mockResults[api.id]);
    setTesting(false);
  };

  const details = vulnerabilityDetails[api.vulnerability] || {};

  return (
    <div className="bg-gray-800 bg-opacity-90 border border-gray-600 rounded-xl p-8 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-8 pb-5 border-b border-gray-600">
        <h2 className="text-white text-3xl font-bold">{api.name}</h2>
        <span className={`px-3 py-1 rounded text-xs font-bold uppercase ${
          api.riskLevel === 'Critical' ? 'bg-red-600 text-white' :
          api.riskLevel === 'High' ? 'bg-orange-600 text-white' :
          api.riskLevel === 'Medium' ? 'bg-yellow-600 text-white' :
          'bg-green-600 text-white'
        }`}>
          {api.riskLevel} Risk
        </span>
      </div>

      <div className="mb-8">
        <div className="flex items-center mb-4 gap-4">
          <strong className="text-cyan-400 min-w-24">Endpoint:</strong>
          <code className="bg-black bg-opacity-30 px-3 py-2 rounded text-cyan-300 font-mono text-sm">
            {api.endpoint}
          </code>
        </div>
        <div className="flex items-center mb-4 gap-4">
          <strong className="text-cyan-400 min-w-24">Method:</strong>
          <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
            api.method === 'GET' ? 'bg-green-500 text-black' :
            api.method === 'POST' ? 'bg-blue-500 text-white' :
            api.method === 'PUT' ? 'bg-yellow-500 text-black' :
            'bg-red-500 text-white'
          }`}>
            {api.method}
          </span>
        </div>
        <div className="flex items-center mb-4 gap-4">
          <strong className="text-cyan-400 min-w-24">Vulnerability:</strong>
          <span className="text-red-400 font-bold">{api.vulnerability}</span>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-white text-xl font-bold mb-5">🔍 Vulnerability Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-gray-900 bg-opacity-60 p-5 rounded-lg border-l-4 border-red-400">
            <h4 className="text-cyan-400 text-lg font-semibold mb-3">Impact</h4>
            <p className="text-gray-300 leading-relaxed">{details.impact}</p>
          </div>
          <div className="bg-gray-900 bg-opacity-60 p-5 rounded-lg border-l-4 border-red-400">
            <h4 className="text-cyan-400 text-lg font-semibold mb-3">Remediation</h4>
            <p className="text-gray-300 leading-relaxed">{details.fix}</p>
          </div>
          <div className="bg-gray-900 bg-opacity-60 p-5 rounded-lg border-l-4 border-red-400">
            <h4 className="text-cyan-400 text-lg font-semibold mb-3">OWASP Classification</h4>
            <p className="text-gray-300 leading-relaxed">{details.owasp}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-white text-xl font-bold mb-4">📝 Example Request</h3>
        <div className="bg-black bg-opacity-50 border border-gray-600 rounded-lg p-5 overflow-x-auto">
          <code className="text-cyan-300 font-mono text-sm whitespace-pre-wrap">{api.example}</code>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-white text-xl font-bold mb-5">🧪 Vulnerability Test</h3>
        <button 
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-bold text-base hover:from-red-600 hover:to-red-700 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/40 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          onClick={simulateTest}
          disabled={testing}
        >
          {testing ? "Testing..." : "Simulate Attack"}
        </button>
        
        {testResult && (
          <div className="mt-5 bg-black bg-opacity-30 border border-gray-600 rounded-lg p-5">
            <div className="bg-red-900 bg-opacity-20 text-red-400 font-bold mb-3 px-3 py-2 rounded border border-red-600">
              Status: {testResult.status}
            </div>
            <div className="mb-4">
              <strong className="text-cyan-400">Response:</strong> {testResult.response}
            </div>
            <div>
              <strong className="text-cyan-400">Data Exposed:</strong>
              <pre className="bg-black bg-opacity-50 p-4 rounded mt-3 text-cyan-300 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                {testResult.data}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-900 bg-opacity-60 p-6 rounded-lg border-l-4 border-green-400">
        <h3 className="text-green-400 text-xl font-bold mb-5">🛡️ Security Recommendations</h3>
        <ul className="space-y-3">
          {[
            "Implement proper authentication and authorization",
            "Use input validation and sanitization",
            "Apply the principle of least privilege",
            "Enable security headers and HTTPS",
            "Regular security testing and code reviews",
            "Keep frameworks and dependencies updated"
          ].map((item, index) => (
            <li key={index} className="text-gray-300 pl-6 relative leading-relaxed">
              <span className="text-green-400 font-bold absolute left-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// APIList Component
const APIList = () => {
  const [apis, setApis] = useState([]);
  const [selectedApi, setSelectedApi] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulated insecure API data
  const insecureAPIs = [
    {
      id: 1,
      name: "User Data API",
      endpoint: "/api/users",
      method: "GET",
      vulnerability: "No Authentication",
      description: "Exposes all user data without authentication",
      riskLevel: "Critical",
      example: "GET /api/users - Returns all users with sensitive data"
    },
    {
      id: 2,
      name: "Admin Panel API",
      endpoint: "/api/admin/delete-user",
      method: "DELETE",
      vulnerability: "Broken Access Control",
      description: "Allows any user to delete other users",
      riskLevel: "Critical",
      example: "DELETE /api/admin/delete-user/123 - No admin verification"
    },
    {
      id: 3,
      name: "SQL Query API",
      endpoint: "/api/search",
      method: "POST",
      vulnerability: "SQL Injection",
      description: "Direct SQL queries without sanitization",
      riskLevel: "High",
      example: "POST /api/search {'query': '1; DROP TABLE users--'}"
    },
    {
      id: 4,
      name: "File Upload API",
      endpoint: "/api/upload",
      method: "POST",
      vulnerability: "Unrestricted File Upload",
      description: "Accepts any file type without validation",
      riskLevel: "High",
      example: "POST /api/upload - Accepts .exe, .php, .jsp files"
    },
    {
      id: 5,
      name: "Password Reset API",
      endpoint: "/api/reset-password",
      method: "POST",
      vulnerability: "Weak Password Policy",
      description: "No password complexity requirements",
      riskLevel: "Medium",
      example: "POST /api/reset-password {'password': '123'}"
    },
    {
      id: 6,
      name: "API Keys Endpoint",
      endpoint: "/api/keys",
      method: "GET",
      vulnerability: "Information Disclosure",
      description: "Exposes API keys in response",
      riskLevel: "Critical",
      example: "GET /api/keys - Returns plaintext API keys"
    },
    {
      id: 7,
      name: "Rate Unlimited API",
      endpoint: "/api/send-email",
      method: "POST",
      vulnerability: "No Rate Limiting",
      description: "No protection against DoS attacks",
      riskLevel: "Medium",
      example: "POST /api/send-email - Unlimited requests allowed"
    },
    {
      id: 8,
      name: "Debug Info API",
      endpoint: "/api/debug",
      method: "GET",
      vulnerability: "Information Leakage",
      description: "Exposes system information and stack traces",
      riskLevel: "High",
      example: "GET /api/debug - Shows server paths, versions"
    }
  ];

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setApis(insecureAPIs);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApiSelect = (api) => {
    setSelectedApi(api);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-red-400 text-xl">Loading vulnerable APIs...</div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans overflow-auto">
      <div className="max-w-7xl mx-auto p-5">
        <div className="mb-8">
          <h2 className="text-red-400 text-4xl font-bold text-center mb-3">🚨 Insecure API Endpoints</h2>
          <div className="bg-red-900 bg-opacity-10 border border-red-400 rounded-lg p-4 text-center text-red-300 font-medium">
            ⚠️ These are examples of vulnerable APIs for educational purposes
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
          {apis.map(api => (
            <div 
              key={api.id} 
              className={`bg-gray-700 bg-opacity-80 border border-gray-600 rounded-xl p-5 cursor-pointer transition-all duration-300 backdrop-blur-sm hover:transform hover:-translate-y-2 hover:border-red-400 hover:shadow-xl hover:shadow-red-400/20 ${
                selectedApi?.id === api.id ? 'border-red-400 bg-red-900 bg-opacity-10 shadow-xl shadow-red-400/30' : ''
              }`}
              onClick={() => handleApiSelect(api)}
            >
              <div className="flex justify-between items-center mb-4">
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                  api.method === 'GET' ? 'bg-green-500 text-black' :
                  api.method === 'POST' ? 'bg-blue-500 text-white' :
                  api.method === 'PUT' ? 'bg-yellow-500 text-black' :
                  'bg-red-500 text-white'
                }`}>
                  {api.method}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                  api.riskLevel === 'Critical' ? 'bg-red-600 text-white' :
                  api.riskLevel === 'High' ? 'bg-orange-600 text-white' :
                  api.riskLevel === 'Medium' ? 'bg-yellow-600 text-white' :
                  'bg-green-600 text-white'
                }`}>
                  {api.riskLevel}
                </span>
              </div>
              
              <h3 className="text-white text-lg font-semibold mb-3">{api.name}</h3>
              <code className="bg-black bg-opacity-30 px-3 py-2 rounded block text-cyan-300 font-mono text-sm mb-3">
                {api.endpoint}
              </code>
              <p className="text-red-400 font-bold mb-2">{api.vulnerability}</p>
              <p className="text-gray-300 text-sm leading-snug">{api.description}</p>
            </div>
          ))}
        </div>

        {selectedApi && (
          <div className="mt-10">
            <APIDetails api={selectedApi} />
          </div>
        )}
      </div>
    </div>
  );
};

// Placeholder components for other tabs
const Overview = () => (
  <div className="p-8 text-white">
    <h1 className="text-4xl font-bold mb-6 text-center">🛡️ Zero Trust Security Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
        <h3 className="text-xl font-bold mb-4 text-green-400">System Status</h3>
        <p className="text-gray-300">All systems operational</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
        <h3 className="text-xl font-bold mb-4 text-yellow-400">Active Threats</h3>
        <p className="text-gray-300">8 vulnerabilities detected</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
        <h3 className="text-xl font-bold mb-4 text-blue-400">Security Score</h3>
        <p className="text-gray-300">75/100</p>
      </div>
    </div>
  </div>
);

const PlaceholderContent = ({ title }) => (
  <div className="p-8 text-white">
    <h1 className="text-4xl font-bold mb-6">{title}</h1>
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
      <p className="text-gray-300">This section is under development. Content will be added soon.</p>
    </div>
  </div>
);

// Main Dashboard Component
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'apilist':
        return <APIList />;
      case 'services':
        return <PlaceholderContent title="Services" />;
      case 'network':
        return <PlaceholderContent title="Network Security" />;
      case 'threats':
        return <PlaceholderContent title="Threat Detection" />;
      case 'access':
        return <PlaceholderContent title="Access Control" />;
      case 'monitoring':
        return <PlaceholderContent title="Security Monitoring" />;
      case 'activity':
        return <PlaceholderContent title="Activity Logs" />;
      case 'users':
        return <PlaceholderContent title="User Management" />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;