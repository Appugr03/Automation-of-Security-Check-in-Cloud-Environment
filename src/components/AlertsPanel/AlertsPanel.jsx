import React, { useState, useEffect, useRef } from 'react';

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [dismissingAlerts, setDismissingAlerts] = useState(new Set());
  const [showCriticalOptions, setShowCriticalOptions] = useState(false);
  const [newAlertsCount, setNewAlertsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const alertRefs = useRef({});

  // Enhanced mock alerts data with more activities
  const mockAlerts = [
    {
      id: 1,
      title: 'Suspicious Login Attempt',
      description: 'Multiple failed login attempts from IP 192.168.1.100',
      severity: 'high',
      timestamp: new Date(Date.now() - 5 * 60000),
      source: 'Authentication Service',
      status: 'active',
      category: 'authentication'
    },
    {
      id: 2,
      title: 'Unusual Network Traffic',
      description: 'High volume of outbound traffic detected',
      severity: 'medium',
      timestamp: new Date(Date.now() - 15 * 60000),
      source: 'Network Monitor',
      status: 'active',
      category: 'network'
    },
    {
      id: 3,
      title: 'Certificate Expiring',
      description: 'SSL certificate expires in 7 days',
      severity: 'low',
      timestamp: new Date(Date.now() - 30 * 60000),
      source: 'Certificate Manager',
      status: 'acknowledged',
      category: 'certificate'
    },
    {
      id: 4,
      title: 'Unauthorized Access Attempt',
      description: 'Access denied to restricted resource',
      severity: 'critical',
      timestamp: new Date(Date.now() - 2 * 60000),
      source: 'Access Control',
      status: 'active',
      category: 'access'
    },
    {
      id: 5,
      title: 'Malware Detected',
      description: 'Potential malware found in file upload',
      severity: 'high',
      timestamp: new Date(Date.now() - 45 * 60000),
      source: 'Endpoint Protection',
      status: 'resolved',
      category: 'malware'
    },
    {
      id: 6,
      title: 'Database Breach Attempt',
      description: 'SQL injection attempt detected on user table',
      severity: 'critical',
      timestamp: new Date(Date.now() - 1 * 60000),
      source: 'Database Security',
      status: 'active',
      category: 'database'
    },
    {
      id: 7,
      title: 'DDoS Attack Detected',
      description: 'Distributed denial of service attack in progress',
      severity: 'critical',
      timestamp: new Date(Date.now() - 3 * 60000),
      source: 'Network Defense',
      status: 'active',
      category: 'network'
    },
    {
      id: 8,
      title: 'Privileged Account Compromise',
      description: 'Administrator account showing suspicious activity',
      severity: 'critical',
      timestamp: new Date(Date.now() - 7 * 60000),
      source: 'Identity Management',
      status: 'active',
      category: 'identity'
    },
    {
      id: 9,
      title: 'Firewall Rule Violation',
      description: 'Blocked connection attempt from blacklisted IP',
      severity: 'medium',
      timestamp: new Date(Date.now() - 20 * 60000),
      source: 'Firewall',
      status: 'active',
      category: 'firewall'
    },
    {
      id: 10,
      title: 'Data Exfiltration Alert',
      description: 'Large file transfer to external server detected',
      severity: 'high',
      timestamp: new Date(Date.now() - 12 * 60000),
      source: 'Data Loss Prevention',
      status: 'active',
      category: 'data'
    }
  ];

  useEffect(() => {
    // Initial load animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    // Stagger the alert loading
    const alertTimer = setTimeout(() => {
      setAlerts(mockAlerts);
      setNewAlertsCount(mockAlerts.filter(a => a.status === 'active').length);
      setIsLoading(false);
    }, 800);

    // Simulate new alerts coming in
    const newAlertTimer = setInterval(() => {
      const randomAlert = {
        id: Date.now(),
        title: 'New Security Event',
        description: 'Real-time security event detected',
        severity: ['critical', 'high', 'medium'][Math.floor(Math.random() * 3)],
        timestamp: new Date(),
        source: 'Real-time Monitor',
        status: 'active',
        category: 'realtime'
      };
      
      setAlerts(prev => [randomAlert, ...prev]);
      setNewAlertsCount(prev => prev + 1);
    }, 30000); // New alert every 30 seconds

    return () => {
      clearTimeout(timer);
      clearTimeout(alertTimer);
      clearInterval(newAlertTimer);
    };
  }, []);

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    return alert.severity === filter;
  });

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'authentication': return '🔐';
      case 'network': return '🌐';
      case 'certificate': return '📜';
      case 'access': return '🚪';
      case 'malware': return '🦠';
      case 'database': return '🗄️';
      case 'identity': return '👤';
      case 'firewall': return '🛡️';
      case 'data': return '📊';
      case 'email': return '📧';
      case 'vulnerability': return '⚠️';
      case 'insider': return '👁️';
      case 'ransomware': return '🔒';
      case 'api': return '🔗';
      default: return '⚡';
    }
  };

  const handleDismiss = (alertId) => {
    setDismissingAlerts(prev => new Set(prev).add(alertId));
    
    setTimeout(() => {
      setAlerts(alerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: 'resolved' }
          : alert
      ));
      setDismissingAlerts(prev => {
        const newSet = new Set(prev);
        newSet.delete(alertId);
        return newSet;
      });
    }, 300);
  };

  const getFilterCount = (filterType) => {
    if (filterType === 'all') return alerts.length;
    return alerts.filter(alert => alert.severity === filterType).length;
  };

  return (
    <>
      <style>
        {`
          /* Enhanced Animated AlertsPanel CSS */
          .alerts-panel {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            min-height: 500px;
            max-width: 1200px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }

          .alerts-panel::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
            background-size: 400% 400%;
            animation: gradientShift 8s ease infinite;
          }

          .panel-visible {
            opacity: 1;
            transform: translateY(0);
          }

          .alerts-header {
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 2px solid rgba(255, 255, 255, 0.1);
            animation: slideInFromTop 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .header-title {
            font-size: 28px;
            font-weight: 700;
            color: #ffffff;
            margin: 0 0 16px 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            animation: titleGlow 3s ease-in-out infinite alternate;
          }

          .alert-filters {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            animation: slideInFromLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
            margin-bottom: 24px;
          }

          .filter-btn {
            padding: 12px 20px;
            border: 2px solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-weight: 600;
            font-size: 14px;
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
            text-align: center;
            min-width: 120px;
          }

          .filter-btn::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            transform: translate(-50%, -50%);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .filter-btn:hover::before {
            width: 200%;
            height: 200%;
          }

          .filter-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            border-color: rgba(255, 255, 255, 0.4);
          }

          .filter-btn.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-color: #667eea;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            transform: translateY(-1px);
          }

          .alerts-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
            animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
          }

          .alert-item {
            display: flex;
            align-items: flex-start;
            padding: 20px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            border-left: 4px solid transparent;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
            opacity: 0;
            transform: translateX(-50px);
            animation: slideInAlert 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .alert-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .alert-item:hover::before {
            opacity: 1;
          }

          .alert-item:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
          }

          .alert-item.critical {
            border-left-color: #dc3545;
            animation: criticalPulse 2s ease-in-out infinite, slideInAlert 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          .alert-item.high {
            border-left-color: #ffc107;
          }

          .alert-item.medium {
            border-left-color: #fd7e14;
          }

          .alert-item.low {
            border-left-color: #28a745;
          }

          .alert-item.resolved {
            opacity: 0.6;
            transform: scale(0.98);
            filter: grayscale(0.3);
          }

          .alert-item.dismissing {
            opacity: 0;
            transform: translateX(100px) scale(0.9);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .alert-icon {
            font-size: 24px;
            margin-right: 16px;
            animation: iconBounce 2s ease-in-out infinite;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
          }

          .alert-content {
            flex: 1;
            min-width: 0;
          }

          .alert-title {
            font-size: 18px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 8px;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          }

          .alert-description {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 12px;
            line-height: 1.5;
          }

          .alert-meta {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6);
            animation: metaFadeIn 0.8s ease 0.6s both;
          }

          .alert-source {
            font-weight: 600;
            color: #4ecdc4;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          }

          .alert-timestamp {
            font-style: italic;
          }

          .alert-actions {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 8px;
            margin-left: 16px;
          }

          .dismiss-btn {
            padding: 8px 16px;
            background: linear-gradient(135deg, #ff6b6b, #ee5a52);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 600;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            position: relative;
            overflow: hidden;
          }

          .dismiss-btn::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .dismiss-btn:hover::before {
            width: 200%;
            height: 200%;
          }

          .dismiss-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
          }

          .investigate-btn {
            padding: 8px 16px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 600;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .investigate-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          }

          .status-badge {
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            animation: badgeGlow 2s ease-in-out infinite alternate;
          }

          .status-badge.active {
            background: linear-gradient(135deg, #dc3545, #c82333);
            color: white;
            box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
          }

          .status-badge.acknowledged {
            background: linear-gradient(135deg, #ffc107, #ffb300);
            color: #000;
            box-shadow: 0 2px 8px rgba(255, 193, 7, 0.3);
          }

          .status-badge.resolved {
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
            box-shadow: 0 2px 8px rgba(40, 167, 69, 0.3);
          }

          .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: rgba(255, 255, 255, 0.6);
            animation: emptyStateFadeIn 0.8s ease 0.6s both;
          }

          .empty-icon {
            font-size: 48px;
            margin-bottom: 16px;
            opacity: 0.7;
            animation: emptyIconFloat 3s ease-in-out infinite;
          }

          .empty-text {
            font-size: 16px;
            font-weight: 500;
          }

          .alerts-loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
          }

          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid #4ecdc4;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          /* Keyframe Animations */
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes slideInFromTop {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInFromLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInAlert {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes titleGlow {
            0% { text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); }
            100% { text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.1); }
          }

          @keyframes criticalPulse {
            0%, 100% { 
              border-left-color: #dc3545;
              box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.4);
            }
            50% { 
              border-left-color: #ff1744;
              box-shadow: 0 0 0 10px rgba(220, 53, 69, 0);
            }
          }

          @keyframes iconBounce {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-3px) scale(1.1); }
          }

          @keyframes metaFadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes badgeGlow {
            0% { filter: brightness(1); }
            100% { filter: brightness(1.2); }
          }

          @keyframes emptyStateFadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes emptyIconFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .alerts-panel {
              padding: 16px;
              margin: 0 16px;
            }
            
            .header-title {
              font-size: 24px;
            }
            
            .alert-filters {
              gap: 8px;
            }
            
            .filter-btn {
              padding: 8px 12px;
              font-size: 12px;
              min-width: 80px;
            }
            
            .alert-item {
              padding: 16px;
              flex-direction: column;
              align-items: flex-start;
            }
            
            .alert-actions {
              flex-direction: row;
              margin-left: 0;
              margin-top: 12px;
              align-items: center;
            }
          }
        `}
      </style>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
        <div className={`alerts-panel mx-auto ${isVisible ? 'panel-visible' : ''}`}>
          <div className="alerts-header">
            <h1 className="header-title flex items-center gap-3">
              <span className="text-red-500">🛡️</span>
              Security Command Center
              {newAlertsCount > 0 && (
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm animate-pulse">
                  {newAlertsCount} new
                </span>
              )}
            </h1>
            
            <div className="alert-filters">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                <div className="text-lg mb-1">📊</div>
                <div className="font-semibold">All Alerts</div>
                <div className="text-xs opacity-75">{getFilterCount('all')}</div>
              </button>
              
              <button 
                className={`filter-btn ${filter === 'critical' ? 'active' : ''}`}
                onClick={() => setFilter('critical')}
              >
                <div className="text-lg mb-1">🔴</div>
                <div className="font-semibold">Critical</div>
                <div className="text-xs opacity-75">{getFilterCount('critical')}</div>
              </button>
              
              <button 
                className={`filter-btn ${filter === 'high' ? 'active' : ''}`}
                onClick={() => setFilter('high')}
              >
                <div className="text-lg mb-1">🟠</div>
                <div className="font-semibold">High</div>
                <div className="text-xs opacity-75">{getFilterCount('high')}</div>
              </button>
              
              <button 
                className={`filter-btn ${filter === 'medium' ? 'active' : ''}`}
                onClick={() => setFilter('medium')}
              >
                <div className="text-lg mb-1">🟡</div>
                <div className="font-semibold">Medium</div>
                <div className="text-xs opacity-75">{getFilterCount('medium')}</div>
              </button>
              
              <button 
                className={`filter-btn ${filter === 'low' ? 'active' : ''}`}
                onClick={() => setFilter('low')}
              >
                <div className="text-lg mb-1">🟢</div>
                <div className="font-semibold">Low</div>
                <div className="text-xs opacity-75">{getFilterCount('low')}</div>
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="alerts-loading">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <div className="alerts-list">
              {filteredAlerts.map((alert, index) => (
                <div 
                  key={alert.id} 
                  className={`
                    alert-item ${alert.severity}
                    ${alert.status === 'resolved' ? 'resolved' : ''}
                    ${dismissingAlerts.has(alert.id) ? 'dismissing' : ''}
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="alert-icon">
                    {getSeverityIcon(alert.severity)}
                  </div>
                  <div className="alert-icon">
                    {getCategoryIcon(alert.category)}
                  </div>
                  <div className="alert-content">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="alert-title">{alert.title}</h3>
                      <span className={`status-badge ${alert.status}`}>
                        {alert.status}
                      </span>
                    </div>
                    <p className="alert-description">{alert.description}</p>
                    <div className="alert-meta">
                      <span className="alert-source">
                        🏢 {alert.source}
                      </span>
                      <span className="alert-timestamp">
                        ⏰ {formatTimestamp(alert.timestamp)}
                      </span>
                    </div>
                  </div>
                  <div className="alert-actions">
                    {alert.status === 'active' && (
                      <>
                        <button 
                          onClick={() => handleDismiss(alert.id)}
                          className="dismiss-btn"
                        >
                          Dismiss
                        </button>
                        <button 
                          className="investigate-btn"
                        >
                          Investigate
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!isLoading && filteredAlerts.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <div className="empty-text">No alerts match the current filter.</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AlertsPanel;