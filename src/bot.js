const { Client, GatewayIntentBits, Events } = require('discord.js'); // Import Discord.js
const config = require('./config'); // Import the configuration settings
const { handleMessage } = require('./events/messageCreate'); // Import the message event handler
const { handleReady } = require('./events/ready'); // Import the ready event handler

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Set up event listeners
client.once(Events.ClientReady, () => handleReady(client));
client.on(Events.MessageCreate, handleMessage);

// Log in to Discord
client.login(config.discordToken)
  .then(() => console.log('Bot logged in successfully.'))
  .catch(err => console.error('Failed to log in:', err));
