import React, { useState, useEffect } from 'react';
import { 
  Server, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Activity, 
  Shield, 
  Users, 
  Key, 
  Clock, 
  TrendingUp,
  AlertTriangle,
  Lock,
  Globe,
  Database,
  Zap,
  ArrowLeft,
  RefreshCw,
  Settings,
  Eye,
  Download,
  Calendar,
  BarChart3
} from 'lucide-react';

const ServiceDetailPage = ({ service, onBack }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [realTimeData, setRealTimeData] = useState({
    ...service,
    uptime: '99.97%',
    responseTime: '45ms',
    activeConnections: 156,
    dataTransferred: '2.4 GB',
    errorRate: '0.03%',
    lastIncident: '12 days ago',
    certificates: 3,
    policies: 12,
    version: 'v2.4.1',
    deployment: 'Production',
    region: 'us-east-1',
    cpu: 23,
    memory: 67,
    disk: 34
  });

  const [chartData] = useState({
    hourlyRequests: [820, 945, 1123, 1245, 1156, 1289, 1456, 1234, 1367, 1445, 1523, 1678],
    threatLevels: [2, 1, 0, 1, 3, 0, 0, 2, 1, 0, 0, 0],
    trustScore: [88, 89, 91, 93, 94, 95, 95, 96, 95, 94, 95, 95],
    responseTime: [45, 42, 48, 51, 44, 46, 43, 47, 45, 44, 46, 45]
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        requests: prev.requests + Math.floor(Math.random() * 50),
        activeConnections: prev.activeConnections + Math.floor(Math.random() * 10) - 5,
        cpu: Math.max(10, Math.min(90, prev.cpu + Math.floor(Math.random() * 10) - 5)),
        memory: Math.max(20, Math.min(95, prev.memory + Math.floor(Math.random() * 6) - 3))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRealTimeData(prev => ({
      ...prev,
      lastVerified: 'Just now'
    }));
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'secure': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'secure': return <CheckCircle size={20} />;
      case 'warning': return <AlertCircle size={20} />;
      case 'critical': return <XCircle size={20} />;
      default: return <AlertCircle size={20} />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Uptime</p>
              <p className="text-2xl font-bold text-gray-900">{realTimeData.uptime}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Activity className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Response Time</p>
              <p className="text-2xl font-bold text-gray-900">{realTimeData.responseTime}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Zap className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Connections</p>
              <p className="text-2xl font-bold text-gray-900">{realTimeData.activeConnections}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Error Rate</p>
              <p className="text-2xl font-bold text-gray-900">{realTimeData.errorRate}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <AlertTriangle className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Volume (Last 12 Hours)</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.hourlyRequests.map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="bg-blue-500 rounded-t-sm w-6 transition-all duration-300 hover:bg-blue-600"
                  style={{ height: `${(value / Math.max(...chartData.hourlyRequests)) * 200}px` }}
                />
                <span className="text-xs text-gray-500 mt-2">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trust Score Trend</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.trustScore.map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="bg-green-500 rounded-t-sm w-6 transition-all duration-300 hover:bg-green-600"
                  style={{ height: `${(value / 100) * 200}px` }}
                />
                <span className="text-xs text-gray-500 mt-2">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Resources */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">CPU Usage</span>
              <span className="text-sm font-medium text-gray-900">{realTimeData.cpu}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${realTimeData.cpu}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Memory Usage</span>
              <span className="text-sm font-medium text-gray-900">{realTimeData.memory}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${realTimeData.memory}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Disk Usage</span>
              <span className="text-sm font-medium text-gray-900">{realTimeData.disk}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${realTimeData.disk}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Policies</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="text-green-600" size={20} />
                <span className="text-sm font-medium">Zero Trust Access</span>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Lock className="text-green-600" size={20} />
                <span className="text-sm font-medium">End-to-End Encryption</span>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Key className="text-yellow-600" size={20} />
                <span className="text-sm font-medium">Multi-Factor Auth</span>
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Warning</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Security Events</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <CheckCircle className="text-green-500 mt-0.5" size={16} />
              <div>
                <p className="text-sm font-medium text-gray-900">Authentication successful</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <AlertCircle className="text-yellow-500 mt-0.5" size={16} />
              <div>
                <p className="text-sm font-medium text-gray-900">Unusual login pattern detected</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <CheckCircle className="text-green-500 mt-0.5" size={16} />
              <div>
                <p className="text-sm font-medium text-gray-900">Security scan completed</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLogs = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Service Logs</h3>
      </div>
      <div className="p-6">
        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 max-h-96 overflow-y-auto">
          <div className="space-y-1">
            <div>[2024-06-14 10:30:15] INFO: Authentication service started successfully</div>
            <div>[2024-06-14 10:30:16] INFO: Database connection established</div>
            <div>[2024-06-14 10:30:17] INFO: Security policies loaded</div>
            <div>[2024-06-14 10:30:20] INFO: Service ready to accept connections</div>
            <div>[2024-06-14 10:31:45] INFO: User authentication: user_id=12345, status=success</div>
            <div>[2024-06-14 10:32:10] WARN: Rate limit warning: IP=192.168.1.100</div>
            <div>[2024-06-14 10:32:15] INFO: Token refreshed: user_id=67890</div>
            <div>[2024-06-14 10:33:00] INFO: Health check passed</div>
            <div>[2024-06-14 10:33:30] INFO: Cache cleared: expired_tokens</div>
            <div>[2024-06-14 10:34:15] INFO: Security scan initiated</div>
            <div>[2024-06-14 10:34:45] INFO: No vulnerabilities detected</div>
            <div>[2024-06-14 10:35:00] INFO: Backup process completed</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Server className="text-blue-600" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{realTimeData.name}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>ID: {realTimeData.id}</span>
                    <span>Version: {realTimeData.version}</span>
                    <span>Region: {realTimeData.region}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2" style={{ color: getStatusColor(realTimeData.status) }}>
                {getStatusIcon(realTimeData.status)}
                <span className="font-semibold">{realTimeData.status.toUpperCase()}</span>
              </div>
              
              <button 
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
          
          {/* Trust Score Bar */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Trust Score</span>
              <span className="text-2xl font-bold text-gray-900">{realTimeData.trust}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="h-3 rounded-full transition-all duration-300"
                style={{ 
                  width: `${realTimeData.trust}%`,
                  backgroundColor: getStatusColor(realTimeData.status)
                }}
              />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'security', label: 'Security', icon: Shield },
                { id: 'logs', label: 'Logs', icon: Eye }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'security' && renderSecurity()}
          {activeTab === 'logs' && renderLogs()}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;