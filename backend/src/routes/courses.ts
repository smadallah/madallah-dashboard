import { Router } from 'express';

const router = Router();

// Course endpoints
router.get('/', (req, res) => {
  res.json({ success: true, data: [] });
});

router.get('/:id', (req, res) => {
  res.json({ success: true, data: {} });
});

router.post('/:id/enroll', (req, res) => {
  res.status(201).json({ success: true, data: { id: 'enrollment-1' } });
});

router.get('/my-enrollments', (req, res) => {
  res.json({ success: true, data: [] });
});

export default router;
