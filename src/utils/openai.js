const { OpenAI } = require("openai");
const config = require("../../config");

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

async function generateChatResponse(conversationHistory) {
  try {
    console.log("Calling OpenAI API...");

    const response = await openai.chat.completions.create({
      model: config.openaiModel,
      messages: conversationHistory,
    });

    console.log("OpenAI API response:", response);

    return response.choices[0].message.content;
  } catch (error) {
    console.error(
      "Error during OpenAI API call:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}
s;
module.exports = { generateChatResponse };
