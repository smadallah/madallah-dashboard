import { Router } from 'express';

const router = Router();

// Message endpoints
router.get('/', (req, res) => {
  res.json({ success: true, data: [] });
});

router.post('/', (req, res) => {
  res.status(201).json({ success: true, data: { id: 'message-1' } });
});

router.get('/:id', (req, res) => {
  res.json({ success: true, data: {} });
});

router.put('/:id/read', (req, res) => {
  res.json({ success: true, data: {} });
});

export default router;
