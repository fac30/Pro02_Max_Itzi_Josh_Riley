// Import the OpenAI utility for generating responses
const { generateChatResponse } = require('../utils/openai'); 

// Export the command module so it can be used by the main application
module.exports = {
  // Command name to trigger this functionality
  name: 'pep', 

  // Description of what the command does
  description: 'Give opinion on a user-provided description of football opinions as if you were Pep Guardiola.',

  // Asynchronous function that gets executed when the command is called
  async execute(message, args) {
    // Combine all arguments passed by the user to form the complete football opinion
    const footballOpinions = args.join(' ');

    // If no football opinions are provided, send a cheeky response back to the user
    if (!footballOpinions) {
      message.channel.send("You want me to give an opinion, but you don't even know about football? Wake up.");
      return; // Exit the function if no opinions are provided
    }

    // Prepare a prompt that asks OpenAI to generate a response as if Pep Guardiola is giving a critique
    const prompt = `You are Pep Guardiola, the famous football manager. Critique the following football opinions in your funny, direct, and harsh style: "${footballOpinions}".`;

    // Initialize conversation history, which can be passed to OpenAI for better context
    const conversationHistory = [{ role: 'user', content: prompt }];

    // Debug log to show the prompt being used
    console.log('Executing critique command with prompt:', prompt); 

    try {
      // Generate a response using the OpenAI API based on the provided prompt and conversation history
      const response = await generateChatResponse(prompt, conversationHistory);
      
      // Send the generated response back to the channel where the command was called
      message.channel.send(response);
    } catch (error) {
      // Log the error in case something goes wrong during the API call
      console.error('Error in critique command execution:', error);

      // Send a fallback error message to the user in case the API fails
      message.channel.send('Oh no, something went wrong! Even the AI can’t handle your horrible football opinions...');
    }
  },
};