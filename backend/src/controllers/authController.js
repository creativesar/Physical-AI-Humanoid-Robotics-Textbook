const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const crypto = require('crypto');

// Load environment variables
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

const authController = {
  // Register a new user
  async register(req, res) {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, name } = req.body;

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');

      // Create user
      const user = await User.create({
        email,
        password: hashedPassword,
        name,
        emailVerificationToken: verificationToken
      });

      // In a real app, you would send an email with the verification link
      console.log(`Verification token for ${email}: ${verificationToken}`);

      // Create JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.status(201).json({
        message: 'User registered successfully. Please check your email to verify your account.',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration' });
    }
  },

  // Login user
  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find user by email
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Check if email is verified
      if (!user.email_verified) {
        return res.status(400).json({ message: 'Please verify your email before logging in' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Create JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login' });
    }
  },

  // Verify email
  async verifyEmail(req, res) {
    try {
      const { token } = req.params;

      // Verify the token and update user status
      await User.verifyEmail(token);

      res.json({ message: 'Email verified successfully. You can now log in to your account.' });
    } catch (error) {
      console.error('Email verification error:', error);
      res.status(400).json({ message: 'Invalid or expired verification token' });
    }
  },

  // Forgot password
  async forgotPassword(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email } = req.body;

      // Find user by email
      const user = await User.findByEmail(email);
      if (!user) {
        // Don't reveal if email exists to prevent enumeration
        return res.json({ message: 'If an account with this email exists, a password reset link has been sent.' });
      }

      // Generate password reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetExpires = new Date(Date.now() + 3600000); // 1 hour

      // Save token to database
      await User.setResetPasswordToken(email, resetToken, resetExpires);

      // In a real app, you would send an email with the reset link
      console.log(`Password reset token for ${email}: ${resetToken}`);

      res.json({ message: 'If an account with this email exists, a password reset link has been sent.' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ message: 'Server error during password reset request' });
    }
  },

  // Reset password
  async resetPassword(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { token, newPassword } = req.body;

      // Find user by reset token
      const user = await User.findByResetToken(token);
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
      }

      // Hash new password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password
      await User.updatePassword(user.id, hashedPassword);

      res.json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Password reset error:', error);
      res.status(500).json({ message: 'Server error during password reset' });
    }
  },

  // Get current user
  async getMe(req, res) {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          created_at: user.created_at
        }
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ message: 'Server error fetching user data' });
    }
  }
};

module.exports = authController;