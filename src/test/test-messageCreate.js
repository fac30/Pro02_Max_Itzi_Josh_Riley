const assert = require('assert'); // Node's built-in assert module
const { handleMessage } = require('../events/messageCreate'); // Import your message handler

// Mock message object creator
function createMockMessage(content, isDM = false) {
  return {
    content,
    author: { bot: false },
    channel: { 
      send: function(message) {
        this.lastMessageSent = message; // Store the last message sent for testing
        console.log(`Bot Response: ${message}`); // Log the bot's response to the console
      }
    },
    guild: isDM ? null : {}, // guild is null for DMs
  };
}

// Test cases
(async function runTests() {
  console.log('Running tests...');

  // Test 1: Handle server command with prefix
  const test1Message = createMockMessage('!critique raw chicken');
  await handleMessage(test1Message);
  assert.ok(test1Message.channel.lastMessageSent, 'Test 1 Failed: Bot did not respond to a server command with a prefix.');

  // Test 2: Handle DM without prefix
  const test2Message = createMockMessage('critique raw chicken', true);
  await handleMessage(test2Message);
  assert.ok(test2Message.channel.lastMessageSent, 'Test 2 Failed: Bot did not respond to a DM command without a prefix.');

  // Test 3: Ignore messages from bots
  const test3Message = createMockMessage('!critique overcooked pasta');
  test3Message.author.bot = true; // Simulate message from another bot
  await handleMessage(test3Message);
  assert.ok(!test3Message.channel.lastMessageSent, 'Test 3 Failed: Bot should ignore messages from other bots.');

  // Test 4: Ignore messages without correct prefix in a server
  const test4Message = createMockMessage('critique undercooked steak');
  await handleMessage(test4Message);
  assert.ok(!test4Message.channel.lastMessageSent, 'Test 4 Failed: Bot should ignore messages without prefix in server.');

  // New Test 5: Ensure OpenAI response for non-command input with correct prefix
  const test5Message = createMockMessage('!tell me a joke');
  await handleMessage(test5Message);
  assert.ok(test5Message.channel.lastMessageSent, 'Test 5 Failed: Bot did not respond with an OpenAI-generated message for non-command input.');

  console.log('All tests passed!');
})();
