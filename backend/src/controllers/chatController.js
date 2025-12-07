const RAGService = require('../services/ragService');
const ChatHistory = require('../models/ChatHistory');
const { validationResult } = require('express-validator');

const ragService = new RAGService();

const chatController = {
  // Process a chat message
  async processMessage(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { message } = req.body;
      const userId = req.userId; // From auth middleware

      if (!message || message.trim().length === 0) {
        return res.status(400).json({ message: 'Message is required' });
      }

      // Generate response using RAG system
      const { response, sources } = await ragService.generateResponse(message);

      // Save to chat history
      await ChatHistory.create(userId, message, response, sources);

      res.json({
        response,
        sources
      });
    } catch (error) {
      console.error('Chat processing error:', error);
      res.status(500).json({ message: 'Server error during chat processing' });
    }
  },

  // Get chat history for user
  async getHistory(req, res) {
    try {
      const userId = req.userId; // From auth middleware
      const { limit = 50, page = 1 } = req.query;

      const history = await ChatHistory.findByUserId(
        userId,
        parseInt(limit),
        (parseInt(page) - 1) * parseInt(limit)
      );

      res.json({
        history,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: history.length // In a real app, you'd get the actual total
        }
      });
    } catch (error) {
      console.error('Get chat history error:', error);
      res.status(500).json({ message: 'Server error fetching chat history' });
    }
  },

  // Delete a chat message
  async deleteMessage(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userId; // From auth middleware

      // Delete from chat history
      await ChatHistory.deleteById(id, userId);

      res.json({ message: 'Message deleted successfully' });
    } catch (error) {
      console.error('Delete chat message error:', error);
      res.status(500).json({ message: 'Server error deleting chat message' });
    }
  },

  // Delete all chat history for user
  async deleteAllHistory(req, res) {
    try {
      const userId = req.userId; // From auth middleware

      // Delete all from chat history
      await ChatHistory.deleteAllByUserId(userId);

      res.json({ message: 'All chat history deleted successfully' });
    } catch (error) {
      console.error('Delete all chat history error:', error);
      res.status(500).json({ message: 'Server error deleting chat history' });
    }
  }
};

module.exports = chatController;