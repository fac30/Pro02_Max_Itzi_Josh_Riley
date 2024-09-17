const config = require('../config');

// Access configuration settings
const discordToken = config.discordToken;
const openaiApiKey = config.openaiApiKey;
const botPrefix = config.botPrefix;

// Example usage
client.login(discordToken);