import { Request, Response } from 'express';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Mock user data
const users = new Map();

export const userController = {
  getProfile: (req: AuthRequest, res: Response) => {
    try {
      // In production, fetch from database
      res.json({
        success: true,
        data: {
          id: req.user?.id,
          email: req.user?.email,
          firstName: 'John',
          lastName: 'Doe',
          role: req.user?.role,
          createdAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch profile',
      });
    }
  },

  updateProfile: (req: AuthRequest, res: Response) => {
    try {
      const { firstName, lastName, phone } = req.body;

      // In production, update database
      res.json({
        success: true,
        data: {
          id: req.user?.id,
          email: req.user?.email,
          firstName,
          lastName,
          phone,
          updatedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to update profile',
      });
    }
  },

  uploadAvatar: (req: AuthRequest, res: Response) => {
    try {
      // In production, upload to S3 and save URL
      res.json({
        success: true,
        data: {
          avatarUrl: 'https://example.com/avatars/user-id.jpg',
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to upload avatar',
      });
    }
  },
};
