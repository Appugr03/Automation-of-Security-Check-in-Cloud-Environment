// Mock alerts data for zero-trust security dashboard
export const mockAlerts = [
  {
    id: 'alert-001',
    title: 'Critical Authentication Failure',
    description: 'Multiple failed login attempts detected from suspicious IP address',
    severity: 'critical',
    category: 'authentication',
    timestamp: new Date(Date.now() - 2 * 60000),
    source: 'Authentication Service',
    sourceId: 'svc-001',
    sourceIP: '45.76.123.89',
    user: 'admin@company.com',
    status: 'active',
    priority: 1,
    assignedTo: 'security-team',
    tags: ['brute-force', 'admin-account'],
    details: {
      attempts: 25,
      timeWindow: '5 minutes',
      location: 'Unknown',
      device: 'Unknown'
    }
  },
  {
    id: 'alert-002',
    title: 'Malware Detected in File Upload',
    description: 'Suspicious file detected during upload process, quarantined automatically',
    severity: 'high',
    category: 'malware',
    timestamp: new Date(Date.now() - 8 * 60000),
    source: 'File Security Scanner',
    sourceId: 'svc-007',
    sourceIP: '192.168.1.150',
    user: 'jsmith@company.com',
    status: 'resolved',
    priority: 2,
    assignedTo: 'incident-response',
    tags: ['malware', 'file-upload', 'quarantined'],
    details: {
      fileName: 'document.exe',
      fileSize: '2.4 MB',
      malwareType: 'Trojan.Generic',
      scanEngine: 'ClamAV'
    }
  },
  {
    id: 'alert-003',
    title: 'Unusual Network Traffic Pattern',
    description: 'Abnormal outbound traffic volume detected from internal server',
    severity: 'medium',
    category: 'network',
    timestamp: new Date(Date.now() - 15 * 60000),
    source: 'Network Monitor',
    sourceId: 'net-001',
    sourceIP: '10.0.3.45',
    user: 'system',
    status: 'investigating',
    priority: 3,
    assignedTo: 'network-team',
    tags: ['data-exfiltration', 'bandwidth-spike'],
    details: {
      trafficVolume: '500 MB in 10 minutes',
      destination: 'external',
      protocol: 'HTTPS',
      ports: [443, 8080]
    }
  },
  {
    id: 'alert-004',
    title: 'SSL Certificate Expiring Soon',
    description: 'SSL certificate for main domain expires in 7 days',
    severity: 'low',
    category: 'certificate',
    timestamp: new Date(Date.now() - 30 * 60000),
    source: 'Certificate Manager',
    sourceId: 'cert-001',
    sourceIP: null,
    user: null,
    status: 'acknowledged',
    priority: 4,
    assignedTo: 'devops-team',
    tags: ['ssl-certificate', 'expiration', 'maintenance'],
    details: {
      domain: 'app.company.com',
      expirationDate: '2024-12-20',
      daysRemaining: 7,
      certificateType: 'Extended Validation'
    }
  },
  {
    id: 'alert-005',
    title: 'Unauthorized API Access Attempt',
    description: 'API endpoint accessed without proper authentication token',
    severity: 'high',
    category: 'access-control',
    timestamp: new Date(Date.now() - 45 * 60000),
    source: 'API Gateway',
    sourceId: 'svc-002',
    sourceIP: '198.51.100.42',
    user: 'anonymous',
    status: 'active',
    priority: 2,
    assignedTo: 'security-team',
    tags: ['unauthorized-access', 'api-security'],
    details: {
      endpoint: '/api/v1/sensitive-data',
      method: 'GET',
      attempts: 12,
      userAgent: 'Python/requests'
    }
  },
  {
    id: 'alert-006',
    title: 'Database Connection Anomaly',
    description: 'Unusual database connection pattern detected from application server',
    severity: 'medium',
    category: 'database',
    timestamp: new Date(Date.now() - 60 * 60000),
    source: 'Database Monitor',
    sourceId: 'db-001',
    sourceIP: '10.0.4.25',
    user: 'app-service',
    status: 'resolved',
    priority: 3,
    assignedTo: 'database-team',
    tags: ['database-security', 'connection-anomaly'],
    details: {
      connections: 150,
      normalRange: '20-50',
      queries: 'SELECT statements',
      duration: '15 minutes'
    }
  },
  {
    id: 'alert-007',
    title: 'Privilege Escalation Attempt',
    description: 'User attempted to access resources beyond their permission level',
    severity: 'critical',
    category: 'privilege-escalation',
    timestamp: new Date(Date.now() - 90 * 60000),
    source: 'Access Control System',
    sourceId: 'acs-001',
    sourceIP: '192.168.1.75',
    user: 'rjohnson@company.com',
    status: 'blocked',
    priority: 1,
    assignedTo: 'security-team',
    tags: ['privilege-escalation', 'access-violation'],
    details: {
      attemptedResource: '/admin/users',
      userRole: 'standard-user',
      requiredRole: 'administrator',
      action: 'blocked-automatically'
    }
  }
];

export const alertMetrics = {
  total: mockAlerts.length,
  active: mockAlerts.filter(a => a.status === 'active').length,
  resolved: mockAlerts.filter(a => a.status === 'resolved').length,
  investigating: mockAlerts.filter(a => a.status === 'investigating').length,
  acknowledged: mockAlerts.filter(a => a.status === 'acknowledged').length,
  blocked: mockAlerts.filter(a => a.status === 'blocked').length,
  bySeverity: {
    critical: mockAlerts.filter(a => a.severity === 'critical').length,
    high: mockAlerts.filter(a => a.severity === 'high').length,
    medium: mockAlerts.filter(a => a.severity === 'medium').length,
    low: mockAlerts.filter(a => a.severity === 'low').length
  },
  byCategory: {
    authentication: mockAlerts.filter(a => a.category === 'authentication').length,
    malware: mockAlerts.filter(a => a.category === 'malware').length,
    network: mockAlerts.filter(a => a.category === 'network').length,
    'access-control': mockAlerts.filter(a => a.category === 'access-control').length,
    database: mockAlerts.filter(a => a.category === 'database').length,
    certificate: mockAlerts.filter(a => a.category === 'certificate').length,
    'privilege-escalation': mockAlerts.filter(a => a.category === 'privilege-escalation').length
  }
};

export const alertTrends = [
  { date: '2024-12-07', critical: 1, high: 3, medium: 5, low: 2 },
  { date: '2024-12-08', critical: 2, high: 4, medium: 3, low: 4 },
  { date: '2024-12-09', critical: 0, high: 2, medium: 6, low: 1 },
  { date: '2024-12-10', critical: 3, high: 5, medium: 4, low: 3 },
  { date: '2024-12-11', critical: 1, high: 3, medium: 7, low: 2 },
  { date: '2024-12-12', critical: 2, high: 2, medium: 5, low: 5 },
  { date: '2024-12-13', critical: 2, high: 2, medium: 2, low: 1 }
];

export default {
  mockAlerts,
  alertMetrics,
  alertTrends
};