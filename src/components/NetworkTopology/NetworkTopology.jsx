
import React, { useState, useEffect } from 'react';
import { Network, Lock, Users, Shield, Activity, AlertTriangle, Globe, Database, Server, Cloud } from 'lucide-react';

const NetworkTopology = ({ networkData }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [dataPackets, setDataPackets] = useState([]);
  const [containerDimensions, setContainerDimensions] = useState({ width: 1440, height: 810 });

  // Updated nodes with correct IDs to match connections
  const defaultNodes = [
    { id: 'authentication-service', name: 'Authentication Service', type: 'service', status: 'secure', x: 20, y: 25, icon: Lock },
    { id: 'payment-gateway', name: 'Payment Gateway', type: 'service', status: 'warning', x: 50, y: 25, icon: Shield },
    { id: 'user-database', name: 'User Database', type: 'database', status: 'secure', x: 80, y: 25, icon: Database },
    { id: 'file-storage-service', name: 'File Storage Service', type: 'service', status: 'secure', x: 20, y: 60, icon: Cloud },
    { id: 'notification-service', name: 'Notification Service', type: 'service', status: 'secure', x: 50, y: 60, icon: Activity },
    { id: 'analytics-engine', name: 'Analytics Engine', type: 'service', status: 'critical', x: 80, y: 60, icon: AlertTriangle },
  ];

  // Reduced to exactly 7 connections
  const defaultConnections = [
    // Core authentication flow
    { from: 'authentication-service', to: 'user-database', status: 'secure', encryption: 'TLS 1.3', latency: '2ms' },
    { from: 'authentication-service', to: 'payment-gateway', status: 'secure', encryption: 'TLS 1.3', latency: '3ms' },
    
    // Payment processing
    { from: 'payment-gateway', to: 'user-database', status: 'warning', encryption: 'TLS 1.2', latency: '4ms' },
    { from: 'payment-gateway', to: 'notification-service', status: 'secure', encryption: 'TLS 1.3', latency: '2ms' },
    
    // File and storage operations
    { from: 'user-database', to: 'file-storage-service', status: 'secure', encryption: 'TLS 1.3', latency: '3ms' },
    { from: 'file-storage-service', to: 'analytics-engine', status: 'critical', encryption: 'None', latency: '12ms' },
    
    // Analytics and monitoring
    { from: 'notification-service', to: 'analytics-engine', status: 'secure', encryption: 'TLS 1.3', latency: '2ms' }
  ];

  const nodes = networkData?.nodes || defaultNodes;
  const connections = networkData?.connections || defaultConnections;

  // Update container dimensions for 75% screen width
  useEffect(() => {
    const updateDimensions = () => {
      setContainerDimensions({
        width: window.innerWidth * 0.75,
        height: window.innerHeight * 0.75
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Animation for pulsing and data packets
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Generate moving data packets
  useEffect(() => {
    const generatePacket = () => {
      const connection = connections[Math.floor(Math.random() * connections.length)];
      const id = Math.random().toString(36).substr(2, 9);
      
      setDataPackets(prev => [...prev, {
        id,
        connection,
        progress: 0,
        createdAt: Date.now()
      }]);
    };

    const packetInterval = setInterval(generatePacket, 1200);
    
    const updateInterval = setInterval(() => {
      setDataPackets(prev => 
        prev.map(packet => ({
          ...packet,
          progress: packet.progress + 1.5
        })).filter(packet => packet.progress <= 100)
      );
    }, 50);

    return () => {
      clearInterval(packetInterval);
      clearInterval(updateInterval);
    };
  }, [connections]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'secure': return 'text-green-400 bg-green-900/20 border-green-500';
      case 'warning': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500';
      case 'critical': return 'text-red-400 bg-red-900/20 border-red-500';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-500';
    }
  };

  const renderConnections = () => {
    return (
      <svg 
        className="connections-svg" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2
        }}
        viewBox={`0 0 ${containerDimensions.width} ${containerDimensions.height}`}
      >
        <defs>
          <linearGradient id="secureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.9"/>
            <stop offset="50%" stopColor="#34d399" stopOpacity="1"/>
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="warningGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9"/>
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="1"/>
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="criticalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9"/>
            <stop offset="50%" stopColor="#f87171" stopOpacity="1"/>
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.9"/>
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                  refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
          </marker>
        </defs>
        
        {connections.map((conn, index) => {
          const fromNode = nodes.find(n => n.id === conn.from);
          const toNode = nodes.find(n => n.id === conn.to);
          
          if (!fromNode || !toNode) return null;

          // Calculate actual pixel positions based on container dimensions
          const headerHeight = 120;
          const statsHeight = 80;
          const availableHeight = containerDimensions.height - headerHeight - statsHeight;
          
          const x1 = (fromNode.x / 100) * containerDimensions.width;
          const y1 = headerHeight + (fromNode.y / 100) * availableHeight;
          const x2 = (toNode.x / 100) * containerDimensions.width;
          const y2 = headerHeight + (toNode.y / 100) * availableHeight;

          const strokeColor = conn.status === 'secure' ? '#10b981' : 
                             conn.status === 'warning' ? '#f59e0b' : '#ef4444';
          const strokeUrl = `url(#${conn.status}Gradient)`;

          // Calculate midpoint for connection labels
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;

          // Find packets for this connection
          const connectionPackets = dataPackets.filter(p => 
            p.connection.from === conn.from && p.connection.to === conn.to
          );

          return (
            <g key={`${conn.from}-${conn.to}`}>
              {/* Background glow line */}
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={strokeColor}
                strokeWidth="6"
                opacity="0.2"
                filter="url(#glow)"
                strokeLinecap="round"
              />
              
              {/* Main connection line */}
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={strokeUrl}
                strokeWidth="3"
                strokeLinecap="round"
                className={`connection-line ${conn.status}`}
                markerEnd="url(#arrowhead)"
                style={{
                  animation: `connection-flow 3s infinite linear`
                }}
              />
              
              {/* Animated flow line */}
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={strokeColor}
                strokeWidth="1.5"
                strokeDasharray="8 4"
                strokeLinecap="round"
                className="connection-flow"
                style={{
                  animation: `dash-flow 2s infinite linear`,
                  opacity: 0.8
                }}
              />
              
              {/* Connection info on hover */}
              <g className="connection-info" opacity="0" style={{ pointerEvents: 'all' }}>
                <rect
                  x={midX - 45}
                  y={midY - 20}
                  width="90"
                  height="40"
                  fill="rgba(15, 23, 42, 0.95)"
                  stroke={strokeColor}
                  strokeWidth="1"
                  rx="6"
                />
                <text
                  x={midX}
                  y={midY - 5}
                  fill="white"
                  fontSize="10"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontWeight="600"
                >
                  {conn.encryption}
                </text>
                <text
                  x={midX}
                  y={midY + 8}
                  fill="#94a3b8"
                  fontSize="9"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {conn.latency}
                </text>
              </g>
              
              {/* Data packets */}
              {connectionPackets.map(packet => {
                const packetX = x1 + (x2 - x1) * (packet.progress / 100);
                const packetY = y1 + (y2 - y1) * (packet.progress / 100);
                
                return (
                  <g key={packet.id}>
                    <circle
                      cx={packetX}
                      cy={packetY}
                      r="10"
                      fill="#3b82f6"
                      opacity="0.2"
                      filter="url(#glow)"
                    />
                    <circle
                      cx={packetX}
                      cy={packetY}
                      r="5"
                      fill="#60a5fa"
                      className="data-packet"
                    />
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    );
  };
  const styles = `
    .network-topology {
      width: 75vw;
      height: 100vh;
      margin: 0 auto;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: white;
      font-family: 'Inter', system-ui, sans-serif;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
      border-radius: 16px;
      border: 1px solid #334155;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }

    .topology-header {
      padding: 1.5rem;
      border-bottom: 1px solid #334155;
      background: rgba(15, 23, 42, 0.95);
      border-radius: 16px 16px 0 0;
    }

    .topology-header h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .topology-controls {
      margin-top: 1rem;
    }

    .legend {
      display: flex;
      gap: 1rem;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
    }

    .legend-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      animation: legend-pulse 2s infinite;
    }

    .legend-dot.secure { background: #10b981; }
    .legend-dot.warning { background: #f59e0b; }
    .legend-dot.critical { background: #ef4444; }

    .topology-container {
      flex: 1;
      position: relative;
      overflow: hidden;
    }

    .network-map {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 75% 25%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 25% 75%, rgba(245, 158, 11, 0.08) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.08) 0%, transparent 50%);
    }

    .connections-svg {
      z-index: 2 !important;
    }

    .connection-info:hover {
      opacity: 1 !important;
      transition: opacity 0.3s ease;
    }

    .connection-line {
      stroke-linecap: round;
      transition: stroke-width 0.3s ease;
    }

    .connection-line:hover {
      stroke-width: 5;
    }

    .connection-flow {
      stroke-linecap: round;
    }

    .service-node {
      position: absolute;
      width: 100px;
      height: 100px;
      border-radius: 12px;
      border: 2px solid;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      transform: translate(-50%, -50%);
      animation: node-float 8s ease-in-out infinite;
      z-index: 10;
      backdrop-filter: blur(10px);
    }

    .service-node:hover {
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
    }

    .service-node.secure {
      background: rgba(16, 185, 129, 0.1);
      border-color: #10b981;
      box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
    }

    .service-node.warning {
      background: rgba(245, 158, 11, 0.1);
      border-color: #f59e0b;
      box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
    }

    .service-node.critical {
      background: rgba(239, 68, 68, 0.1);
      border-color: #ef4444;
      box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
      animation: node-float 8s ease-in-out infinite, critical-pulse 2s infinite;
    }

    .service-node.selected {
      transform: translate(-50%, -50%) scale(1.15);
      box-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
      border-width: 3px;
    }

    .service-node.database {
      border-radius: 20px;
      background: rgba(139, 92, 246, 0.1);
      border-color: #8b5cf6;
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
    }

    .service-node.gateway {
      border-radius: 50%;
      background: rgba(59, 130, 246, 0.1);
      border-color: #3b82f6;
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    }

    .node-pulse {
      position: absolute;
      top: -8px;
      left: -8px;
      right: -8px;
      bottom: -8px;
      border: 2px solid;
      border-radius: inherit;
      border-color: inherit;
      opacity: 0;
      animation: node-pulse 4s infinite;
    }

    .node-icon {
      margin-bottom: 0.5rem;
      animation: icon-glow 3s ease-in-out infinite alternate;
    }

    .node-info {
      text-align: center;
      font-size: 0.75rem;
    }

    .node-name {
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 90px;
      margin-bottom: 0.25rem;
    }

    .node-status {
      opacity: 0.8;
      text-transform: capitalize;
      font-size: 0.7rem;
    }

    .node-details {
      position: absolute;
      top: 2rem;
      right: 2rem;
      width: 320px;
      background: rgba(15, 23, 42, 0.98);
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 1.5rem;
      backdrop-filter: blur(15px);
      animation: slide-in 0.4s ease-out;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      z-index: 20;
    }

    .details-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #334155;
    }

    .details-header h4 {
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-badge.secure {
      background: rgba(16, 185, 129, 0.2);
      color: #10b981;
      border: 1px solid #10b981;
    }

    .status-badge.warning {
      background: rgba(245, 158, 11, 0.2);
      color: #f59e0b;
      border: 1px solid #f59e0b;
    }

    .status-badge.critical {
      background: rgba(239, 68, 68, 0.2);
      color: #ef4444;
      border: 1px solid #ef4444;
    }

    .detail-section h5 {
      margin: 0 0 0.75rem 0;
      font-size: 0.9rem;
      color: #94a3b8;
      font-weight: 500;
    }

    .connections-list {
      max-height: 200px;
      overflow-y: auto;
    }

    .connection-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      border-radius: 6px;
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
      border-left: 3px solid;
    }

    .connection-item.secure { 
      background: rgba(16, 185, 129, 0.08); 
      border-left-color: #10b981;
    }
    .connection-item.warning { 
      background: rgba(245, 158, 11, 0.08); 
      border-left-color: #f59e0b;
    }
    .connection-item.critical { 
      background: rgba(239, 68, 68, 0.08); 
      border-left-color: #ef4444;
    }

    .connection-direction {
      font-weight: bold;
      font-size: 1rem;
      color: #60a5fa;
    }

    .connection-target {
      flex: 1;
      font-weight: 500;
    }

    .connection-encryption {
      font-size: 0.7rem;
      color: #94a3b8;
      background: rgba(148, 163, 184, 0.1);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
    }

    .topology-stats {
      padding: 1rem 1.5rem;
      border-top: 1px solid #334155;
      background: rgba(15, 23, 42, 0.95);
      display: flex;
      justify-content: space-around;
      border-radius: 0 0 16px 16px;
    }

    .stat-item {
      text-align: center;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #60a5fa;
      line-height: 1;
    }

    .stat-label {
      font-size: 0.75rem;
      opacity: 0.8;
      margin-top: 0.25rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    @keyframes node-pulse {
      0% { opacity: 0; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(1.2); }
      100% { opacity: 0; transform: scale(1.4); }
    }

    @keyframes node-float {
      0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
      25% { transform: translate(-50%, -50%) translateY(-3px); }
      50% { transform: translate(-50%, -50%) translateY(-1px); }
      75% { transform: translate(-50%, -50%) translateY(-5px); }
    }

    @keyframes critical-pulse {
      0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.3); }
      50% { box-shadow: 0 0 35px rgba(239, 68, 68, 0.6); }
    }

    @keyframes icon-glow {
      0% { filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5)); }
      100% { filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.8)); }
    }

    @keyframes connection-flow {
      0% { stroke-opacity: 0.6; }
      50% { stroke-opacity: 1; }
      100% { stroke-opacity: 0.6; }
    }

    @keyframes dash-flow {
      0% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: -12; }
    }

    .data-packet {
      animation: packet-pulse 1.5s infinite alternate;
    }

    @keyframes packet-pulse {
      0% { r: 5; opacity: 1; }
      100% { r: 7; opacity: 0.7; }
    }

    @keyframes legend-pulse {
      0%, 100% { opacity: 0.7; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.1); }
    }

    @keyframes slide-in {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* Custom scrollbar for connections list */
    .connections-list::-webkit-scrollbar {
      width: 4px;
    }

    .connections-list::-webkit-scrollbar-track {
      background: rgba(51, 65, 85, 0.3);
      border-radius: 2px;
    }

    .connections-list::-webkit-scrollbar-thumb {
      background: #60a5fa;
      border-radius: 2px;
    }

    /* Responsive adjustments */
    @media (max-width: 1024px) {
      .network-topology {
        width: 90vw;
        height: 80vh;
      }
      
      .service-node {
        width: 80px;
        height: 80px;
      }
      
      .node-details {
        width: 280px;
      }
    }

    @media (max-width: 768px) {
      .network-topology {
        width: 95vw;
        height: 85vh;
      }
      
      .service-node {
        width: 70px;
        height: 70px;
      }
      
      .node-details {
        width: 250px;
        right: 1rem;
        top: 1rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="network-topology">
        <div className="topology-header">
          <h3>
            <Network size={24} />
            Network Security Topology - Rectangular Layout
          </h3>
          <div className="topology-controls">
            <div className="legend">
              <div className="legend-item">
                <div className="legend-dot secure"></div>
                <span>Secure</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot warning"></div>
                <span>Warning</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot critical"></div>
                <span>Critical</span>
              </div>
            </div>
          </div>
        </div>

        <div className="topology-container">
          <div className="network-map">
            {renderConnections()}
            
            {nodes.map((node, index) => {
              const Icon = node.icon;
              const isSelected = selectedNode === node.id;
              
              return (
                <div
                  key={node.id}
                  className={`service-node ${node.status} ${node.type} ${isSelected ? 'selected' : ''}`}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    animationDelay: `${index * 0.3}s`
                  }}
                  onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                >
                  <div className="node-pulse"></div>
                  <div className="node-icon">
                    <Icon size={20} />
                  </div>
                  <div className="node-info">
                    <div className="node-name">{node.name}</div>
                    <div className="node-status">{node.status}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedNode && (
            <div className="node-details">
              {(() => {
                const node = nodes.find(n => n.id === selectedNode);
                const nodeConnections = connections.filter(c => c.from === selectedNode || c.to === selectedNode);
                
                return (
                  <div className="details-panel">
                    <div className="details-header">
                      <h4>{node.name}</h4>
                      <div className={`status-badge ${node.status}`}>
                        {node.status}
                      </div>
                    </div>
                    
                    <div className="details-content">
                      <div className="detail-section">
                        <h5>Type: {node.type.charAt(0).toUpperCase() + node.type.slice(1)}</h5>
                      </div>
                      
                      <div className="detail-section">
                        <h5>Connections ({nodeConnections.length})</h5>
                        <div className="connections-list">
                          {nodeConnections.map((conn, index) => {
                            const isOutgoing = conn.from === selectedNode;
                            const targetNode = nodes.find(n => n.id === (isOutgoing ? conn.to : conn.from));
                            
                            return (
                              <div key={index} className={`connection-item ${conn.status}`}>
                                <div className="connection-direction">
                                  {isOutgoing ? '→' : '←'}
                                </div>
                                <div className="connection-target">{targetNode?.name}</div>
                                <div className="connection-encryption">{conn.encryption}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        <div className="topology-stats">
          <div className="stat-item">
            <div className="stat-value">{nodes.length}</div>
            <div className="stat-label">Total Nodes</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{connections.length}</div>
            <div className="stat-label">Connections</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{connections.filter(c => c.status === 'secure').length}</div>
            <div className="stat-label">Secure Links</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{connections.filter(c => c.status === 'warning').length}</div>
            <div className="stat-label">Warnings</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{connections.filter(c => c.status === 'critical').length}</div>
            <div className="stat-label">Critical Issues</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NetworkTopology;