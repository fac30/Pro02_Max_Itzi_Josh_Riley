module.exports = {
    name: 'hello',
    description: 'Greets the user.',
    execute(message) {
      message.channel.send(`Yes ${message.author.username} what do you want now?`);
    },
  };
  