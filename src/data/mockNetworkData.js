// Mock network topology and traffic data for zero-trust dashboard
export const networkNodes = [
  {
    id: 'node-001',
    name: 'Load Balancer',
    type: 'infrastructure',
    status: 'healthy',
    ip: '10.0.1.10',
    zone: 'dmz',
    connections: 45,
    trustLevel: 'verified',
    position: { x: 100, y: 50 }
  },
  {
    id: 'node-002',
    name: 'API Gateway',
    type: 'gateway',
    status: 'degraded',
    ip: '10.0.2.15',
    zone: 'public',
    connections: 78,
    trustLevel: 'conditional',
    position: { x: 200, y: 100 }
  },
  {
    id: 'node-003',
    name: 'Auth Service',
    type: 'microservice',
    status: 'healthy',
    ip: '10.0.3.20',
    zone: 'secure',
    connections: 23,
    trustLevel: 'verified',
    position: { x: 300, y: 75 }
  },
  {
    id: 'node-004',
    name: 'Database Cluster',
    type: 'database',
    status: 'healthy',
    ip: '10.0.4.25',
    zone: 'restricted',
    connections: 12,
    trustLevel: 'verified',
    position: { x: 400, y: 125 }
  },
  {
    id: 'node-005',
    name: 'File Server',
    type: 'storage',
    status: 'critical',
    ip: '10.0.5.30',
    zone: 'secure',
    connections: 67,
    trustLevel: 'untrusted',
    position: { x: 250, y: 175 }
  },
  {
    id: 'node-006',
    name: 'External API',
    type: 'external',
    status: 'unknown',
    ip: '203.0.113.45',
    zone: 'external',
    connections: 89,
    trustLevel: 'untrusted',
    position: { x: 150, y: 200 }
  }
];

export const networkConnections = [
  {
    id: 'conn-001',
    source: 'node-001',
    target: 'node-002',
    type: 'https',
    status: 'active',
    bandwidth: 1.5,
    latency: 12,
    encrypted: true,
    protocol: 'TCP'
  },
  {
    id: 'conn-002',
    source: 'node-002',
    target: 'node-003',
    type: 'api',
    status: 'active',
    bandwidth: 0.8,
    latency: 8,
    encrypted: true,
    protocol: 'HTTPS'
  },
  {
    id: 'conn-003',
    source: 'node-003',
    target: 'node-004',
    type: 'database',
    status: 'active',
    bandwidth: 2.1,
    latency: 5,
    encrypted: true,
    protocol: 'TLS'
  },
  {
    id: 'conn-004',
    source: 'node-002',
    target: 'node-005',
    type: 'file',
    status: 'degraded',
    bandwidth: 0.3,
    latency: 45,
    encrypted: false,
    protocol: 'HTTP'
  },
  {
    id: 'conn-005',
    source: 'node-001',
    target: 'node-006',
    type: 'external',
    status: 'blocked',
    bandwidth: 0,
    latency: 0,
    encrypted: false,
    protocol: 'TCP'
  }
];

export const trafficMetrics = {
  totalTraffic: 12.7, // GB per hour
  inboundTraffic: 8.3,
  outboundTraffic: 4.4,
  encryptedTraffic: 89.5, // percentage
  blockedRequests: 234,
  allowedRequests: 15678,
  topProtocols: [
    { name: 'HTTPS', percentage: 65.2, requests: 10234 },
    { name: 'HTTP', percentage: 23.1, requests: 3621 },
    { name: 'TCP', percentage: 8.7, requests: 1364 },
    { name: 'UDP', percentage: 3.0, requests: 470 }
  ],
  topSources: [
    { ip: '192.168.1.100', requests: 2345, blocked: 12 },
    { ip: '10.0.0.50', requests: 1876, blocked: 5 },
    { ip: '203.0.113.25', requests: 1234, blocked: 89 },
    { ip: '172.16.0.75', requests: 987, blocked: 3 }
  ]
};

export const securityZones = [
  {
    id: 'zone-001',
    name: 'DMZ',
    type: 'dmz',
    trustLevel: 'low',
    nodes: ['node-001'],
    policies: ['allow-web-traffic', 'deny-internal-access'],
    color: '#ff6b6b'
  },
  {
    id: 'zone-002',
    name: 'Public Zone',
    type: 'public',
    trustLevel: 'low',
    nodes: ['node-002'],
    policies: ['rate-limiting', 'ddos-protection'],
    color: '#ffd93d'
  },
  {
    id: 'zone-003',
    name: 'Secure Zone',
    type: 'secure',
    trustLevel: 'high',
    nodes: ['node-003', 'node-005'],
    policies: ['mutual-tls', 'zero-trust-verification'],
    color: '#6bcf7f'
  },
  {
    id: 'zone-004',
    name: 'Restricted Zone',
    type: 'restricted',
    trustLevel: 'high',
    nodes: ['node-004'],
    policies: ['db-encryption', 'access-logging', 'privilege-required'],
    color: '#4ecdc4'
  },
  {
    id: 'zone-005',
    name: 'External',
    type: 'external',
    trustLevel: 'none',
    nodes: ['node-006'],
    policies: ['block-by-default', 'threat-scanning'],
    color: '#ff4757'
  }
];

export const networkEvents = [
  {
    id: 'net-001',
    timestamp: new Date(Date.now() - 120000),
    type: 'connection',
    event: 'New connection established',
    source: '192.168.1.55',
    target: 'node-002',
    action: 'allowed'
  },
  {
    id: 'net-002',
    timestamp: new Date(Date.now() - 300000),
    type: 'traffic',
    event: 'High bandwidth usage detected',
    source: 'node-005',
    target: 'node-004',
    action: 'monitored'
  },
  {
    id: 'net-003',
    timestamp: new Date(Date.now() - 450000),
    type: 'security',
    event: 'Suspicious traffic pattern',
    source: '203.0.113.45',
    target: 'node-001',
    action: 'blocked'
  }
];

export default {
  networkNodes,
  networkConnections,
  trafficMetrics,
  securityZones,
  networkEvents
};