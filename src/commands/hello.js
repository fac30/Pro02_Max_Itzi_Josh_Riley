module.exports = {
    name: 'hello',
    description: 'Greets the user.',
    execute(message) {
      message.channel.send(`Hello, ${message.author.username}! How can I assist you today?`);
    },
  };
  