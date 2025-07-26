// Constants for zero-trust security dashboard

// Security Risk Levels
export const RISK_LEVELS = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

// Threat Severity Levels
export const THREAT_SEVERITY = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  INFO: 'info'
};

// Alert Types
export const ALERT_TYPES = {
  SECURITY: 'security',
  COMPLIANCE: 'compliance',
  NETWORK: 'network',
  ACCESS: 'access',
  SYSTEM: 'system',
  AUTHENTICATION: 'authentication'
};

// Alert Status
export const ALERT_STATUS = {
  ACTIVE: 'active',
  INVESTIGATING: 'investigating',
  RESOLVED: 'resolved',
  DISMISSED: 'dismissed'
};

// Device Status
export const DEVICE_STATUS = {
  TRUSTED: 'trusted',
  UNTRUSTED: 'untrusted',
  UNKNOWN: 'unknown',
  QUARANTINED: 'quarantined'
};

// Service Status
export const SERVICE_STATUS = {
  HEALTHY: 'healthy',
  WARNING: 'warning',
  CRITICAL: 'critical',
  OFFLINE: 'offline'
};

// Network Status
export const NETWORK_STATUS = {
  SECURE: 'secure',
  MONITORING: 'monitoring',
  THREAT_DETECTED: 'threat_detected',
  BLOCKED: 'blocked'
};

// Authentication Methods
export const AUTH_METHODS = {
  MFA: 'mfa',
  SSO: 'sso',
  BIOMETRIC: 'biometric',
  CERTIFICATE: 'certificate',
  TOKEN: 'token'
};

// Access Control Actions
export const ACCESS_ACTIONS = {
  ALLOW: 'allow',
  DENY: 'deny',
  CHALLENGE: 'challenge',
  QUARANTINE: 'quarantine'
};

// Color Palette for Dashboard
export const COLORS = {
  // Primary Colors
  PRIMARY: '#1E40AF',
  PRIMARY_LIGHT: '#3B82F6',
  PRIMARY_DARK: '#1E3A8A',
  
  // Status Colors
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  CRITICAL: '#DC2626',
  INFO: '#3B82F6',
  
  // Neutral Colors
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY_50: '#F9FAFB',
  GRAY_100: '#F3F4F6',
  GRAY_200: '#E5E7EB',
  GRAY_300: '#D1D5DB',
  GRAY_400: '#9CA3AF',
  GRAY_500: '#6B7280',
  GRAY_600: '#4B5563',
  GRAY_700: '#374151',
  GRAY_800: '#1F2937',
  GRAY_900: '#111827',
  
  // Background Colors
  BG_PRIMARY: '#0F172A',
  BG_SECONDARY: '#1E293B',
  BG_TERTIARY: '#334155',
  
  // Accent Colors
  ACCENT_BLUE: '#0EA5E9',
  ACCENT_GREEN: '#22C55E',
  ACCENT_PURPLE: '#8B5CF6',
  ACCENT_ORANGE: '#FB923C',
  ACCENT_RED: '#F87171'
};

// Chart Colors for Data Visualization
export const CHART_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#84CC16', // Lime
  '#F97316', // Orange
  '#EC4899', // Pink
  '#6366F1'  // Indigo
];

// Dashboard Refresh Intervals (in milliseconds)
export const REFRESH_INTERVALS = {
  REAL_TIME: 1000,      // 1 second
  FAST: 5000,           // 5 seconds
  NORMAL: 30000,        // 30 seconds
  SLOW: 60000,          // 1 minute
  VERY_SLOW: 300000     // 5 minutes
};

// API Endpoints
export const API_ENDPOINTS = {
  SECURITY_METRICS: '/api/security/metrics',
  THREATS: '/api/security/threats',
  ALERTS: '/api/security/alerts',
  DEVICES: '/api/devices',
  SERVICES: '/api/services',
  NETWORK: '/api/network',
  ACCESS_LOGS: '/api/access/logs',
  COMPLIANCE: '/api/compliance',
  USERS: '/api/users'
};

// Dashboard Layout Constants
export const LAYOUT = {
  SIDEBAR_WIDTH: 280,
  HEADER_HEIGHT: 64,
  CARD_PADDING: 24,
  GRID_GAP: 24,
  BORDER_RADIUS: 12
};

