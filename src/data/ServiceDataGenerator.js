// File: src/data/ServiceDataGenerator.js
import { mockServices } from './mockServices.js';

class ServiceDataGenerator {
  constructor(initialServices = mockServices) {
    this.services = initialServices.map(service => ({
      ...service,
      lastUpdated: new Date().toISOString()
    }));
    this.updateInterval = null;
    this.subscribers = [];
    this.isRunning = false;
  }

  // Start real-time updates
  startRealTimeUpdates(intervalMs = 5000) {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.updateInterval = setInterval(() => {
      this.updateServices();
      this.notifySubscribers();
    }, intervalMs);
    
    console.log(`Real-time updates started (${intervalMs}ms interval)`);
  }

  // Stop real-time updates
  stopRealTimeUpdates() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
      this.isRunning = false;
      console.log('Real-time updates stopped');
    }
  }

  // Subscribe to real-time updates
  subscribe(callback) {
    this.subscribers.push(callback);
    // Send initial data immediately
    callback(this.services, this.getMetrics());
    
    // Return unsubscribe function
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  // Notify all subscribers of updates
  notifySubscribers() {
    const currentServices = this.getServices();
    const currentMetrics = this.getMetrics();
    
    this.subscribers.forEach(callback => {
      try {
        callback(currentServices, currentMetrics);
      } catch (error) {
        console.error('Error notifying subscriber:', error);
      }
    });
  }

  // Update service data with realistic variations
  updateServices() {
    this.services = this.services.map(service => {
      const updatedService = { ...service };
      
      // Update response time with realistic fluctuations
      const responseVariation = (Math.random() - 0.5) * 50;
      updatedService.responseTime = Math.max(10, 
        Math.round(service.responseTime + responseVariation));
      
      // Update requests per minute
      const requestVariation = (Math.random() - 0.5) * 200;
      updatedService.requestsPerMinute = Math.max(0, 
        Math.round(service.requestsPerMinute + requestVariation));
      
      // Update error rate
      const errorVariation = (Math.random() - 0.5) * 0.1;
      updatedService.errorRate = Math.max(0, 
        Math.round((service.errorRate + errorVariation) * 100) / 100);
      
      // Update uptime (slight variations)
      const uptimeVariation = (Math.random() - 0.5) * 0.1;
      updatedService.uptime = Math.min(100, Math.max(95, 
        Math.round((service.uptime + uptimeVariation) * 100) / 100));
      
      // Update security score (gradual changes)
      const securityVariation = (Math.random() - 0.5) * 2;
      updatedService.securityScore = Math.min(100, Math.max(0, 
        Math.round(service.securityScore + securityVariation)));
      
      // Calculate status based on performance
      updatedService.status = this.calculateStatus(updatedService);
      
      // Update trust level based on security score and status
      updatedService.trustLevel = this.calculateTrustLevel(updatedService);
      
      // Update endpoint statuses
      updatedService.endpoints = updatedService.endpoints.map(endpoint => ({
        ...endpoint,
        status: this.calculateEndpointStatus(updatedService, endpoint)
      }));
      
      updatedService.lastUpdated = new Date().toISOString();
      
      return updatedService;
    });
  }

  // Calculate service status based on metrics
  calculateStatus(service) {
    if (service.errorRate > 1.0 || service.responseTime > 500 || service.uptime < 98) {
      return 'critical';
    } else if (service.errorRate > 0.5 || service.responseTime > 200 || service.uptime < 99) {
      return 'degraded';
    } else if (Math.random() > 0.98) {
      return 'maintenance';
    }
    return 'healthy';
  }

  // Calculate endpoint status
  calculateEndpointStatus(service, endpoint) {
    if (service.status === 'critical') {
      return Math.random() > 0.3 ? 'critical' : 'degraded';
    } else if (service.status === 'degraded') {
      return Math.random() > 0.7 ? 'degraded' : 'healthy';
    } else if (service.status === 'maintenance') {
      return 'maintenance';
    }
    return Math.random() > 0.95 ? 'degraded' : 'healthy';
  }

  // Calculate trust level based on security and performance
  calculateTrustLevel(service) {
    if (service.securityScore >= 95 && service.status === 'healthy') {
      return 'verified';
    } else if (service.securityScore >= 80 && service.status !== 'critical') {
      return 'conditional';
    }
    return 'untrusted';
  }

  // Get current services data
  getServices() {
    return [...this.services]; // Return copy to prevent external mutations
  }

  // Get real-time metrics
  getMetrics() {
    return {
      totalServices: this.services.length,
      healthyServices: this.services.filter(s => s.status === 'healthy').length,
      degradedServices: this.services.filter(s => s.status === 'degraded').length,
      criticalServices: this.services.filter(s => s.status === 'critical').length,
      maintenanceServices: this.services.filter(s => s.status === 'maintenance').length,
      averageUptime: Math.round((this.services.reduce((sum, s) => sum + s.uptime, 0) / this.services.length) * 100) / 100,
      averageResponseTime: Math.round(this.services.reduce((sum, s) => sum + s.responseTime, 0) / this.services.length),
      totalRequests: this.services.reduce((sum, s) => sum + s.requestsPerMinute, 0),
      averageSecurityScore: Math.round(this.services.reduce((sum, s) => sum + s.securityScore, 0) / this.services.length),
      overallHealthPercentage: Math.round((this.services.filter(s => s.status === 'healthy').length / this.services.length) * 100),
      lastUpdated: new Date().toISOString()
    };
  }

  // Simulate service incidents
  simulateIncident(serviceId, incidentType = 'performance', duration = 30000) {
    const serviceIndex = this.services.findIndex(s => s.id === serviceId);
    if (serviceIndex === -1) {
      console.warn(`Service ${serviceId} not found`);
      return;
    }

    const service = this.services[serviceIndex];
    const originalState = { ...service };
    
    switch (incidentType) {
      case 'performance':
        service.responseTime *= 3;
        service.errorRate *= 5;
        service.status = 'critical';
        break;
      case 'security':
        service.securityScore = Math.max(0, service.securityScore - 20);
        service.trustLevel = 'untrusted';
        break;
      case 'outage':
        service.status = 'critical';
        service.uptime = Math.max(90, service.uptime - 5);
        service.errorRate = Math.min(100, service.errorRate * 10);
        service.responseTime *= 5;
        break;
    }
    
    console.log(`Incident simulated for ${service.name}: ${incidentType}`);
    this.notifySubscribers();
    
    // Auto-recover after duration
    setTimeout(() => {
      this.services[serviceIndex] = { 
        ...originalState, 
        lastUpdated: new Date().toISOString() 
      };
      console.log(`Service ${service.name} recovered from ${incidentType}`);
      this.notifySubscribers();
    }, duration);
  }

  // Get service by ID
  getServiceById(serviceId) {
    return this.services.find(s => s.id === serviceId);
  }

  // Update specific service
  updateService(serviceId, updates) {
    const serviceIndex = this.services.findIndex(s => s.id === serviceId);
    if (serviceIndex !== -1) {
      this.services[serviceIndex] = {
        ...this.services[serviceIndex],
        ...updates,
        lastUpdated: new Date().toISOString()
      };
      this.notifySubscribers();
    }
  }
}

// Create singleton instance
const serviceDataGenerator = new ServiceDataGenerator();

export default ServiceDataGenerator;
export { serviceDataGenerator };