const express = require('express');
const { body } = require('express-validator');
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');
const router = express.Router();

// Validation rules
const messageValidationRules = [
  body('message').trim().isLength({ min: 1 }).withMessage('Message cannot be empty')
];

// Routes
router.post('/message', auth, messageValidationRules, chatController.processMessage);
router.get('/history', auth, chatController.getHistory);
router.delete('/history/:id', auth, chatController.deleteMessage);
router.delete('/history', auth, chatController.deleteAllHistory);

module.exports = router;