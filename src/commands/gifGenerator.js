const fetch = require("node-fetch");
const config = require("../../config");

module.exports = {
  name: "gif",
  description: "Fetches a random GIF based on a search term from Giphy",

  async execute(message) {
    const searchTerms = ["face palm", "eye roll", "fed up"];
    const searchTerm =
      searchTerms[Math.floor(Math.random() * searchTerms.length)];

    // Construct Giphy API URL
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${
      config.giphyApiKey
    }&tag=${encodeURIComponent(searchTerm)}&rating=G`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.data && data.data.images && data.data.images.original.url) {
        const gifUrl = data.data.images.original.url;
        await message.channel.send(gifUrl);
      } else {
        await message.channel.send("Sorry, no GIF found for that search term.");
      }
    } catch (error) {
      console.error("Error fetching GIF:", error);
      await message.channel.send(
        "Sorry, something went wrong while fetching the GIF."
      );
    }
  },
};
