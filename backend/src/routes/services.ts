import { Router } from 'express';
import { serviceController } from '@/controllers/serviceController';

const router = Router();

router.get('/', serviceController.getServices);
router.get('/:id', serviceController.getServiceById);
router.get('/:id/availability', serviceController.getAvailability);

export default router;
