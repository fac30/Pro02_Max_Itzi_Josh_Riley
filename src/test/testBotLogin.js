const { Client, GatewayIntentBits, Events } = require('discord.js');
require('dotenv/config'); 


async function testBotLogin() {
  // Discord.js requires at least one intent to be specified for the Client instance.
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds 
    ]
  });

  console.log('Testing bot login...')

  client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag} securely using secure Discord Token`);
    
    // Log out after logging in successfully
    client.destroy()
      .then(() => console.log('Bot logged out successfully.'))
      .catch(err => console.error('Failed to log out:', err));
  });

  // Log in to Discord
  try {
    await client.login(process.env.DISCORD_TOKEN);
    console.log('Bot logged in successfully.');
  } catch (err) {
    console.error('Failed to log in:', err);
  }
}

// Export the function
module.exports = testBotLogin;
