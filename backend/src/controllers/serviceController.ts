import { Request, Response } from 'express';

// Mock services data
const services = [
  {
    id: '1',
    name: 'Internet Access',
    description: 'High-speed internet access',
    category: 'internet',
    serviceType: 'cyber_cafe',
    isActive: true,
    requiresBooking: true,
    pricing: [
      {
        id: 'p1',
        basePrice: 500,
        unit: 'hour',
        currency: 'NGN',
      },
    ],
  },
  {
    id: '2',
    name: 'Printing Services',
    description: 'Color and B&W printing',
    category: 'printing',
    serviceType: 'cyber_cafe',
    isActive: true,
    requiresBooking: false,
    pricing: [
      {
        id: 'p2',
        basePrice: 50,
        unit: 'page',
        currency: 'NGN',
      },
    ],
  },
  {
    id: '3',
    name: 'JAMB Exam Registration',
    description: 'JAMB exam registration assistance',
    category: 'exam_registration',
    serviceType: 'educational',
    isActive: true,
    requiresBooking: true,
    pricing: [
      {
        id: 'p3',
        basePrice: 2000,
        unit: 'session',
        currency: 'NGN',
      },
    ],
  },
];

export const serviceController = {
  getServices: (req: Request, res: Response) => {
    try {
      const { category, serviceType } = req.query;

      let filtered = services;

      if (category) {
        filtered = filtered.filter((s) => s.category === category);
      }

      if (serviceType) {
        filtered = filtered.filter((s) => s.serviceType === serviceType);
      }

      res.json({
        success: true,
        data: filtered,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch services',
      });
    }
  },

  getServiceById: (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const service = services.find((s) => s.id === id);

      if (!service) {
        return res.status(404).json({
          success: false,
          error: 'Service not found',
        });
      }

      res.json({
        success: true,
        data: service,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch service',
      });
    }
  },

  getAvailability: (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { date } = req.query;

      // Mock availability data
      res.json({
        success: true,
        data: {
          serviceId: id,
          date,
          availableSlots: [
            { time: '08:00', available: true },
            { time: '10:00', available: true },
            { time: '14:00', available: false },
            { time: '16:00', available: true },
          ],
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch availability',
      });
    }
  },
};
