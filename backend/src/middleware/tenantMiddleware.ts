import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

export const requireTenant = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.tenantId) {
    return res.status(403).json({ success: false, message: 'Tenant context missing or unauthorized' });
  }

  // Optional: We could attach a scoped prisma client here, but explicitly passing tenantId to queries is more transparent.
  next();
};
