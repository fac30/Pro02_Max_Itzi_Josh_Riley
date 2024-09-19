// Import the express module to create a web server
const express = require("express");

// Create an instance of an Express server
const server = express();

// Set up static file handling for serving files from the "public" directory (like HTML, CSS, images, etc.)
const staticHandler = express.static("public");

// Use the static handler middleware to serve static files
server.use(staticHandler);

// Logger middleware to log the HTTP method and request URL for every request
function logger(request, response, next) {
    console.log(request.method + " " + request.url); // Log the request method (GET, POST, etc.) and the URL being requested
    next(); // Move to the next middleware or route handler
}

// Use the logger middleware for all incoming requests
server.use(logger);

// Define a route for the root URL ("/") that responds with the current time in an HTML message
server.get("/", logger, (request, response) => {
    const time = new Date().toLocaleTimeString(); // Get the current time
    response.send(`<h1>Hello, it's ${time}</h1>`); // Send an HTML response displaying the current time
});

// Define a route that returns a simple JSON object with a message
server.get("/json", (request, response) => {
    response.send({ message: "Hello" }); // Send a JSON response with a "Hello" message
});

// Define a route that redirects the user to the root URL ("/")
server.get("/redirects", (request, response) => {
    response.redirect("/"); // Redirect to the home page ("/")
});

// Define a route that captures a dynamic parameter (name) from the URL and responds with a personalized message
server.get("/users/:name", (request, response) => {
    const name = request.params.name; // Capture the "name" parameter from the URL
    response.send(`<h1>Hello ${name}</h1>`); // Send a personalized HTML greeting using the captured name
});

// Define a POST route that handles form submissions or any POST requests
// This route must be placed above the 404 handler to ensure it gets processed before the 404 error
server.post("/submit", (request, response) => {
    console.log("posted"); // Log a message when a POST request is received
    response.send("thanks for submitting"); // Send a thank-you response
});

// 404 error handler - This will catch any requests that don't match defined routes
server.use((request, response) => {
    response.status(404).send("<h1>Not found</h1>"); // Send a 404 status and a "Not found" HTML message
});

// Set the server to listen on port 3000
const PORT = 3000;

// Start the server and log a message indicating where it is accessible
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));