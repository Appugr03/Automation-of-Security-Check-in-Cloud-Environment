import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ComposedChart } from 'recharts';
import { Network, TrendingUp, TrendingDown, Activity, Wifi, WifiOff, AlertTriangle, Server } from 'lucide-react';

const NetworkTrafficPrediction = ({ data, timeRange, realTimeData }) => {
  const [selectedMetric, setSelectedMetric] = useState('bandwidth');
  const [showAnomalies, setShowAnomalies] = useState(true);
  const [viewMode, setViewMode] = useState('combined');

  if (!data) return <div>Loading network traffic predictions...</div>;

  const metrics = [
    { value: 'bandwidth', label: 'Bandwidth Usage', unit: 'Mbps', color: '#8884d8' },
    { value: 'latency', label: 'Network Latency', unit: 'ms', color: '#82ca9d' },
    { value: 'packets', label: 'Packet Rate', unit: 'pps', color: '#ffc658' },
    { value: 'connections', label: 'Active Connections', unit: 'conn', color: '#ff7300' },
    { value: 'errors', label: 'Error Rate', unit: '%', color: '#ff0000' }
  ];

  const getStatusColor = (value, threshold) => {
    if (value > threshold.critical) return '#ef4444';
    if (value > threshold.warning) return '#f97316';
    return '#22c55e';
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Time: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value} ${metrics.find(m => m.value === selectedMetric)?.unit || ''}`}
              {entry.payload.anomaly && (
                <span className="anomaly-indicator"> ⚠️</span>
              )}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const currentBandwidth = data.currentBandwidth || 0;
  const predictedPeak = data.predictedPeak || 0;
  const anomaliesCount = data.anomalies?.length || 0;
  const utilizationPercent = data.utilizationPercent || 0;

  return (
    <div className="network-traffic-prediction">
      <div className="prediction-summary">
        <div className="summary-card">
          <div className="card-header">
            <Network className="card-icon" />
            <h3>Current Bandwidth</h3>
          </div>
          <div className="card-content">
            <div className="bandwidth-display" style={{ color: getStatusColor(currentBandwidth, { warning: 80, critical: 95 }) }}>
              {formatBytes(currentBandwidth * 1024 * 1024)}
            </div>
            <div className="bandwidth-status">
              {utilizationPercent.toFixed(1)}% utilized
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <Activity className="card-icon" />
            <h3>Predicted Peak</h3>
          </div>
          <div className="card-content">
            <div className="peak-display" style={{ color: getStatusColor(predictedPeak, { warning: 80, critical: 95 }) }}>
              {formatBytes(predictedPeak * 1024 * 1024)}
            </div>
            <div className="peak-time">
              At: {data.peakTime || 'N/A'}
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <AlertTriangle className="card-icon" />
            <h3>Anomalies Detected</h3>
          </div>
          <div className="card-content">
            <div className="anomaly-count" style={{ color: anomaliesCount > 0 ? '#ef4444' : '#22c55e' }}>
              {anomaliesCount}
            </div>
            <div className="anomaly-status">
              {anomaliesCount > 0 ? 'Requires attention' : 'Normal'}
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <Server className="card-icon" />
            <h3>Network Health</h3>
          </div>
          <div className="card-content">
            <div className="health-score" style={{ color: getStatusColor(100 - (data.healthScore || 95), { warning: 20, critical: 40 }) }}>
              {(data.healthScore || 95).toFixed(1)}%
            </div>
            <div className="health-status">
              {data.healthScore > 90 ? 'Excellent' : data.healthScore > 70 ? 'Good' : 'Poor'}
            </div>
          </div>
        </div>
      </div>

      <div className="prediction-controls">
        <div className="control-group">
          <label>Metric:</label>
          <select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)}>
            {metrics.map(metric => (
              <option key={metric.value} value={metric.value}>{metric.label}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>View Mode:</label>
          <select value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
            <option value="combined">Combined View</option>
            <option value="separate">Separate Charts</option>
            <option value="detailed">Detailed Analysis</option>
          </select>
        </div>

        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={showAnomalies}
              onChange={(e) => setShowAnomalies(e.target.checked)}
            />
            Show Anomalies
          </label>
        </div>
      </div>

      <div className="prediction-charts">
        {viewMode === 'combined' && (
          <div className="chart-container">
            <h4>Network Traffic Prediction</h4>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={data.trendData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="historical" 
                  stackId="1" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.6}
                  name="Historical Traffic"
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="predicted" 
                  stackId="1" 
                  stroke="#82ca9d" 
                  fill="#82ca9d" 
                  fillOpacity={0.6}
                  strokeDasharray="5 5"
                  name="Predicted Traffic"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="threshold" 
                  stroke="#ff7300" 
                  strokeWidth={2}
                  strokeDasharray="2 2"
                  name="Threshold"
                />
                {showAnomalies && (
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="anomalies" 
                    stroke="#ff0000" 
                    strokeWidth={3}
                    dot={{ r: 6 }}
                    name="Anomalies"
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}

        {viewMode === 'separate' && (
          <>
            <div className="chart-container">
              <h4>Bandwidth Usage Trend</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.bandwidthData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="usage" stroke="#8884d8" strokeWidth={2} name="Current Usage" />
                  <Line type="monotone" dataKey="predicted" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" name="Predicted Usage" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-container">
              <h4>Network Latency</h4>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data.latencyData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="latency" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} name="Latency (ms)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {viewMode === 'detailed' && (
          <div className="chart-container">
            <h4>Detailed Network Analysis</h4>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data.detailedData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="inbound" stroke="#8884d8" strokeWidth={2} name="Inbound Traffic" />
                <Line type="monotone" dataKey="outbound" stroke="#82ca9d" strokeWidth={2} name="Outbound Traffic" />
                <Line type="monotone" dataKey="internal" stroke="#ffc658" strokeWidth={2} name="Internal Traffic" />
                <Line type="monotone" dataKey="external" stroke="#ff7300" strokeWidth={2} name="External Traffic" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="chart-container">
        <h4>Traffic Distribution by Protocol</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.protocolData || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="protocol" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="current" fill="#8884d8" name="Current" />
            <Bar dataKey="predicted" fill="#82ca9d" name="Predicted" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {showAnomalies && (
        <div className="prediction-alerts">
          <h4>Network Anomalies & Predictions</h4>
          <div className="alert-list">
            {(data.anomalies || []).map((anomaly, index) => (
              <div key={index} className={`alert-item ${anomaly.severity}`}>
                <div className="alert-icon">
                  {anomaly.type === 'spike' ? <TrendingUp size={16} /> : 
                   anomaly.type === 'drop' ? <TrendingDown size={16} /> : 
                   <AlertTriangle size={16} />}
                </div>
                <div className="alert-content">
                  <div className="alert-title">{anomaly.title}</div>
                  <div className="alert-description">{anomaly.description}</div>
                  <div className="alert-meta">
                    <span>Time: {anomaly.time}</span>
                    <span>Impact: {anomaly.impact}</span>
                    <span>Confidence: {(anomaly.confidence * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="prediction-insights">
        <h4>Network Optimization Recommendations</h4>
        <div className="insights-grid">
          {(data.recommendations || []).map((rec, index) => (
            <div key={index} className={`insight-card ${rec.priority}`}>
              <div className="insight-icon">
                {rec.type === 'optimization' ? <Activity /> : 
                 rec.type === 'scaling' ? <TrendingUp /> : 
                 <Network />}
              </div>
              <div className="insight-content">
                <div className="insight-title">{rec.title}</div>
                <div className="insight-description">{rec.description}</div>
                <div className="insight-impact">
                  Expected Improvement: {rec.improvement}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetworkTrafficPrediction;