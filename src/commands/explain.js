const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("explain")
    .setDescription("Replies how asking for something to explain"),
  async execute(interaction) {
    await interaction.reply(
      "Sigh... can't anyone figure things out on their own? What do you need explained?"
    );
  },
};
