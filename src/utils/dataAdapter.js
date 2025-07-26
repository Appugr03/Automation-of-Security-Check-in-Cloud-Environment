// File: src/utils/dataAdapter.js
// Adapter to convert real-time service data to your ServiceCard format

export const adaptServiceData = (realtimeService) => {
  // Map status
  const getCardStatus = (status) => {
    switch (status) {
      case 'healthy': return 'secure';
      case 'degraded': return 'warning';
      case 'critical': return 'critical';
      case 'maintenance': return 'warning';
      default: return 'warning';
    }
  };

  // Calculate threats based on error rate and security score
  const calculateThreats = (service) => {
    const baseThreats = Math.floor(service.errorRate * 5);
    const trustPenalty = service.securityScore < 80 ? Math.floor((100 - service.securityScore) / 10) : 0;
    return Math.max(0, baseThreats + trustPenalty);
  };

  // Format last verified time
  const formatLastVerified = (lastUpdated) => {
    const now = new Date();
    const updated = new Date(lastUpdated);
    const diffMinutes = Math.floor((now - updated) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return `${Math.floor(diffMinutes / 1440)}d ago`;
  };

  return {
    id: realtimeService.id,
    name: realtimeService.name,
    status: getCardStatus(realtimeService.status),
    trust: realtimeService.securityScore,
    requests: realtimeService.requestsPerMinute * 60, // Convert to per hour
    threats: calculateThreats(realtimeService),
    lastVerified: formatLastVerified(realtimeService.lastUpdated)
  };
};

// Adapter for multiple services
export const adaptServicesData = (realtimeServices) => {
  return realtimeServices.map(adaptServiceData);
};

// Usage example:
// const adaptedServices = adaptServicesData(realTimeServices);
// adaptedServices.forEach(service => <ServiceCard service={service} />)