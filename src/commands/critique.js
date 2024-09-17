const { generateChatResponse } = require('../utils/openai'); // Import the OpenAI utility for generating responses

module.exports = {
  name: 'critique', // Command name
  description: 'Critique a user-provided description of food as if you were Gordon Ramsay.',
  async execute(message, args) {
    // Combine all arguments to form the food description
    const foodDescription = args.join(' ');

    if (!foodDescription) {
      message.channel.send("You want me to critique, but you don't even describe the food? Come on!");
      return;
    }

    // Prepare the prompt for OpenAI to generate a response in Gordon Ramsay's style
    const prompt = `You are Gordon Ramsay, the famous chef. Critique the following food description in your unique, direct, and often harsh style: "${foodDescription}".`;

    const conversationHistory = [{ role: 'user', content: prompt }];

    console.log('Executing critique command with prompt:', prompt); // Debug log

    try {
      const response = await generateChatResponse(prompt, conversationHistory);
      message.channel.send(response);
    } catch (error) {
      console.error('Error in critique command execution:', error);
      message.channel.send('Oh no, something went wrong! Even the AI can’t handle your cooking...');
    }
  },
};
