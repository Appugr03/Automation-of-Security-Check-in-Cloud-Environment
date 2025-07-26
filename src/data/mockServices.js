// Mock data for services in zero-trust architecture
export const mockServices = [
  {
    id: 'svc-001',
    name: 'Authentication Service',
    status: 'healthy',
    type: 'microservice',
    version: '2.1.4',
    uptime: 99.97,
    responseTime: 45,
    requestsPerMinute: 1250,
    errorRate: 0.02,
    lastDeployed: '2024-12-01T10:30:00Z',
    dependencies: ['database', 'redis-cache'],
    endpoints: [
      { path: '/auth/login', method: 'POST', status: 'healthy' },
      { path: '/auth/verify', method: 'GET', status: 'healthy' },
      { path: '/auth/refresh', method: 'POST', status: 'degraded' }
    ],
    securityScore: 95,
    trustLevel: 'verified'
  },
  {
    id: 'svc-002',
    name: 'API Gateway',
    status: 'degraded',
    type: 'gateway',
    version: '1.8.2',
    uptime: 99.89,
    responseTime: 120,
    requestsPerMinute: 3400,
    errorRate: 0.15,
    lastDeployed: '2024-11-28T14:15:00Z',
    dependencies: ['load-balancer', 'rate-limiter'],
    endpoints: [
      { path: '/api/v1/*', method: 'ALL', status: 'degraded' },
      { path: '/health', method: 'GET', status: 'healthy' }
    ],
    securityScore: 87,
    trustLevel: 'conditional'
  },
  {
    id: 'svc-003',
    name: 'User Management',
    status: 'healthy',
    type: 'microservice',
    version: '3.0.1',
    uptime: 99.95,
    responseTime: 65,
    requestsPerMinute: 890,
    errorRate: 0.01,
    lastDeployed: '2024-12-05T09:20:00Z',
    dependencies: ['database', 'authentication-service'],
    endpoints: [
      { path: '/users', method: 'GET', status: 'healthy' },
      { path: '/users/profile', method: 'PUT', status: 'healthy' },
      { path: '/users/permissions', method: 'GET', status: 'healthy' }
    ],
    securityScore: 98,
    trustLevel: 'verified'
  },
  {
    id: 'svc-004',
    name: 'Payment Service',
    status: 'critical',
    type: 'microservice',
    version: '1.5.3',
    uptime: 98.45,
    responseTime: 340,
    requestsPerMinute: 145,
    errorRate: 2.3,
    lastDeployed: '2024-11-20T16:45:00Z',
    dependencies: ['payment-gateway', 'fraud-detection'],
    endpoints: [
      { path: '/payments/process', method: 'POST', status: 'critical' },
      { path: '/payments/status', method: 'GET', status: 'degraded' }
    ],
    securityScore: 76,
    trustLevel: 'untrusted'
  },
  {
    id: 'svc-005',
    name: 'Notification Service',
    status: 'healthy',
    type: 'microservice',
    version: '2.3.0',
    uptime: 99.92,
    responseTime: 85,
    requestsPerMinute: 2100,
    errorRate: 0.05,
    lastDeployed: '2024-12-03T11:10:00Z',
    dependencies: ['message-queue', 'email-provider'],
    endpoints: [
      { path: '/notify/email', method: 'POST', status: 'healthy' },
      { path: '/notify/sms', method: 'POST', status: 'healthy' },
      { path: '/notify/push', method: 'POST', status: 'degraded' }
    ],
    securityScore: 92,
    trustLevel: 'verified'
  },
  {
    id: 'svc-006',
    name: 'Data Analytics',
    status: 'maintenance',
    type: 'analytics',
    version: '4.2.1',
    uptime: 99.88,
    responseTime: 210,
    requestsPerMinute: 560,
    errorRate: 0.08,
    lastDeployed: '2024-11-30T13:25:00Z',
    dependencies: ['data-warehouse', 'ml-pipeline'],
    endpoints: [
      { path: '/analytics/reports', method: 'GET', status: 'maintenance' },
      { path: '/analytics/metrics', method: 'GET', status: 'healthy' }
    ],
    securityScore: 89,
    trustLevel: 'conditional'
  }
];

export const serviceMetrics = {
  totalServices: mockServices.length,
  healthyServices: mockServices.filter(s => s.status === 'healthy').length,
  degradedServices: mockServices.filter(s => s.status === 'degraded').length,
  criticalServices: mockServices.filter(s => s.status === 'critical').length,
  averageUptime: mockServices.reduce((sum, s) => sum + s.uptime, 0) / mockServices.length,
  averageResponseTime: mockServices.reduce((sum, s) => sum + s.responseTime, 0) / mockServices.length,
  totalRequests: mockServices.reduce((sum, s) => sum + s.requestsPerMinute, 0),
  averageSecurityScore: mockServices.reduce((sum, s) => sum + s.securityScore, 0) / mockServices.length
};

export default mockServices;