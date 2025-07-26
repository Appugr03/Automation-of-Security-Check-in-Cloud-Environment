import React, { useState, useEffect } from 'react';
import {
  User, Shield, Clock, CheckCircle, XCircle, AlertTriangle, Search, Filter, Zap, Activity
} from 'lucide-react';

const AccessControl = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // Simulate loading animation
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: 'New access request received',
        type: 'info'
      };
      setNotifications(prev => [...prev, newNotification]);
      
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 3000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const accessRequests = [
    { id: 1, user: 'john.doe@company.com', resource: 'Payment Service API', action: 'READ', status: 'approved', timestamp: '2024-06-13 10:30:00', riskScore: 'low', location: 'New York, US' },
    { id: 2, user: 'jane.smith@company.com', resource: 'User Database', action: 'WRITE', status: 'pending', timestamp: '2024-06-13 10:25:00', riskScore: 'medium', location: 'London, UK' },
    { id: 3, user: 'admin@company.com', resource: 'System Configuration', action: 'ADMIN', status: 'approved', timestamp: '2024-06-13 10:20:00', riskScore: 'low', location: 'San Francisco, US' },
    { id: 4, user: 'guest@company.com', resource: 'Analytics Dashboard', action: 'READ', status: 'denied', timestamp: '2024-06-13 10:15:00', riskScore: 'high', location: 'Unknown' },
    { id: 5, user: 'dev.team@company.com', resource: 'Code Repository', action: 'WRITE', status: 'approved', timestamp: '2024-06-13 10:10:00', riskScore: 'low', location: 'Berlin, Germany' },
    { id: 6, user: 'sarah.wilson@company.com', resource: 'Financial Reports', action: 'READ', status: 'pending', timestamp: '2024-06-13 10:05:00', riskScore: 'medium', location: 'Toronto, CA' },
    { id: 7, user: 'mike.johnson@company.com', resource: 'HR Database', action: 'WRITE', status: 'approved', timestamp: '2024-06-13 10:00:00', riskScore: 'low', location: 'Sydney, AU' },
    { id: 8, user: 'emily.brown@company.com', resource: 'Marketing Tools', action: 'READ', status: 'approved', timestamp: '2024-06-13 09:55:00', riskScore: 'low', location: 'Paris, FR' },
    { id: 9, user: 'alex.garcia@company.com', resource: 'Security Logs', action: 'ADMIN', status: 'denied', timestamp: '2024-06-13 09:50:00', riskScore: 'high', location: 'Unknown' },
    { id: 10, user: 'lisa.chen@company.com', resource: 'Customer Support', action: 'READ', status: 'approved', timestamp: '2024-06-13 09:45:00', riskScore: 'low', location: 'Singapore, SG' },
    { id: 11, user: 'david.lee@company.com', resource: 'Inventory System', action: 'WRITE', status: 'pending', timestamp: '2024-06-13 09:40:00', riskScore: 'medium', location: 'Tokyo, JP' },
    { id: 12, user: 'rachel.taylor@company.com', resource: 'Project Management', action: 'READ', status: 'approved', timestamp: '2024-06-13 09:35:00', riskScore: 'low', location: 'Vancouver, CA' },
    { id: 13, user: 'kevin.martinez@company.com', resource: 'Data Warehouse', action: 'ADMIN', status: 'pending', timestamp: '2024-06-13 09:30:00', riskScore: 'high', location: 'Mexico City, MX' },
    { id: 14, user: 'amanda.white@company.com', resource: 'CRM System', action: 'WRITE', status: 'approved', timestamp: '2024-06-13 09:25:00', riskScore: 'low', location: 'Chicago, US' },
    { id: 15, user: 'james.anderson@company.com', resource: 'Backup Services', action: 'READ', status: 'denied', timestamp: '2024-06-13 09:20:00', riskScore: 'medium', location: 'Mumbai, IN' }
  ];

  const userSessions = [
    { id: 1, user: 'john.doe@company.com', device: 'MacBook Pro', location: 'New York, US', loginTime: '09:00:00', status: 'active', riskLevel: 'low' },
    { id: 2, user: 'jane.smith@company.com', device: 'Windows Laptop', location: 'London, UK', loginTime: '08:30:00', status: 'active', riskLevel: 'medium' },
    { id: 3, user: 'admin@company.com', device: 'iPad', location: 'San Francisco, US', loginTime: '07:45:00', status: 'inactive', riskLevel: 'low' },
    { id: 4, user: 'sarah.wilson@company.com', device: 'iPhone 15 Pro', location: 'Toronto, CA', loginTime: '08:15:00', status: 'active', riskLevel: 'low' },
    { id: 5, user: 'mike.johnson@company.com', device: 'Surface Pro', location: 'Sydney, AU', loginTime: '07:30:00', status: 'active', riskLevel: 'medium' },
    { id: 6, user: 'emily.brown@company.com', device: 'MacBook Air', location: 'Paris, FR', loginTime: '09:15:00', status: 'active', riskLevel: 'low' },
    { id: 7, user: 'lisa.chen@company.com', device: 'Android Tablet', location: 'Singapore, SG', loginTime: '08:45:00', status: 'inactive', riskLevel: 'low' },
    { id: 8, user: 'david.lee@company.com', device: 'Gaming Laptop', location: 'Tokyo, JP', loginTime: '07:00:00', status: 'active', riskLevel: 'high' },
    { id: 9, user: 'rachel.taylor@company.com', device: 'Chromebook', location: 'Vancouver, CA', loginTime: '08:00:00', status: 'active', riskLevel: 'low' },
    { id: 10, user: 'amanda.white@company.com', device: 'Dell XPS', location: 'Chicago, US', loginTime: '09:30:00', status: 'active', riskLevel: 'medium' },
    { id: 11, user: 'dev.team@company.com', device: 'Mac Studio', location: 'Berlin, Germany', loginTime: '06:45:00', status: 'inactive', riskLevel: 'low' },
    { id: 12, user: 'guest@company.com', device: 'Public Terminal', location: 'Unknown', loginTime: '10:00:00', status: 'inactive', riskLevel: 'high' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="status-icon approved animate-pulse-soft" size={16} style={{color: '#10b981', filter: 'drop-shadow(0 0 8px #10b981)'}} />;
      case 'denied': return <XCircle className="status-icon denied shake-intense" size={16} style={{color: '#ff1744', filter: 'drop-shadow(0 0 12px #ff1744)', animation: 'threatPulse 1s infinite'}} />;
      case 'pending': return <Clock className="status-icon pending spin-slow" size={16} style={{color: '#f59e0b', filter: 'drop-shadow(0 0 6px #f59e0b)'}} />;
      default: return <AlertTriangle className="status-icon bounce-soft" size={16} style={{color: '#ff1744', filter: 'drop-shadow(0 0 10px #ff1744)'}} />;
    }
  };

  const getRiskBadge = (risk) => {
    const riskStyles = {
      high: {
        background: 'linear-gradient(135deg, #ff1744 0%, #d50000 100%)',
        color: '#ffffff',
        boxShadow: '0 0 20px rgba(255, 23, 68, 0.6)',
        animation: 'threatBounce 1.5s infinite, glowPulse 2s infinite',
        border: '2px solid #ff1744',
        fontWeight: 'bold'
      },
      medium: {
        background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
        color: '#ffffff',
        boxShadow: '0 0 12px rgba(255, 152, 0, 0.4)',
        animation: 'mediumPulse 2s infinite'
      },
      low: {
        background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
        color: '#ffffff',
        boxShadow: '0 0 8px rgba(76, 175, 80, 0.3)',
        animation: 'gentlePulse 3s infinite'
      }
    };
    
    return (
      <span 
        className={`risk-badge ${risk} float-animation`}
        style={{
          ...riskStyles[risk],
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          display: 'inline-block',
          transform: risk === 'high' ? 'scale(1.1)' : 'scale(1)'
        }}
      >
        {risk === 'high' ? '🚨 ' : ''}{risk.toUpperCase()}{risk === 'high' ? ' 🚨' : ''}
      </span>
    );
  };

  const filteredRequests = accessRequests.filter(req => {
    const matchStatus = filterStatus === 'all' || req.status === filterStatus;
    const matchSearch = req.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        req.resource.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleApprove = (id) => {
    // Add success animation
    const element = document.querySelector(`[data-request-id="${id}"]`);
    if (element) {
      element.classList.add('success-flash');
      setTimeout(() => element.classList.remove('success-flash'), 1000);
    }
  };

  const handleDeny = (id) => {
    // Add deny animation
    const element = document.querySelector(`[data-request-id="${id}"]`);
    if (element) {
      element.classList.add('deny-flash');
      setTimeout(() => element.classList.remove('deny-flash'), 1000);
    }
  };

  if (isLoading) {
    return (
      <div className="access-control loading" style={loadingStyles.container}>
        <div className="loading-overlay" style={loadingStyles.overlay}>
          <div className="loading-spinner" style={loadingStyles.spinner}>
            <div className="spinner-ring" style={loadingStyles.ring}></div>
            <div className="spinner-ring" style={{...loadingStyles.ring, animationDelay: '-0.45s'}}></div>
            <div className="spinner-ring" style={{...loadingStyles.ring, animationDelay: '-0.3s'}}></div>
          </div>
          <p style={loadingStyles.text}>Loading Access Control Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="access-control fade-in" style={styles.container}>
      <div dangerouslySetInnerHTML={{ __html: animationStyles }} />
      
      {/* Notification Toast */}
      <div className="notification-container" style={styles.notificationContainer}>
        {notifications.map(notification => (
          <div key={notification.id} className="notification slide-in-right" style={styles.notification}>
            <Zap size={16} style={{animation: 'spin 2s linear infinite'}} />
            <span>{notification.message}</span>
          </div>
        ))}
      </div>

      <div className="access-header slide-in-top" style={styles.header}>
        <h3 style={styles.title}>
          <Shield className="header-icon pulse" size={24} style={styles.headerIcon} />
          Access Control Dashboard
        </h3>
        <div className="access-controls" style={styles.controls}>
          <div className="search-box glow-on-focus" style={styles.searchBox}>
            <Search size={16} className="search-icon" style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search users or resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          <div className="filter-dropdown glow-on-focus" style={styles.filterDropdown}>
            <Filter size={16} />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={styles.select}>
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="denied">Denied</option>
            </select>
          </div>
        </div>
      </div>

      <div className="access-content" style={styles.content}>
        <div className="access-requests slide-in-left" style={styles.requestsSection}>
          <h4 style={styles.sectionTitle}>
            <Activity className="section-icon" size={20} />
            Recent Access Requests
          </h4>
          <div className="requests-list" style={styles.requestsList}>
            {filteredRequests.map((req, index) => (
              <div
                key={req.id}
                data-request-id={req.id}
                className={`request-item ${req.status} slide-in-up`}
                style={{...styles.requestItem, ...styles[req.status], animationDelay: `${index * 0.1}s`}}
                onClick={() => setSelectedUser(selectedUser === req.id ? null : req.id)}
              >
                <div className="request-main" style={styles.requestMain}>
                  <div className="request-user" style={styles.requestUser}>
                    <User size={16} className="user-icon" />
                    <span>{req.user}</span>
                  </div>
                  <div className="request-details" style={styles.requestDetails}>
                    <span className="resource" style={styles.resource}>{req.resource}</span>
                    <span className="action pulse-glow" style={styles.action}>{req.action}</span>
                  </div>
                </div>
                <div className="request-meta" style={styles.requestMeta}>
                  {getStatusIcon(req.status)}
                  {getRiskBadge(req.riskScore)}
                  <span className="timestamp" style={styles.timestamp}>{req.timestamp.split(' ')[1]}</span>
                </div>

                {selectedUser === req.id && (
                  <div className="request-expanded expand-animation" style={styles.requestExpanded}>
                    <div className="info-item" style={styles.infoItem}><strong>Location:</strong> {req.location}</div>
                    <div className="info-item" style={styles.infoItem}><strong>Timestamp:</strong> {req.timestamp}</div>
                    {req.status === 'pending' && (
                      <div className="expanded-actions" style={styles.expandedActions}>
                        <button 
                          className="action-btn approve hover-lift"
                          style={{...styles.actionBtn, ...styles.approveBtn}}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApprove(req.id);
                          }}
                        >
                          Approve
                        </button>
                        <button 
                          className="action-btn deny hover-lift"
                          style={{...styles.actionBtn, ...styles.denyBtn}}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeny(req.id);
                          }}
                        >
                          Deny
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="user-sessions slide-in-right" style={styles.sessionsSection}>
          <h4 style={styles.sectionTitle}>
            <User className="section-icon pulse" size={20} />
            Active User Sessions
          </h4>
          <div className="sessions-list" style={styles.sessionsList}>
            {userSessions.map((session, index) => (
              <div 
                key={session.id} 
                className={`session-item ${session.status} slide-in-up`}
                style={{...styles.sessionItem, animationDelay: `${(index + 2) * 0.1}s`}}
              >
                <div className="session-user" style={styles.sessionUser}>
                  <div className="user-avatar gradient-shift" style={styles.userAvatar}>
                    <User size={20} />
                  </div>
                  <div className="user-info" style={styles.userInfo}>
                    <div className="user-name" style={styles.userName}>{session.user}</div>
                    <div className="user-device" style={styles.userDevice}>{session.device}</div>
                  </div>
                </div>
                <div className="session-details" style={styles.sessionDetails}>
                  <div className="session-location" style={styles.sessionLocation}>{session.location}</div>
                  <div className="session-time" style={styles.sessionTime}>
                    <Clock size={14} className="clock-tick" />
                    {session.loginTime}
                  </div>
                  <div className={`session-status ${session.status}`} style={{...styles.sessionStatus, ...styles[session.status]}}>{session.status}</div>
                  {getRiskBadge(session.riskLevel)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="access-stats slide-in-bottom" style={styles.stats}>
        <div className="stat-card hover-lift" style={styles.statCard}>
          <div className="stat-value count-up" style={styles.statValue}>{accessRequests.filter(r => r.status === 'approved').length}</div>
          <div className="stat-label" style={styles.statLabel}>Approved Today</div>
        </div>
        <div className="stat-card hover-lift" style={styles.statCard}>
          <div className="stat-value count-up" style={styles.statValue}>{accessRequests.filter(r => r.status === 'pending').length}</div>
          <div className="stat-label" style={styles.statLabel}>Pending Requests</div>
        </div>
        <div className="stat-card hover-lift" style={styles.statCard}>
          <div className="stat-value count-up" style={styles.statValue}>{accessRequests.filter(r => r.status === 'denied').length}</div>
          <div className="stat-label" style={styles.statLabel}>Denied Today</div>
        </div>
        <div className="stat-card hover-lift" style={styles.statCard}>
          <div className="stat-value count-up" style={styles.statValue}>{userSessions.filter(s => s.status === 'active').length}</div>
          <div className="stat-label" style={styles.statLabel}>Active Sessions</div>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#0a0e27',
    color: '#ffffff',
    minHeight: '100vh',
    fontFamily: "'Inter', sans-serif"
  },
  notificationContainer: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000
  },
  notification: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    animation: 'slideInBounce 0.6s ease-out, floatAnimation 3s infinite'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '28px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  headerIcon: {
    color: '#667eea',
    animation: 'spin 4s linear infinite'
  },
  controls: {
    display: 'flex',
    gap: '15px'
  },
  searchBox: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    color: '#8892b0',
    zIndex: 1
  },
  searchInput: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '10px 12px 10px 40px',
    color: '#ffffff',
    fontSize: '14px',
    width: '250px',
    outline: 'none',
    transition: 'all 0.3s ease'
  },
  filterDropdown: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '10px 12px'
  },
  select: {
    background: 'transparent',
    border: 'none',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '30px',
    marginBottom: '30px'
  },
  requestsSection: {
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid rgba(255,255,255,0.05)'
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px',
    fontSize: '18px',
    fontWeight: '600'
  },
  requestsList: {
    maxHeight: '600px',
    overflowY: 'auto'
  },
  requestItem: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    animation: 'slideInUp 0.6s ease-out',
    ':hover': {
      transform: 'translateY(-2px) scale(1.02)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
      background: 'rgba(255,255,255,0.05)'
    }
  },
  approved: {
    borderLeft: '4px solid #10b981'
  },
  pending: {
    borderLeft: '4px solid #f59e0b'
  },
  denied: {
    borderLeft: '4px solid #ff1744',
    background: 'rgba(255, 23, 68, 0.1)',
    boxShadow: '0 0 20px rgba(255, 23, 68, 0.3)',
    animation: 'threatShake 2s infinite, dangerGlow 1.5s infinite',
    border: '1px solid rgba(255, 23, 68, 0.5)'
  },
  requestMain: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  requestUser: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px'
  },
  requestDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px'
  },
  resource: {
    fontSize: '12px',
    color: '#8892b0'
  },
  action: {
    fontSize: '12px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '2px 8px',
    borderRadius: '4px'
  },
  requestMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '12px'
  },
  timestamp: {
    fontSize: '12px',
    color: '#8892b0'
  },
  requestExpanded: {
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid rgba(255,255,255,0.1)'
  },
  infoItem: {
    marginBottom: '8px',
    fontSize: '14px'
  },
  expandedActions: {
    display: 'flex',
    gap: '8px',
    marginTop: '12px'
  },
  actionBtn: {
    padding: '6px 16px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  approveBtn: {
    background: '#10b981',
    color: '#ffffff'
  },
  denyBtn: {
    background: 'linear-gradient(135deg, #ff1744 0%, #d50000 100%)',
    color: '#ffffff',
    boxShadow: '0 0 15px rgba(255, 23, 68, 0.5)',
    animation: 'dangerButton 1s infinite',
    border: '2px solid #ff1744',
    transform: 'scale(1.05)'
  },
  sessionsSection: {
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid rgba(255,255,255,0.05)'
  },
  sessionsList: {
    maxHeight: '600px',
    overflowY: 'auto'
  },
  sessionItem: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px'
  },
  sessionUser: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px'
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userInfo: {
    flex: 1
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '2px'
  },
  userDevice: {
    fontSize: '12px',
    color: '#8892b0'
  },
  sessionDetails: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '8px',
    alignItems: 'center'
  },
  sessionLocation: {
    fontSize: '12px',
    color: '#8892b0'
  },
  sessionTime: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: '#8892b0'
  },
  sessionStatus: {
    fontSize: '12px',
    padding: '2px 8px',
    borderRadius: '4px',
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  active: {
    background: '#10b981',
    color: '#ffffff'
  },
  inactive: {
    background: '#6b7280',
    color: '#ffffff'
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px'
  },
  statCard: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    animation: 'slideInUp 0.8s ease-out',
    cursor: 'pointer'
  },
  statValue: {
    fontSize: '32px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '8px'
  },
  statLabel: {
    fontSize: '14px',
    color: '#8892b0',
    fontWeight: '500'
  }
};

const loadingStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#0a0e27'
  },
  overlay: {
    textAlign: 'center'
  },
  spinner: {
    position: 'relative',
    width: '80px',
    height: '80px',
    margin: '0 auto 20px'
  },
  ring: {
    position: 'absolute',
    width: '64px',
    height: '64px',
    margin: '8px',
    border: '8px solid transparent',
    borderTop: '8px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite'
  },
  text: {
    color: '#8892b0',
    fontSize: '16px'
  }
};

// Add CSS animations as a style tag
const animationStyles = `
  <style>
    @keyframes threatPulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.3); opacity: 0.8; }
    }
    
    @keyframes threatBounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-8px); }
      60% { transform: translateY(-4px); }
    }
    
    @keyframes glowPulse {
      0%, 100% { box-shadow: 0 0 20px rgba(255, 23, 68, 0.6); }
      50% { box-shadow: 0 0 30px rgba(255, 23, 68, 0.9), 0 0 40px rgba(255, 23, 68, 0.6); }
    }
    
    @keyframes threatShake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
      20%, 40%, 60%, 80% { transform: translateX(2px); }
    }
    
    @keyframes dangerGlow {
      0%, 100% { box-shadow: 0 0 20px rgba(255, 23, 68, 0.3); }
      50% { box-shadow: 0 0 30px rgba(255, 23, 68, 0.6), 0 0 40px rgba(255, 23, 68, 0.3); }
    }
    
    @keyframes dangerButton {
      0%, 100% { transform: scale(1.05); }
      50% { transform: scale(1.1); }
    }
    
    @keyframes mediumPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.05); }
    }
    
    @keyframes gentlePulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    @keyframes slideInBounce {
      0% { transform: translateX(100px); opacity: 0; }
      60% { transform: translateX(-10px); opacity: 1; }
      100% { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes floatAnimation {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-3px); }
    }
    
    @keyframes slideInUp {
      0% { transform: translateY(30px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .request-item:hover {
      transform: translateY(-2px) scale(1.02) !important;
      box-shadow: 0 8px 25px rgba(0,0,0,0.3) !important;
      background: rgba(255,255,255,0.05) !important;
    }
    
    .stat-card:hover {
      transform: translateY(-5px) scale(1.03) !important;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3) !important;
    }
    
    .action-btn:hover {
      transform: scale(1.1) !important;
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.3) !important;
    }
    
    .user-avatar {
      animation: gradientShift 3s infinite !important;
    }
    
    @keyframes gradientShift {
      0%, 100% { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
      50% { background: linear-gradient(135deg, #764ba2 0%, #667eea 100%); }
    }
  </style>
`;

export default AccessControl;