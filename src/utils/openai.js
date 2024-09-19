const { OpenAI } = require('openai'); // Ensure correct import of OpenAI
const config = require('../config');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: config.openaiApiKey // Replace with your API key in config
});

async function generateChatResponse(conversationHistory) {
  try {
    console.log('Calling OpenAI API...'); // Debug log
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Ensure you're using the right model
      messages: conversationHistory, // Pass conversation history as expected
    });

    // Return the content of the first choice from OpenAI's response
    console.log('OpenAI API response:', response); // Log the response
    return response.choices[0].message.content;
  } catch (error) {
    // Log the error for debugging
    console.error('Error during OpenAI API call:', error.response ? error.response.data : error.message);
    throw error; // Rethrow the error to be handled in the caller function
  }
}

module.exports = { generateChatResponse };