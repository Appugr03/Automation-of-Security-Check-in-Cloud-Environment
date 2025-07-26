// data/realtimeDataGenerator.js - Generates live data for testing
export const generateSecurityData = () => ({
  threatLevel: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)],
  activeThreats: Math.floor(Math.random() * 10),
  blockedAttempts: Math.floor(Math.random() * 100),
  timestamp: new Date().toISOString()
});

export const generateAlert = () => ({
  id: Date.now(),
  title: `Security Alert ${Math.floor(Math.random() * 1000)}`,
  severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
  description: 'Suspicious activity detected',
  timestamp: new Date().toISOString(),
  source: `Node-${Math.floor(Math.random() * 10)}`
});

export const generateNetworkData = () => {
  const nodes = [];
  for(let i = 0; i < 5; i++) {
    nodes.push({
      id: i,
      name: `Node ${i}`,
      status: Math.random() > 0.8 ? 'warning' : 'healthy',
      connections: Math.floor(Math.random() * 3) + 1
    });
  }
  return nodes;
};

export const generateServiceData = () => [
  {
    id: 1,
    name: 'Authentication Service',
    status: Math.random() > 0.9 ? 'down' : 'running',
    uptime: Math.floor(Math.random() * 100) + '%'
  },
  {
    id: 2,
    name: 'Firewall Service',
    status: Math.random() > 0.95 ? 'warning' : 'running',
    uptime: Math.floor(Math.random() * 100) + '%'
  }
];