// Data Limits
export const DATA_LIMITS = {
  MAX_ALERTS: 100,
  MAX_LOGS: 1000,
  MAX_CHART_POINTS: 50,
  MAX_THREAT_HISTORY: 500
};

// Time Ranges for Analytics
export const TIME_RANGES = {
  LAST_HOUR: '1h',
  LAST_24_HOURS: '24h',
  LAST_7_DAYS: '7d',
  LAST_30_DAYS: '30d',
  LAST_90_DAYS: '90d'
};

// Security Thresholds
export const SECURITY_THRESHOLDS = {
  CRITICAL_SCORE: 50,
  HIGH_RISK_SCORE: 70,
  MEDIUM_RISK_SCORE: 85,
  MAX_FAILED_ATTEMPTS: 5,
  SESSION_TIMEOUT: 3600000, // 1 hour in milliseconds
  PASSWORD_MIN_LENGTH: 12,
  MFA_REQUIRED_SCORE: 70
};

// Network Thresholds
export const NETWORK_THRESHOLDS = {
  HIGH_LATENCY: 100,        // milliseconds
  HIGH_PACKET_LOSS: 2,      // percentage
  HIGH_BANDWIDTH: 80,       // percentage
  LOW_UPTIME: 95           // percentage
};

// Compliance Standards
export const COMPLIANCE_STANDARDS = {
  SOC2: 'SOC 2',
  ISO27001: 'ISO 27001',
  GDPR: 'GDPR',
  HIPAA: 'HIPAA',
  PCI_DSS: 'PCI DSS',
  NIST: 'NIST Framework'
};

// Device Types
export const DEVICE_TYPES = {
  DESKTOP: 'desktop',
  LAPTOP: 'laptop',
  MOBILE: 'mobile',
  TABLET: 'tablet',
  SERVER: 'server',
  IOT: 'iot',
  PRINTER: 'printer',
  ROUTER: 'router',
  FIREWALL: 'firewall'
};

// Operating Systems
export const OPERATING_SYSTEMS = {
  WINDOWS: 'Windows',
  MACOS: 'macOS',
  LINUX: 'Linux',
  ANDROID: 'Android',
  IOS: 'iOS',
  UNKNOWN: 'Unknown'
};

// Geographic Regions for Threat Map
export const REGIONS = {
  NORTH_AMERICA: 'North America',
  SOUTH_AMERICA: 'South America',
  EUROPE: 'Europe',
  ASIA: 'Asia',
  AFRICA: 'Africa',
  OCEANIA: 'Oceania'
};

// Common Threat Types
export const THREAT_TYPES = {
  MALWARE: 'malware',
  PHISHING: 'phishing',
  RANSOMWARE: 'ransomware',
  DDoS: 'ddos',
  INTRUSION: 'intrusion',
  DATA_BREACH: 'data_breach',
  INSIDER_THREAT: 'insider_threat',
  SOCIAL_ENGINEERING: 'social_engineering',
  ZERO_DAY: 'zero_day',
  BRUTE_FORCE: 'brute_force'
};

// Dashboard Animations
export const ANIMATIONS = {
  FADE_IN: 'fadeIn 0.3s ease-in',
  SLIDE_IN: 'slideIn 0.4s ease-out',
  BOUNCE: 'bounce 0.6s ease-in-out',
  PULSE: 'pulse 2s infinite'
};

// Export grouped constants for easier imports
export const SECURITY = {
  RISK_LEVELS,
  THREAT_SEVERITY,
  ALERT_TYPES,
  ALERT_STATUS,
  SECURITY_THRESHOLDS,
  THREAT_TYPES
};

export const DEVICES = {
  DEVICE_STATUS,
  DEVICE_TYPES,
  OPERATING_SYSTEMS
};

export const NETWORK = {
  NETWORK_STATUS,
  NETWORK_THRESHOLDS
};

export const UI = {
  COLORS,
  CHART_COLORS,
  LAYOUT,
  ANIMATIONS
};

export const DATA = {
  REFRESH_INTERVALS,
  DATA_LIMITS,
  TIME_RANGES,
  API_ENDPOINTS
};