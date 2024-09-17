const { Client, GatewayIntentBits, Events } = require('discord.js');
const config = require('./config');
const { handleMessage } = require('./events/messageCreate');
const { handleReady } = require('./events/ready');

// Initialize Discord client with necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,               // Allows the bot to connect to guilds (servers)
    GatewayIntentBits.GuildMessages,        // Allows the bot to receive messages from guilds
    GatewayIntentBits.MessageContent,       // Required to read message content
    GatewayIntentBits.DirectMessages,       // Allows the bot to receive direct messages
  ],
  partials: ['CHANNEL'], // Required to handle DMs properly
});

// Set up event listeners
client.once(Events.ClientReady, () => handleReady(client));
client.on(Events.MessageCreate, handleMessage);

// Log in to Discord
client.login(config.discordToken)
  .then(() => console.log('Bot logged in successfully.'))
  .catch(err => console.error('Failed to log in:', err));
