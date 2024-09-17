const { OpenAI } = require('openai'); // Import both Configuration and OpenAIApi
const config = require('../config'); // Import the configuration settings


// Initialize OpenAI API client
const openai = new OpenAI({
    apiKey: config.openaiApiKey, // Use your OpenAI API key from config
  });

async function generateChatResponse(prompt, conversationHistory) {
  try {
    const response = await openai.createChatCompletion({
      model: config.openaiModel,
      messages: conversationHistory,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response from OpenAI:', error);
    throw error;
  }
}

module.exports = { generateChatResponse };