// Import the OpenAI class from the 'openai' package
const { OpenAI } = require('openai'); // Ensure correct import of OpenAI
// Import your configuration settings, which should include the OpenAI API key and model details
const config = require('../config');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: config.openaiApiKey // Replace with your API key in config
});

// Asynchronous function to generate a chat response using the OpenAI API
async function generateChatResponse(conversationHistory) {

  try {
    // Log when the OpenAI API call is initiated (useful for debugging)
    console.log('Calling OpenAI API...'); 
    
    // Make a request to OpenAI to generate a response based on the provided model and conversation history
    const response = await openai.chat.completions.create({
      model: config.openaiModel, // Use the AI model specified in the config (e.g., GPT-3.5, GPT-4)
      messages: conversationHistory, // Pass conversation history as expected
    });

    // Return the content of the first choice from OpenAI's response
    console.log('OpenAI API response:', response); // Log the response
    
    // Return the content of the first message choice from the API response
    return response.choices[0].message.content;
  } catch (error) {
    // If an error occurs during the API call, log the error message
    console.error('Error during OpenAI API call:', error.response ? error.response.data : error.message);
    throw error; // Rethrow the error to be handled in the caller function
  }
}

// Export the generateChatResponse function so it can be used in other modules
module.exports = { generateChatResponse };
