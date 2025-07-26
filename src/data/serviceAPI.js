// serviceAPI.js - Zero Trust Dashboard Service API
import { mockServices } from './mockServices.js';
import { mockSecurityData } from './mockSecurityData.js';
import { mockNetworkData } from './mockNetworkData.js';
import { mockAlerts } from './mockAlerts.js';

// API Configuration
const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000
};

// Service status types
export const SERVICE_STATUS = {
  HEALTHY: 'healthy',
  WARNING: 'warning',
  CRITICAL: 'critical',
  UNKNOWN: 'unknown'
};

// API Response wrapper
class APIResponse {
  constructor(data, status = 200, message = 'Success') {
    this.data = data;
    this.status = status;
    this.message = message;
    this.timestamp = new Date().toISOString();
  }
}

// API Error wrapper
class APIError extends Error {
  constructor(message, status = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.code = code;
    this.timestamp = new Date().toISOString();
  }
}

// Utility functions
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const simulateNetworkDelay = () => delay(Math.random() * 500 + 100);

const randomFailure = (failureRate = 0.02) => Math.random() < failureRate;

// HTTP Client simulation
class HTTPClient {
  static async request(endpoint, options = {}) {
    await simulateNetworkDelay();
    
    if (randomFailure()) {
      throw new APIError('Network request failed', 500, 'NETWORK_ERROR');
    }
    
    // Simulate different response scenarios
    return { status: 200, data: null };
  }
}

// Services API
export const servicesAPI = {
  // Get all services
  async getAllServices() {
    try {
      // In production, this would be: await HTTPClient.request('/services')
      return new APIResponse(mockServices);
    } catch (error) {
      throw new APIError('Failed to fetch services', 500, 'SERVICES_FETCH_ERROR');
    }
  },

  // Get service by ID
  async getServiceById(serviceId) {
    try {
      const service = mockServices.find(s => s.id === serviceId);
      if (!service) {
        throw new APIError(`Service with ID ${serviceId} not found`, 404, 'SERVICE_NOT_FOUND');
      }
      return new APIResponse(service);
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError('Failed to fetch service', 500, 'SERVICE_FETCH_ERROR');
    }
  },

  // Update service configuration
  async updateService(serviceId, updates) {
    try {
      const serviceIndex = mockServices.findIndex(s => s.id === serviceId);
      if (serviceIndex === -1) {
        throw new APIError(`Service with ID ${serviceId} not found`, 404, 'SERVICE_NOT_FOUND');
      }
      
      mockServices[serviceIndex] = {
        ...mockServices[serviceIndex],
        ...updates,
        lastUpdated: new Date().toISOString()
      };
      
      return new APIResponse(mockServices[serviceIndex]);
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError('Failed to update service', 500, 'SERVICE_UPDATE_ERROR');
    }
  },

  // Delete service
  async deleteService(serviceId) {
    try {
      const serviceIndex = mockServices.findIndex(s => s.id === serviceId);
      if (serviceIndex === -1) {
        throw new APIError(`Service with ID ${serviceId} not found`, 404, 'SERVICE_NOT_FOUND');
      }
      
      const deletedService = mockServices.splice(serviceIndex, 1)[0];
      return new APIResponse(deletedService);
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError('Failed to delete service', 500, 'SERVICE_DELETE_ERROR');
    }
  },

  // Get service health status
  async getServiceHealth(serviceId) {
    try {
      const service = mockServices.find(s => s.id === serviceId);
      if (!service) {
        throw new APIError(`Service with ID ${serviceId} not found`, 404, 'SERVICE_NOT_FOUND');
      }
      
      return new APIResponse({
        serviceId,
        status: service.status,
        uptime: service.uptime,
        responseTime: service.responseTime,
        errorRate: service.errorRate,
        lastHealthCheck: new Date().toISOString()
      });
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError('Failed to fetch service health', 500, 'HEALTH_CHECK_ERROR');
    }
  },

  // Get service dependencies
  async getServiceDependencies(serviceId) {
    try {
      const service = mockServices.find(s => s.id === serviceId);
      if (!service) {
        throw new APIError(`Service with ID ${serviceId} not found`, 404, 'SERVICE_NOT_FOUND');
      }
      
      return new APIResponse({
        serviceId,
        dependencies: service.dependencies || [],
        dependents: mockServices.filter(s => 
          s.dependencies?.includes(serviceId)
        ).map(s => s.id)
      });
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError('Failed to fetch service dependencies', 500, 'DEPENDENCIES_FETCH_ERROR');
    }
  }
};

