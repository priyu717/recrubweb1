import { Server, Socket } from 'socket.io';

export const initSockets = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    const { userId, tenantId } = socket.handshake.auth;
    console.log(`[Socket] User ${userId} connected (Tenant: ${tenantId})`);

    // Join a tenant-specific room so broadcasts are isolated per company
    if (tenantId) {
      socket.join(`tenant:${tenantId}`);
    }

    // Agent status change
    socket.on('agent:setStatus', (status: string) => {
      io.to(`tenant:${tenantId}`).emit('agent:statusChanged', { userId, status });
    });

    socket.on('disconnect', () => {
      console.log(`[Socket] User ${userId} disconnected`);
    });
  });
};

// Utility to emit events from backend services
export const emitToTenant = (io: Server, tenantId: string, event: string, data: any) => {
  io.to(`tenant:${tenantId}`).emit(event, data);
};
