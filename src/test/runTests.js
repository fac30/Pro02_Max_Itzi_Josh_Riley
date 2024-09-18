// Import the test files below
const testBotLogin = require('./testBotLogin.js');
const testChatCompletion = require('./testChatCompletion.js');

// A function to run all tests
const runTests = async () => {
  console.log('Running Tests...\n');

  // Define an array of test cases
  const testCases = [
    { prompt: "What is the capital of Mexico?", expectedAnswer: "Mexico City" },
    { prompt: "What is the largest planet in our solar system?", expectedAnswer: "Jupiter" }
  ];

  // Iterate over each test case
  for (const { prompt, expectedAnswer } of testCases) {
    try {
      console.log(`Testing prompt: "${prompt}"`);
      const response = await testChatCompletion(prompt);
      console.log(`Response: ${response}`);
      console.log(`Expected Answer: ${expectedAnswer}`);

      // Optionally, check if the response contains the expected answer
      if (response.includes(expectedAnswer)) {
        console.log(`Test passed\n`);
      } else {
        console.log(`Test failed for prompt: "${prompt}". Expected to include: "${expectedAnswer}"\n`);
      }
    } catch (error) {
      console.error(`Error testing prompt: "${prompt}":`, error.message);
    }
  }

  // Add calls to other test modules below
  testBotLogin();
};

// Run all tests
runTests();
