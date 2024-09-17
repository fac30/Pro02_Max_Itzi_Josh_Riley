const { OpenAI } = require('openai');

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: 'your-api-key'
});

// Function to get a chat completion from OpenAI
async function testChatCompletion(prompt = "Hello, how are you?") {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", 
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
