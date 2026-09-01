import { Router } from 'express';
import { callingController } from '../controllers/callingController';
import { authenticate } from '../middleware/authMiddleware';
import { requireTenant } from '../middleware/tenantMiddleware';

const router = Router();

router.use(authenticate, requireTenant);

router.get('/', callingController.history);
router.post('/initiate', callingController.initiate);
router.post('/:id/end', callingController.end);

export default router;
