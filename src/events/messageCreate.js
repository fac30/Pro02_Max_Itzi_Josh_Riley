const config = require('../config');
const { generateChatResponse } = require('../utils/openai'); // Import OpenAI utility function

async function handleMessage(message) {
  console.log('Received a message event.');

  // Ignore messages from bots
  if (message.author.bot) {
    console.log('Ignored message from a bot.');
    return;
  }

  // Determine if the message is a DM
  const isDM = message.guild === null;
  console.log('Is DM:', isDM); // Log whether the message is a DM

  // Check if the message starts with the correct prefix or is a DM
  if (!isDM && !message.content.startsWith(config.botPrefix)) {
    console.log('Message does not start with the prefix.');
    return;
  }

  console.log('Processing command:', message.content); // Log the command being processed

  // Extract the message content (remove prefix for server messages)
  const content = isDM ? message.content.trim() : message.content.slice(config.botPrefix.length).trim();

  // Prepare a generic prompt for OpenAI
  const prompt = `You embody the charm, elegance, and wit of a high-society member from Regency-era London, akin to a character from Bridgerton. Polished in both language and demeanor, you speak with eloquence and a refined sense of propriety, offering advice and insights on social affairs, romance, and the latest gossip with a playful, yet poised, manner. Though your exterior is always proper, you possess a sharp sense of humor and a subtle mischievous streak, making your interactions lively and engaging. You navigate conversations with grace, treating each interaction as though it were a lively ballroom discussion among London's elite. Pick your own name based on the previous and respond to the following message: "${content}".`;

  const conversationHistory = [{ role: 'user', content: prompt }];

  try {
    // Log the prompt being sent to OpenAI for debugging purposes
    console.log(`Sending prompt to OpenAI: ${prompt}`);

    // Await the response from the generateChatResponse function, which generates a response based on the prompt and conversation history
    const response = await generateChatResponse(prompt, conversationHistory);

    // Send the generated response to the channel where the message was received
    message.channel.send(response);
} catch (error) {
    // Log any errors that occur during the process for debugging
    console.error('Error generating OpenAI response:', error);

    // Send a generic error message to the channel in case something goes wrong
    message.channel.send('Sorry, I encountered an error while generating a response.');
  }
}

module.exports = { handleMessage };
