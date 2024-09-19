// Import the OpenAI utility for generating responses from OpenAI's API
const { generateChatResponse } = require('../utils/openai');

module.exports = {
  name: 'critique', // Define the name of this command (used for calling the command in the chat)
  description: 'Critique a user-provided description of food as if you were Gordon Ramsay.', // Description of the command for reference

  // Asynchronous function that will be executed when the command is called
  async execute(message, args) {
    // Combine all arguments provided by the user (which describe the food) into a single string
    const foodDescription = args.join(' ');

    // If no description is provided by the user, send an error message and return early
    if (!foodDescription) {
      message.channel.send("You want me to critique, but you don't even describe the food? Come on!");
      return; // Stop further execution if no description is given
    }

    // Prepare a prompt for the AI, instructing it to respond in Gordon Ramsay's harsh and direct style
    const prompt = `You are Gordon Ramsay, the famous chef. Critique the following food description in your unique, direct, and often harsh style: "${foodDescription}".`;

    // Conversation history containing the user's input prompt (needed for the API call)
    const conversationHistory = [{ role: 'user', content: prompt }];

    // Log the generated prompt for debugging purposes (to track what the API will receive)
    console.log('Executing critique command with prompt:', prompt);

    try {
      // Call the OpenAI API using the generateChatResponse function with the prepared prompt and conversation history
      const response = await generateChatResponse(prompt, conversationHistory);
      
      // Send the AI's response back to the Discord channel where the command was called
      message.channel.send(response);
    } catch (error) {
      // If any error occurs during the API call, log the error for debugging
      console.error('Error in critique command execution:', error);
      
      // Send an error message to the Discord channel if the API call fails
      message.channel.send('Oh no, something went wrong! Even the AI can’t handle your cooking...');
    }
  },
};