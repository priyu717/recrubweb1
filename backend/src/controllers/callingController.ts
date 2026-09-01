import { Response } from 'express';
import { callingService } from '../services/callingService';
import { AuthRequest } from '../middleware/authMiddleware';

export const callingController = {
  async initiate(req: AuthRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const agentId = req.user!.userId;
      const { candidateId } = req.body;

      const call = await callingService.initiate(tenantId, agentId, candidateId);
      res.status(201).json({ success: true, data: call });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async end(req: AuthRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const { id } = req.params;
      const { duration, disposition } = req.body;

      const call = await callingService.end(tenantId, id, duration, disposition);
      res.status(200).json({ success: true, data: call });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async history(req: AuthRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const history = await callingService.getCallHistory(tenantId);
      res.status(200).json({ success: true, data: history });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};
