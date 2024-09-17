module.exports = {
    name: 'ping',
    description: 'Responds with Pong!',
    execute(message) {
      message.channel.send('Pong! 🏓');
    },
  };  