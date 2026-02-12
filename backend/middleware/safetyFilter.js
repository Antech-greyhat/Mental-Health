const { flagMessage } = require('../firebase');

function checkSafety(req, res, next) {
  const { message } = req.body;

  if (!message) {
    return next();
  }

  const lowerMessage = message.toLowerCase();

  // Crisis and self-harm keywords
  const crisisKeywords = [
    'suicide', 'kill myself', 'end my life', 'self-harm', 'cutting', 'overdose',
    'hurt myself', 'die', 'death', 'crisis', 'emergency', 'help me', 'i can\'t take it anymore'
  ];

  // Check if message contains any crisis keywords
  const containsCrisis = crisisKeywords.some(keyword => lowerMessage.includes(keyword));

  if (containsCrisis) {
    req.flagged = true;
  }

  next();
}

module.exports = {
  checkSafety,
};
