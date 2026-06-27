import { Router } from 'express';

const router = Router();

// Payment endpoints
router.post('/', (req, res) => {
  res.status(201).json({ success: true, data: { id: 'payment-1' } });
});

router.get('/:id', (req, res) => {
  res.json({ success: true, data: {} });
});

router.post('/:id/refund', (req, res) => {
  res.json({ success: true, message: 'Refund processed' });
});

export default router;
