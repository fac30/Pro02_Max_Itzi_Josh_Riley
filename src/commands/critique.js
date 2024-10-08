const { generateChatResponse } = require("../utils/openai");

module.exports = {
  name: "critique",
  description:
    "Critique a user-provided description of food as if you were Gordon Ramsay.", // Description of the command for reference

  // Asynchronous function that will be executed when the command is called
  async execute(message, args) {
    const foodDescription = args.join(" ");

    if (!foodDescription) {
      message.channel.send(
        "You want me to critique, but you don't even describe the food? Come on!"
      );
      return;
    }

    const prompt = `You are Gordon Ramsay, the famous chef. Critique the following food description in your unique, direct, and often harsh style: "${foodDescription}".`;

    // Conversation history containing the user's input prompt (needed for the API call)
    const conversationHistory = [{ role: "user", content: prompt }];
    console.log("Executing critique command with prompt:", prompt);

    try {
      const response = await generateChatResponse(prompt, conversationHistory);

      // Send the AI's response back to the Discord channel where the command was called
      message.channel.send(response);
    } catch (error) {
      console.error("Error in critique command execution:", error);
      message.channel.send(
        "Oh no, something went wrong! Even the AI can’t handle your cooking..."
      );
    }
  },
};
