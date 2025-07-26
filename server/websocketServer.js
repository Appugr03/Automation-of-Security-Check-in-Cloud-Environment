// server/websocketServer.js
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

class WebSocketServer {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.clients = new Map();
    this.dataGenerators = new Map();
    this.currentData = {
      alerts: [],
      metrics: {},
      networkStatus: {},
      threats: []
    };
    
    this.initialize();
  }

  initialize() {
    this.wss.on('connection', (ws, req) => {
      const clientId = uuidv4();
      const clientInfo = {
        id: clientId,
        ws: ws,
        ip: req.socket.remoteAddress,
        connectedAt: new Date(),
        subscriptions: new Set(),
        lastPing: Date.now()
      };

      this.clients.set(clientId, clientInfo);
      console.log(`📱 Client connected: ${clientId} (${this.clients.size} total)`);

      // Send initial data
      this.sendToClient(clientId, {
        type: 'connection_established',
        clientId: clientId,
        timestamp: new Date().toISOString(),
        initialData: this.currentData
      });

      // Handle messages
      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message);
          this.handleClientMessage(clientId, data);
        } catch (error) {
          console.error('❌ Invalid message from client:', error);
        }
      });

      // Handle client disconnect
      ws.on('close', () => {
        this.clients.delete(clientId);
        console.log(`📱 Client disconnected: ${clientId} (${this.clients.size} total)`);
      });

      // Handle ping/pong for connection health
      ws.on('pong', () => {
        if (this.clients.has(clientId)) {
          this.clients.get(clientId).lastPing = Date.now();
        }
      });

      // Handle errors
      ws.on('error', (error) => {
        console.error(`❌ WebSocket error for client ${clientId}:`, error);
        this.clients.delete(clientId);
      });
    });

    // Cleanup disconnected clients every 30 seconds
    setInterval(() => {
      this.cleanupStaleConnections();
    }, 30000);
  }

  handleClientMessage(clientId, message) {
    const client = this.clients.get(clientId);
    if (!client) return;

    switch (message.type) {
      case 'subscribe':
        message.channels?.forEach(channel => {
          client.subscriptions.add(channel);
        });
        console.log(`📻 Client ${clientId} subscribed to: ${message.channels?.join(', ')}`);
        break;

      case 'unsubscribe':
        message.channels?.forEach(channel => {
          client.subscriptions.delete(channel);
        });
        break;

      case 'ping':
        this.sendToClient(clientId, { type: 'pong', timestamp: new Date().toISOString() });
        break;

      case 'request_data':
        this.sendToClient(clientId, {
          type: 'data_snapshot',
          data: this.currentData,
          timestamp: new Date().toISOString()
        });
        break;

      default:
        console.log(`❓ Unknown message type: ${message.type}`);
    }
  }

  sendToClient(clientId, data) {
    const client = this.clients.get(clientId);
    if (client && client.ws.readyState === WebSocket.OPEN) {
      try {
        client.ws.send(JSON.stringify(data));
      } catch (error) {
        console.error(`❌ Error sending to client ${clientId}:`, error);
        this.clients.delete(clientId);
      }
    }
  }

  broadcast(data, channel = null) {
    const message = JSON.stringify(data);
    let sent = 0;

    this.clients.forEach((client, clientId) => {
      if (client.ws.readyState === WebSocket.OPEN) {
        // If channel is specified, only send to subscribed clients
        if (channel && !client.subscriptions.has(channel)) {
          return;
        }

        try {
          client.ws.send(message);
          sent++;
        } catch (error) {
          console.error(`❌ Broadcast error to client ${clientId}:`, error);
          this.clients.delete(clientId);
        }
      }
    });

    return sent;
  }

  cleanupStaleConnections() {
    const now = Date.now();
    const staleThreshold = 60000; // 1 minute

    this.clients.forEach((client, clientId) => {
      if (now - client.lastPing > staleThreshold) {
        console.log(`🧹 Cleaning up stale connection: ${clientId}`);
        client.ws.terminate();
        this.clients.delete(clientId);
      } else {
        // Send ping to active connections
        if (client.ws.readyState === WebSocket.OPEN) {
          client.ws.ping();
        }
      }
    });
  }

  startDataGeneration() {
    // Generate alerts every 5-15 seconds
    this.dataGenerators.set('alerts', setInterval(() => {
      this.generateAlert();
    }, Math.random() * 10000 + 5000));

    // Update metrics every 2 seconds
    this.dataGenerators.set('metrics', setInterval(() => {
      this.updateMetrics();
    }, 2000));

    // Update network status every 3 seconds
    this.dataGenerators.set('network', setInterval(() => {
      this.updateNetworkStatus();
    }, 3000));

    // Generate threat data every 10 seconds
    this.dataGenerators.set('threats', setInterval(() => {
      this.generateThreatData();
    }, 10000));

    console.log('📊 Real-time data generation started');
  }

  generateAlert() {
    const alertTypes = [
      { type: 'critical', name: 'Unauthorized Access Attempt', probability: 0.1 },
      { type: 'high', name: 'Suspicious Network Activity', probability: 0.2 },
      { type: 'medium', name: 'Policy Violation', probability: 0.4 },
      { type: 'low', name: 'Unusual Login Pattern', probability: 0.3 }
    ];

    const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    
    if (Math.random() < randomAlert.probability) {
      const alert = {
        id: uuidv4(),
        type: randomAlert.type,
        title: randomAlert.name,
        description: this.generateAlertDescription(randomAlert.type),
        timestamp: new Date().toISOString(),
        source: this.generateRandomSource(),
        resolved: false,
        severity: this.getSeverityScore(randomAlert.type)
      };

      this.currentData.alerts.unshift(alert);
      
      // Keep only last 50 alerts
      if (this.currentData.alerts.length > 50) {
        this.currentData.alerts = this.currentData.alerts.slice(0, 50);
      }

      this.broadcast({
        type: 'new_alert',
        alert: alert,
        timestamp: new Date().toISOString()
      }, 'alerts');

      console.log(`🚨 Generated ${alert.type} alert: ${alert.title}`);
    }
  }

  generateAlertDescription(type) {
    const descriptions = {
      critical: [
        'Multiple failed authentication attempts detected from suspicious IP',
        'Potential data exfiltration attempt blocked',
        'Privilege escalation attempt detected'
      ],
      high: [
        'Unusual network traffic pattern detected',
        'Unauthorized service access attempt',
        'Suspicious file access detected'
      ],
      medium: [
        'User accessing resources outside normal hours',
        'Unexpected geographic login location',
        'Service configuration change detected'
      ],
      low: [
        'New device authentication',
        'Password change notification',
        'Regular security scan completed'
      ]
    };

    const typeDescriptions = descriptions[type] || descriptions.medium;
    return typeDescriptions[Math.floor(Math.random() * typeDescriptions.length)];
  }

  generateRandomSource() {
    const sources = [
      'firewall-01', 'ids-sensor-02', 'auth-service', 'network-monitor',
      'endpoint-agent', 'api-gateway', 'load-balancer', 'vpn-gateway'
    ];
    return sources[Math.floor(Math.random() * sources.length)];
  }

  getSeverityScore(type) {
    const scores = { critical: 90, high: 70, medium: 50, low: 30 };
    return scores[type] + Math.floor(Math.random() * 10);
  }

  updateMetrics() {
    const metrics = {
      threatsBlocked: this.currentData.metrics.threatsBlocked || 1247,
      activeConnections: 150 + Math.floor(Math.random() * 50),
      cpuUsage: Math.min(100, Math.max(0, (this.currentData.metrics.cpuUsage || 45) + (Math.random() - 0.5) * 10)),
      memoryUsage: Math.min(100, Math.max(0, (this.currentData.metrics.memoryUsage || 62) + (Math.random() - 0.5) * 8)),
      networkThroughput: Math.max(0, 850 + Math.floor((Math.random() - 0.5) * 200)),
      responseTime: Math.max(10, 45 + Math.floor((Math.random() - 0.5) * 20)),
      timestamp: new Date().toISOString()
    };

    // Increment threats blocked occasionally
    if (Math.random() < 0.1) {
      metrics.threatsBlocked++;
    }

    this.currentData.metrics = metrics;

    this.broadcast({
      type: 'metrics_update',
      metrics: metrics
    }, 'metrics');
  }

  updateNetworkStatus() {
    const services = ['auth-service', 'api-gateway', 'database', 'cache', 'monitoring'];
    const statuses = ['healthy', 'warning', 'critical'];
    
    const networkStatus = {
      services: services.map(service => ({
        name: service,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        responseTime: Math.floor(Math.random() * 100) + 10,
        uptime: 99.9 - Math.random() * 0.5
      })),
      totalNodes: 24 + Math.floor(Math.random() * 6),
      activeNodes: 22 + Math.floor(Math.random() * 4),
      timestamp: new Date().toISOString()
    };

    this.currentData.networkStatus = networkStatus;

    this.broadcast({
      type: 'network_update',
      networkStatus: networkStatus
    }, 'network');
  }

  generateThreatData() {
    const threats = [];
    const threatCount = Math.floor(Math.random() * 5) + 1;

    for (let i = 0; i < threatCount; i++) {
      threats.push({
        id: uuidv4(),
        type: ['malware', 'phishing', 'brute_force', 'ddos'][Math.floor(Math.random() * 4)],
        source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        target: ['web-server', 'database', 'auth-service', 'api-gateway'][Math.floor(Math.random() * 4)],
        severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
        timestamp: new Date().toISOString(),
        blocked: Math.random() > 0.2
      });
    }

    this.currentData.threats = threats;

    this.broadcast({
      type: 'threat_update',
      threats: threats
    }, 'threats');
  }

  // Getters for HTTP API
  getCurrentAlerts() {
    return this.currentData.alerts;
  }

  getCurrentMetrics() {
    return this.currentData.metrics;
  }

  getNetworkStatus() {
    return this.currentData.networkStatus;
  }

  getConnectionCount() {
    return this.clients.size;
  }

  stop() {
    console.log('🛑 Stopping WebSocket server...');
    
    // Clear all data generators
    this.dataGenerators.forEach((interval, name) => {
      clearInterval(interval);
      console.log(`⏹️ Stopped ${name} data generator`);
    });
    this.dataGenerators.clear();

    // Close all client connections
    this.clients.forEach((client, clientId) => {
      client.ws.close();
    });
    this.clients.clear();

    // Close WebSocket server
    this.wss.close(() => {
      console.log('✅ WebSocket server closed');
    });
  }
}

module.exports = WebSocketServer;