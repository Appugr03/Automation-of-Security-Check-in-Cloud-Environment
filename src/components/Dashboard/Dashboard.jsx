import React from 'react';
import SecurityMetrics from '../SecurityMetrics/SecurityMetrics';
import ServiceCard from '../ServiceCard/ServiceCard';
import NetworkTopology from '../NetworkTopology/NetworkTopology';
import ThreatMap from '../ThreatMap/ThreatMap';
import AccessControl from '../AccessControl/AccessControl';
import AlertsPanel from '../AlertsPanel/AlertsPanel';
import ThreatGraph from '../threatgraph/threatgraph'; // Added ThreatGraph import
import './Dashboard.css';
import APIList from '../InsecureAPI/APIList';
// Removed unused APIDetails import

const Dashboard = ({ activeTab }) => {
  const services = [
    {
      id: 'SRV-001',
      name: 'Authentication Service',
      status: 'secure',
      trust: 95,
      requests: 12450,
      threats: 0,
      lastVerified: '2 mins ago',
    },
    {
      id: 'SRV-002',
      name: 'Payment Gateway',
      status: 'warning',
      trust: 78,
      requests: 8900,
      threats: 2,
      lastVerified: '5 mins ago',
    },
    {
      id: 'SRV-003',
      name: 'User Database',
      status: 'critical',
      trust: 45,
      requests: 15600,
      threats: 7,
      lastVerified: '15 mins ago',
    },
    {
      id: 'SRV-004',
      name: 'File Storage Service',
      status: 'secure',
      trust: 88,
      requests: 5200,
      threats: 0,
      lastVerified: '1 min ago',
    },
    {
      id: 'SRV-005',
      name: 'Notification Service',
      status: 'warning',
      trust: 65,
      requests: 3400,
      threats: 1,
      lastVerified: '8 mins ago',
    },
    {
      id: 'SRV-006',
      name: 'Analytics Engine',
      status: 'secure',
      trust: 92,
      requests: 7800,
      threats: 0,
      lastVerified: '3 mins ago',
    },
  ];

  // Initialize with some default data to avoid empty state issues
  const networkData = {
    nodes: [],
    connections: []
  };
  
  const securityMetrics = {
    trustScore: 82,
    activeThreats: 3,
    secureServices: 4,
    totalServices: 6
  };
  
  const alerts = [];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="dashboard-content">
            <div className="dashboard-header">
              <h1>Security Overview</h1>
              <p>Real-time zero trust security monitoring</p>
            </div>
            <SecurityMetrics />
          </div>
        );

      case 'services':
        return (
          <div className="dashboard-content">
            <div className="dashboard-header">
              <h1>Microservices</h1>
              <p>Individual service security status and metrics</p>
            </div>
            <div className="services-grid">
              {services.length > 0 ? (
                services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))
              ) : (
                <div className="no-services">
                  <p>No services found</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'network':
        return (
          <div className="dashboard-content">
            <div className="dashboard-header">
              <h1>Network Topology</h1>
              <p>Service interconnections and trust boundaries</p>
            </div>
            <NetworkTopology networkData={networkData} />
          </div>
        );

      case 'threats':
      case 'threat-overview':
        return (
          <div className="dashboard-content">
            <div className="dashboard-header">
              <h1>Threat Monitoring</h1>
              <p>Real-time security threats and incidents</p>
            </div>
            <ThreatMap />
          </div>
        );

      case 'threat-graphs':
        return (
          <div className="dashboard-content">
            <div className="dashboard-header">
              <h1>Threat Graph Analysis</h1>
              <p>Advanced threat correlation and graph analytics</p>
            </div>
            <ThreatGraph />
          </div>
        );

      case 'threat-trends':
        return (
          <div className="dashboard-content">
            <div className="dashboard-header">
              <h1>Threat Trends</h1>
              <p>Historical threat patterns and trend analysis</p>
            </div>
            <ThreatGraph />
          </div>
        );

      case 'threat-vectors':
        return (
          <div className="dashboard-content">
            <div className="dashboard-header">
              <h1>Threat Vectors</h1>
              <p>Attack vector analysis and mitigation strategies</p>
            </div>
            <ThreatGraph />
          </div>
        );

      case 'access':
        return (
          <div className="dashboard-content">
            <div className="dashboard-header">
              <h1>Access Control</h1>
              <p>User permissions and policy enforcement</p>
            </div>
            <AccessControl />
          </div>
        );

      case 'apilist': // Changed from 'apis' to match sidebar
        return (
          <div className="dashboard-content">
            <div className="dashboard-header">
              <h1>API Security</h1>
              <p>Insecure API endpoints and vulnerability analysis</p>
            </div>
            <APIList />
          </div>
        );

      case 'monitoring':
        return (
          <div className="dashboard-content">
            <div className="dashboard-header">
              <h1>Security Monitoring</h1>
              <p>Comprehensive security event tracking</p>
            </div>
            <SecurityMetrics />
          </div>
        );

      case 'activity':
        return (
          <div className="dashboard-content">
            <div className="dashboard-header">
              <h1>Activity Monitor</h1>
              <p>System activity and audit logs</p>
            </div>
            <AlertsPanel alerts={alerts} />
          </div>
        );

      case 'users':
        return (
          <div className="dashboard-content">
            <div className="dashboard-header">
              <h1>User Management</h1>
              <p>User access and permissions</p>
            </div>
            <AccessControl />
          </div>
        );

      default:
        return (
          <div className="dashboard-content">
            <div className="dashboard-header">
              <h1>Dashboard</h1>
              <p>Select a tab to view content</p>
            </div>
          </div>
        );
    }
  };

  return <main className="dashboard-fullscreen">{renderContent()}</main>;
};

export default Dashboard;