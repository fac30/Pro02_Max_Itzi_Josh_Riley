const config = require('../config'); // Import config
const { generateChatResponse } = require('../utils/openai');

async function handleMessage(message) {
  if (message.author.bot) return; // Ignore messages from bots

  if (!message.content.startsWith(config.botPrefix)) return; // Ignore messages without the command prefix

  const args = message.content.slice(config.botPrefix.length).trim().split(/ +/); // Extract command and arguments
  const command = args.shift().toLowerCase(); // Get the command name

  if (command === 'hello') {
    message.channel.send('Hello there!');
  } else if (command === 'ask') {
    const prompt = args.join(' ');
    const conversationHistory = [{ role: 'user', content: prompt }];

    try {
      const response = await generateChatResponse(prompt, conversationHistory);
      message.channel.send(response);
    } catch (error) {
      console.error('Error handling message:', error);
      message.channel.send('Sorry, something went wrong while processing your request.');
    }
  }
}

module.exports = { handleMessage };