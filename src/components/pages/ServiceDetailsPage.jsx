import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Server, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Activity, 
  AlertTriangle, 
  Zap,
  Shield,
  Clock,
  Users,
  Database,
  Network,
  Lock,
  Eye,
  Settings,
  TrendingUp,
  Wifi,
  Cpu,
  HardDrive,
  MemoryStick
} from 'lucide-react';

// Import the CSS file
import './ServiceDetailsPage.css';

const ServiceDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the service data from navigation state
  const service = location.state?.service;
  
  // If no service data is passed, redirect back or show error
  if (!service) {
    return (
      <div className="service-details-container">
        <div className="error-container animate-bounce-in">
          <h2>Service not found</h2>
          <p>No service data available. Please go back and select a service.</p>
          <button onClick={() => navigate(-1)} className="back-button animate-pulse">
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Animated counters and real-time data
  const [metrics, setMetrics] = useState({
    requests: service.requests || 24567,
    totalUsers: 128470,
    activeConnections: 1234,
    responseTime: 45,
    uptime: 99.9,
    trust: service.trust || 87
  });

  const [monitoring, setMonitoring] = useState({
    cpu: 12,
    memory: 34,
    disk: 67,
    network: 23
  });

  const [events, setEvents] = useState([
    { time: "2 minutes ago", event: `New ${service.name.toLowerCase()} activity`, type: "info", id: 1 },
    { time: "5 minutes ago", event: "Security scan completed", type: "success", id: 2 },
    { time: "12 minutes ago", event: "Configuration updated", type: "success", id: 3 },
    { time: "1 hour ago", event: "Minor performance alert resolved", type: "warning", id: 4 }
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [pulseElements, setPulseElements] = useState(new Set());
  const intervalRef = useRef(null);
  const observerRef = useRef(null);

  // Generate additional data based on service type
  const getAdditionalData = (service) => {
    const baseData = {
      dataProcessed: "2.3TB",
      securityLevel: "Enterprise",
      lastMaintenance: "2024-06-20",
      nextMaintenance: "2024-07-15",
      owner: "Security Team",
      environment: "Production",
      version: "v2.1.4",
      ports: ["443", "8080", "8443"]
    };

    // Customize based on service name/type
    if (service.name.toLowerCase().includes('auth')) {
      return {
        ...baseData,
        description: "Primary authentication service handling user login, session management, and access control across all applications.",
        dependencies: ["Database Service", "Cache Service", "Notification Service"]
      };
    } else if (service.name.toLowerCase().includes('database')) {
      return {
        ...baseData,
        description: "Core database service managing data storage, retrieval, and backup operations for all applications.",
        dependencies: ["Storage Service", "Backup Service", "Monitoring Service"],
        ports: ["5432", "3306", "27017"],
        owner: "Database Team"
      };
    } else if (service.name.toLowerCase().includes('api')) {
      return {
        ...baseData,
        description: "RESTful API service providing data access and business logic for client applications.",
        dependencies: ["Authentication Service", "Database Service", "Cache Service"],
        ports: ["80", "443", "8080"],
        owner: "API Team"
      };
    } else if (service.name.toLowerCase().includes('payment')) {
      return {
        ...baseData,
        description: "Secure payment processing service handling transactions and financial operations.",
        dependencies: ["Authentication Service", "Database Service", "Encryption Service"],
        securityLevel: "PCI DSS Compliant",
        owner: "Payment Team"
      };
    } else {
      return {
        ...baseData,
        description: `${service.name} providing essential functionality and services to the application ecosystem.`,
        dependencies: ["Core Service", "Monitoring Service", "Configuration Service"],
        owner: "Operations Team"
      };
    }
  };

  const additionalData = getAdditionalData(service);

  // Enhanced animated counter hook with easing functions
  const useAnimatedCounter = (end, duration = 2000, start = 0, delay = 0) => {
    const [count, setCount] = useState(start);
    const countRef = useRef(start);
    
    useEffect(() => {
      const timeout = setTimeout(() => {
        const startTime = Date.now();
        const animate = () => {
          const now = Date.now();
          const progress = Math.min((now - startTime) / duration, 1);
          
          // Enhanced easing function (elastic out)
          const easeOutElastic = (t) => {
            const c4 = (2 * Math.PI) / 3;
            return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
          };
          
          const current = Math.floor(start + (end - start) * easeOutElastic(progress));
          
          if (current !== countRef.current) {
            countRef.current = current;
            setCount(current);
          }
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        requestAnimationFrame(animate);
      }, delay);

      return () => clearTimeout(timeout);
    }, [end, duration, start, delay]);
    
    return count;
  };

  // Staggered animated counters with delays
  const animatedRequests = useAnimatedCounter(metrics.requests, 2500, 0, 200);
  const animatedUsers = useAnimatedCounter(metrics.totalUsers, 3000, 0, 400);
  const animatedConnections = useAnimatedCounter(metrics.activeConnections, 2000, 0, 600);
  const animatedTrust = useAnimatedCounter(metrics.trust, 3500, 0, 800);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in-view');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all animation targets
    const animationTargets = document.querySelectorAll('.animate-on-scroll');
    animationTargets.forEach((target) => {
      observerRef.current?.observe(target);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading]);

  // Enhanced real-time updates with visual feedback
  useEffect(() => {
    setIsLoading(true);
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 1200);

    intervalRef.current = setInterval(() => {
      // Update metrics with realistic variations and pulse effects
      setMetrics(prev => {
        const newMetrics = {
          requests: prev.requests + Math.floor(Math.random() * 50) + 10,
          totalUsers: prev.totalUsers + Math.floor(Math.random() * 5) + 1,
          activeConnections: Math.max(800, prev.activeConnections + Math.floor(Math.random() * 20) - 10),
          responseTime: Math.max(20, Math.min(100, prev.responseTime + Math.floor(Math.random() * 6) - 3)),
          uptime: Math.max(99.0, Math.min(100, prev.uptime + (Math.random() * 0.02) - 0.01)),
          trust: Math.max(75, Math.min(95, prev.trust + Math.floor(Math.random() * 3) - 1))
        };

        // Add pulse effect to changed metrics
        Object.keys(newMetrics).forEach(key => {
          if (newMetrics[key] !== prev[key]) {
            setPulseElements(prevPulse => new Set([...prevPulse, key]));
            setTimeout(() => {
              setPulseElements(prevPulse => {
                const newSet = new Set(prevPulse);
                newSet.delete(key);
                return newSet;
              });
            }, 1000);
          }
        });

        return newMetrics;
      });

      // Update system monitoring with smooth transitions
      setMonitoring(prev => ({
        cpu: Math.max(5, Math.min(80, prev.cpu + Math.floor(Math.random() * 6) - 3)),
        memory: Math.max(20, Math.min(90, prev.memory + Math.floor(Math.random() * 4) - 2)),
        disk: Math.max(50, Math.min(85, prev.disk + Math.floor(Math.random() * 2) - 1)),
        network: Math.max(10, Math.min(70, prev.network + Math.floor(Math.random() * 8) - 4))
      }));

      // Add new events with entrance animations
      if (Math.random() < 0.4) {
        const eventTypes = [
          { event: `${service.name} processed batch request`, type: "info" },
          { event: "Cache optimization completed", type: "success" },
          { event: "API rate limit checkpoint", type: "warning" },
          { event: "New secure connection established", type: "success" },
          { event: "Security protocol updated", type: "info" },
          { event: "Performance threshold maintained", type: "success" },
          { event: "Resource allocation optimized", type: "info" }
        ];
        const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        
        setEvents(prev => [
          { 
            ...randomEvent, 
            time: "Just now", 
            id: Date.now(),
            isNew: true
          },
          ...prev.slice(0, 9).map(event => ({ ...event, isNew: false }))
        ]);

        setAnimationKey(prev => prev + 1);
      }
    }, 2500);

    return () => {
      clearTimeout(loadingTimer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [service.name]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'secure': return <CheckCircle size={20} className="animate-pulse-success" />;
      case 'warning': return <AlertCircle size={20} className="animate-pulse-warning" />;
      case 'critical': return <XCircle size={20} className="animate-pulse-danger" />;
      default: return <AlertCircle size={20} className="animate-pulse-neutral" />;
    }
  };

  const getTrustLevel = (trust) => {
    if (trust >= 90) return 'excellent';
    if (trust >= 70) return 'good';
    if (trust >= 50) return 'fair';
    return 'poor';
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const getResourceLevel = (value) => {
    if (value > 70) return 'high';
    if (value > 50) return 'medium';
    return 'low';
  };

  const getResourceIcon = (resource) => {
    switch (resource) {
      case 'cpu': return <Cpu size={16} className="animate-spin-slow" />;
      case 'memory': return <MemoryStick size={16} className="animate-bounce-subtle" />;
      case 'disk': return <HardDrive size={16} className="animate-pulse-subtle" />;
      case 'network': return <Wifi size={16} className="animate-wave" />;
      default: return <Activity size={16} />;
    }
  };

  // Enhanced Trust circle component with animated stroke
  const TrustCircle = ({ trust }) => {
    const circumference = 2 * Math.PI * 40;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (trust / 100) * circumference;
    const [animatedOffset, setAnimatedOffset] = useState(circumference);

    useEffect(() => {
      const timer = setTimeout(() => {
        setAnimatedOffset(strokeDashoffset);
      }, 500);
      return () => clearTimeout(timer);
    }, [strokeDashoffset]);

    return (
      <div className="trust-circle animate-scale-in">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#374151"
            strokeWidth="8"
            fill="none"
            className="opacity-20"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={service.status === 'critical' ? '#ef4444' : 
                   service.status === 'warning' ? '#f59e0b' : '#10b981'}
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={animatedOffset}
            className="transition-all duration-2000 ease-out animate-glow"
            strokeLinecap="round"
          />
          {/* Animated dots around the circle */}
          <circle
            cx="90"
            cy="50"
            r="3"
            fill={service.status === 'critical' ? '#ef4444' : 
                 service.status === 'warning' ? '#f59e0b' : '#10b981'}
            className="animate-orbit"
          />
        </svg>
        <div className="trust-circle-inner">
          <span className="trust-score-text animate-number-flip">{trust}%</span>
          <div className="trust-pulse-ring"></div>
        </div>
      </div>
    );
  };

  // Enhanced loading component
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner-advanced">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          <p className="loading-text animate-text-wave">
            Loading {service.name} details
            <span className="loading-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </p>
          <div className="loading-progress">
            <div className="loading-progress-bar"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`service-details-container ${isVisible ? 'fade-in-complete' : ''}`}>
      {/* Animated Header */}
      <div className="service-header animate-slide-down">
        <button className="back-button animate-hover-lift" onClick={handleGoBack}>
          <ArrowLeft size={16} className="animate-slide-right" />
          <span>Back to Services</span>
        </button>
        
        <div className="service-header-content">
          <div className="service-info">
            <div className="service-icon animate-float">
              <Server size={32} />
              <div className="icon-pulse-ring"></div>
            </div>
            <div className="service-details">
              <h1 className="service-title animate-typewriter">{service.name}</h1>
              <p className="service-description animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                {additionalData.description}
              </p>
              <div className="service-meta animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <span className="animate-slide-in-left">ID: {service.id}</span>
                <span className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>Version: {additionalData.version}</span>
                <span className="service-environment animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                  {additionalData.environment}
                </span>
              </div>
            </div>
          </div>
          <div className="service-status-badge animate-bounce-in" style={{ 
            color: service.status === 'critical' ? '#ef4444' : 
                   service.status === 'warning' ? '#f59e0b' : 
                   service.status === 'secure' ? '#10b981' : '#6b7280',
            borderColor: service.status === 'critical' ? '#ef4444' : 
                        service.status === 'warning' ? '#f59e0b' : 
                        service.status === 'secure' ? '#10b981' : '#6b7280',
            animationDelay: '0.8s'
          }}>
            {getStatusIcon(service.status)}
            <span>{service.status.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Enhanced Trust & Security */}
        <div className="details-section animate-on-scroll animate-fade-in-up">
          <div className="section-header">
            <Shield size={20} className="animate-shield-glow" />
            <h2>Trust & Security</h2>
            <div className="security-pulse-indicator"></div>
          </div>
          <div className="trust-container">
            <div className="trust-score-wrapper">
              <TrustCircle trust={animatedTrust} />
              <div className="trust-info">
                <div className={`trust-level-badge trust-level-${getTrustLevel(animatedTrust)} animate-scale-pulse`}>
                  {getTrustLevel(animatedTrust).toUpperCase()}
                </div>
                <div className="trust-details animate-slide-in-right">
                  Security Level: <span className="highlight">{additionalData.securityLevel}</span>
                </div>
                <div className="trust-details animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                  Active Threats: <strong className="animate-number-change">{service.threats}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Performance Metrics */}
        <div className="details-section animate-on-scroll animate-fade-in-up">
          <div className="section-header">
            <Activity size={20} className="animate-heartbeat" />
            <h2>Live Performance Metrics</h2>
            <div className="section-header-live">
              <div className="live-indicator animate-ping"></div>
              <span>Live</span>
            </div>
          </div>
          <div className="metrics-grid">
            <div className={`metric-card animate-hover-lift ${pulseElements.has('requests') ? 'metric-pulse' : ''}`}>
              <div className="metric-header">
                <Activity size={24} className="animate-pulse-subtle" />
                <TrendingUp size={16} className="metric-trend animate-bounce" />
              </div>
              <div className="metric-value animate-number-count">{formatNumber(animatedRequests)}</div>
              <div className="metric-label">Requests/hour</div>
              <div className="metric-sparkline animate-draw"></div>
            </div>
            <div className={`metric-card animate-hover-lift ${pulseElements.has('responseTime') ? 'metric-pulse' : ''}`}>
              <div className="metric-header">
                <Clock size={24} className="animate-tick" />
                <span className="metric-trend animate-slide-down">↓ 12ms</span>
              </div>
              <div className="metric-value animate-number-count">{metrics.responseTime}ms</div>
              <div className="metric-label">Avg Response Time</div>
              <div className="metric-sparkline animate-draw" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <div className={`metric-card animate-hover-lift ${pulseElements.has('uptime') ? 'metric-pulse' : ''}`}>
              <div className="metric-header">
                <Zap size={24} className="animate-electric" />
                <span className="metric-trend animate-fade-in">99.9%</span>
              </div>
              <div className="metric-value animate-number-count">{metrics.uptime.toFixed(1)}%</div>
              <div className="metric-label">Uptime</div>
              <div className="metric-sparkline animate-draw" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <div className={`metric-card animate-hover-lift ${pulseElements.has('totalUsers') ? 'metric-pulse' : ''}`}>
              <div className="metric-header">
                <Users size={24} className="animate-users-wave" />
                <span className="metric-trend animate-slide-up">+{Math.floor(Math.random() * 10) + 1}/min</span>
              </div>
              <div className="metric-value animate-number-count">{formatNumber(animatedUsers)}</div>
              <div className="metric-label">Total Users</div>
              <div className="metric-sparkline animate-draw" style={{ animationDelay: '0.6s' }}></div>
            </div>
          </div>
        </div>

        {/* Enhanced System Resources */}
        <div className="details-section animate-on-scroll animate-fade-in-up">
          <div className="section-header">
            <Database size={20} className="animate-database-spin" />
            <h2>System Resources</h2>
          </div>
          <div className="resources-container">
            {Object.entries(monitoring).map(([key, value], index) => (
              <div key={key} className="resource-item animate-slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="resource-header">
                  <div className="resource-title">
                    {getResourceIcon(key)}
                    <span style={{ textTransform: 'capitalize', fontWeight: '500' }}>{key} Usage</span>
                  </div>
                  <span className={`resource-value ${getResourceLevel(value)} animate-number-flip`}>
                    {value}%
                  </span>
                </div>
                <div className="resource-bar-container">
                  <div 
                    className={`resource-bar ${getResourceLevel(value)} animate-fill-bar`}
                    style={{ 
                      width: `${value}%`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  ></div>
                  <div className="resource-bar-glow"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Configuration & Dependencies */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
          <div className="details-section animate-on-scroll animate-fade-in-left">
            <div className="section-header">
              <Settings size={20} className="animate-spin-slow" />
              <h2>Configuration</h2>
            </div>
            <div className="config-grid">
              {[
                { label: 'Owner', value: additionalData.owner },
                { label: 'Active Connections', value: animatedConnections.toLocaleString(), highlight: true },
                { label: 'Ports', value: additionalData.ports.join(', ') },
                { label: 'Data Processed', value: additionalData.dataProcessed }
              ].map((item, index) => (
                <div key={item.label} className="config-item animate-slide-in-right" style={{ animationDelay: `${index * 0.1}s` }}>
                  <span className="config-label">{item.label}:</span>
                  <span className={`config-value ${item.highlight ? 'highlight animate-pulse-subtle' : ''}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="details-section animate-on-scroll animate-fade-in-right">
            <div className="section-header">
              <Network size={20} className="animate-network-pulse" />
              <h2>Dependencies</h2>
            </div>
            <div className="dependencies-container">
              {additionalData.dependencies.map((dep, index) => (
                <div key={index} className="dependency-item animate-slide-in-up" style={{ animationDelay: `${index * 0.15}s` }}>
                  <Server size={16} className="dependency-icon animate-float" />
                  <span className="dependency-name">{dep}</span>
                  <div className="dependency-status animate-pulse-success"></div>
                  <div className="dependency-connection-line"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Recent Events */}
        <div className="details-section animate-on-scroll animate-fade-in-up">
          <div className="section-header">
            <Eye size={20} className="animate-blink" />
            <h2>Live Activity Feed</h2>
          </div>
          <div className="activity-feed">
            {events.map((event, index) => (
              <div 
                key={event.id} 
                className={`activity-item ${event.type} ${event.isNew ? 'animate-slide-in-new' : 'animate-fade-in-stagger'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="activity-time animate-fade-in">{event.time}</div>
                <div className="activity-description">{event.event}</div>
                {event.isNew && <div className="new-event-indicator animate-ping"></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="actions-container animate-on-scroll animate-fade-in-up">
          {[
            { icon: Lock, text: 'View Policies', primary: true },
            { icon: Settings, text: 'Configure', primary: false },
            { icon: Activity, text: 'View Logs', primary: false }
          ].map((action, index) => (
            <button 
              key={action.text}
              className={`action-button ${action.primary ? 'primary' : 'secondary'} animate-hover-lift animate-slide-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <action.icon size={16} className="animate-icon-bounce" />
              <span>{action.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;