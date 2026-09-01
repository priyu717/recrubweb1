import { Router } from 'express';
import { Response } from 'express';
import { analyticsService } from '../services/analyticsService';
import { authenticate } from '../middleware/authMiddleware';
import { requireTenant } from '../middleware/tenantMiddleware';
import { AuthRequest } from '../middleware/authMiddleware';

const router = Router();
router.use(authenticate, requireTenant);

router.get('/dashboard', async (req: AuthRequest, res: Response) => {
  try {
    const metrics = await analyticsService.getDashboardMetrics(req.user!.tenantId);
    res.status(200).json({ success: true, data: metrics });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/calls-over-time', async (req: AuthRequest, res: Response) => {
  try {
    const days = parseInt(req.query.days as string) || 7;
    const data = await analyticsService.getCallsOverTime(req.user!.tenantId, days);
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/candidate-breakdown', async (req: AuthRequest, res: Response) => {
  try {
    const data = await analyticsService.getCandidateStatusBreakdown(req.user!.tenantId);
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
