// server set up using express.js

const express = require("express");

const server = express();

const staticHandler = express.static("public");

server.use(staticHandler);

function logger(request, response, next) {
    console.log(request.method + " " + request.url);
    next();
}

server.use(logger);

server.get("/", logger, (request, response) => {
    const time = new Date().toLocaleTimeString();
    response.send(`<h1>Hello, it's ${time}</h1>`);
});

server.get("/json", (request, response) => {
    response.send({ message: "Hello" });
});

server.get("/redirects", (request, response) => {
    response.redirect("/");
});

server.get("/users/:name", (request, response) => {
    const name = request.params.name;
    response.send(`<h1>Hello ${name}</h1>`);
});

// Move the POST route above the 404 handler
server.post("/submit", (request, response) => {
    console.log("posted");
    response.send("thanks for submitting");
});

// 404 handler
server.use((request, response) => {
    response.status(404).send("<h1>Not found</h1>");
});

const PORT = 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));