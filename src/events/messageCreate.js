const config = require('../config');
const fs = require('fs');
const path = require('path');

// Load all command files dynamically
const commands = new Map();
const commandFiles = fs.readdirSync(path.join(__dirname, '../commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  commands.set(command.name, command);
}

async function handleMessage(message) {
  console.log('Received a message:', message.content); // Debug log to check if the handler is triggered

  // Ignore messages from bots
  if (message.author.bot) {
    console.log('Ignored message from a bot.');
    return;
  }

  // Check if the message is from a server or a DM
  const isDM = message.guild === null;

  // If it's a server message, check for the command prefix
  if (!isDM && !message.content.startsWith(config.botPrefix)) {
    console.log('Message does not start with the prefix.');
    return;
  }

  // Extract command and arguments from the message
  const args = isDM
    ? message.content.trim().split(/ +/) // For DMs, don't require the prefix
    : message.content.slice(config.botPrefix.length).trim().split(/ +/); // For server messages, require the prefix

  const commandName = args.shift().toLowerCase(); // Get the command name

  const command = commands.get(commandName);

  if (!command) {
    message.channel.send(`I don't know that command, try using a valid command!`);
    return;
  }

  try {
    console.log(`Executing command: ${commandName} with args: ${args}`); // Debug log
    await command.execute(message, args);
  } catch (error) {
    console.error('Error executing command:', error);
    message.channel.send('There was an error trying to execute that command!');
  }
}

module.exports = { handleMessage };
