// src/components/ConnectionTest.jsx
import React from 'react';
import { useRealTimeData } from '../hooks/useRealTimeData';

const ConnectionTest = () => {
  const { connectionStatus, securityMetrics, isConnected } = useRealTimeData();
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h3>WebSocket Connection Test</h3>
      <p>Status: {connectionStatus}</p>
      <p>Connected: {isConnected ? '✅' : '❌'}</p>
      <p>Threat Level: {securityMetrics.threatLevel || 'No data'}</p>
    </div>
  );
};

export default ConnectionTest;