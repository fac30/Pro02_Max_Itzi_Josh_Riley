module.exports = {
    name: 'dm',
    description: 'Send a direct message to the user who invoked the command.',
    async execute(message, args) {
      try {
        // Get the user who invoked the command
        const user = message.author;
  
        // Define the message to send to the user (can also be customized with args)
        const dmMessage = args.length ? args.join(' ') : 'Hello! This is a private message from the bot.';
  
        // Send the DM to the user
        await user.send(dmMessage);
        console.log(`Sent a DM to ${user.tag}: ${dmMessage}`);
  
        // Optionally send a confirmation in the channel
        await message.channel.send(`${user.tag}, I've sent you a DM!`);
      } catch (error) {
        console.error('Error sending DM:', error);
        message.channel.send('Sorry, I couldn\'t send you a DM!');
      }
    },
  };
  