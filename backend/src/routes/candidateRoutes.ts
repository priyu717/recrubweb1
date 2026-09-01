import { Router } from 'express';
import { candidateController } from '../controllers/candidateController';
import { authenticate } from '../middleware/authMiddleware';
import { requireTenant } from '../middleware/tenantMiddleware';

const router = Router();

router.use(authenticate, requireTenant);

router.get('/', candidateController.getAll);
router.post('/', candidateController.create);
router.put('/:id', candidateController.update);
router.delete('/:id', candidateController.remove);

export default router;
