import { Router } from 'express';

const router = Router();

// Booking endpoints
router.get('/', (req, res) => {
  res.json({ success: true, data: [] });
});

router.post('/', (req, res) => {
  res.status(201).json({ success: true, data: { id: 'booking-1' } });
});

router.get('/:id', (req, res) => {
  res.json({ success: true, data: {} });
});

router.put('/:id', (req, res) => {
  res.json({ success: true, data: {} });
});

router.delete('/:id', (req, res) => {
  res.json({ success: true, message: 'Booking cancelled' });
});

export default router;
