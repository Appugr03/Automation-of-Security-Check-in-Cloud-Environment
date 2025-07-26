import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Shield, Activity, Network } from 'lucide-react';
import ThreatPrediction from './ThreatPrediction';
import SecurityMetricsPrediction from './SecurityMetricsPrediction';
import NetworkTrafficPrediction from './NetworkTrafficPrediction';
import { predictionService } from '../../services/predictionService';
import { useRealTimeData } from '../../hooks/useRealTimeData';
import './PredictionGraphs.css';

const PredictionGraphs = () => {
  const [activeTab, setActiveTab] = useState('threats');
  const [predictionData, setPredictionData] = useState({});
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('24h');
  
  const { data: realTimeData } = useRealTimeData();

  useEffect(() => {
    const fetchPredictions = async () => {
      setLoading(true);
      try {
        const [threats, security, network] = await Promise.all([
          predictionService.getThreatPredictions(timeRange),
          predictionService.getSecurityMetricsPredictions(timeRange),
          predictionService.getNetworkTrafficPredictions(timeRange)
        ]);
        
        setPredictionData({
          threats,
          security,
          network
        });
      } catch (error) {
        console.error('Error fetching predictions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
    const interval = setInterval(fetchPredictions, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [timeRange]);

  const tabs = [
    { id: 'threats', label: 'Threat Predictions', icon: AlertTriangle },
    { id: 'security', label: 'Security Metrics', icon: Shield },
    { id: 'network', label: 'Network Traffic', icon: Network }
  ];

  const timeRanges = [
    { value: '1h', label: '1 Hour' },
    { value: '6h', label: '6 Hours' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ];

  if (loading) {
    return (
      <div className="prediction-graphs-container">
        <div className="loading-spinner">
          <Activity className="animate-spin" size={24} />
          <span>Loading predictions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="prediction-graphs-container">
      <div className="prediction-header">
        <h2>Predictive Analytics Dashboard</h2>
        <div className="prediction-controls">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-select"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="prediction-tabs">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={20} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="prediction-content">
        {activeTab === 'threats' && (
          <ThreatPrediction 
            data={predictionData.threats} 
            timeRange={timeRange}
            realTimeData={realTimeData}
          />
        )}
        {activeTab === 'security' && (
          <SecurityMetricsPrediction 
            data={predictionData.security} 
            timeRange={timeRange}
            realTimeData={realTimeData}
          />
        )}
        {activeTab === 'network' && (
          <NetworkTrafficPrediction 
            data={predictionData.network} 
            timeRange={timeRange}
            realTimeData={realTimeData}
          />
        )}
      </div>
    </div>
  );
};

export default PredictionGraphs;