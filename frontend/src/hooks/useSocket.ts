import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';

let socket: Socket | null = null;

export const useSocket = () => {
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    if (!socket) {
      const accessToken = localStorage.getItem('accessToken');
      
      socket = io('http://localhost:5000', {
        auth: { userId: user.id, tenantId: 'temp' }, // tenantId populated from auth
        extraHeaders: { Authorization: `Bearer ${accessToken}` }
      });

      socket.on('connect', () => {
        console.log('[Socket] Connected:', socket?.id);
      });

      socket.on('call.started', (data: any) => {
        console.log('[Socket] Call started:', data);
      });

      socket.on('call.ended', (data: any) => {
        console.log('[Socket] Call ended:', data);
      });

      socket.on('disconnect', () => {
        console.log('[Socket] Disconnected');
      });
    }

    return () => {
      // Don't disconnect on unmount — keep socket alive globally
    };
  }, [isAuthenticated, user]);

  return socket;
};
