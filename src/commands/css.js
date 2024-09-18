const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("css")
    .setDescription("Replies how can it help with CSS problems"),
  async execute(interaction) {
    await interaction.reply(
      "Let's see if I can help you making the website pretty, as I can see you're not doing a good job... What is your problem?"
    );
  },
};
