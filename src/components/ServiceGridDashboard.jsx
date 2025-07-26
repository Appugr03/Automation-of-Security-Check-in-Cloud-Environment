// File: src/components/ServiceGridDashboard.jsx
import React, { useState } from 'react';
import { useRealTimeServices } from '../hooks/useRealTimeServices.js';
import ServiceCard from './ServiceCard.jsx';
import { Play, Pause, Zap, Filter } from 'lucide-react';

const ServiceGridDashboard = () => {
  const {
    services,
    metrics,
    isConnected,
    lastUpdate,
    startUpdates,
    stopUpdates,
    simulateIncident,
    healthyServices,
    criticalServices,
    degradedServices
  } = useRealTimeServices({
    updateInterval: 4000, // Update every 4 seconds
    enableLogging: false
  });

  const [filter, setFilter] = useState('all');
  const [selectedService, setSelectedService] = useState(null);

  // Filter services based on selected filter
  const filteredServices = services.filter(service => {
    switch (filter) {
      case 'healthy': return service.status === 'healthy';
      case 'degraded': return service.status === 'degraded';
      case 'critical': return service.status === 'critical';
      case 'maintenance': return service.status === 'maintenance';
      case 'high-trust': return service.securityScore >= 90;
      case 'low-trust': return service.securityScore < 70;
      default: return true;
    }
  });

  const handleSimulateIncident = () => {
    const serviceIds = ['svc-001', 'svc-002', 'svc-003', 'svc-004', 'svc-005', 'svc-006'];
    const randomService = serviceIds[Math.floor(Math.random() * serviceIds.length)];
    const incidents = ['performance', 'security', 'outage'];
    const randomIncident = incidents[Math.floor(Math.random() * incidents.length)];
    
    simulateIncident(randomService, randomIncident, 25000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Zero Trust Service Monitor
              </h1>
              <div className={`ml-4 flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                }`}></div>
                <span>{isConnected ? 'Live' : 'Offline'}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {lastUpdate && (
                <span className="text-sm text-gray-500">
                  Updated: {lastUpdate.toLocaleTimeString()}
                </span>
              )}
              
              <button
                onClick={isConnected ? stopUpdates : startUpdates}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  isConnected 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isConnected ? <Pause size={16} /> : <Play size={16} />}
                <span>{isConnected ? 'Stop' : 'Start'}</span>
              </button>
              
              <button
                onClick={handleSimulateIncident}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md font-medium transition-colors"
              >
                <Zap size={16} />
                <span>Simulate Issue</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{services.length}</div>
              <div className="text-sm text-gray-500">Total Services</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{healthyServices.length}</div>
              <div className="text-sm text-gray-500">Healthy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{degradedServices.length}</div>
              <div className="text-sm text-gray-500">Degraded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{criticalServices.length}</div>
              <div className="text-sm text-gray-500">Critical</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {metrics.averageUptime ? `${metrics.averageUptime.toFixed(1)}%` : '0%'}
              </div>
              <div className="text-sm text-gray-500">Avg Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {metrics.averageSecurityScore ? Math.round(metrics.averageSecurityScore) : 0}
              </div>
              <div className="text-sm text-gray-500">Avg Trust</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center space-x-4 mb-6">
          <Filter size={20} className="text-gray-500" />
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Services', count: services.length },
              { key: 'healthy', label: 'Healthy', count: healthyServices.length },
              { key: 'degraded', label: 'Degraded', count: degradedServices.length },
              { key: 'critical', label: 'Critical', count: criticalServices.length },
              { key: 'high-trust', label: 'High Trust', count: services.filter(s => s.securityScore >= 90).length },
              { key: 'low-trust', label: 'Low Trust', count: services.filter(s => s.securityScore < 70).length }
            ].map(filterOption => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filter === filterOption.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filterOption.label} ({filterOption.count})
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div key={service.id} className="transform transition-transform hover:scale-105">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No services match the current filter</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceGridDashboard;