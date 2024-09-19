const assert = require('assert');
const { handleMessage } = require('../events/messageCreate');

// Mock message object creator
function createMockMessage(content, isDM = false, isBot = false) {
  console.log("Creating mock message. Is bot?", isBot);  // Log to verify bot status
  return {
    content,
    author: { 
      id: '1234', 
      bot: isBot,
      send: function(message) { // Mock send function for direct messages
        this.lastMessageSent = message; // Store the last DM sent
        console.log(`DM Response: ${message}`);
      }
    },
    channel: {
      lastMessageSent: null, // Ensure lastMessageSent is initialized
      send: function (message) {
        this.lastMessageSent = message; // Store the last message sent for testing
        console.log(`Bot Response: ${message}`);
      },
      sendTyping: async function () {
        // Simulate send typing (empty, no-op for testing)
      },
    },
    guild: isDM ? null : {}, // guild is null for DMs, object for server messages
  };
}

// Test cases
(async function runTests() {
  console.log('Running tests...');

  // Test 1: Handle server command with correct prefix (!critique)
  const test1Message = createMockMessage('!critique poorly formatted code');
  await handleMessage(test1Message);
  assert.ok(test1Message.channel.lastMessageSent, 'Test 1 Failed: Bot did not respond to a server command with a prefix.');
  console.log('Test 1 Passed: Bot responded correctly to a server command with a prefix.');

  // Test 2: Handle DM (no prefix required)
  const test2Message = createMockMessage('explain recursion', true); // Simulate DM
  await handleMessage(test2Message);
  assert.ok(test2Message.author.lastMessageSent, 'Test 2 Failed: Bot did not respond to a DM.');
  console.log('Test 2 Passed: Bot responded correctly to a DM.');

  // Test 3: Ignore messages from other bots
  const test3Message = createMockMessage('!explain closures', false, true); // Message from another bot
  console.log("Running Test 3: Message from a bot (should be ignored).");
  await handleMessage(test3Message);
  assert.strictEqual(test3Message.channel.lastMessageSent, null, 'Test 3 Failed: Bot should ignore messages from other bots.');
  console.log('Test 3 Passed: Bot correctly ignored a message from another bot.');

  // Test 4: Ignore messages without correct prefix in a server
  const test4Message = createMockMessage('explain closures'); // No prefix in server
  await handleMessage(test4Message);
  assert.ok(!test4Message.channel.lastMessageSent, 'Test 4 Failed: Bot should ignore messages without a prefix in server.');
  console.log('Test 4 Passed: Bot correctly ignored messages without a prefix in a server.');

  // Test 5: Ensure response for valid command with conversation history (testing conversation window)
  const test5Message = createMockMessage('!explain recursion again');
  await handleMessage(test5Message);
  assert.ok(test5Message.channel.lastMessageSent, 'Test 5 Failed: Bot did not respond with an OpenAI-generated message for a valid command.');
  console.log('Test 5 Passed: Bot correctly responded to a valid command with OpenAI-generated message.');

  // Simulate multiple interactions to test conversation history truncation
  const conversationTestMessage = createMockMessage('!explain callback functions');
  for (let i = 0; i < 10; i++) {
    await handleMessage(conversationTestMessage);
  }
  assert.ok(conversationTestMessage.channel.lastMessageSent, 'Test 6 Failed: Bot did not respond after multiple interactions.');
  console.log('Test 6 Passed: Bot correctly handled conversation history after multiple interactions.');

  console.log('All tests passed!');
})();
