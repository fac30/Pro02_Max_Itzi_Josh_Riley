const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("node")
    .setDescription("Replies how can it help with Node problems"),
  async execute(interaction) {
    await interaction.reply(
      "Well, this one is on you! Why the hell would you use Node in the first place? Anyway, what do you need?"
    );
  },
};
