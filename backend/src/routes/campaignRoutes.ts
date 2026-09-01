import { Router } from 'express';
import { campaignController } from '../controllers/campaignController';
import { authenticate } from '../middleware/authMiddleware';
import { requireTenant } from '../middleware/tenantMiddleware';

const router = Router();

router.use(authenticate, requireTenant);

router.get('/', campaignController.getAll);
router.post('/', campaignController.create);
router.get('/:campaignId/candidates', campaignController.getCandidates);
router.post('/:campaignId/candidates', campaignController.addCandidate);

export default router;
