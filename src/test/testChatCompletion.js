const { OpenAI } = require('openai');
const config = require('../config');

const openai = new OpenAI({
  apiKey: config.openaiApiKey
});

async function testChatCompletion(prompt = "Hello, how are you?") {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ]
    });

    const message = response.choices[0].message.content;
    return message;

  } catch (error) {
    return `An error occurred: ${error.message}`;
  }
}

module.exports = testChatCompletion;
