const { Configuration, OpenAIApi } = require('openai');
const config = require('./config');

// Access configuration settings
const discordToken = config.discordToken;
const openaiApiKey = config.openaiApiKey;
const botPrefix = config.botPrefix;

// Example usage
client.login(discordToken);

// Initialize OpenAI API
const openai = new OpenAIApi(new Configuration({
    apiKey: config.openaiApiKey,
}));
  
async function generateChatResponse(prompt, conversationHistory) {
    try {
      const response = await openai.createChatCompletion({
        model: config.openaiModel, // Use the model from the config
        messages: conversationHistory,
      });
  
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error generating response:', error);
        throw error;
    }
}