// Security API
export const securityAPI = {
  // Get security metrics
  async getSecurityMetrics() {
    try {
      return new APIResponse(mockSecurityData);
    } catch (error) {
      throw new APIError('Failed to fetch security metrics', 500, 'SECURITY_METRICS_ERROR');
    }
  },

  // Get threat data
  async getThreatData(timeRange = '24h') {
    try {
      const threats = mockSecurityData.threats || [];
      const filteredThreats = threats.filter(threat => {
        const threatTime = new Date(threat.timestamp);
        const cutoffTime = new Date();
        
        switch (timeRange) {
          case '1h':
            cutoffTime.setHours(cutoffTime.getHours() - 1);
            break;
          case '24h':
            cutoffTime.setHours(cutoffTime.getHours() - 24);
            break;
          case '7d':
            cutoffTime.setDate(cutoffTime.getDate() - 7);
            break;
          default:
            cutoffTime.setHours(cutoffTime.getHours() - 24);
        }
        
        return threatTime >= cutoffTime;
      });
      
      return new APIResponse({
        threats: filteredThreats,
        timeRange,
        totalCount: filteredThreats.length
      });
    } catch (error) {
      throw new APIError('Failed to fetch threat data', 500, 'THREAT_DATA_ERROR');
    }
  },

  // Update security policy
  async updateSecurityPolicy(policyId, policy) {
    try {
      await simulateNetworkDelay();
      
      return new APIResponse({
        policyId,
        policy,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      throw new APIError('Failed to update security policy', 500, 'POLICY_UPDATE_ERROR');
    }
  }
};

// Network API
export const networkAPI = {
  // Get network topology
  async getNetworkTopology() {
    try {
      return new APIResponse(mockNetworkData);
    } catch (error) {
      throw new APIError('Failed to fetch network topology', 500, 'NETWORK_TOPOLOGY_ERROR');
    }
  },

  // Get network connections
  async getNetworkConnections(serviceId) {
    try {
      const connections = mockNetworkData.connections?.filter(
        conn => conn.source === serviceId || conn.target === serviceId
      ) || [];
      
      return new APIResponse({
        serviceId,
        connections,
        totalConnections: connections.length
      });
    } catch (error) {
      throw new APIError('Failed to fetch network connections', 500, 'NETWORK_CONNECTIONS_ERROR');
    }
  },

  // Get network traffic data
  async getNetworkTraffic(timeRange = '1h') {
    try {
      const traffic = mockNetworkData.traffic || [];
      
      return new APIResponse({
        traffic,
        timeRange,
        summary: {
          totalRequests: traffic.reduce((sum, t) => sum + t.requests, 0),
          totalBytes: traffic.reduce((sum, t) => sum + t.bytes, 0),
          averageLatency: traffic.reduce((sum, t) => sum + t.latency, 0) / traffic.length
        }
      });
    } catch (error) {
      throw new APIError('Failed to fetch network traffic', 500, 'NETWORK_TRAFFIC_ERROR');
    }
  }
};

// Alerts API
export const alertsAPI = {
  // Get all alerts
  async getAlerts(filters = {}) {
    try {
      let alerts = [...mockAlerts];
      
      // Apply filters
      if (filters.severity) {
        alerts = alerts.filter(alert => alert.severity === filters.severity);
      }
      
      if (filters.service) {
        alerts = alerts.filter(alert => alert.serviceId === filters.service);
      }
      
      if (filters.timeRange) {
        const cutoffTime = new Date();
        switch (filters.timeRange) {
          case '1h':
            cutoffTime.setHours(cutoffTime.getHours() - 1);
            break;
          case '24h':
            cutoffTime.setHours(cutoffTime.getHours() - 24);
            break;
          case '7d':
            cutoffTime.setDate(cutoffTime.getDate() - 7);
            break;
        }
        alerts = alerts.filter(alert => new Date(alert.timestamp) >= cutoffTime);
      }
      
      return new APIResponse({
        alerts,
        totalCount: alerts.length,
        filters
      });
    } catch (error) {
      throw new APIError('Failed to fetch alerts', 500, 'ALERTS_FETCH_ERROR');
    }
  },

  // Acknowledge alert
  async acknowledgeAlert(alertId) {
    try {
      const alert = mockAlerts.find(a => a.id === alertId);
      if (!alert) {
        throw new APIError(`Alert with ID ${alertId} not found`, 404, 'ALERT_NOT_FOUND');
      }
      
      alert.acknowledged = true;
      alert.acknowledgedAt = new Date().toISOString();
      
      return new APIResponse(alert);
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError('Failed to acknowledge alert', 500, 'ALERT_ACKNOWLEDGE_ERROR');
    }
  },

  // Dismiss alert
  async dismissAlert(alertId) {
    try {
      const alertIndex = mockAlerts.findIndex(a => a.id === alertId);
      if (alertIndex === -1) {
        throw new APIError(`Alert with ID ${alertId} not found`, 404, 'ALERT_NOT_FOUND');
      }
      
      const dismissedAlert = mockAlerts.splice(alertIndex, 1)[0];
      return new APIResponse(dismissedAlert);
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError('Failed to dismiss alert', 500, 'ALERT_DISMISS_ERROR');
    }
  }
};

// Analytics API
export const analyticsAPI = {
  // Get dashboard metrics
  async getDashboardMetrics() {
    try {
      const metrics = {
        totalServices: mockServices.length,
        healthyServices: mockServices.filter(s => s.status === SERVICE_STATUS.HEALTHY).length,
        activeAlerts: mockAlerts.filter(a => !a.acknowledged).length,
        networkConnections: mockNetworkData.connections?.length || 0,
        threatLevel: mockSecurityData.overallThreatLevel || 'low',
        systemUptime: '99.7%',
        lastUpdated: new Date().toISOString()
      };
      
      return new APIResponse(metrics);
    } catch (error) {
      throw new APIError('Failed to fetch dashboard metrics', 500, 'DASHBOARD_METRICS_ERROR');
    }
  },

  // Get performance metrics
  async getPerformanceMetrics(timeRange = '1h') {
    try {
      const metrics = {
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        disk: Math.random() * 100,
        network: Math.random() * 100,
        responseTime: Math.random() * 1000,
        throughput: Math.random() * 10000,
        errorRate: Math.random() * 5,
        timeRange
      };
      
      return new APIResponse(metrics);
    } catch (error) {
      throw new APIError('Failed to fetch performance metrics', 500, 'PERFORMANCE_METRICS_ERROR');
    }
  }
};

// Real-time data API
export const realTimeAPI = {
  // Get real-time updates
  async getRealtimeUpdates() {
    try {
      const updates = {
        services: mockServices.map(service => ({
          id: service.id,
          status: service.status,
          responseTime: Math.random() * 1000,
          uptime: service.uptime
        })),
        alerts: mockAlerts.slice(0, 5),
        networkTraffic: {
          inbound: Math.random() * 1000,
          outbound: Math.random() * 1000,
          connections: Math.random() * 100
        },
        timestamp: new Date().toISOString()
      };
      
      return new APIResponse(updates);
    } catch (error) {
      throw new APIError('Failed to fetch real-time updates', 500, 'REALTIME_UPDATES_ERROR');
    }
  }
};

// Main API object
export const serviceAPI = {
  services: servicesAPI,
  security: securityAPI,
  network: networkAPI,
  alerts: alertsAPI,
  analytics: analyticsAPI,
  realtime: realTimeAPI,
  
  // Error handling utility
  handleError: (error) => {
    console.error('API Error:', error);
    
    if (error instanceof APIError) {
      return {
        error: true,
        message: error.message,
        status: error.status,
        code: error.code,
        timestamp: error.timestamp
      };
    }
    
    return {
      error: true,
      message: 'An unexpected error occurred',
      status: 500,
      code: 'UNKNOWN_ERROR',
      timestamp: new Date().toISOString()
    };
  }
};

// Export individual APIs and utilities
export { APIResponse, APIError, SERVICE_STATUS };
export default serviceAPI;