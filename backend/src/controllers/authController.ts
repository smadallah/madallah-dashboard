import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

// Mock user database
const users = new Map();

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { email, password, firstName, lastName, phone, role } = req.body;

      // Validation
      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields',
        });
      }

      // Check if user exists
      if (users.has(email)) {
        return res.status(409).json({
          success: false,
          error: 'User already exists',
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        role: role || 'customer',
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      users.set(email, user);

      res.status(201).json({
        success: true,
        message: 'Registration successful. Please verify your email.',
        data: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Registration failed',
      });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email and password are required',
        });
      }

      // Find user
      const user = users.get(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password',
        });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password',
        });
      }

      // Generate tokens
      const accessToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY }
      );

      const refreshToken = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRY }
      );

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          accessToken,
          refreshToken,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Login failed',
      });
    }
  },

  refreshToken: (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          error: 'Refresh token is required',
        });
      }

      const decoded = jwt.verify(refreshToken, JWT_SECRET) as any;
      const user = users.get(decoded.email);

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'User not found',
        });
      }

      const accessToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY }
      );

      res.json({
        success: true,
        data: { accessToken },
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: 'Invalid refresh token',
      });
    }
  },

  logout: (req: Request, res: Response) => {
    res.json({
      success: true,
      message: 'Logout successful',
    });
  },
};
