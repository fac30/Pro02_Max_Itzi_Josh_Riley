const config = require("../../config");
const { generateChatResponse } = require("../utils/openai"); // Import OpenAI utility function
const fs = require("fs");
const path = require("path");

// Load all command files dynamically
const commands = new Map();
const commandFiles = fs
  .readdirSync(path.join(__dirname, "../commands"))
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  commands.set(command.name, command);
}

async function handleMessage(message) {
  console.log("Received a message event.");

  // Ignore messages from bots
  if (message.author.bot) {
    console.log("Ignored message from a bot.");
    return;
  }

  // Determine if the message is a DM
  const isDM = message.guild === null;
  console.log("Is DM:", isDM); // Log whether the message is a DM

  // If the message is from a server and does not start with the correct prefix, ignore it
  if (!isDM && !message.content.startsWith(config.botPrefix)) {
    console.log("Message does not start with the correct prefix. Ignored.");
    return;
  }

  console.log("Processing command or message:", message.content); // Log the command being processed

  // Extract the message content (remove prefix for server messages)
  const content = isDM
    ? message.content.trim()
    : message.content.slice(config.botPrefix.length).trim();

  // Check if it's a command by splitting the content and extracting the command name
  const args = content.split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Check if the command exists in the command map
  const command = commands.get(commandName);

  if (command) {
    // If it's a recognized command, execute it
    console.log(`Executing command: ${commandName}`);
    try {
      await command.execute(message, args);
    } catch (error) {
      console.error("Error executing command:", error);
      message.channel.send(
        "There was an error trying to execute that command!"
      );
    }
  } else {
    // If it's not a recognized command, use OpenAI for a generic response
    const prompt = `You are a helpful assistant. Respond to the following message: "${content}".`;
    const conversationHistory = [{ role: "user", content: prompt }];

    try {
      console.log(`Sending prompt to OpenAI: ${prompt}`);
      const response = await generateChatResponse(prompt, conversationHistory);

      if (isDM) {
        await message.author.send(response); // Send response to the user in DM
        console.log("Sent response to DM.");
      } else {
        await message.channel.send(response); // Send response to the channel
        console.log("Sent response to channel.");
      }
    } catch (error) {
      console.error("Error generating OpenAI response:", error);
      message.channel.send(
        "Sorry, I encountered an error while generating a response."
      );
    }
  }
}

module.exports = { handleMessage };
