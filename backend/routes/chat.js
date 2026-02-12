const express = require('express');
const router = express.Router();
const { getChatResponse } = require('../utils/openai');
const { detectEmotion } = require('../utils/emotionDetector');
const { saveChat, flagMessage } = require('../firebase');
const { checkSafety } = require('../middleware/safetyFilter');

// POST /api/chat
router.post('/chat', checkSafety, async (req, res) => {
  try {
    const { userId, message } = req.body;

    // Validate input
    if (!userId || !message || message.trim() === '') {
      return res.status(400).json({ error: 'userId and message are required' });
    }

    // Check if message was flagged by safety filter
    if (req.flagged) {
      const fallbackResponse = "I'm really sorry you're feeling this way. Please consider reaching out to a trusted person or a professional counselor immediately.";
      const emotion = 'neutral'; // or detect from message, but fallback
      const timestamp = new Date();

      // Save flagged message
      await flagMessage(userId, message, timestamp, 'self-harm or crisis keywords detected');

      return res.json({
        reply: fallbackResponse,
        emotion,
        timestamp
      });
    }

    // Get AI response
    const reply = await getChatResponse(message);

    // Detect emotion
    const emotion = detectEmotion(message);

    // Save to Firebase
    const timestamp = new Date();
    await saveChat(userId, message, reply, emotion, timestamp);

    res.json({
      reply,
      emotion,
      timestamp
    });

  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
