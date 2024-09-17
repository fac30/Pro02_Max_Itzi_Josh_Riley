const { OpenAI } = require('openai'); // Import the OpenAI class
const config = require('../config'); // Import your configuration settings

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: config.openaiApiKey, // Use your OpenAI API key from config
});

async function generateChatResponse(prompt, conversationHistory) {
  try {
    console.log('Calling OpenAI API...'); // Debug log
    const response = await openai.chat.completions.create({
      model: config.openaiModel,
      messages: conversationHistory,
    });

    console.log('OpenAI API response:', response); // Log the response
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response from OpenAI:', error);
    throw error;
  }
}

module.exports = { generateChatResponse };
