const { Client, GatewayIntentBits, Events } = require('discord.js');
require('dotenv/config'); // Load environment variables

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages, // Allows the bot to receive direct messages
    GatewayIntentBits.MessageContent, // Required to read message content
  ],
  partials: ['CHANNEL'], // Required to handle DMs properly
});

client.once(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}! Bot is ready to receive DMs.`);
});

client.on(Events.MessageCreate, (message) => {
  console.log('Received a message event.');

  if (message.author.bot) return; // Ignore messages from bots

  const isDM = message.guild === null;
  console.log('Is DM:', isDM); // Log whether the message is a DM

  if (isDM) {
    message.channel.send('Hello! I received your DM.'); // Simple response for testing
  }
});

// Log in to Discord
client.login(process.env.DISCORD_TOKEN)
  .then(() => console.log('Bot logged in successfully.'))
  .catch(err => console.error('Failed to log in:', err));
