// Security utility functions for zero-trust dashboard

/**
 * Calculate security score based on various metrics
 * @param {Object} metrics - Security metrics object
 * @returns {number} Security score (0-100)
 */
export const calculateSecurityScore = (metrics) => {
  if (!metrics) return 0;
  
  const {
    authenticatedUsers = 0,
    totalUsers = 1,
    activeThreats = 0,
    resolvedThreats = 0,
    compliantDevices = 0,
    totalDevices = 1,
    patchedSystems = 0,
    totalSystems = 1
  } = metrics;

  // Calculate individual scores
  const authScore = (authenticatedUsers / totalUsers) * 25;
  const threatScore = totalThreats > 0 ? (resolvedThreats / (resolvedThreats + activeThreats)) * 25 : 25;
  const deviceScore = (compliantDevices / totalDevices) * 25;
  const patchScore = (patchedSystems / totalSystems) * 25;
  
  const totalThreats = activeThreats + resolvedThreats;
  
  return Math.round(authScore + threatScore + deviceScore + patchScore);
};

/**
 * Determine risk level based on security score
 * @param {number} score - Security score
 * @returns {string} Risk level
 */
export const getRiskLevel = (score) => {
  if (score >= 90) return 'LOW';
  if (score >= 70) return 'MEDIUM';
  if (score >= 50) return 'HIGH';
  return 'CRITICAL';
};

/**
 * Get risk color based on level
 * @param {string} level - Risk level
 * @returns {string} Color code
 */
export const getRiskColor = (level) => {
  const colors = {
    LOW: '#10B981',
    MEDIUM: '#F59E0B',
    HIGH: '#EF4444',
    CRITICAL: '#DC2626'
  };
  return colors[level] || colors.CRITICAL;
};

/**
 * Format threat severity
 * @param {string} severity - Threat severity
 * @returns {Object} Formatted severity with color
 */
export const formatThreatSeverity = (severity) => {
  const severityMap = {
    critical: { label: 'Critical', color: '#DC2626', priority: 4 },
    high: { label: 'High', color: '#EF4444', priority: 3 },
    medium: { label: 'Medium', color: '#F59E0B', priority: 2 },
    low: { label: 'Low', color: '#10B981', priority: 1 },
    info: { label: 'Info', color: '#3B82F6', priority: 0 }
  };
  
  return severityMap[severity?.toLowerCase()] || severityMap.info;
};

/**
 * Calculate compliance percentage
 * @param {number} compliant - Number of compliant items
 * @param {number} total - Total number of items
 * @returns {number} Compliance percentage
 */
export const calculateCompliance = (compliant, total) => {
  if (total === 0) return 0;
  return Math.round((compliant / total) * 100);
};

/**
 * Format bytes to human readable format
 * @param {number} bytes - Bytes value
 * @returns {string} Formatted string
 */
export const formatBytes = (bytes) => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Format network traffic
 * @param {number} value - Traffic value in bytes
 * @returns {string} Formatted traffic string
 */
export const formatTraffic = (value) => {
  return formatBytes(value);
};

/**
 * Generate unique ID
 * @returns {string} Unique identifier
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Validate IP address
 * @param {string} ip - IP address to validate
 * @returns {boolean} True if valid IP
 */
export const isValidIP = (ip) => {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
};

/**
 * Check if device is trusted
 * @param {Object} device - Device object
 * @returns {boolean} True if device is trusted
 */
export const isTrustedDevice = (device) => {
  if (!device) return false;
  
  return device.isManaged && 
         device.isCompliant && 
         device.lastSeen && 
         (Date.now() - new Date(device.lastSeen).getTime()) < 86400000; // 24 hours
};

/**
 * Calculate uptime percentage
 * @param {number} uptime - Uptime in milliseconds
 * @param {number} total - Total time in milliseconds
 * @returns {number} Uptime percentage
 */
export const calculateUptime = (uptime, total) => {
  if (total === 0) return 0;
  return Math.round((uptime / total) * 100);
};

/**
 * Format duration in milliseconds to human readable
 * @param {number} ms - Duration in milliseconds
 * @returns {string} Formatted duration
 */
export const formatDuration = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
};

/**
 * Sort alerts by priority and timestamp
 * @param {Array} alerts - Array of alert objects
 * @returns {Array} Sorted alerts
 */
export const sortAlertsByPriority = (alerts) => {
  return alerts.sort((a, b) => {
    const aSeverity = formatThreatSeverity(a.severity);
    const bSeverity = formatThreatSeverity(b.severity);
    
    // Sort by priority first, then by timestamp (newest first)
    if (aSeverity.priority !== bSeverity.priority) {
      return bSeverity.priority - aSeverity.priority;
    }
    
    return new Date(b.timestamp) - new Date(a.timestamp);
  });
};

/**
 * Filter active threats
 * @param {Array} threats - Array of threat objects
 * @returns {Array} Active threats only
 */
export const getActiveThreats = (threats) => {
  return threats.filter(threat => threat.status === 'active' || threat.status === 'investigating');
};

/**
 * Calculate network health score
 * @param {Object} networkMetrics - Network metrics
 * @returns {number} Health score (0-100)
 */
export const calculateNetworkHealth = (networkMetrics) => {
  if (!networkMetrics) return 0;
  
  const {
    latency = 100,
    packetLoss = 5,
    bandwidth = 50,
    uptime = 95
  } = networkMetrics;
  
  // Lower latency is better (invert score)
  const latencyScore = Math.max(0, 100 - latency);
  
  // Lower packet loss is better (invert score)
  const packetLossScore = Math.max(0, 100 - (packetLoss * 10));
  
  // Higher bandwidth utilization up to 80% is good
  const bandwidthScore = bandwidth <= 80 ? bandwidth * 1.25 : Math.max(0, 100 - (bandwidth - 80) * 2);
  
  // Uptime score as-is
  const uptimeScore = uptime;
  
  return Math.round((latencyScore + packetLossScore + bandwidthScore + uptimeScore) / 4);
};

/**
 * Debounce function for search and filtering
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};