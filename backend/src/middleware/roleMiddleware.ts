import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

export const requireRoles = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    if (!roles.includes(req.user.role) && req.user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ success: false, message: 'Insufficient permissions' });
    }

    next();
  };
};
