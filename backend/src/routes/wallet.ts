import { Router } from 'express';

const router = Router();

// Wallet endpoints
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      id: 'wallet-1',
      balance: 50000,
      creditBalance: 0,
      currency: 'NGN',
    },
  });
});

router.get('/transactions', (req, res) => {
  res.json({ success: true, data: [] });
});

router.post('/recharge', (req, res) => {
  res.status(201).json({ success: true, data: { id: 'transaction-1' } });
});

export default router;
