import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Shield, Server, AlertTriangle, Users, Lock, Activity, Eye, Database, ArrowLeft, Clock, CheckCircle, XCircle, AlertCircle, BarChart3, Globe, Cpu, HardDrive, Network } from 'lucide-react';

const SecurityDashboard = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [animatedCards, setAnimatedCards] = useState([]);

  // Default fallback data
  const defaultData = {
    overallSecurityScore: 85,
    activeThreats: 15,
    blockedAttacks: 1200,
    accessControl: {
      activeUsers: 800,
      mfaEnabled: 95.0
    },
    vulnerabilities: {
      critical: 1
    },
    networkSecurity: {
      dataEncrypted: 98.0,
      vpnConnections: 120
    },
    threatLevel: 'low'
  };

  const data = defaultData;

  // Color configurations
  const metricColors = [
    '#00ff88', '#ff6b6b', '#38bdf8', '#a855f7',
    '#f59e0b', '#14b8a6', '#ec4899', '#8b5cf6'
  ];

  // Enhanced metrics with detailed data
  const metricsCards = [
    {
      id: 1,
      label: 'Security Score',
      value: `${data.overallSecurityScore}%`,
      change: '+2%',
      changePercent: 'vs last week',
      color: metricColors[0],
      icon: Shield,
      description: 'Overall security posture',
      progress: data.overallSecurityScore,
      category: 'security',
      detailData: {
        title: 'Security Score Analysis',
        overview: 'Your overall security posture is strong with a score of 85%.',
        metrics: [
          { name: 'Threat Detection', value: 92, status: 'excellent' },
          { name: 'Access Control', value: 88, status: 'good' },
          { name: 'Data Protection', value: 94, status: 'excellent' },
          { name: 'Network Security', value: 78, status: 'fair' },
          { name: 'Incident Response', value: 85, status: 'good' }
        ],
        recentActivity: [
          { time: '2 hours ago', event: 'Security policy updated', type: 'info' },
          { time: '6 hours ago', event: 'Firewall rules optimized', type: 'success' },
          { time: '1 day ago', event: 'Security scan completed', type: 'success' }
        ],
        recommendations: [
          'Implement zero-trust architecture',
          'Enhance network segmentation',
          'Regular security awareness training'
        ]
      }
    },
    {
      id: 2,
      label: 'Active Threats',
      value: `${data.activeThreats}`,
      change: '+5',
      changePercent: 'vs yesterday',
      color: metricColors[1],
      icon: AlertTriangle,
      description: 'Current security incidents',
      progress: 65,
      category: 'threats',
      detailData: {
        title: 'Threat Intelligence Dashboard',
        overview: 'Currently monitoring 15 active threats across your infrastructure.',
        threats: [
          { name: 'Suspicious Login Attempts', severity: 'high', count: 8, status: 'monitoring' },
          { name: 'Malware Detection', severity: 'critical', count: 2, status: 'blocked' },
          { name: 'DDoS Attempts', severity: 'medium', count: 3, status: 'mitigated' },
          { name: 'Phishing Attempts', severity: 'high', count: 2, status: 'blocked' }
        ],
        timeline: [
          { time: '10:30 AM', event: 'Blocked malware attempt', severity: 'high' },
          { time: '09:15 AM', event: 'Suspicious IP detected', severity: 'medium' },
          { time: '08:45 AM', event: 'Failed login attempts spike', severity: 'high' }
        ]
      }
    },
    {
      id: 3,
      label: 'Blocked Attacks',
      value: `${data.blockedAttacks?.toLocaleString() || 0}`,
      change: '+127',
      changePercent: 'today',
      color: metricColors[2],
      icon: Eye,
      description: 'Prevented security breaches',
      progress: 90,
      category: 'defense',
      detailData: {
        title: 'Attack Prevention Analytics',
        overview: 'Successfully blocked 1,200 attacks today with 99.2% efficiency.',
        attackTypes: [
          { type: 'SQL Injection', count: 450, percentage: 37.5 },
          { type: 'XSS Attempts', count: 320, percentage: 26.7 },
          { type: 'Brute Force', count: 280, percentage: 23.3 },
          { type: 'CSRF', count: 150, percentage: 12.5 }
        ],
        hourlyData: [
          { hour: '00:00', attacks: 45 }, { hour: '04:00', attacks: 32 },
          { hour: '08:00', attacks: 89 }, { hour: '12:00', attacks: 156 },
          { hour: '16:00', attacks: 134 }, { hour: '20:00', attacks: 78 }
        ]
      }
    },
    {
      id: 4,
      label: 'Active Users',
      value: `${data.accessControl?.activeUsers || 0}`,
      change: '+24',
      changePercent: 'vs last hour',
      color: metricColors[3],
      icon: Users,
      description: 'Currently authenticated users',
      progress: 75,
      category: 'users',
      detailData: {
        title: 'User Access Management',
        overview: '800 active users currently authenticated across all systems.',
        userStats: [
          { category: 'Employees', count: 650, percentage: 81.25 },
          { category: 'Contractors', count: 100, percentage: 12.5 },
          { category: 'Partners', count: 35, percentage: 4.37 },
          { category: 'Service Accounts', count: 15, percentage: 1.88 }
        ],
        accessPatterns: [
          { time: 'Peak Hours (9-11 AM)', users: 750 },
          { time: 'Lunch Time (12-1 PM)', users: 580 },
          { time: 'End of Day (5-6 PM)', users: 420 }
        ]
      }
    },
    {
      id: 5,
      label: 'Critical Vulnerabilities',
      value: `${data.vulnerabilities?.critical || 0}`,
      change: '-1',
      changePercent: 'this week',
      color: metricColors[4],
      icon: AlertTriangle,
      description: 'High-priority security issues',
      progress: 20,
      category: 'vulnerabilities',
      detailData: {
        title: 'Vulnerability Management',
        overview: 'Currently tracking 1 critical vulnerability requiring immediate attention.',
        vulnerabilities: [
          { 
            id: 'CVE-2024-1234', 
            severity: 'critical', 
            description: 'Remote code execution in web server',
            affected: 'Web servers (3 instances)',
            status: 'patching',
            dueDate: '2024-06-25'
          }
        ],
        patchingProgress: [
          { category: 'Critical', total: 1, patched: 0, percentage: 0 },
          { category: 'High', total: 12, patched: 8, percentage: 66.7 },
          { category: 'Medium', total: 45, patched: 38, percentage: 84.4 },
          { category: 'Low', total: 78, patched: 65, percentage: 83.3 }
        ]
      }
    },
    {
      id: 6,
      label: 'MFA Coverage',
      value: `${data.accessControl?.mfaEnabled || 0}%`,
      change: '+1.2%',
      changePercent: 'this month',
      color: metricColors[5],
      icon: Lock,
      description: 'Multi-factor auth adoption',
      progress: data.accessControl?.mfaEnabled || 0,
      category: 'authentication',
      detailData: {
        title: 'Multi-Factor Authentication Status',
        overview: '95% of users have MFA enabled, exceeding security requirements.',
        mfaStats: [
          { method: 'Authenticator App', users: 520, percentage: 65 },
          { method: 'SMS', users: 200, percentage: 25 },
          { method: 'Hardware Token', users: 40, percentage: 5 },
          { method: 'No MFA', users: 40, percentage: 5 }
        ],
        adoptionTrend: [
          { month: 'Jan', percentage: 78 },
          { month: 'Feb', percentage: 82 },
          { month: 'Mar', percentage: 87 },
          { month: 'Apr', percentage: 91 },
          { month: 'May', percentage: 93 },
          { month: 'Jun', percentage: 95 }
        ]
      }
    },
    {
      id: 7,
      label: 'Data Encrypted',
      value: `${data.networkSecurity?.dataEncrypted || 0}%`,
      change: '+0.3%',
      changePercent: 'this week',
      color: metricColors[6],
      icon: Database,
      description: 'Encrypted data coverage',
      progress: data.networkSecurity?.dataEncrypted || 0,
      category: 'encryption',
      detailData: {
        title: 'Data Encryption Overview',
        overview: '98% of sensitive data is encrypted across all storage systems.',
        encryptionStatus: [
          { system: 'Database', encrypted: 95, total: 100, percentage: 95 },
          { system: 'File Storage', encrypted: 98, total: 100, percentage: 98 },
          { system: 'Backups', encrypted: 100, total: 100, percentage: 100 },
          { system: 'Communications', encrypted: 99, total: 100, percentage: 99 }
        ],
        algorithms: [
          { name: 'AES-256', usage: 70 },
          { name: 'RSA-2048', usage: 20 },
          { name: 'ECC', usage: 8 },
          { name: 'Others', usage: 2 }
        ]
      }
    },
    {
      id: 8,
      label: 'VPN Connections',
      value: `${data.networkSecurity?.vpnConnections || 0}`,
      change: '+12',
      changePercent: 'active now',
      color: metricColors[7],
      icon: Activity,
      description: 'Secure remote connections',
      progress: 80,
      category: 'network',
      detailData: {
        title: 'VPN Connection Analytics',
        overview: '120 active VPN connections providing secure remote access.',
        connectionStats: [
          { location: 'North America', connections: 65, percentage: 54.2 },
          { location: 'Europe', connections: 35, percentage: 29.2 },
          { location: 'Asia Pacific', connections: 15, percentage: 12.5 },
          { location: 'Others', connections: 5, percentage: 4.1 }
        ],
        bandwidthUsage: [
          { time: '00:00', usage: 45 }, { time: '06:00', usage: 78 },
          { time: '12:00', usage: 120 }, { time: '18:00', usage: 95 }
        ]
      }
    }
  ];

  // Animation effect on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedCards(metricsCards.map(card => card.id));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const getTrendIcon = (change) => {
    return change.startsWith('+') ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (change, isPositiveGood = true) => {
    const isPositive = change.startsWith('+');
    if (isPositiveGood) {
      return isPositive ? '#00ff88' : '#ff6b6b';
    } else {
      return isPositive ? '#ff6b6b' : '#00ff88';
    }
  };

  const handleCardClick = (metric) => {
    setSelectedService(metric);
  };

  const handleBackClick = () => {
    setSelectedService(null);
  };

  // Detail page component
  const DetailPage = ({ service }) => {
    const detail = service.detailData;
    
    return (
      <div style={{
        padding: '2rem',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        animation: 'slideIn 0.3s ease-out'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          padding: '1rem',
          background: 'rgba(26, 26, 26, 0.8)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <button
            onClick={handleBackClick}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: service.color,
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <service.icon size={32} />
              {detail.title}
            </h1>
            <p style={{
              fontSize: '1rem',
              color: '#888',
              margin: '0.5rem 0 0 0'
            }}>
              {detail.overview}
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Metrics Section */}
          {detail.metrics && (
            <div style={{
              background: 'rgba(26, 26, 26, 0.8)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{ color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BarChart3 size={20} style={{ color: service.color }} />
                Security Metrics
              </h3>
              {detail.metrics.map((metric, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 0',
                  borderBottom: index < detail.metrics.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                }}>
                  <span style={{ color: '#ffffff', fontWeight: '500' }}>{metric.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{
                      width: '100px',
                      height: '4px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${metric.value}%`,
                        height: '100%',
                        background: service.color,
                        borderRadius: '2px'
                      }}></div>
                    </div>
                    <span style={{ color: service.color, fontWeight: '600', minWidth: '40px' }}>{metric.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Threats Section */}
          {detail.threats && (
            <div style={{
              background: 'rgba(26, 26, 26, 0.8)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{ color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={20} style={{ color: service.color }} />
                Active Threats
              </h3>
              {detail.threats.map((threat, index) => (
                <div key={index} style={{
                  padding: '1rem',
                  margin: '0.5rem 0',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#ffffff', fontWeight: '600' }}>{threat.name}</span>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: threat.severity === 'critical' ? '#ff6b6b' : threat.severity === 'high' ? '#f59e0b' : '#38bdf8',
                      color: '#ffffff'
                    }}>
                      {threat.severity.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#888' }}>
                    <span>Count: {threat.count}</span>
                    <span>Status: {threat.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recent Activity */}
          {detail.recentActivity && (
            <div style={{
              background: 'rgba(26, 26, 26, 0.8)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{ color: '#ffffff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={20} style={{ color: service.color }} />
                Recent Activity
              </h3>
              {detail.recentActivity.map((activity, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 0',
                  borderBottom: index < detail.recentActivity.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                }}>
                  {activity.type === 'success' ? (
                    <CheckCircle size={16} style={{ color: '#00ff88' }} />
                  ) : activity.type === 'error' ? (
                    <XCircle size={16} style={{ color: '#ff6b6b' }} />
                  ) : (
                    <AlertCircle size={16} style={{ color: '#38bdf8' }} />
                  )}
                  <div>
                    <div style={{ color: '#ffffff', fontSize: '0.875rem' }}>{activity.event}</div>
                    <div style={{ color: '#888', fontSize: '0.75rem' }}>{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (selectedService) {
    return <DetailPage service={selectedService} />;
  }

  return (
    <div style={{ 
      padding: '2rem',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          margin: 0,
          position: 'relative'
        }}>
          <div style={{
            width: '4px',
            height: '20px',
            background: 'linear-gradient(135deg, #00ff88, #38bdf8)',
            borderRadius: '2px',
            marginRight: '0.5rem'
          }}></div>
          Security Metrics Dashboard
        </h2>
        <div style={{
          fontSize: '0.875rem',
          color: '#888',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            background: '#00ff88',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }}></div>
          Last updated: just now
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {metricsCards.map((metric, index) => {
          const Icon = metric.icon;
          const TrendIcon = getTrendIcon(metric.change);
          const isThreats = metric.label.includes('Threats') || metric.label.includes('Vulnerabilities');
          const isAnimated = animatedCards.includes(metric.id);
          
          return (
            <div 
              key={metric.id}
              onClick={() => handleCardClick(metric)}
              style={{
                background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.8) 0%, rgba(15, 15, 15, 0.9) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1.5rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer',
                transform: isAnimated ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                opacity: isAnimated ? 1 : 0,
                animation: isAnimated ? `cardSlideIn 0.6s ease-out ${index * 0.1}s both` : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.borderColor = `${metric.color}60`;
                e.currentTarget.style.boxShadow = `0 12px 32px rgba(0, 0, 0, 0.4), 0 0 20px ${metric.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Top border glow effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: `linear-gradient(90deg, transparent, ${metric.color}, transparent)`,
                opacity: 0.8
              }}></div>

              {/* Card Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: `linear-gradient(135deg, ${metric.color}20, ${metric.color}10)`,
                  border: `1px solid ${metric.color}30`,
                  position: 'relative',
                  animation: isAnimated ? 'iconBounce 0.6s ease-out 0.3s both' : 'none'
                }}>
                  <Icon size={24} style={{ color: metric.color }} />
                </div>

                <div style={{
                  padding: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <TrendIcon 
                    size={16} 
                    style={{ color: getTrendColor(metric.change, !isThreats) }} 
                  />
                </div>
              </div>

              {/* Content */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  lineHeight: '1',
                  marginBottom: '0.5rem',
                  background: `linear-gradient(135deg, ${metric.color} 0%, rgba(255, 255, 255, 0.8) 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: isAnimated ? 'numberCount 1s ease-out 0.5s both' : 'none'
                }}>
                  {metric.value}
                </div>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '0.25rem'
                }}>
                  {metric.label}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#888',
                  fontWeight: '400'
                }}>
                  {metric.description}
                </div>
              </div>

              {/* Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: getTrendColor(metric.change, !isThreats)
                  }}>
                    {metric.change}
                  </span>
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: '500',
                    color: '#888'
                  }}>
                    {metric.changePercent}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{
                width: '100%',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '2px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  height: '100%',
                  width: isAnimated ? `${metric.progress}%` : '0%',
                  background: `linear-gradient(90deg, ${metric.color}, ${metric.color}80)`,
                  borderRadius: '2px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.8s'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                    animation: 'shimmer 2s infinite'
                  }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inline Styles for Animations */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes cardSlideIn {
          0% {
            transform: translateY(30px) scale(0.9);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes iconBounce {
          0% {
            transform: scale(0.5) rotate(-90deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) rotate(0deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes numberCount {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SecurityDashboard;