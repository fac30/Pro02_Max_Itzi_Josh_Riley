const { generateChatResponse } = require('../utils/openai'); // Import your OpenAI utility function

(async function runOpenAITest() {
  console.log('Testing OpenAI API connectivity...');

  const prompt = 'You are Gordon Ramsay, the famous chef. Critique the following food description in your unique, direct, and often harsh style: "burnt toast with soggy eggs".';
  const conversationHistory = [{ role: 'user', content: prompt }];

  try {
    const response = await generateChatResponse(prompt, conversationHistory);
    console.log('OpenAI API test successful. Response:', response);
  } catch (error) {
    console.error('OpenAI API test failed. Error:', error);
  }
})();
