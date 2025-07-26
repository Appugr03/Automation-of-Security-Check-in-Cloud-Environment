import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter, AreaChart, Area } from 'recharts';
import { Shield, Activity, AlertTriangle, Users, Network, TrendingUp, Eye, Lock, MapPin, BarChart3, Globe, Zap } from 'lucide-react';

const ThreatGraph = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedAnalysisType, setSelectedAnalysisType] = useState('threat-correlation');
  const [realTimeData, setRealTimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data generators for different analysis types
  const generateThreatCorrelationData = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return hours.map(hour => ({
      time: `${hour}:00`,
      malware: Math.floor(Math.random() * 50) + 10,
      phishing: Math.floor(Math.random() * 30) + 5,
      ddos: Math.floor(Math.random() * 20) + 2,
      intrusion: Math.floor(Math.random() * 15) + 1,
      anomaly: Math.floor(Math.random() * 40) + 8
    }));
  };

  const generateNetworkTopologyData = () => {
    return [
      { node: 'Web Server', connections: 145, trust_score: 85, risk_level: 'Low' },
      { node: 'Database', connections: 89, trust_score: 92, risk_level: 'Low' },
      { node: 'API Gateway', connections: 234, trust_score: 78, risk_level: 'Medium' },
      { node: 'Load Balancer', connections: 156, trust_score: 88, risk_level: 'Low' },
      { node: 'Auth Service', connections: 67, trust_score: 95, risk_level: 'Low' },
      { node: 'File Server', connections: 45, trust_score: 72, risk_level: 'Medium' },
      { node: 'Backup System', connections: 23, trust_score: 90, risk_level: 'Low' },
      { node: 'Monitoring', connections: 178, trust_score: 85, risk_level: 'Low' }
    ];
  };

  const generateAccessPatternData = () => {
    const patterns = ['Normal', 'Suspicious', 'High Risk', 'Blocked'];
    return patterns.map(pattern => ({
      pattern,
      count: Math.floor(Math.random() * 1000) + 100,
      percentage: Math.floor(Math.random() * 100)
    }));
  };

  const generateSecurityMetricsData = () => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toLocaleDateString();
    }).reverse();

    return days.map(day => ({
      date: day,
      threats_detected: Math.floor(Math.random() * 100) + 20,
      incidents_resolved: Math.floor(Math.random() * 80) + 15,
      false_positives: Math.floor(Math.random() * 30) + 5,
      response_time: Math.floor(Math.random() * 300) + 60
    }));
  };

  // New data generators for additional chart types
  const generateHourlyAttackData = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return hours.map(hour => ({
      hour: `${hour}:00`,
      attacks: Math.floor(Math.random() * 100) + 10,
      blocked: Math.floor(Math.random() * 80) + 5,
      severity: Math.floor(Math.random() * 50) + 10
    }));
  };

  const generateThreatTypeData = () => {
    return [
      { name: 'Malware', value: 35, color: '#ef4444' },
      { name: 'Phishing', value: 25, color: '#f59e0b' },
      { name: 'DDoS', value: 20, color: '#8b5cf6' },
      { name: 'Intrusion', value: 12, color: '#06b6d4' },
      { name: 'Anomaly', value: 8, color: '#10b981' }
    ];
  };

  const generateHeatmapData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const data = [];
    
    days.forEach((day, dayIndex) => {
      hours.forEach((hour, hourIndex) => {
        data.push({
          day,
          hour,
          dayIndex,
          hourIndex,
          value: Math.floor(Math.random() * 100) + 1,
          intensity: Math.random()
        });
      });
    });
    
    return data;
  };

  const generateGeographicData = () => {
    return [
      { country: 'USA', attacks: 1245, lat: 39.8283, lng: -98.5795 },
      { country: 'China', attacks: 892, lat: 35.8617, lng: 104.1954 },
      { country: 'Russia', attacks: 643, lat: 61.5240, lng: 105.3188 },
      { country: 'Germany', attacks: 387, lat: 51.1657, lng: 10.4515 },
      { country: 'UK', attacks: 298, lat: 55.3781, lng: -3.4360 },
      { country: 'India', attacks: 567, lat: 20.5937, lng: 78.9629 },
      { country: 'Brazil', attacks: 234, lat: -14.2350, lng: -51.9253 },
      { country: 'Japan', attacks: 178, lat: 36.2048, lng: 138.2529 }
    ];
  };

  const generateRealTimeAlerts = () => {
    const alertTypes = ['Critical', 'High', 'Medium', 'Low'];
    const sources = ['Web Server', 'Database', 'API Gateway', 'Auth Service'];
    
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      timestamp: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
      type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
      severity: Math.floor(Math.random() * 100) + 1,
      description: `Security event detected from ${sources[Math.floor(Math.random() * sources.length)]}`
    }));
  };

  // Data for different analysis types
  const threatCorrelationData = useMemo(() => generateThreatCorrelationData(), [selectedTimeRange]);
  const networkTopologyData = useMemo(() => generateNetworkTopologyData(), []);
  const accessPatternData = useMemo(() => generateAccessPatternData(), []);
  const securityMetricsData = useMemo(() => generateSecurityMetricsData(), []);
  const hourlyAttackData = useMemo(() => generateHourlyAttackData(), []);
  const threatTypeData = useMemo(() => generateThreatTypeData(), []);
  const heatmapData = useMemo(() => generateHeatmapData(), []);
  const geographicData = useMemo(() => generateGeographicData(), []);

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(generateRealTimeAlerts());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Initial data load with loading animation
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setRealTimeData(generateRealTimeAlerts());
      setIsLoading(false);
    }, 2000);
  }, []);

  const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#06b6d4'];

 // Enhanced Line Chart   
