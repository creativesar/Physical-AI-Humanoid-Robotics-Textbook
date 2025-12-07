const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = express.Router();

// Validation rules
const registerValidationRules = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long')
];

const loginValidationRules = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

const forgotPasswordValidationRules = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email')
];

const resetPasswordValidationRules = [
  body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('token').notEmpty().withMessage('Reset token is required')
];

// Routes
router.post('/register', registerValidationRules, authController.register);
router.post('/login', loginValidationRules, authController.login);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/forgot-password', forgotPasswordValidationRules, authController.forgotPassword);
router.post('/reset-password', resetPasswordValidationRules, authController.resetPassword);
router.get('/me', auth, authController.getMe); // Protected route

module.exports = router;