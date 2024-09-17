const { handleMessage } = require('../src/events/messageCreate');
const { Client, GatewayIntentBits } = require('discord.js');

// Mock Discord.js classes
jest.mock('discord.js', () => {
  const actualDiscord = jest.requireActual('discord.js');
  return {
    ...actualDiscord,
    Client: jest.fn().mockImplementation(() => ({
      on: jest.fn(),
      login: jest.fn().mockResolvedValue('MockBotToken'),
    })),
  };
});

// Helper function to create a mock message object
function createMockMessage(content, isDM = false) {
  return {
    content,
    author: { bot: false },
    channel: { send: jest.fn() },
    guild: isDM ? null : {}, // guild is null for DMs
  };
}

describe('handleMessage', () => {
  test('should handle a server command with prefix correctly', async () => {
    const message = createMockMessage('!critique raw chicken');
    await handleMessage(message);
    expect(message.channel.send).toHaveBeenCalled(); // Ensures the bot sends a message
  });

  test('should handle a DM without prefix correctly', async () => {
    const message = createMockMessage('critique raw chicken', true);
    await handleMessage(message);
    expect(message.channel.send).toHaveBeenCalled(); // Ensures the bot sends a message
  });

  test('should ignore messages from bots', async () => {
    const message = createMockMessage('!critique overcooked pasta');
    message.author.bot = true; // Simulate a message from a bot
    await handleMessage(message);
    expect(message.channel.send).not.toHaveBeenCalled(); // No response should be sent
  });

  test('should ignore messages without correct prefix in a server', async () => {
    const message = createMockMessage('critique undercooked steak');
    await handleMessage(message);
    expect(message.channel.send).not.toHaveBeenCalled(); // No response should be sent
  });

  test('should send an error message if an unknown command is used', async () => {
    const message = createMockMessage('!unknowncommand');
    await handleMessage(message);
    expect(message.channel.send).toHaveBeenCalledWith(expect.stringContaining('I don\'t know that command'));
  });
});
