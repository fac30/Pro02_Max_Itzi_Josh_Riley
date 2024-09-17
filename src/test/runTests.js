// Import the test files below
const testChatCompletion = require('./testChatCompletion.test');



// A function to run all tests
const runTests = async () => {
  console.log('Running Tests...\n');

  try {
    await testChatCompletion(); // Run tests for testChatCompletion
    console.log('testChatCompletion tests completed.\n');
  } catch (error) {
    console.error('testChatCompletion tests failed:', error.message);
  }
// Add calls to other test modules below

};

// Run all tests
runTests();
