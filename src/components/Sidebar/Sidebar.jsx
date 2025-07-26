import React from 'react';
import { Shield, Server, Users, AlertTriangle, Lock, Eye, Activity, Network, Bug, BarChart3, TrendingUp, Radar, ChevronRight, GitBranch } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'services', label: 'Services', icon: Server },
    { id: 'network', label: 'Network', icon: Network },
    { 
      id: 'threats', 
      label: 'Threats', 
      icon: AlertTriangle,
      subItems: [
        { id: 'threat-overview', label: 'Threat Map', icon: Network },
        { id: 'threat-graphs', label: 'Threat Graph', icon: GitBranch },
        // { id: 'threat-trends', label: 'Trend Analysis', icon: TrendingUp },
        // { id: 'threat-vectors', label: 'Vector Analysis', icon: Radar },
        // { id: 'threat-analytics', label: 'Analytics', icon: BarChart3 }
      ]
    },
    { id: 'access', label: 'Access Control', icon: Lock },
    { id: 'monitoring', label: 'Monitoring', icon: Eye },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'apilist', label: 'Insecure APIs', icon: Bug }
  ];

  const isThreatsExpanded = activeTab === 'threats' || 
                           activeTab === 'threat-overview' || 
                           activeTab === 'threat-graphs' || 
                           activeTab === 'threat-trends' || 
                           activeTab === 'threat-vectors' ||
                           activeTab === 'threat-analytics';

  return (
    <div className="sidebar">
      <div className="sidebar-header-line"></div>
      
      <div className="sidebar-header">
        <div className="sidebar-header-content">
          <Shield className="sidebar-icon" size={28} />
          <div>
            <h2 className="sidebar-title">Zero Trust</h2>
            <span className="sidebar-subtitle">Security Dashboard</span>
          </div>
        </div>
      </div>
            
      <nav className="sidebar-nav">
        {menuItems.map(item => {
          const Icon = item.icon;
          
          if (item.subItems) {
            return (
              <div key={item.id}>
                <button
                  className={`sidebar-item ${isThreatsExpanded ? 'active' : ''}`}
                  onClick={() => setActiveTab('threats')}
                >
                  <div className="sidebar-item-indicator"></div>
                  <div className="sidebar-item-content">
                    <Icon size={20} />
                    <span className="sidebar-item-text">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className={`sidebar-chevron ${isThreatsExpanded ? 'expanded' : ''}`} />
                </button>
                
                <div className={`sidebar-submenu ${isThreatsExpanded ? 'expanded' : ''}`}>
                  {item.subItems.map(subItem => {
                    const SubIcon = subItem.icon;
                    return (
                      <button
                        key={subItem.id}
                        className={`sidebar-subitem ${activeTab === subItem.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(subItem.id)}
                      >
                        <div className={`sidebar-subitem-dot ${activeTab === subItem.id ? 'active' : ''}`}></div>
                        <div className="sidebar-subitem-icon">
                          <SubIcon size={16} />
                        </div>
                        <span>{subItem.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          }
          
          return (
            <button
              key={item.id}
              className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <div className="sidebar-item-indicator"></div>
              <Icon size={20} />
              <span className="sidebar-item-text">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-status">
          <div className="sidebar-status-dot"></div>
          <span>System Secure</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;