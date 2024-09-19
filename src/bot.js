// Import required modules from the discord.js library
const { Client, GatewayIntentBits, Events } = require('discord.js');

// Import configuration file containing the bot's token, guild ID, and channel ID
const config = require('./config');

// Import custom event handlers for message creation and bot ready events
const { handleMessage } = require('./events/messageCreate');
const { handleReady } = require('./events/ready');

// Import an array of wake-up responses from a JSON file, which the bot will randomly choose from
const { wakeUpResponses } = require('../data/wakeUpResponses.json');

// Initialize Discord client with necessary intents (permissions) and partials
const client = new Client({
  // Intents determine what events the bot will listen to, allowing it to respond to specific activities
  intents: [
    GatewayIntentBits.Guilds,               // Allows the bot to connect to and manage guilds (servers)
    GatewayIntentBits.GuildMessages,        // Allows the bot to receive messages in guild channels
    GatewayIntentBits.MessageContent,       // Allows the bot to read message content (required to respond to messages)
    GatewayIntentBits.DirectMessages,       // Allows the bot to receive direct (private) messages
  ],
  // Partials allow the bot to receive incomplete data from certain events, e.g., DMs without all channel details
  partials: ['CHANNEL'], // This is required for the bot to handle direct messages properly
});

// Set up event listeners for the bot

// Event listener for when the bot is ready and fully initialized
client.once(Events.ClientReady, () => {
  handleReady(client); // Call the handleReady function when the bot is ready
  
  // Once the bot is ready, send a message to a specific guild (server) and channel
  const guild = client.guilds.cache.get(config.guildId); // Get the guild (server) by ID from the config file
  
  if (guild) {
    // Get the channel where the bot will send the message, using the channel ID from the config file
    const channel = guild.channels.cache.get(config.channelId);
    
    if (channel) {
      // If the channel is found, send a random wake-up message from the wakeUpResponses array
      channel.send(wakeUpResponses[Math.floor(Math.random() * wakeUpResponses.length)]);
    } else {
      // If the channel ID doesn't exist, log an error
      console.error('Channel not found.');
    }
  } else {
    // If the guild ID doesn't exist, log an error
    console.error('Guild not found.');
  }
});

// Event listener for when a new message is created in any channel the bot has access to
client.on(Events.MessageCreate, handleMessage); // Use the handleMessage function to respond to messages

// Log in to Discord using the bot token from the config file
client.login(config.discordToken)
  .then(() => console.log('Bot logged in successfully.')) // Log success message if login is successful
  .catch(err => console.error('Failed to log in:', err)); // Log an error if login fails