const renderThreatTrendLineChart = () => (
  <div className="chart-container" style={{ animation: 'slideInLeft 0.6s ease-out' }}>
    <h3 className="chart-title">
      <TrendingUp className="chart-icon" size={20} style={{ color: '#3b82f6' }} />
      Threat Trends Over Time
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={securityMetricsData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="date" 
          stroke="#6b7280"
          label={{ value: 'Time', position: 'insideBottom', offset: -5 }}
        />
        <YAxis 
          stroke="#6b7280"
          label={{ value: 'Threat Level', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px'
          }}
        />
        <Legend />
        <Line 
          type="monotone"
          dataKey="threats_detected"
          stroke="#ef4444"
          strokeWidth={3}
          dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
        />
        <Line 
          type="monotone"
          dataKey="incidents_resolved"
          stroke="#10b981"
          strokeWidth={3}
          dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
// Enhanced Bar Chart   
// Enhanced Bar Chart   
const renderHourlyAttackBarChart = () => (
  <div className="chart-container" style={{ animation: 'slideInRight 0.6s ease-out' }}>
    <h3 className="chart-title">
      <BarChart3 className="chart-icon" size={20} style={{ color: '#8b5cf6' }} />
      Hourly Attack Distribution
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={hourlyAttackData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="hour" 
          stroke="#6b7280" 
          label={{ 
            value: 'Attack Time Window', 
            position: 'insideBottom', 
            offset: -10,
            style: { textAnchor: 'middle' }
          }}
        />
        <YAxis 
          stroke="#6b7280" 
          label={{ 
            value: 'Number of Events', 
            angle: -90, 
            position: 'insideLeft',
            style: { textAnchor: 'middle' }
          }} 
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px'
          }}
        />
        <Legend />
        <Bar 
          dataKey="attacks"
          fill="#ef4444"
          radius={[4, 4, 0, 0]}
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
        />
        <Bar 
          dataKey="blocked"
          fill="#10b981"
          radius={[4, 4, 0, 0]}
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);  // Enhanced Pie Chart
  const renderThreatTypePieChart = () => (
    <div className="chart-container" style={{ animation: 'slideInUp 0.6s ease-out' }}>
      <h3 className="chart-title">
        <AlertTriangle className="chart-icon" size={20} style={{ color: '#f59e0b' }} />
        Threat Type Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={threatTypeData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {threatTypeData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke="#fff"
                strokeWidth={2}
                style={{ 
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#f9fafb', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px' 
            }} 
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  // Heatmap Visualization
  const renderHeatmap = () => {
    const maxValue = Math.max(...heatmapData.map(d => d.value));
    const getIntensityColor = (value) => {
      const intensity = value / maxValue;
      return `rgba(239, 68, 68, ${intensity})`;
    };

    return (
      <div className="chart-container" style={{ animation: 'slideInLeft 0.6s ease-out' }}>
        <h3 className="chart-title">
          <Activity className="chart-icon" size={20} style={{ color: '#ef4444' }} />
          Attack Intensity Heatmap
        </h3>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(24, 1fr)', gap: '2px' }}>
            {/* Hour labels */}
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} style={{ 
                fontSize: '10px', 
                textAlign: 'center', 
                color: '#6b7280',
                paddingBottom: '5px'
              }}>
                {i}
              </div>
            ))}
            
            {/* Day labels and heatmap cells */}
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, dayIndex) => (
              <React.Fragment key={day}>
                {heatmapData
                  .filter(d => d.dayIndex === dayIndex)
                  .map((cell, hourIndex) => (
                    <div
                      key={`${day}-${hourIndex}`}
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: getIntensityColor(cell.value),
                        borderRadius: '2px',
                        border: '1px solid #e5e7eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '8px',
                        color: cell.value > maxValue * 0.5 ? '#fff' : '#374151',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease',
                        position: 'relative'
                      }}
                      title={`${day} ${hourIndex}:00 - ${cell.value} attacks`}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.2)';
                        e.target.style.zIndex = '10';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.zIndex = '1';
                      }}
                    >
                      {cell.value > 50 ? cell.value : ''}
                    </div>
                  ))}
              </React.Fragment>
            ))}
          </div>
          <div style={{ marginTop: '15px', fontSize: '12px', color: '#6b7280' }}>
            <span>Days: Mon-Sun (vertical) | Hours: 0-23 (horizontal)</span>
          </div>
        </div>
      </div>
    );
  };

  // Map Visualization
  const renderGeographicMap = () => (
    <div className="chart-container" style={{ animation: 'slideInRight 0.6s ease-out' }}>
      <h3 className="chart-title">
        <Globe className="chart-icon" size={20} style={{ color: '#06b6d4' }} />
        Global Attack Distribution
      </h3>
      <div style={{ padding: '20px', height: '300px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px',
          height: '100%'
        }}>
          {geographicData.map((country, index) => (
            <div 
              key={country.country}
              style={{
                backgroundColor: '#fff',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
                animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              <MapPin size={24} style={{ color: '#ef4444', marginBottom: '8px' }} />
              <h4 style={{ margin: '0 0 8px 0', color: '#374151', fontSize: '14px', fontWeight: '600' }}>
                {country.country}
              </h4>
              <p style={{ margin: '0', color: '#ef4444', fontSize: '18px', fontWeight: '700' }}>
                {country.attacks}
              </p>
              <p style={{ margin: '4px 0 0 0', color: '#6b7280', fontSize: '12px' }}>
                attacks
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderThreatCorrelationChart = () => (
  <div className="chart-container" style={{ animation: 'slideInLeft 0.6s ease-out' }}>
    <h3 className="chart-title">
      <AlertTriangle className="chart-icon" size={20} style={{ color: '#ef4444' }} />
      Threat Correlation Analysis
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={threatCorrelationData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="time" 
          stroke="#6b7280"
          label={{ value: 'Monitoring Hour', position: 'insideBottom', offset: -5 }}
        />
        <YAxis 
          stroke="#6b7280"
          label={{ value: 'Threat Count', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px'
          }}
        />
        <Legend />
        <Area 
          type="monotone"
          dataKey="malware"
          stackId="1"
          stroke="#ef4444"
          fill="#ef4444"
          fillOpacity={0.6}
        />
        <Area 
          type="monotone"
          dataKey="phishing"
          stackId="1"
          stroke="#f59e0b"
          fill="#f59e0b"
          fillOpacity={0.6}
        />
        <Area 
          type="monotone"
          dataKey="ddos"
          stackId="1"
          stroke="#8b5cf6"
          fill="#8b5cf6"
          fillOpacity={0.6}
        />
        <Area 
          type="monotone"
          dataKey="intrusion"
          stackId="1"
          stroke="#06b6d4"
          fill="#06b6d4"
          fillOpacity={0.6}
        />
        <Area 
          type="monotone"
          dataKey="anomaly"
          stackId="1"
          stroke="#10b981"
          fill="#10b981"
          fillOpacity={0.6}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

  const renderNetworkTopologyChart = () => (
    <div className="chart-container" style={{ animation: 'slideInRight 0.6s ease-out' }}>
      <h3 className="chart-title">
        <Network className="chart-icon" size={20} style={{ color: '#3b82f6' }} />
        Network Topology Analysis
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart data={networkTopologyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis type="number" dataKey="connections" name="Connections" stroke="#6b7280" />
          <YAxis type="number" dataKey="trust_score" name="Trust Score" stroke="#6b7280" />
          <Tooltip 
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{ 
              backgroundColor: '#f9fafb', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px' 
            }} 
          />
          <Scatter 
            name="Network Nodes" 
            dataKey="trust_score" 
            fill="#3b82f6" 
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );

  const renderRealTimeAlerts = () => (
    <div className="chart-container" style={{ animation: 'slideInUp 0.6s ease-out' }}>
      <h3 className="chart-title">
        <Activity className="chart-icon" size={20} style={{ color: '#10b981' }} />
        Real-time Security Alerts
      </h3>
      <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px' }}>
        {realTimeData.slice(0, 8).map((alert, index) => (
          <div 
            key={alert.id} 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              marginBottom: '8px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              transition: 'all 0.3s ease',
              animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div 
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: 
                    alert.type === 'Critical' ? '#ef4444' :
                    alert.type === 'High' ? '#f59e0b' :
                    alert.type === 'Medium' ? '#3b82f6' : '#10b981',
                  marginRight: '12px'
                }}
              />
              <div>
                <div style={{ fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                  {alert.description}
                </div>
                <div style={{ color: '#6b7280', fontSize: '12px' }}>
                  {alert.source} • {alert.timestamp}
                </div>
              </div>
            </div>
            <span 
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#fff',
                backgroundColor: 
                  alert.type === 'Critical' ? '#ef4444' :
                  alert.type === 'High' ? '#f59e0b' :
                  alert.type === 'Medium' ? '#3b82f6' : '#10b981'
              }}
            >
              {alert.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderKPICards = () => {
    const kpis = [
      { title: 'Active Threats', value: '24', change: '+12%', icon: Shield, color: '#ef4444' },
      { title: 'Trust Score', value: '87%', change: '+3%', icon: Lock, color: '#10b981' },
      { title: 'Network Nodes', value: '156', change: '+8', icon: Network, color: '#3b82f6' },
      { title: 'Incidents Today', value: '7', change: '-23%', icon: Eye, color: '#8b5cf6' }
    ];

    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        {kpis.map((kpi, index) => (
          <div 
            key={index} 
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'all 0.3s ease',
              animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
            }}
          >
            <div>
              <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: '14px' }}>
                {kpi.title}
              </p>
              <p style={{ margin: '0 0 4px 0', color: '#374151', fontSize: '24px', fontWeight: '700' }}>
                {kpi.value}
              </p>
              <p style={{ 
                margin: '0', 
                color: kpi.change.startsWith('+') ? '#10b981' : '#ef4444',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {kpi.change}
              </p>
            </div>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: `${kpi.color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <kpi.icon size={24} style={{ color: kpi.color }} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e5e7eb',
          borderTop: '4px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ marginTop: '20px', color: '#6b7280', fontSize: '16px' }}>
          Loading Security Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '20px'
    }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes slideInLeft {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideInUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .chart-container {
            backgroundColor: #fff;
            padding: 20px;
            borderRadius: 12px;
            border: 1px solid #e5e7eb;
            boxShadow: 0 2px 8px rgba(0,0,0,0.1);
            marginBottom: 20px;
          }
          .chart-title {
            display: flex;
            alignItems: center;
            gap: 8px;
            margin: 0 0 16px 0;
            color: #374151;
            fontSize: 18px;
            fontWeight: 600;
          }
        `}
      </style>
      
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            margin: '0 0 8px 0', 
            color: '#111827', 
            fontSize: '32px', 
            fontWeight: '700' 
          }}>
            Zero Trust Security - Enhanced Dashboard
          </h1>
          <p style={{ 
            margin: '0', 
            color: '#6b7280', 
            fontSize: '16px' 
          }}>
            Real-time security analytics with comprehensive threat intelligence visualization
          </p>
        </div>

        {/* Controls */}
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          marginBottom: '30px',
          justifyContent: 'center'
        }}>
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#fff',
              color: '#374151',
              fontSize: '14px'
            }}
          >
            <option value="1h">Last 1 Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          
          <select
            value={selectedAnalysisType}
            onChange={(e) => setSelectedAnalysisType(e.target.value)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#fff',
              color: '#374151',
              fontSize: '14px'
            }}
          >
            <option value="threat-correlation">Threat Correlation</option>
            <option value="network-topology">Network Topology</option>
            <option value="access-patterns">Access Patterns</option>
            <option value="security-metrics">Security Metrics</option>
          </select>
        </div>

        {/* KPI Cards */}
        {renderKPICards()}

        {/* Main Dashboard Grid - Line Chart and Bar Chart */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          {renderThreatTrendLineChart()}
          {renderHourlyAttackBarChart()}
        </div>

        {/* Secondary Grid - Pie Chart and Heatmap */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          {renderThreatTypePieChart()}
          {renderHeatmap()}
        </div>

      

        {/* Original Charts Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
          gap: '20px',
          marginBottom: '20px'
        }}>
          {renderThreatCorrelationChart()}
          {renderNetworkTopologyChart()}
        </div>

        Real-time Alerts
        <div style={{ marginBottom: '20px' }}>
          {renderRealTimeAlerts()}
        </div>

        {/* Network Topology Table */}
        <div className="chart-container" style={{ animation: 'slideInUp 0.6s ease-out' }}>
          <h3 className="chart-title">
            <Network className="chart-icon" size={20} style={{ color: '#3b82f6' }} />
            Network Node Details
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              fontSize: '14px'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  <th style={{ 
                    padding: '12px', 
                    textAlign: 'left', 
                    borderBottom: '1px solid #e5e7eb',
                    color: '#374151',
                    fontWeight: '600'
                  }}>
                    Node
                  </th>
                  <th style={{ 
                    padding: '12px', 
                    textAlign: 'left', 
                    borderBottom: '1px solid #e5e7eb',
                    color: '#374151',
                    fontWeight: '600'
                  }}>
                    Connections
                  </th>
                  <th style={{ 
                    padding: '12px', 
                    textAlign: 'left', 
                    borderBottom: '1px solid #e5e7eb',
                    color: '#374151',
                    fontWeight: '600'
                  }}>
                    Trust Score
                  </th>
                  <th style={{ 
                    padding: '12px', 
                    textAlign: 'left', 
                    borderBottom: '1px solid #e5e7eb',
                    color: '#374151',
                    fontWeight: '600'
                  }}>
                    Risk Level
                  </th>
                </tr>
              </thead>
              <tbody>
                {networkTopologyData.map((node, index) => (
                  <tr 
                    key={index} 
                    style={{
                      animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <td style={{ 
                      padding: '12px', 
                      borderBottom: '1px solid #e5e7eb',
                      color: '#374151',
                      fontWeight: '600'
                    }}>
                      {node.node}
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      borderBottom: '1px solid #e5e7eb',
                      color: '#6b7280'
                    }}>
                      {node.connections}
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      borderBottom: '1px solid #e5e7eb',
                      color: '#6b7280'
                    }}>
                      {node.trust_score}%
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#fff',
                        backgroundColor: 
                          node.risk_level === 'Low' ? '#10b981' :
                          node.risk_level === 'Medium' ? '#f59e0b' : '#ef4444'
                      }}>
                        {node.risk_level}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="chart-container" style={{ 
          animation: 'slideInUp 0.6s ease-out',
          marginTop: '20px'
        }}>
          <h3 className="chart-title">
            <Zap className="chart-icon" size={20} style={{ color: '#f59e0b' }} />
            Security Summary
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444' }}>
                {threatTypeData.reduce((sum, item) => sum + item.value, 0)}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                Total Threats Detected
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>
                {networkTopologyData.length}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                Network Nodes Monitored
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6' }}>
                {geographicData.reduce((sum, item) => sum + item.attacks, 0)}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                Global Attack Attempts
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#8b5cf6' }}>
                99.7%
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                System Uptime
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatGraph;