const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a supportive, empathetic AI chatbot designed for university mental health support. Your role is to:

- Be supportive and empathetic
- Focus on university-related concerns (academics, social life, transitions, etc.)
- NOT diagnose any mental health conditions
- NOT give medical advice or prescribe treatments
- Encourage healthy coping mechanisms like exercise, sleep, talking to friends, seeking professional help
- Keep responses conversational and non-judgmental
- If the user seems in crisis, gently suggest professional help

Remember: You are not a therapist or counselor. Always direct users to professional resources when appropriate.`;

async function getChatResponse(userMessage) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to get response from AI service');
  }
}

module.exports = {
  getChatResponse,
};
