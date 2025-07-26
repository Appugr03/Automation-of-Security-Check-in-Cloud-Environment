// src/hooks/useWebSocket.js
import { useEffect, useRef, useCallback, useState } from 'react';

const WEBSOCKET_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
const RECONNECT_INTERVAL = 3000;
const MAX_RECONNECT_ATTEMPTS = 5;
const HEARTBEAT_INTERVAL = 30000;

export const useWebSocket = (options = {}) => {
  const {
    autoConnect = true,
    reconnectAttempts = MAX_RECONNECT_ATTEMPTS,
    onMessage = () => {},
    onConnect = () => {},
    onDisconnect = () => {},
    onError = () => {}
  } = options;

  const [connectionState, setConnectionState] = useState('disconnected');
  const [lastMessage, setLastMessage] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const heartbeatIntervalRef = useRef(null);
  const reconnectCountRef = useRef(0);
  const messageQueueRef = useRef([]);
  const listenersRef = useRef(new Map());

  // Optimized message handler with debouncing for high-frequency updates
  const handleMessage = useCallback((event) => {
    try {
      const data = JSON.parse(event.data);
      setLastMessage(data);
      
      // Keep message history limited for performance
      setMessageHistory(prev => {
        const newHistory = [data, ...prev.slice(0, 99)]; // Keep last 100 messages
        return newHistory;
      });

      // Call specific listeners
      const listeners = listenersRef.current.get(data.type) || [];
      listeners.forEach(listener => {
        try {
          listener(data);
        } catch (error) {
          console.error('Error in message listener:', error);
        }
      });

      onMessage(data);
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  }, [onMessage]);

  // Connection management
  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      setConnectionState('connecting');
      wsRef.current = new WebSocket(WEBSOCKET_URL);

      wsRef.current.onopen = () => {
        console.log('✅ WebSocket connected');
        setConnectionState('connected');
        reconnectCountRef.current = 0;
        
        // Send queued messages
        while (messageQueueRef.current.length > 0) {
          const message = messageQueueRef.current.shift();
          wsRef.current.send(JSON.stringify(message));
        }

        // Start heartbeat
        heartbeatIntervalRef.current = setInterval(() => {
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: 'ping' }));
          }
        }, HEARTBEAT_INTERVAL);

        onConnect();
      };

      wsRef.current.onmessage = handleMessage;

      wsRef.current.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        setConnectionState('error');
        onError(error);
      };

      wsRef.current.onclose = (event) => {
        console.log('🔌 WebSocket disconnected:', event.code, event.reason);
        setConnectionState('disconnected');
        
        // Clear heartbeat
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current);
          heartbeatIntervalRef.current = null;
        }

        onDisconnect(event);

        // Auto-reconnect logic
        if (autoConnect && reconnectCountRef.current < reconnectAttempts) {
          reconnectCountRef.current++;
          console.log(`🔄 Attempting to reconnect (${reconnectCountRef.current}/${reconnectAttempts})...`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, RECONNECT_INTERVAL * reconnectCountRef.current); // Exponential backoff
        }
      };

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setConnectionState('error');
      onError(error);
    }
  }, [autoConnect, reconnectAttempts, onConnect, onDisconnect, onError, handleMessage]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setConnectionState('disconnected');
  }, []);

  // Optimized send with queuing
  const sendMessage = useCallback((message) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(JSON.stringify(message));
        return true;
      } catch (error) {
        console.error('Failed to send message:', error);
        return false;
      }
    } else {
      // Queue message for when connection is ready
      messageQueueRef.current.push(message);
      console.log('Message queued (WebSocket not connected)');
      return false;
    }
  }, []);

  // Subscribe to specific message types
  const subscribe = useCallback((channels) => {
    if (Array.isArray(channels)) {
      sendMessage({ type: 'subscribe', channels });
      return () => {
        sendMessage({ type: 'unsubscribe', channels });
      };
    } else {
      const channel = channels;
      sendMessage({ type: 'subscribe', channels: [channel] });
      return () => {
        sendMessage({ type: 'unsubscribe', channels: [channel] });
      };
    }
  }, [sendMessage]);

  // Add message listener for specific types
  const addMessageListener = useCallback((messageType, listener) => {
    if (!listenersRef.current.has(messageType)) {
      listenersRef.current.set(messageType, []);
    }
    listenersRef.current.get(messageType).push(listener);

    // Return cleanup function
    return () => {
      const listeners = listenersRef.current.get(messageType) || [];
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  // Request current data snapshot
  const requestDataSnapshot = useCallback(() => {
    sendMessage({ type: 'request_data' });
  }, [sendMessage]);

  // Auto-connect on mount
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current);
      }
    };
  }, []);

  return {
    connectionState,
    lastMessage,
    messageHistory: messageHistory.slice(0, 20), // Limit for performance
    isConnected: connectionState === 'connected',
    isConnecting: connectionState === 'connecting',
    connect,
    disconnect,
    sendMessage,
    subscribe,
    addMessageListener,
    requestDataSnapshot,
    reconnectCount: reconnectCountRef.current
  };
};