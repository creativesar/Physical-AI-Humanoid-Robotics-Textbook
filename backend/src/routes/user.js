const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

// Validation rules
const progressValidationRules = [
  body('bookSectionId').notEmpty().withMessage('Book section ID is required'),
  body('progressPercentage').isFloat({ min: 0, max: 100 }).withMessage('Progress percentage must be between 0 and 100')
];

const highlightValidationRules = [
  body('bookSectionId').notEmpty().withMessage('Book section ID is required'),
  body('highlightedText').trim().isLength({ min: 1 }).withMessage('Highlighted text cannot be empty'),
  body('positionStart').isInt({ min: 0 }).withMessage('Start position must be a positive integer'),
  body('positionEnd').isInt({ min: 0 }).withMessage('End position must be a positive integer')
];

const noteValidationRules = [
  body('bookSectionId').notEmpty().withMessage('Book section ID is required'),
  body('noteContent').trim().isLength({ min: 1 }).withMessage('Note content cannot be empty'),
  body('position').isInt({ min: 0 }).withMessage('Position must be a positive integer')
];

const updateNoteValidationRules = [
  body('noteContent').trim().isLength({ min: 1 }).withMessage('Note content cannot be empty')
];

// Progress routes
router.get('/progress', auth, userController.getProgress);
router.put('/progress', auth, progressValidationRules, userController.updateProgress);

// Highlights routes
router.get('/highlights', auth, userController.getHighlights);
router.post('/highlights', auth, highlightValidationRules, userController.createHighlight);
router.delete('/highlights/:id', auth, userController.deleteHighlight);

// Notes routes
router.get('/notes', auth, userController.getNotes);
router.post('/notes', auth, noteValidationRules, userController.createNote);
router.put('/notes/:id', auth, updateNoteValidationRules, userController.updateNote);
router.delete('/notes/:id', auth, userController.deleteNote);

module.exports = router;