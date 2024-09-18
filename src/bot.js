const { Client, GatewayIntentBits, Events } = require("discord.js");
const config = require("./config");
const { handleMessage } = require("./events/messageCreate");
const { handleReady } = require("./events/ready");
const { wakeUpResponses } = require("../data/wakeUpResponses.json");

// Initialize Discord client with necessary intents and partials
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Allows the bot to connect to guilds (servers)
    GatewayIntentBits.GuildMessages, // Allows the bot to receive messages from guilds
    GatewayIntentBits.MessageContent, // Required to read message content
    GatewayIntentBits.DirectMessages, // Allows the bot to receive direct messages
  ],
  partials: ["CHANNEL"], // Required to handle DMs properly
});

// Set up event listeners
client.once(Events.ClientReady, () => {
  handleReady(client);
  // Send a message to a specific channel once the bot is ready
  const guild = client.guilds.cache.get(config.guildId); // Replace with your guild ID
  if (guild) {
    const channel = guild.channels.cache.get(config.channelId); // Replace with your channel ID
    if (channel) {
      channel.send(
        wakeUpResponses[Math.floor(Math.random() * wakeUpResponses.length)]
      );
    } else {
      console.error("Channel not found.");
    }
  } else {
    console.error("Guild not found.");
  }
});
client.on(Events.MessageCreate, handleMessage);

// Log in to Discord
client
  .login(config.discordToken)
  .then(() => console.log("Bot logged in successfully."))
  .catch((err) => console.error("Failed to log in:", err));
