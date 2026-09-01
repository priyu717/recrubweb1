import { Request, Response } from 'express';
import { userService } from '../services/userService';
import { AuthRequest } from '../middleware/authMiddleware';

export const userController = {
  async getTeam(req: AuthRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const users = await userService.getUsersByTenant(tenantId);
      res.status(200).json({ success: true, data: users });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async createUser(req: AuthRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      // TODO: Add zod validation for req.body
      const newUser = await userService.createUser(tenantId, req.body);
      res.status(201).json({ success: true, data: newUser });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async getRoles(req: Request, res: Response) {
    try {
      const roles = await userService.getRoles();
      res.status(200).json({ success: true, data: roles });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};
