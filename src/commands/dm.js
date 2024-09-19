module.exports = {
    name: 'dm',
    description: 'Send a direct message to the user who invoked the command.',
    async execute(message, args) {
      try {
        // Get the user who invoked the command
        const user = message.author;
  
        // Define the message to send to the user (can also be customized with args)
        const dmMessage = args.length ? args.join(' ') : "You really forced my hand here, yes I can message you privately, but I won't respond here just to annoy you!";
  
        // Send the DM to the user
        await user.send(dmMessage);
        console.log(`Sent a DM to ${user.tag}: ${dmMessage}`);
  
        // Optionally send a confirmation in the channel
        await message.channel.send(`${user.tag}, check your inbox but please don't answer, I have enough to worry about with this server channel already!`);
      } catch (error) {
        console.error('Error sending DM:', error);
        message.channel.send('Sorry, I couldn\'t send you a DM!');
      }
    },
  };
  