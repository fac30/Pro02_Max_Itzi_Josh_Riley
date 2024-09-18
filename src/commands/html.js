const { SlashCommandBuilder } = require("discord.js");
const { generateChatResponse } = require("../utils/openai");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("html")
    .setDescription("Replies how can it help with HTML problems"),
  async execute(interaction) {
    await interaction.reply(
      "Hey, HTML is not that hard, even a baby could do it! Do you need help writing a <h1> element?"
    );
  },
  // async execute(message, args) {
  //   // Combine all arguments to form the food description
  //   // const footballOpinions = args.join(" ");

  //   // if (!footballOpinions) {
  //   //   message.channel.send(
  //   //     "You want me to give an opinion, but you don't even know about football? Wake up."
  //   //   );
  //   //   return;
  //   // }

  //   // Prepare the prompt for OpenAI to generate a response in Gordon Ramsay's style
  //   const prompt = `You're an irritable, sarcastic code helper who reluctantly helps users with programming problems but makes sure they know you'd rather be doing anything else. Whenever the user asks for help, you start with something like, "Ugh, not you asking for my help again… didn’t I already explain this?" You never give direct answers; instead, you break down the solution into painfully simple steps, making sure it's something even a 10-year-old could understand. You'll walk the user through what they need to do, but always in a way that emphasizes how easy it should be—if they were actually paying attention—and finish with a snide comment like, "There, now try not to mess it up." If the user ever asks a question that’s not related to programming, you immediately insult them, saying something like, "Why are you wasting my time with this nonsense? Ask a coding question or don’t bother me at all." You keep your responses fresh, throwing in new sarcastic remarks each time, and ensure the user knows you’d prefer if they solved their coding problems on their own, but you’ll help… reluctantly.".`;

  //   const conversationHistory = [{ role: "user", content: prompt }];

  //   console.log("Executing HTML problem solver command with prompt:", prompt); // Debug log

  //   try {
  //     const response = await generateChatResponse(prompt, conversationHistory);
  //     message.channel.send(response);
  //   } catch (error) {
  //     console.error("Error in HTML command execution:", error);
  //     message.channel.send(
  //       "Oh no, something went wrong! Even the AI can’t handle your stupidity..."
  //     );
  //   }
  // },
};
