// Import the OpenAI class from the 'openai' package
const { OpenAI } = require('openai'); 

// Import your configuration settings, which should include the OpenAI API key and model details
const config = require('../config'); 

// Initialize OpenAI API client with the API key from the configuration file
const openai = new OpenAI({
  apiKey: config.openaiApiKey, // Use the OpenAI API key from the config file
});

// Asynchronous function to generate a chat response using the OpenAI API
async function generateChatResponse(prompt, conversationHistory) {
  try {
    // Log when the OpenAI API call is initiated (useful for debugging)
    console.log('Calling OpenAI API...'); 
    
    // Make a request to OpenAI to generate a response based on the provided model and conversation history
    const response = await openai.chat.completions.create({
      model: config.openaiModel, // Use the AI model specified in the config (e.g., GPT-3.5, GPT-4)
      messages: conversationHistory, // Pass the conversation history for context
    });

    // Log the full response from the OpenAI API for debugging or tracking purposes
    console.log('OpenAI API response:', response); 
    
    // Return the content of the first message choice from the API response
    return response.choices[0].message.content;
  } catch (error) {
    // If an error occurs during the API call, log the error message
    console.error('Error generating response from OpenAI:', error);
    
    // Rethrow the error so that it can be handled elsewhere in your code
    throw error;
  }
}

// Export the generateChatResponse function so it can be used in other modules
module.exports = { generateChatResponse };
