// Mock security metrics and data for zero-trust dashboard
export const securityMetrics = {
  overallSecurityScore: 87,
  threatLevel: 'medium',
  activeThreats: 23,
  blockedAttacks: 1456,
  vulnerabilities: {
    critical: 2,
    high: 8,
    medium: 15,
    low: 32
  },
  compliance: {
    score: 94,
    frameworks: ['SOC2', 'ISO27001', 'PCI-DSS'],
    lastAudit: '2024-11-15T00:00:00Z'
  },
  accessControl: {
    totalUsers: 1248,
    activeUsers: 892,
    privilegedUsers: 45,
    failedLogins: 67,
    mfaEnabled: 98.5
  },
  networkSecurity: {
    firewallRules: 234,
    blockedIPs: 1879,
    dataEncrypted: 99.2,
    vpnConnections: 156
  }
};

export const securityTrends = [
  { date: '2024-12-07', threats: 18, attacks: 1200, score: 89 },
  { date: '2024-12-08', threats: 22, attacks: 1350, score: 85 },
  { date: '2024-12-09', threats: 15, attacks: 1100, score: 91 },
  { date: '2024-12-10', threats: 28, attacks: 1600, score: 82 },
  { date: '2024-12-11', threats: 19, attacks: 1250, score: 88 },
  { date: '2024-12-12', threats: 25, attacks: 1450, score: 84 },
  { date: '2024-12-13', threats: 23, attacks: 1456, score: 87 }
];

export const riskAssessment = [
  {
    id: 'risk-001',
    category: 'Access Control',
    risk: 'Privileged account without MFA',
    severity: 'high',
    probability: 0.7,
    impact: 0.9,
    riskScore: 63,
    mitigation: 'Enforce MFA for all privileged accounts',
    owner: 'Security Team'
  },
  {
    id: 'risk-002',
    category: 'Network Security',
    risk: 'Outdated firewall rules',
    severity: 'medium',
    probability: 0.4,
    impact: 0.6,
    riskScore: 24,
    mitigation: 'Review and update firewall rules quarterly',
    owner: 'Network Team'
  },
  {
    id: 'risk-003',
    category: 'Data Protection',
    risk: 'Unencrypted data in transit',
    severity: 'critical',
    probability: 0.3,
    impact: 0.95,
    riskScore: 29,
    mitigation: 'Implement TLS 1.3 for all communications',
    owner: 'DevOps Team'
  },
  {
    id: 'risk-004',
    category: 'Compliance',
    risk: 'Missing security controls documentation',
    severity: 'low',
    probability: 0.8,
    impact: 0.3,
    riskScore: 24,
    mitigation: 'Complete security documentation audit',
    owner: 'Compliance Team'
  }
];

export const securityEvents = [
  {
    id: 'evt-001',
    timestamp: new Date(Date.now() - 300000),
    type: 'Authentication',
    event: 'Multiple failed login attempts',
    source: '192.168.1.100',
    user: 'admin@company.com',
    severity: 'high',
    status: 'investigating'
  },
  {
    id: 'evt-002',
    timestamp: new Date(Date.now() - 600000),
    type: 'Network',
    event: 'Unusual outbound traffic detected',
    source: 'srv-web-01',
    user: 'system',
    severity: 'medium',
    status: 'resolved'
  },
  {
    id: 'evt-003',
    timestamp: new Date(Date.now() - 900000),
    type: 'Access Control',
    event: 'Privilege escalation attempt',
    source: '10.0.0.45',
    user: 'jdoe@company.com',
    severity: 'critical',
    status: 'blocked'
  },
  {
    id: 'evt-004',
    timestamp: new Date(Date.now() - 1200000),
    type: 'Malware',
    event: 'Suspicious file upload detected',
    source: 'app-server-03',
    user: 'guest_user',
    severity: 'high',
    status: 'quarantined'
  }
];

export const trustScores = {
  devices: [
    { id: 'dev-001', name: 'MacBook Pro - John Doe', score: 95, status: 'trusted' },
    { id: 'dev-002', name: 'iPhone 15 - Jane Smith', score: 88, status: 'trusted' },
    { id: 'dev-003', name: 'Dell Laptop - Guest User', score: 45, status: 'untrusted' },
    { id: 'dev-004', name: 'Android Phone - Bob Wilson', score: 72, status: 'conditional' }
  ],
  applications: [
    { id: 'app-001', name: 'CRM System', score: 92, status: 'trusted' },
    { id: 'app-002', name: 'File Server', score: 67, status: 'conditional' },
    { id: 'app-003', name: 'Legacy System', score: 34, status: 'untrusted' }
  ],
  users: [
    { id: 'usr-001', name: 'John Doe', score: 98, role: 'Admin', status: 'trusted' },
    { id: 'usr-002', name: 'Jane Smith', score: 85, role: 'User', status: 'trusted' },
    { id: 'usr-003', name: 'Guest User', score: 23, role: 'Guest', status: 'untrusted' }
  ]
};

export default {
  securityMetrics,
  securityTrends,
  riskAssessment,
  securityEvents,
  trustScores
};