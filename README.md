# Pro02_Max_Itzi_Josh_Riley
Discord ChatBot

# Team Roles:

- **Scrum Master**: Josh
- **UI/UX**: Itzi
- **Quality Control**: Riley
- **DevOps**: Max

# Possible Features:

- **Theme**: Coding troubleshooting, Automated message service for Brainwave Bureau
- **Selectable options**: 
  - JavaScript
  - CSS
  - HTML
  - Brainwave Bureau FAQ’s
- **Automated Moderation Features**: The Chat Bot will not respond to offensive messages.
- **Ping Bot outside listed channels**: The ability to `@mention` the chat bot in external channels.
- **ChatBot personality**: Cockney, Rude, Pirate, etc.

# Early Tasks:

1. Obtain Discord
2. Obtain OpenAI Key
3. Come up with Chatbot's name

# Setting Up

- Dynamic routes will be used to handle different types of interactions, e.g., `/chat` where users send messages, and your server processes them.
- **POST request** to receive messages from users (when someone sends a message to the bot).
- Node server will act as the middleman between users and OpenAI:
  1. User sends a message to your server (using a POST request).
  2. Server takes that message and sends it to the OpenAI API.
  3. OpenAI processes the message and sends back a response (the chatbot’s reply).
  4. Your server forwards that reply back to the user.
