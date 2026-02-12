function detectEmotion(message) {
  const lowerMessage = message.toLowerCase();

  // Keywords for different emotions
  const emotionKeywords = {
    sad: ['sad', 'depressed', 'lonely', 'hopeless', 'down', 'blue', 'unhappy', 'miserable'],
    anxious: ['anxious', 'nervous', 'worried', 'stressed', 'panic', 'fear', 'scared', 'overwhelmed'],
    stressed: ['stressed', 'overwhelmed', 'pressure', 'deadline', 'exam', 'assignment', 'burnout'],
    neutral: [] // default
  };

  // Check for matches
  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    if (emotion !== 'neutral' && keywords.some(keyword => lowerMessage.includes(keyword))) {
      return emotion;
    }
  }

  return 'neutral';
}

module.exports = {
  detectEmotion,
};
