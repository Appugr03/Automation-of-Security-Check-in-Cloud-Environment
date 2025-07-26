// src/hooks/useRealTimeData.js
import { useState, useEffect, useCallback, useRef } from 'react';
import { useWebSocket } from './useWebSocket';

// Debounce utility for high-frequency updates
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Throttle utility for performance optimization
const useThrottle = (callback, delay) => {
  const lastRun = useRef(Date.now());

  return useCallback((...args) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    }
  }, [callback, delay]);
};

export const useRealTimeData = (options = {}) => {
  const {
    subscriptions = [],
    bufferSize = 100,
    updateInterval = 1000,
    enableThrottling = true
  } = options;

  // State management
  const [data, setData] = useState({
    alerts: [],
    metrics: {},
    networkStatus: {},
    threats: [],
    lastUpdated: null
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateStats, setUpdateStats] = useState({
    totalUpdates: 0,
    alertsReceived: 0,
    metricsUpdates: 0,
    networkUpdates: 0,
    threatUpdates: 0
  });

  // Performance monitoring
  const performanceRef = useRef({
    lastUpdateTime: Date.now(),
    updateTimes: [],
    droppedUpdates: 0
  });

  // WebSocket connection
  const { 
    isConnected, 
    addMessageListener, 
    subscribe,
    connectionState 
  } = useWebSocket({
    onConnect: () => {
      setIsLoading(false);
      setError(null);
      
      // Subscribe to requested channels
      if (subscriptions.length > 0) {
        subscribe(subscriptions);
      }
    },
    onDisconnect: () => {
      setError('Connection lost');
    },
    onError: (error) => {
      setError('Connection error');
      setIsLoading(false);
    }
  });

  // Throttled data update function
  const updateData = useThrottle(useCallback((updateFunction) => {
    const startTime = performance.now();
    
    setData(prevData => {
      const newData = updateFunction(prevData);
      
      // Performance tracking
      const endTime = performance.now();
      const updateTime = endTime - startTime;
      
      performanceRef.current.updateTimes.push(updateTime);
      if (performanceRef.current.updateTimes.length > 50) {
        performanceRef.current.updateTimes.shift();
      }
      
      return {
        ...newData,
        lastUpdated: new Date().toISOString()
      };
    });
    
    setUpdateStats(prev => ({
      ...prev,
      totalUpdates: prev.totalUpdates + 1
    }));
    
  }, []), enableThrottling ? updateInterval : 0);

  // Message handlers for different data types
  useEffect(() => {
    const cleanupFunctions = [];

    // Handle new alerts
    const alertCleanup = addMessageListener('new_alert', (data) => {
      updateData(prevData => ({
        ...prevData,
        alerts: [data.alert, ...prevData.alerts.slice(0, bufferSize - 1)]
      }));
      
      setUpdateStats(prev => ({
        ...prev,
        alertsReceived: prev.alertsReceived + 1
      }));
    });
    cleanupFunctions.push(alertCleanup);

    // Handle metrics updates
    const metricsCleanup = addMessageListener('metrics_update', (data) => {
      updateData(prevData => ({
        ...prevData,
        metrics: {
          ...prevData.metrics,
          ...data.metrics
        }
      }));
      
      setUpdateStats(prev => ({
        ...prev,
        metricsUpdates: prev.metricsUpdates + 1
      }));
    });
    cleanupFunctions.push(metricsCleanup);

    // Handle network status updates
    const networkCleanup = addMessageListener('network_update', (data) => {
      updateData(prevData => ({
        ...prevData,
        networkStatus: data.networkStatus
      }));
      
      setUpdateStats(prev => ({
        ...prev,
        networkUpdates: prev.networkUpdates + 1
      }));
    });
    cleanupFunctions.push(networkCleanup);

    // Handle threat updates
    const threatCleanup = addMessageListener('threat_update', (data) => {
      updateData(prevData => ({
        ...prevData,
        threats: data.threats
      }));
      
      setUpdateStats(prev => ({
        ...prev,
        threatUpdates: prev.threatUpdates + 1
      }));
    });
    cleanupFunctions.push(threatCleanup);

    // Handle initial data
    const initialDataCleanup = addMessageListener('connection_established', (data) => {
      if (data.initialData) {
        setData(prevData => ({
          ...prevData,
          ...data.initialData,
          lastUpdated: new Date().toISOString()
        }));
        setIsLoading(false);
      }
    });
    cleanupFunctions.push(initialDataCleanup);

    // Handle data snapshots
    const snapshotCleanup = addMessageListener('data_snapshot', (data) => {
      setData(prevData => ({
        ...prevData,
        ...data.data,
        lastUpdated: new Date().toISOString()
      }));
    });
    cleanupFunctions.push(snapshotCleanup);

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup?.());
    };
  }, [addMessageListener, updateData, bufferSize]);

  // Performance metrics calculation
  const performanceMetrics = useCallback(() => {
    const times = performanceRef.current.updateTimes;
    if (times.length === 0) return null;

    const avgUpdateTime = times.reduce((a, b) => a + b, 0) / times.length;
    const maxUpdateTime = Math.max(...times);
    const minUpdateTime = Math.min(...times);

    return {
      averageUpdateTime: avgUpdateTime.toFixed(2),
      maxUpdateTime: maxUpdateTime.toFixed(2),
      minUpdateTime: minUpdateTime.toFixed(2),
      totalUpdates: updateStats.totalUpdates,
      droppedUpdates: performanceRef.current.droppedUpdates
    };
  }, [updateStats.totalUpdates]);

  // Data filtering and aggregation utilities
  const getAlertsByType = useCallback((type) => {
    return data.alerts.filter(alert => alert.type === type);
  }, [data.alerts]);

  const getRecentAlerts = useCallback((minutes = 10) => {
    const cutoff = new Date(Date.now() - minutes * 60 * 1000);
    return data.alerts.filter(alert => new Date(alert.timestamp) > cutoff);
  }, [data.alerts]);

  const getMetricTrend = useCallback((metricName, dataPoints = 10) => {
    // This would typically work with historical data
    // For now, return current value
    return data.metrics[metricName] || null;
  }, [data.metrics]);

  // Connection health check
  const connectionHealth = {
    isConnected,
    connectionState,
    hasError: !!error,
    lastUpdate: data.lastUpdated,
    updateRate: updateStats.totalUpdates
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear any pending updates
      performanceRef.current = {
        lastUpdateTime: Date.now(),
        updateTimes: [],
        droppedUpdates: 0
      };
    };
  }, []);

  return {
    // Data
    data,
    alerts: data.alerts,
    metrics: data.metrics,
    networkStatus: data.networkStatus,
    threats: data.threats,
    
    // State
    isLoading,
    error,
    isConnected,
    connectionHealth,
    
    // Statistics
    updateStats,
    performanceMetrics: performanceMetrics(),
    
    // Utilities
    getAlertsByType,
    getRecentAlerts,
    getMetricTrend,
    
    // Manual refresh
    refresh: () => {
      if (isConnected) {
        // Request fresh data snapshot
        setIsLoading(true);
      }
    }
  };
};

// Higher-order component for real-time data
export const withRealTimeData = (WrappedComponent, options = {}) => {
  return function WithRealTimeDataComponent(props) {
    const realTimeData = useRealTimeData(options);
    
    return (
      <WrappedComponent
        {...props}
        realTimeData={realTimeData}
      />
    );
  };
};

// Custom hook for specific data types
export const useRealTimeAlerts = (options = {}) => {
  const { filterType, maxCount = 50 } = options;
  
  const { alerts, isConnected, updateStats } = useRealTimeData({
    subscriptions: ['alerts'],
    bufferSize: maxCount,
    ...options
  });

  const filteredAlerts = filterType 
    ? alerts.filter(alert => alert.type === filterType)
    : alerts;

  return {
    alerts: filteredAlerts,
    isConnected,
    alertsReceived: updateStats.alertsReceived
  };
};

export const useRealTimeMetrics = (options = {}) => {
  const { metrics, isConnected, updateStats } = useRealTimeData({
    subscriptions: ['metrics'],
    ...options
  });

  return {
    metrics,
    isConnected,
    metricsUpdates: updateStats.metricsUpdates
  };
};