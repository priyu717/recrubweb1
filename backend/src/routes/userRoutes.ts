import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';
import { requireTenant } from '../middleware/tenantMiddleware';
import { requireRoles } from '../middleware/roleMiddleware';

const router = Router();

// Only authenticated users with a tenant context can access these
router.use(authenticate, requireTenant);

router.get('/', userController.getTeam);
router.post('/', requireRoles(['COMPANY_ADMIN']), userController.createUser);
router.get('/roles', requireRoles(['COMPANY_ADMIN']), userController.getRoles);

export default router;
