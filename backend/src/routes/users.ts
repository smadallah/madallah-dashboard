import { Router } from 'express';
import { userController } from '@/controllers/userController';

const router = Router();

router.get('/me', userController.getProfile);
router.put('/me', userController.updateProfile);
router.post('/me/avatar', userController.uploadAvatar);

export default router;
