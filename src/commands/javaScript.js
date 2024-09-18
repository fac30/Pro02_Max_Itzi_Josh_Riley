const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("javascript")
    .setDescription("Replies how can it help with JS problems"),
  async execute(interaction) {
    await interaction.reply(
      "Ugh, not you again asking questions about JavaScript... Have you heard about something called Stack Overflow? Alright, what the hell do you need this time?"
    );
  },
};
