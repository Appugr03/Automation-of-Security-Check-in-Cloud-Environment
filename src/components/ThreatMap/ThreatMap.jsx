import React, { useState, useEffect, useRef } from 'react';

const ThreatMap = () => {
  const [threats, setThreats] = useState([]);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [stats, setStats] = useState({ totalThreats: 0, criticalThreats: 0, affectedCountries: 0 });
  const [scanLine, setScanLine] = useState(0);
  const mapRef = useRef(null);

  // Enhanced mock threat data with more locations
  const mockThreats = [
    {
      id: 1,
      location: 'New York, USA',
      coordinates: { x: 25, y: 40 },
      type: 'DDoS Attack',
      severity: 'critical',
      count: 67,
      timestamp: new Date(),
      status: 'active'
    },
    {
      id: 2,
      location: 'London, UK',
      coordinates: { x: 50, y: 35 },
      type: 'Malware Infection',
      severity: 'high',
      count: 34,
      timestamp: new Date(Date.now() - 300000),
      status: 'monitoring'
    },
    {
      id: 3,
      location: 'Tokyo, Japan',
      coordinates: { x: 85, y: 45 },
      type: 'Zero-Day Exploit',
      severity: 'critical',
      count: 89,
      timestamp: new Date(Date.now() - 600000),
      status: 'active'
    },
    {
      id: 4,
      location: 'Sydney, Australia',
      coordinates: { x: 87, y: 70 },
      type: 'Brute Force',
      severity: 'medium',
      count: 12,
      timestamp: new Date(Date.now() - 900000),
      status: 'contained'
    },
    {
      id: 5,
      location: 'São Paulo, Brazil',
      coordinates: { x: 32, y: 65 },
      type: 'SQL Injection',
      severity: 'high',
      count: 45,
      timestamp: new Date(Date.now() - 120000),
      status: 'active'
    },
    {
      id: 6,
      location: 'Mumbai, India',
      coordinates: { x: 75, y: 55 },
      type: 'Ransomware',
      severity: 'critical',
      count: 123,
      timestamp: new Date(Date.now() - 180000),
      status: 'active'
    },
    {
      id: 7,
      location: 'Berlin, Germany',
      coordinates: { x: 52, y: 32 },
      type: 'Phishing Campaign',
      severity: 'medium',
      count: 28,
      timestamp: new Date(Date.now() - 450000),
      status: 'monitoring'
    },
    {
      id: 8,
      location: 'Toronto, Canada',
      coordinates: { x: 22, y: 35 },
      type: 'Botnet Activity',
      severity: 'high',
      count: 56,
      timestamp: new Date(Date.now() - 720000),
      status: 'active'
    }
  ];

  useEffect(() => {
    setThreats(mockThreats);
    
    // Simulate real-time updates with more dynamic changes
    const threatInterval = setInterval(() => {
      setThreats(prev => prev.map(threat => {
        const change = Math.floor(Math.random() * 5) - 2; // Can increase or decrease
        return {
          ...threat,
          count: Math.max(1, threat.count + change),
          timestamp: Math.random() > 0.8 ? new Date() : threat.timestamp
        };
      }));
    }, 3000);

    // Add new random threats occasionally
    const newThreatInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newThreat = {
          id: Date.now(),
          location: `Unknown Location ${Math.floor(Math.random() * 1000)}`,
          coordinates: { 
            x: Math.random() * 90 + 5, 
            y: Math.random() * 70 + 15 
          },
          type: ['Malware', 'Phishing', 'DDoS', 'Exploit'][Math.floor(Math.random() * 4)],
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
          count: Math.floor(Math.random() * 50) + 1,
          timestamp: new Date(),
          status: 'new'
        };
        
        setThreats(prev => [...prev, newThreat]);
        
        // Remove after 30 seconds
        setTimeout(() => {
          setThreats(prev => prev.filter(t => t.id !== newThreat.id));
        }, 30000);
      }
    }, 8000);

    // Scanning line animation
    const scanInterval = setInterval(() => {
      setScanLine(prev => (prev + 2) % 100);
    }, 50);

    return () => {
      clearInterval(threatInterval);
      clearInterval(newThreatInterval);
      clearInterval(scanInterval);
    };
  }, []);

  // Update stats whenever threats change
  useEffect(() => {
    const totalThreats = threats.reduce((sum, threat) => sum + threat.count, 0);
    const criticalThreats = threats.filter(t => t.severity === 'critical').length;
    const affectedCountries = new Set(threats.map(t => t.location.split(',')[1]?.trim())).size;
    
    setStats({ totalThreats, criticalThreats, affectedCountries });
  }, [threats]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#dc3545';
      case 'high': return '#fd7e14';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getSeveritySize = (severity, count) => {
    const baseSize = {
      critical: 45,
      high: 35,
      medium: 25,
      low: 18
    };
    
    // Scale based on count
    const scaleFactor = Math.min(1.5, 1 + (count / 100));
    return baseSize[severity] * scaleFactor;
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 60000);
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    return `${Math.floor(diff / 60)}h ago`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#dc3545';
      case 'monitoring': return '#ffc107';
      case 'contained': return '#28a745';
      case 'new': return '#17a2b8';
      default: return '#6c757d';
    }
  };

  return (
    <div className="threat-map-container">
      <style jsx>{`
        .threat-map-container {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #0d1421 0%, #1a1a2e 50%, #16213e 100%);
          color: #fff;
          padding: 25px;
          border-radius: 16px;
          min-height: 700px;
          position: relative;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }

        .threat-map-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 50% 50%, rgba(0, 150, 255, 0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 35px;
          position: relative;
          z-index: 2;
        }

        .title {
          margin: 0;
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(45deg, #00d4ff, #0077be, #ff6b6b);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease-in-out infinite;
          text-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .stats-container {
          display: flex;
          gap: 35px;
        }

        .stat {
          text-align: center;
          background: rgba(255, 255, 255, 0.05);
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .stat:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 15px 30px rgba(0, 212, 255, 0.3);
          border-color: rgba(0, 212, 255, 0.5);
        }

        .stat::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .stat:hover::before {
          left: 100%;
        }

        .stat-value {
          font-size: 36px;
          font-weight: 900;
          margin-bottom: 8px;
          transition: all 0.3s ease;
        }

        .stat-value.total {
          color: #ff6b6b;
          text-shadow: 0 0 15px rgba(255, 107, 107, 0.6);
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .stat-value.critical {
          color: #dc3545;
          text-shadow: 0 0 15px rgba(220, 53, 69, 0.6);
        }

        .stat-value.countries {
          color: #4ecdc4;
          text-shadow: 0 0 15px rgba(78, 205, 196, 0.6);
        }

        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 15px rgba(255, 107, 107, 0.6); }
          50% { text-shadow: 0 0 25px rgba(255, 107, 107, 0.9), 0 0 35px rgba(255, 107, 107, 0.6); }
        }

        .stat-label {
          font-size: 13px;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }

        .map-container {
          position: relative;
          width: 100%;
          height: 450px;
          background: radial-gradient(ellipse at center, rgba(0, 100, 150, 0.2) 0%, rgba(0, 20, 40, 0.9) 100%);
          border-radius: 16px;
          border: 2px solid rgba(0, 212, 255, 0.3);
          overflow: hidden;
          box-shadow: 
            inset 0 0 50px rgba(0, 212, 255, 0.1),
            0 10px 30px rgba(0, 0, 0, 0.3);
          margin-bottom: 30px;
        }

        .scan-line {
          position: absolute;
          top: 0;
          left: ${scanLine}%;
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom, 
            transparent, 
            rgba(0, 255, 0, 0.8), 
            rgba(0, 255, 0, 0.4), 
            transparent
          );
          filter: blur(1px);
          z-index: 1;
          transition: left 0.05s linear;
        }

        .continent {
          position: absolute;
          background: rgba(100, 200, 100, 0.15);
          border: 1px solid rgba(100, 200, 100, 0.4);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .continent:hover {
          background: rgba(100, 200, 100, 0.25);
          transform: scale(1.02);
          box-shadow: 0 0 20px rgba(100, 200, 100, 0.3);
        }

        .north-america {
          left: 15%;
          top: 25%;
          width: 20%;
          height: 35%;
          border-radius: 20px 40px 60px 30px;
        }

        .south-america {
          left: 25%;
          top: 55%;
          width: 15%;
          height: 25%;
          border-radius: 30px 20px 40px 50px;
        }

        .europe-africa {
          left: 45%;
          top: 20%;
          width: 25%;
          height: 50%;
          border-radius: 40px 30px 20px 60px;
        }

        .asia-oceania {
          left: 70%;
          top: 30%;
          width: 25%;
          height: 45%;
          border-radius: 50px 20px 40px 30px;
        }

        .threat-indicator {
          position: absolute;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-weight: 900;
          color: #fff;
          transform: translate(-50%, -50%);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid rgba(255, 255, 255, 0.4);
          z-index: 10;
          animation: threat-pulse 2s ease-in-out infinite;
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
        }

        .threat-indicator:hover {
          transform: translate(-50%, -50%) scale(1.4);
          z-index: 20;
          animation: threat-hover 0.3s ease-out forwards;
        }

        .threat-indicator.new {
          animation: threat-spawn 1s ease-out, threat-pulse 2s ease-in-out 1s infinite;
        }

        @keyframes threat-pulse {
          0%, 100% { 
            box-shadow: 0 0 20px var(--severity-color);
            filter: brightness(1);
          }
          50% { 
            box-shadow: 0 0 40px var(--severity-color), 0 0 60px var(--severity-color);
            filter: brightness(1.2);
          }
        }

        @keyframes threat-hover {
          0% { filter: brightness(1); }
          100% { filter: brightness(1.5) saturate(1.3); }
        }

        @keyframes threat-spawn {
          0% { 
            transform: translate(-50%, -50%) scale(0) rotate(180deg);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5) rotate(90deg);
            opacity: 0.8;
          }
          100% { 
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        .legend {
          margin-top: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          background: rgba(255, 255, 255, 0.05);
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .legend h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .legend-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.05);
        }

        .legend-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          box-shadow: 0 0 10px var(--dot-color);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
          animation: modal-fade-in 0.3s ease-out;
        }

        @keyframes modal-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal {
          background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
          padding: 35px;
          border-radius: 16px;
          min-width: 350px;
          position: relative;
          border: 2px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          animation: modal-slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes modal-slide-in {
          from { 
            transform: scale(0.8) translateY(-50px);
            opacity: 0;
          }
          to { 
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        .close-button {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          color: #fff;
          font-size: 28px;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .close-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: rotate(90deg);
        }

        .modal-title {
          margin: 0 0 25px 0;
          font-size: 26px;
          color: #fff;
          font-weight: 700;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .detail-row:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateX(5px);
        }

        .detail-label {
          font-weight: 600;
          font-size: 15px;
        }

        .detail-value {
          font-weight: 500;
          font-size: 15px;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .network-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }

        .network-line {
          position: absolute;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.6), transparent);
          animation: data-flow 3s ease-in-out infinite;
        }

        @keyframes data-flow {
          0%, 100% { opacity: 0.3; transform: scaleX(0.5); }
          50% { opacity: 1; transform: scaleX(1); }
        }
      `}</style>

      <div className="header">
        <h1 className="title">🌐 Global Cyber Threat Monitor</h1>
        <div className="stats-container">
          <div className="stat">
            <div className="stat-value total">{stats.totalThreats}</div>
            <div className="stat-label">Active Threats</div>
          </div>
          <div className="stat">
            <div className="stat-value critical">{stats.criticalThreats}</div>
            <div className="stat-label">Critical Alerts</div>
          </div>
          <div className="stat">
            <div className="stat-value countries">{stats.affectedCountries}</div>
            <div className="stat-label">Affected Regions</div>
          </div>
        </div>
      </div>

      <div className="map-container" ref={mapRef}>
        <div className="scan-line"></div>
        
        {/* Network connection lines */}
        <div className="network-lines">
          <div className="network-line" style={{
            top: '35%',
            left: '30%',
            width: '25%',
            transform: 'rotate(25deg)',
            animationDelay: '0s'
          }}></div>
          <div className="network-line" style={{
            top: '55%',
            left: '45%',
            width: '30%',
            transform: 'rotate(-15deg)',
            animationDelay: '1s'
          }}></div>
          <div className="network-line" style={{
            top: '40%',
            left: '65%',
            width: '20%',
            transform: 'rotate(60deg)',
            animationDelay: '2s'
          }}></div>
        </div>

        {/* Continents */}
        <div className="continent north-america" title="North America"></div>
        <div className="continent south-america" title="South America"></div>
        <div className="continent europe-africa" title="Europe & Africa"></div>
        <div className="continent asia-oceania" title="Asia & Oceania"></div>

        {/* Threat indicators */}
        {threats.map(threat => {
          const size = getSeveritySize(threat.severity, threat.count);
          const color = getSeverityColor(threat.severity);
          
          return (
            <div
              key={threat.id}
              className={`threat-indicator ${threat.status}`}
              onClick={() => setSelectedThreat(threat)}
              style={{
                '--severity-color': color,
                left: `${threat.coordinates.x}%`,
                top: `${threat.coordinates.y}%`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                fontSize: `${Math.max(10, size * 0.3)}px`,
                boxShadow: `0 0 ${size * 0.8}px ${color}`,
              }}
              title={`${threat.location}: ${threat.count} ${threat.type} incidents`}
            >
              {threat.count}
            </div>
          );
        })}
      </div>

      <div className="legend">
        <h3>Threat Severity Levels:</h3>
        {[
          { level: 'critical', color: '#dc3545', label: 'Critical' },
          { level: 'high', color: '#fd7e14', label: 'High' },
          { level: 'medium', color: '#ffc107', label: 'Medium' },
          { level: 'low', color: '#28a745', label: 'Low' }
        ].map(item => (
          <div key={item.level} className="legend-item">
            <div 
              className="legend-dot" 
              style={{ 
                '--dot-color': item.color,
                backgroundColor: item.color 
              }}
            ></div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Enhanced Modal */}
      {selectedThreat && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) setSelectedThreat(null);
        }}>
          <div className="modal">
            <button
              className="close-button"
              onClick={() => setSelectedThreat(null)}
            >
              ×
            </button>
            
            <h3 className="modal-title">
              🚨 {selectedThreat.location}
            </h3>
            
            <div className="detail-row">
              <span className="detail-label">Threat Type:</span>
              <span className="detail-value">{selectedThreat.type}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Severity Level:</span>
              <span 
                className="detail-value" 
                style={{ 
                  color: getSeverityColor(selectedThreat.severity), 
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  textShadow: `0 0 10px ${getSeverityColor(selectedThreat.severity)}`
                }}
              >
                {selectedThreat.severity}
              </span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Incident Count:</span>
              <span className="detail-value" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {selectedThreat.count}
              </span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <span 
                className="detail-value status-badge"
                style={{ 
                  backgroundColor: getStatusColor(selectedThreat.status),
                  color: '#fff'
                }}
              >
                {selectedThreat.status}
              </span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Last Updated:</span>
              <span className="detail-value">{formatTimestamp(selectedThreat.timestamp)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreatMap;