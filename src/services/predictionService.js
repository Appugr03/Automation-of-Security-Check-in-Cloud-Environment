// src/services/predictionService.js
export const predictionService = {
  // Get threat prediction data
  getThreatPredictions: async () => {
    // Simulate API call with mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          currentThreat: 23,
          predicted: [
            { time: '00:00', value: 15, confidence: 0.85 },
            { time: '04:00', value: 12, confidence: 0.82 },
            { time: '08:00', value: 25, confidence: 0.78 },
            { time: '12:00', value: 35, confidence: 0.73 },
            { time: '16:00', value: 28, confidence: 0.79 },
            { time: '20:00', value: 22, confidence: 0.81 },
            { time: '24:00', value: 18, confidence: 0.84 }
          ],
          trend: 'increasing',
          accuracy: 78
        });
      }, 500);
    });
  },

  // Get security metrics predictions
  getSecurityMetricsPredictions: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          currentScore: 82,
          predicted: [
            { time: '00:00', score: 85, incidents: 2 },
            { time: '04:00', score: 87, incidents: 1 },
            { time: '08:00', score: 79, incidents: 4 },
            { time: '12:00', score: 75, incidents: 6 },
            { time: '16:00', score: 78, incidents: 5 },
            { time: '20:00', score: 82, incidents: 3 },
            { time: '24:00', score: 85, incidents: 2 }
          ],
          recommendation: 'Increase monitoring during peak hours (12:00-16:00)',
          expectedIncidents: 23
        });
      }, 500);
    });
  },

  // Get network traffic predictions
  getNetworkTrafficPredictions: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          currentTraffic: 15420,
          predicted: [
            { time: '00:00', normal: 8000, anomalous: 200, total: 8200 },
            { time: '04:00', normal: 6500, anomalous: 150, total: 6650 },
            { time: '08:00', normal: 12000, anomalous: 400, total: 12400 },
            { time: '12:00', normal: 18000, anomalous: 800, total: 18800 },
            { time: '16:00', normal: 16000, anomalous: 600, total: 16600 },
            { time: '20:00', normal: 14000, anomalous: 400, total: 14400 },
            { time: '24:00', main: 10000, anomalous: 300, total: 10300 }
          ],
          peakHour: '12:00',
          anomalyRate: 3.2
        });
      }, 500);
    });
  }
};