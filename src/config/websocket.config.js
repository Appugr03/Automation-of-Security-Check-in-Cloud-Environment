// src/config/websocket.config.js - WebSocket Configuration
const WEBSOCKET_CONFIG = {
  // Connection settings
  connection: {
    // Default WebSocket URL - can be overridden by environment variable
    url: process.env.REACT_APP_WEBSOCKET_URL || 'ws://localhost:8080',
    
    // Connection timeout in milliseconds
    timeout: 10000,
    
    // Heartbeat/ping interval in milliseconds
    heartbeatInterval: 30000,
    
    // Maximum number of reconnection attempts
    maxReconnectAttempts: 5,
    
    // Reconnection delay settings (exponential backoff)
    reconnectDelay: {
      initial: 1000,      // 1 second
      max: 30000,         // 30 seconds
      multiplier: 2       // Double the delay each attempt
    },
    
    // Auto-reconnect on connection loss
    autoReconnect: true,
    
    // Close codes that should trigger reconnection
    reconnectOnCloseCodes: [1006, 1011, 1012, 1013, 1014]
  },

  // Message types and their configurations
  messageTypes: {
    // Authentication messages
    auth: {
      login: 'auth_login',
      logout: 'auth_logout',
      token_refresh: 'auth_token_refresh'
    },
    
    // Data subscription messages
    subscription: {
      subscribe: 'subscribe',
      unsubscribe: 'unsubscribe',
      subscribe_all: 'subscribe_all'
    },
    
    // Real-time data types
    data: {
      security_metrics: 'security_metrics',
      network_data: 'network_data',
      service_status: 'service_status',
      alert: 'alert',
      threat_map: 'threat_map',
      access_logs: 'access_logs'
    },
    
    // Control messages
    control: {
      ping: 'ping',
      pong: 'pong',
      connection_established: 'connection_established',
      error: 'error'
    }
  },

  // Data update intervals (in milliseconds)
  updateIntervals: {
    security_metrics: 3000,    // 3 seconds
    network_data: 2000,        // 2 seconds
    service_status: 5000,      // 5 seconds
    threat_map: 10000,         // 10 seconds
    access_logs: 1000,         // 1 second
    alerts: {
      min: 10000,              // Minimum 10 seconds
      max: 30000               // Maximum 30 seconds
    }
  },

  // Alert severity levels
  alertSeverity: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical'
  },

  // Service status levels
  serviceStatus: {
    HEALTHY: 'healthy',
    WARNING: 'warning',
    ERROR: 'error',
    UNKNOWN: 'unknown'
  },

  // Connection status types
  connectionStatus: {
    CONNECTING: 'Connecting',
    CONNECTED: 'Connected',
    RECONNECTING: 'Reconnecting',
    DISCONNECTED: 'Disconnected',
    ERROR: 'Error',
    FAILED: 'Failed'
  },

  // Environment-specific configurations
  environments: {
    development: {
      url: 'ws://localhost:8080',
      debug: true,
      logLevel: 'debug'
    },
    staging: {
      url: 'wss://staging-api.yourdomain.com/ws',
      debug: false,
      logLevel: 'info'
    },
    production: {
      url: 'wss://api.yourdomain.com/ws',
      debug: false,
      logLevel: 'error'
    }
  },

  // Security settings
  security: {
    // Enable/disable SSL certificate validation
    validateSSL: process.env.NODE_ENV === 'production',
    
    // Allowed origins for CORS
    allowedOrigins: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://yourdomain.com',
      'https://www.yourdomain.com'
    ],
    
    // Authentication token settings
    auth: {
      tokenHeader: 'Authorization',
      tokenType: 'Bearer',
      refreshThreshold: 300000 // 5 minutes before expiry
    }
  },

  // Logging configuration
  logging: {
    enabled: process.env.NODE_ENV !== 'production',
    level: process.env.LOG_LEVEL || 'info',
    prefix: '[WebSocket]',
    colors: {
      info: '#3b82f6',
      warn: '#f59e0b',
      error: '#ef4444',
      success: '#10b981'
    }
  },

  // Performance settings
  performance: {
    // Maximum message queue size
    maxQueueSize: 1000,
    
    // Buffer size for incoming messages
    bufferSize: 65536,
    
    // Enable message compression
    compression: true,
    
    // Batch multiple updates together
    batchUpdates: true,
    batchDelay: 100 // milliseconds
  },

  // Retry policies for different operations
  retryPolicies: {
    connection: {
      maxRetries: 5,
      delay: 1000,
      backoff: 'exponential'
    },
    authentication: {
      maxRetries: 3,
      delay: 2000,
      backoff: 'linear'
    },
    dataRequest: {
      maxRetries: 2,
      delay: 500,
      backoff: 'fixed'
    }
  }
};

// Helper functions for configuration
export const getWebSocketURL = () => {
  const env = process.env.NODE_ENV || 'development';
  return WEBSOCKET_CONFIG.environments[env]?.url || WEBSOCKET_CONFIG.connection.url;
};

export const getReconnectDelay = (attempt) => {
  const { initial, max, multiplier } = WEBSOCKET_CONFIG.connection.reconnectDelay;
  const delay = Math.min(initial * Math.pow(multiplier, attempt), max);
  return delay;
};

export const shouldReconnect = (closeCode) => {
  return WEBSOCKET_CONFIG.connection.reconnectOnCloseCodes.includes(closeCode);
};

export const getUpdateInterval = (dataType) => {
  return WEBSOCKET_CONFIG.updateIntervals[dataType] || 5000;
};

export const isValidMessageType = (type) => {
  const allTypes = [
    ...Object.values(WEBSOCKET_CONFIG.messageTypes.auth),
    ...Object.values(WEBSOCKET_CONFIG.messageTypes.subscription),
    ...Object.values(WEBSOCKET_CONFIG.messageTypes.data),
    ...Object.values(WEBSOCKET_CONFIG.messageTypes.control)
  ];
  return allTypes.includes(type);
};

export const getLogLevel = () => {
  const env = process.env.NODE_ENV || 'development';
  return WEBSOCKET_CONFIG.environments[env]?.logLevel || 'info';
};

export const isDebugEnabled = () => {
  const env = process.env.NODE_ENV || 'development';
  return WEBSOCKET_CONFIG.environments[env]?.debug || false;
};

// Export the main configuration
export default WEBSOCKET_CONFIG;

// Example usage in components:
/*
import WEBSOCKET_CONFIG, { 
  getWebSocketURL, 
  getReconnectDelay, 
  shouldReconnect 
} from '../config/websocket.config.js';

// Use in WebSocket hook
const wsUrl = getWebSocketURL();
const reconnectDelay = getReconnectDelay(attemptCount);
const shouldAttemptReconnect = shouldReconnect(event.code);

// Access message types
const messageType = WEBSOCKET_CONFIG.messageTypes.data.security_metrics;

// Check intervals
const updateInterval = WEBSOCKET_CONFIG.updateIntervals.network_data;
*/