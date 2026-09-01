import { Response } from 'express';
import { campaignService } from '../services/campaignService';
import { AuthRequest } from '../middleware/authMiddleware';

export const campaignController = {
  async getAll(req: AuthRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const campaigns = await campaignService.getCampaigns(tenantId);
      res.status(200).json({ success: true, data: campaigns });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async create(req: AuthRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const campaign = await campaignService.createCampaign(tenantId, req.body);
      res.status(201).json({ success: true, data: campaign });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async addCandidate(req: AuthRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const { campaignId } = req.params;
      const { candidateId } = req.body;
      const mapping = await campaignService.addCandidateToCampaign(tenantId, campaignId, candidateId);
      res.status(201).json({ success: true, data: mapping });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async getCandidates(req: AuthRequest, res: Response) {
    try {
      const tenantId = req.user!.tenantId;
      const { campaignId } = req.params;
      const candidates = await campaignService.getCampaignCandidates(tenantId, campaignId);
      res.status(200).json({ success: true, data: candidates });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
};
