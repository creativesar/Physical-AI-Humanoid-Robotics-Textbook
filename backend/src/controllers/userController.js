const UserProgress = require('../models/UserProgress');
const UserHighlights = require('../models/UserHighlights');
const UserNotes = require('../models/UserNotes');
const { validationResult } = require('express-validator');

const userController = {
  // Get user progress
  async getProgress(req, res) {
    try {
      const userId = req.userId; // From auth middleware

      const progress = await UserProgress.findByUserId(userId);

      res.json({
        progress
      });
    } catch (error) {
      console.error('Get progress error:', error);
      res.status(500).json({ message: 'Server error fetching progress' });
    }
  },

  // Update user progress
  async updateProgress(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { bookSectionId, progressPercentage } = req.body;
      const userId = req.userId; // From auth middleware

      const progress = await UserProgress.updateProgress(userId, bookSectionId, progressPercentage);

      res.json({
        progress
      });
    } catch (error) {
      console.error('Update progress error:', error);
      res.status(500).json({ message: 'Server error updating progress' });
    }
  },

  // Get user highlights
  async getHighlights(req, res) {
    try {
      const userId = req.userId; // From auth middleware

      const highlights = await UserHighlights.findByUserId(userId);

      res.json({
        highlights
      });
    } catch (error) {
      console.error('Get highlights error:', error);
      res.status(500).json({ message: 'Server error fetching highlights' });
    }
  },

  // Create a highlight
  async createHighlight(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { bookSectionId, highlightedText, positionStart, positionEnd } = req.body;
      const userId = req.userId; // From auth middleware

      const highlight = await UserHighlights.create(
        userId, 
        bookSectionId, 
        highlightedText, 
        positionStart, 
        positionEnd
      );

      res.status(201).json({
        highlight
      });
    } catch (error) {
      console.error('Create highlight error:', error);
      res.status(500).json({ message: 'Server error creating highlight' });
    }
  },

  // Delete a highlight
  async deleteHighlight(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userId; // From auth middleware

      await UserHighlights.deleteById(id, userId);

      res.json({
        message: 'Highlight deleted successfully'
      });
    } catch (error) {
      console.error('Delete highlight error:', error);
      res.status(500).json({ message: 'Server error deleting highlight' });
    }
  },

  // Get user notes
  async getNotes(req, res) {
    try {
      const userId = req.userId; // From auth middleware

      const notes = await UserNotes.findByUserId(userId);

      res.json({
        notes
      });
    } catch (error) {
      console.error('Get notes error:', error);
      res.status(500).json({ message: 'Server error fetching notes' });
    }
  },

  // Create a note
  async createNote(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { bookSectionId, noteContent, position } = req.body;
      const userId = req.userId; // From auth middleware

      const note = await UserNotes.create(userId, bookSectionId, noteContent, position);

      res.status(201).json({
        note
      });
    } catch (error) {
      console.error('Create note error:', error);
      res.status(500).json({ message: 'Server error creating note' });
    }
  },

  // Update a note
  async updateNote(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { noteContent } = req.body;
      const userId = req.userId; // From auth middleware

      const note = await UserNotes.updateById(id, userId, noteContent);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }

      res.json({
        note
      });
    } catch (error) {
      console.error('Update note error:', error);
      res.status(500).json({ message: 'Server error updating note' });
    }
  },

  // Delete a note
  async deleteNote(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userId; // From auth middleware

      await UserNotes.deleteById(id, userId);

      res.json({
        message: 'Note deleted successfully'
      });
    } catch (error) {
      console.error('Delete note error:', error);
      res.status(500).json({ message: 'Server error deleting note' });
    }
  }
};

module.exports = userController;