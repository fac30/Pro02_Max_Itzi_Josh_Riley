const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("summary")
    .setDescription("Replies how asking for some documentation"),
  async execute(interaction) {
    await interaction.reply(
      "You know, back in the day we didn't have ChatGPT and people actually read. Gosh, give me the bloody documentation so I can chew it for you..."
    );
  },
};
