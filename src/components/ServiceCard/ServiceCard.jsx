import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Server, CheckCircle, XCircle, AlertCircle, Activity, AlertTriangle, Zap } from 'lucide-react';
import './ServiceCard.css';

const ServiceCard = ({ service: initialService }) => {
  const navigate = useNavigate();
  
  // State for animated requests
  const [currentRequests, setCurrentRequests] = useState(initialService.requests);
  const [animatedRequests, setAnimatedRequests] = useState(initialService.requests);

  // Animate request values
  useEffect(() => {
    const requestInterval = setInterval(() => {
      setCurrentRequests(prev => prev + Math.floor(Math.random() * 50) + 10);
    }, 2000); // Update every 2 seconds

    return () => clearInterval(requestInterval);
  }, []);

  // Smooth animation for displayed request number
  useEffect(() => {
    const start = animatedRequests;
    const end = currentRequests;
    const duration = 1500; // 1.5 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      const current = Math.floor(start + (end - start) * easeOutCubic);
      setAnimatedRequests(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [currentRequests]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'secure': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'secure': return <CheckCircle size={16} />;
      case 'warning': return <AlertCircle size={16} />;
      case 'critical': return <XCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  const getTrustLevel = (trust) => {
    if (trust >= 90) return 'excellent';
    if (trust >= 70) return 'good';
    if (trust >= 50) return 'fair';
    return 'poor';
  };

  const handleViewDetails = () => {
    navigate(`/service/${initialService.id}`, { state: { service: initialService } });
  };

  const handleViewPolicies = () => {
    navigate(`/service/${initialService.id}/policies`, { state: { service: initialService } });
  };

  return (
    <div className={`service-card ${initialService.status}`}>
      <div className="service-card-header">
        <div className="service-name">
          <div className="service-icon">
            <Server size={20} />
          </div>
          <div className="service-info">
            <h3>{initialService.name}</h3>
            <span className="service-id">ID: {initialService.id}</span>
          </div>
        </div>
        <div className="service-status" style={{ color: getStatusColor(initialService.status) }}>
          {getStatusIcon(initialService.status)}
          <span>{initialService.status.toUpperCase()}</span>
        </div>
      </div>
      
      <div className="trust-section">
        <div className="trust-header">
          <span className="trust-label">Trust Score</span>
          <span className={`trust-level ${getTrustLevel(initialService.trust)}`}>
            {getTrustLevel(initialService.trust).toUpperCase()}
          </span>
        </div>
        <div className="trust-score">{initialService.trust}%</div>
        <div className="trust-bar">
          <div 
            className="trust-fill"
            style={{
              width: `${initialService.trust}%`,
              backgroundColor: getStatusColor(initialService.status)
            }}
          />
        </div>
      </div>

      <div className="service-metrics">
        <div className="metric">
          <div className="metric-icon">
            <Activity size={16} />
          </div>
          <div className="metric-info">
            <span className="metric-value">{animatedRequests.toLocaleString()}</span>
            <span className="metric-label">Requests/hour</span>
          </div>
        </div>
        
        <div className="metric">
          <div className="metric-icon threat">
            <AlertTriangle size={16} />
          </div>
          <div className="metric-info">
            <span className="metric-value">{initialService.threats}</span>
            <span className="metric-label">Active Threats</span>
          </div>
        </div>
        
        <div className="metric">
          <div className="metric-icon">
            <Zap size={16} />
          </div>
          <div className="metric-info">
            <span className="metric-value">{initialService.lastVerified}</span>
            <span className="metric-label">Last Verified</span>
          </div>
        </div>
      </div>

      <div className="service-actions">
        <button className="action-btn primary" onClick={handleViewDetails}>
          View Details
        </button>
        <button className="action-btn secondary" onClick={handleViewPolicies}>
          Policies
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;