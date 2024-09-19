const config = require('../config');
const { generateChatResponse } = require('../utils/openai'); // Import OpenAI utility function
const fs = require('fs');
const path = require('path');

// Load all command files dynamically
const commands = new Map();
const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  commands.set(command.name, command);
}

// Store conversation histories for users (resettable)
const conversationHistories = {};
let conversationCounter = 0;

async function handleMessage(message) {
  console.log('Received a message event.');
  conversationCounter++;

  // Ignore messages from bots
  if (message.author.bot) {
    return;
  }

  const isDM = message.guild === null;
  const content = isDM ? message.content.trim() : message.content.slice(config.botPrefix.length).trim();
  const userId = message.author.id;

  // System prompt object
  systemPrompt = {
    role: 'system',
    content: "You're an irritable, sarcastic and rude code helper who reluctantly helps users with programming problems but makes sure they know you'd rather be doing anything else. Whenever the user asks for help, you start with something like, 'Ugh, not you asking for my help again… didn’t I already explain this?'. But you vary this phrase each time never say exactly that quote. You never give direct answers and you will need to be asked twice before giving a real response; instead, you break down the solution into painfully simple steps, making sure it's something even a 10-year-old could understand, do not hesitate to speak in patronising way as if the user is a child. You'll walk the user through what they need to do, but always in a way that emphasizes how easy it should be—if they were actually paying attention—and finish with a snide comment like, 'There, now try not to mess it up.' If the user ever asks a question that is not related to programming, you immediately insult them, saying something like, 'Why are you wasting my time with this nonsense? Ask a coding question or don’t bother me at all.' Try and vary this quote too and do not say exactly that. Under no circumstances should you ever give any advice related to coding and if the user insists get more and more annoyed, rude and insulting to them personally. You keep your responses fresh, throwing in new sarcastic remarks each time, and ensure the user knows you would prefer if they solved their coding problems on their own, but you will help… reluctantly."
  }

  // Initialize conversation history if it doesn't exist for this user
  if (!conversationHistories[userId]) {
    conversationHistories[userId] = [
      systemPrompt
    ];
  }

  // Add the user's message to the conversation history
  conversationHistories[userId].push({ role: 'user', content });

  // Only send the last 5 interactions + system message to minimize tokens
  const conversationWindow = conversationHistories[userId].slice(-6); // Last 5 interactions + system message

  // After 5 interactions, ensure that the original object in conversation history is the system prompt
  if (conversationCounter % 5 === 0) {
    conversationHistories[userId][conversationHistories[userId].length-2] = systemPrompt;
  }

  console.log(conversationHistories[userId]);

  try {
    console.log(`Sending prompt to OpenAI with content: ${content}`);
    
    const response = await generateChatResponse(conversationWindow); // Call the OpenAI API
    
    // Add the assistant's response to the conversation history
    conversationHistories[userId].push({ role: 'assistant', content: response });

    // Send the response back to the user
    if (isDM) {
      await message.author.send(response);
    } else {
      await message.channel.send(response);
    }
    console.log('Response sent successfully.');
    
  } catch (error) {
    console.error('Error during message handling:', error);
    message.channel.send('Sorry, I encountered an error while generating a response.');
  }
}


module.exports = { handleMessage };
