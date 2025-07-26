// server/index.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const WebSocketServer = require('./websocketServer');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Initialize WebSocket server
const wsServer = new WebSocketServer(server);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    connections: wsServer.getConnectionCount()
  });
});

// API endpoints for dashboard data
app.get('/api/alerts', (req, res) => {
  res.json(wsServer.getCurrentAlerts());
});

app.get('/api/metrics', (req, res) => {
  res.json(wsServer.getCurrentMetrics());
});

app.get('/api/network-status', (req, res) => {
  res.json(wsServer.getNetworkStatus());
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Zero Trust Dashboard Server running on port ${PORT}`);
  console.log(`📊 WebSocket server initialized`);
  
  // Start real-time data generation
  wsServer.startDataGeneration();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Shutting down server...');
  wsServer.stop();
  server.close(() => {
    console.log('✅ Server shut down gracefully');
    process.exit(0);
  });
});

module.exports = { app, server };