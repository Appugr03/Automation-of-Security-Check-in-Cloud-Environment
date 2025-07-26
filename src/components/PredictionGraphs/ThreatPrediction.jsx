import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ScatterChart, Scatter, Cell } from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown, Target, Shield, Users } from 'lucide-react';

const ThreatPrediction = ({ data, timeRange, realTimeData }) => {
  const [selectedThreatType, setSelectedThreatType] = useState('all');
  const [confidenceLevel, setConfidenceLevel] = useState(0.8);

  if (!data) return <div>Loading threat predictions...</div>;

  const threatTypes = [
    { value: 'all', label: 'All Threats', color: '#8884d8' },
    { value: 'authentication', label: 'Authentication', color: '#82ca9d' },
    { value: 'api', label: 'API Security', color: '#ffc658' },
    { value: 'misconfiguration', label: 'Misconfiguration', color: '#ff7300' },
    { value: 'network', label: 'Network Intrusion', color: '#ff0000' }
  ];

  const getThreatSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#d97706';
      case 'low': return '#65a30d';
      default: return '#6b7280';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Time: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
              {entry.payload.confidence && (
                <span className="confidence"> (Confidence: {(entry.payload.confidence * 100).toFixed(1)}%)</span>
              )}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const predictedIncidents = data.predictions?.filter(p => p.confidence >= confidenceLevel) || [];
  const riskScore = data.riskScore || 0;
  const trend = data.trend || 'stable';

  return (
    <div className="threat-prediction">
      <div className="prediction-summary">
        <div className="summary-card">
          <div className="card-header">
            <AlertTriangle className="card-icon" />
            <h3>Threat Risk Score</h3>
          </div>
          <div className="card-content">
            <div className="risk-score" style={{ color: getThreatSeverityColor(riskScore > 80 ? 'critical' : riskScore > 60 ? 'high' : riskScore > 40 ? 'medium' : 'low') }}>
              {riskScore}/100
            </div>
            <div className="trend-indicator">
              {trend === 'increasing' ? (
                <><TrendingUp className="trend-icon up" /> Increasing</>
              ) : trend === 'decreasing' ? (
                <><TrendingDown className="trend-icon down" /> Decreasing</>
              ) : (
                <><Target className="trend-icon stable" /> Stable</>
              )}
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <Target className="card-icon" />
            <h3>Predicted Incidents</h3>
          </div>
          <div className="card-content">
            <div className="incident-count">
              {predictedIncidents.length}
            </div>
            <div className="next-incident">
              Next in: {data.nextIncident || 'N/A'}
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <Users className="card-icon" />
            <h3>Affected Users</h3>
          </div>
          <div className="card-content">
            <div className="user-count">
              {data.affectedUsers || 0}
            </div>
            <div className="user-trend">
              Potential impact
            </div>
          </div>
        </div>
      </div>

      <div className="prediction-controls">
        <div className="control-group">
          <label>Threat Type:</label>
          <select value={selectedThreatType} onChange={(e) => setSelectedThreatType(e.target.value)}>
            {threatTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Confidence Level:</label>
          <input
            type="range"
            min="0.5"
            max="1"
            step="0.1"
            value={confidenceLevel}
            onChange={(e) => setConfidenceLevel(parseFloat(e.target.value))}
          />
          <span>{(confidenceLevel * 100).toFixed(0)}%</span>
        </div>
      </div>

      <div className="prediction-charts">
        <div className="chart-container">
          <h4>Threat Trend Prediction</h4>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.trendData || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="historical" 
                stackId="1" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.6}
                name="Historical"
              />
              <Area 
                type="monotone" 
                dataKey="predicted" 
                stackId="1" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                fillOpacity={0.6}
                strokeDasharray="5 5"
                name="Predicted"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h4>Threat Type Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={data.threatDistribution || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="severity" />
              <YAxis dataKey="frequency" />
              <Tooltip />
              <Legend />
              <Scatter name="Threats" dataKey="count" fill="#ff7300">
                {(data.threatDistribution || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getThreatSeverityColor(entry.severity)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="prediction-alerts">
        <h4>Predicted Security Incidents</h4>
        <div className="alert-list">
          {predictedIncidents.map((incident, index) => (
            <div key={index} className={`alert-item ${incident.severity}`}>
              <div className="alert-icon">
                <AlertTriangle size={16} />
              </div>
              <div className="alert-content">
                <div className="alert-title">{incident.type}</div>
                <div className="alert-description">{incident.description}</div>
                <div className="alert-meta">
                  <span>Confidence: {(incident.confidence * 100).toFixed(1)}%</span>
                  <span>ETA: {incident.eta}</span>
                  <span>Severity: {incident.severity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreatPrediction;