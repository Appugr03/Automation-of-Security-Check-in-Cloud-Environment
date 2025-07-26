import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Shield, TrendingUp, TrendingDown, Activity, Lock, Unlock, AlertCircle } from 'lucide-react';

const SecurityMetricsPrediction = ({ data, timeRange, realTimeData }) => {
  const [selectedMetric, setSelectedMetric] = useState('overall');
  const [showPredictionBounds, setShowPredictionBounds] = useState(true);

  if (!data) return <div>Loading security metrics predictions...</div>;

  const metrics = [
    { value: 'overall', label: 'Overall Security Score', color: '#8884d8' },
    { value: 'authentication', label: 'Authentication Score', color: '#82ca9d' },
    { value: 'authorization', label: 'Authorization Score', color: '#ffc658' },
    { value: 'encryption', label: 'Encryption Score', color: '#ff7300' },
    { value: 'compliance', label: 'Compliance Score', color: '#00ff00' }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return '#22c55e';
    if (score >= 80) return '#84cc16';
    if (score >= 70) return '#eab308';
    if (score >= 60) return '#f97316';
    return '#ef4444';
  };

  const getScoreStatus = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Fair';
    if (score >= 60) return 'Poor';
    return 'Critical';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Time: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
              {entry.payload.confidence && (
                <span className="confidence"> (±{entry.payload.margin})</span>
              )}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const currentScore = data.currentScore || 0;
  const predictedScore = data.predictedScore || 0;
  const trend = predictedScore > currentScore ? 'improving' : predictedScore < currentScore ? 'declining' : 'stable';

  return (
    <div className="security-metrics-prediction">
      <div className="prediction-summary">
        <div className="summary-card">
          <div className="card-header">
            <Shield className="card-icon" />
            <h3>Current Security Score</h3>
          </div>
          <div className="card-content">
            <div className="score-display" style={{ color: getScoreColor(currentScore) }}>
              {currentScore.toFixed(1)}
            </div>
            <div className="score-status">
              {getScoreStatus(currentScore)}
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <Activity className="card-icon" />
            <h3>Predicted Score</h3>
          </div>
          <div className="card-content">
            <div className="score-display" style={{ color: getScoreColor(predictedScore) }}>
              {predictedScore.toFixed(1)}
            </div>
            <div className="trend-indicator">
              {trend === 'improving' ? (
                <><TrendingUp className="trend-icon up" /> Improving</>
              ) : trend === 'declining' ? (
                <><TrendingDown className="trend-icon down" /> Declining</>
              ) : (
                <><Activity className="trend-icon stable" /> Stable</>
              )}
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-header">
            <AlertCircle className="card-icon" />
            <h3>Risk Level</h3>
          </div>
          <div className="card-content">
            <div className="risk-level">
              {data.riskLevel || 'Medium'}
            </div>
            <div className="risk-factors">
              {data.riskFactors || 3} factors
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
          <label>
            <input
              type="checkbox"
              checked={showPredictionBounds}
              onChange={(e) => setShowPredictionBounds(e.target.checked)}
            />
            Show Prediction Bounds
          </label>
        </div>
      </div>

      <div className="prediction-charts">
        <div className="chart-container">
          <h4>Security Score Trend & Prediction</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.trendData || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="historical" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="Historical"
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#82ca9d" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Predicted"
              />
              {showPredictionBounds && (
                <>
                  <Line 
                    type="monotone" 
                    dataKey="upperBound" 
                    stroke="#82ca9d" 
                    strokeWidth={1}
                    strokeOpacity={0.5}
                    name="Upper Bound"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="lowerBound" 
                    stroke="#82ca9d" 
                    strokeWidth={1}
                    strokeOpacity={0.5}
                    name="Lower Bound"
                  />
                </>
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h4>Security Metrics Radar</h4>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={data.radarData || []}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar name="Current" dataKey="current" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Predicted" dataKey="predicted" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-container">
        <h4>Security Events Forecast</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.eventsData || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="securityEvents" fill="#8884d8" name="Security Events" />
            <Bar dataKey="predictedEvents" fill="#82ca9d" name="Predicted Events" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="prediction-insights">
        <h4>Security Insights & Recommendations</h4>
        <div className="insights-grid">
          {(data.insights || []).map((insight, index) => (
            <div key={index} className={`insight-card ${insight.priority}`}>
              <div className="insight-icon">
                {insight.type === 'improvement' ? <TrendingUp /> : 
                 insight.type === 'warning' ? <AlertCircle /> : <Shield />}
              </div>
              <div className="insight-content">
                <div className="insight-title">{insight.title}</div>
                <div className="insight-description">{insight.description}</div>
                <div className="insight-impact">
                  Expected Impact: {insight.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityMetricsPrediction;