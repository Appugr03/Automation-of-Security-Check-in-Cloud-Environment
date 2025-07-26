import React, { useState } from 'react';
import './APIDetails.css';

const APIDetails = ({ api, onBack }) => {
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
      1: { 
        status: "VULNERABLE", 
        response: "200 OK", 
        data: '{"message":"Login successful","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...","user":{"id":1,"role":"admin"}}' 
      },
      2: { 
        status: "VULNERABLE", 
        response: "200 OK", 
        data: '[{"id":1,"name":"John Doe","email":"john@email.com","ssn":"123-45-6789","password":"hashed_password"}]' 
      },
      3: { 
        status: "VULNERABLE", 
        response: "200 OK", 
        data: '{"message":"File uploaded successfully","filename":"malicious.exe","path":"/uploads/malicious.exe","size":1024}' 
      },
      4: { 
        status: "VULNERABLE", 
        response: "200 OK", 
        data: '[{"id":1,"username":"admin","role":"super_admin","permissions":["read","write","delete","admin"]},{"id":2,"username":"user","role":"user"}]' 
      },
      5: { 
        status: "VULNERABLE", 
        response: "200 OK", 
        data: '{"transaction_id":"txn_123456","amount":-100,"account":"acc_789","balance":5000,"credit_card":"4111-1111-1111-1111"}' 
      },
      6: { 
        status: "VULNERABLE", 
        response: "200 OK", 
        data: '{"results":[{"api_key":"sk-1234567890abcdef","secret_token":"SECRET_TOKEN_123","internal_data":"confidential"}]}' 
      }
    };
    
    setTestResult(mockResults[api.id] || { 
      status: "VULNERABLE", 
      response: "200 OK", 
      data: '{"message":"Vulnerability detected","exposed_data":"sensitive_information"}' 
    });
    setTesting(false);
  };

  const details = vulnerabilityDetails[api.vulnerability] || {
    impact: "Security risk identified",
    fix: "Implement proper security measures",
    owasp: "OWASP API Security Top 10"
  };

  return (
    <div className="api-details">
      <button className="back-button" onClick={onBack}>
        ← Back to API List
      </button>

      <div className="details-header">
        <h2>{api.name}</h2>
        <span className={`risk-badge ${api.riskLevel.toLowerCase()}`}>
          {api.riskLevel} Risk
        </span>
      </div>

      <div className="api-info">
        <div className="info-row">
          <strong>Endpoint:</strong>
          <code>{api.endpoint}</code>
        </div>
        <div className="info-row">
          <strong>Method:</strong>
          <span className={`method-badge ${api.method.toLowerCase()}`}>
            {api.method}
          </span>
        </div>
        <div className="info-row">
          <strong>Vulnerability:</strong>
          <span className="vulnerability-name">{api.vulnerability}</span>
        </div>
      </div>

      <div className="vulnerability-section">
        <h3>🔍 Vulnerability Analysis</h3>
        <div className="analysis-grid">
          <div className="analysis-item">
            <h4>Impact</h4>
            <p>{details.impact}</p>
          </div>
          <div className="analysis-item">
            <h4>Remediation</h4>
            <p>{details.fix}</p>
          </div>
          <div className="analysis-item">
            <h4>OWASP Classification</h4>
            <p>{details.owasp}</p>
          </div>
        </div>
      </div>

      <div className="example-section">
        <h3>📝 Example Request</h3>
        <div className="code-block">
          <pre><code>{api.example}</code></pre>
        </div>
      </div>

      <div className="test-section">
        <h3>🧪 Vulnerability Test</h3>
        <button 
          className="test-button"
          onClick={simulateTest}
          disabled={testing}
        >
          {testing ? "Testing..." : "Simulate Attack"}
        </button>
        
        {testResult && (
          <div className="test-result">
            <div className={`result-status ${testResult.status.toLowerCase()}`}>
              Status: {testResult.status}
            </div>
            <div className="result-response">
              <strong>Response:</strong> {testResult.response}
            </div>
            <div className="result-data">
              <strong>Data Exposed:</strong>
              <pre>{testResult.data}</pre>
            </div>
          </div>
        )}
      </div>

      <div className="mitigation-section">
        <h3>🛡️ Security Recommendations</h3>
        <ul>
          <li>Implement proper authentication and authorization</li>
          <li>Use input validation and sanitization</li>
          <li>Apply the principle of least privilege</li>
          <li>Enable security headers and HTTPS</li>
          <li>Regular security testing and code reviews</li>
          <li>Keep frameworks and dependencies updated</li>
        </ul>
      </div>
    </div>
  );
};

export default APIDetails;