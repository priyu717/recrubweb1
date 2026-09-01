import { Response } from 'express';
import { candidateService } from '../services/candidateService';
import { AuthRequest } from '../middleware/authMiddleware';

export const candidateController = {
  async getAll(req: AuthRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const search = req.query.search as string;
      const candidates = await candidateService.getCandidates(tenantId, search);
      res.status(200).json({ success: true, data: candidates });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async create(req: AuthRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const candidate = await candidateService.createCandidate(tenantId, req.body);
      res.status(201).json({ success: true, data: candidate });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async update(req: AuthRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const candidateId = req.params.id;
      const candidate = await candidateService.updateCandidate(tenantId, candidateId, req.body);
      res.status(200).json({ success: true, data: candidate });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async remove(req: AuthRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const candidateId = req.params.id;
      await candidateService.deleteCandidate(tenantId, candidateId);
      res.status(200).json({ success: true, message: 'Deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
};
