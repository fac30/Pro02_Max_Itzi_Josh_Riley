const { generateChatResponse } = require("../utils/openai");

module.exports = {
  name: "pep",

  description:
    "Give opinion on a user-provided description of football opinions as if you were Pep Guardiola.",

  async execute(message, args) {
    const footballOpinions = args.join(" ");

    // If no football opinions are provided, send a cheeky response back to the user
    if (!footballOpinions) {
      message.channel.send(
        "You want me to give an opinion, but you don't even know about football? Wake up."
      );
      return;
    }

    // Prepare a prompt that asks OpenAI to generate a response as if Pep Guardiola is giving a critique
    const prompt = `You are Pep Guardiola, the famous football manager. Critique the following football opinions in your funny, direct, and harsh style: "${footballOpinions}".`;

    const conversationHistory = [{ role: "user", content: prompt }];
    console.log("Executing critique command with prompt:", prompt);

    try {
      const response = await generateChatResponse(prompt, conversationHistory);

      message.channel.send(response);
    } catch (error) {
      console.error("Error in critique command execution:", error);

      message.channel.send(
        "Oh no, something went wrong! Even the AI can’t handle your horrible football opinions..."
      );
    }
  },
};
