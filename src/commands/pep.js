const { generateChatResponse } = require("../utils/openai"); // Import the OpenAI utility for generating responses

module.exports = {
  name: "pep", // Command name
  description:
    "give opinion on a user-provided description of football opinions as if you were Pep Guardiola.",
  async execute(message, args) {
    // Combine all arguments to form the food description
    const footballOpinions = args.join(" ");

    if (!footballOpinions) {
      message.channel.send(
        "You want me to give an opinion, but you don't even know about football? Wake up."
      );
      return;
    }

    // Prepare the prompt for OpenAI to generate a response in Gordon Ramsay's style
    const prompt = `You are Pep Guardiola, the famous football manager. Critique the following football opinions in your funny, direct, and harsh style: "${footballOpinions}".`;

    const conversationHistory = [{ role: "user", content: prompt }];

    console.log("Executing critique command with prompt:", prompt); // Debug log

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
