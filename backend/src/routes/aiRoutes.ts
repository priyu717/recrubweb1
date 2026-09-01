import { Router } from 'express';
import { Response } from 'express';
import { aiService } from '../services/aiService';
import { authenticate } from '../middleware/authMiddleware';
import { requireTenant } from '../middleware/tenantMiddleware';
import { AuthRequest } from '../middleware/authMiddleware';

const router = Router();
router.use(authenticate, requireTenant);

// Trigger AI analysis for a completed call
router.post('/analyze-call/:callId', async (req: AuthRequest, res: Response) => {
  try {
    const { callId } = req.params;
    const result = await aiService.analyzeCall(callId);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Match a candidate to a job
router.post('/match-candidate', async (req: AuthRequest, res: Response) => {
  try {
    const { candidateId, jobRequirements } = req.body;
    const result = await aiService.matchCandidate(candidateId, jobRequirements);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
