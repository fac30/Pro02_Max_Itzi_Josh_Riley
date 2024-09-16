# JavaScript Template

## Main

### Key Elements and Best Practices:

1. **IIFE (Immediately Invoked Function Expression):** 
   - This pattern helps avoid polluting the global scope by encapsulating all variables and functions.
  
2. **`'use strict';` Directive:** 
   - Enforces a stricter parsing and error handling of your JavaScript code, which helps catch common coding mistakes.

3. **Constants and Variables:** 
   - Use `const` for constants that do not change and `let` for variables that might change.

4. **Utility Functions:** 
   - `fetchData` function for making asynchronous requests with error handling.
   - `showAlert` function for showing notifications to users dynamically.

5. **Event Listeners:**
   - Sets up event listeners in a centralized `initEventListeners` function for maintainability.

6. **Initialization Function:** 
   - An `init` function to handle the script’s startup tasks, such as setting up event listeners and fetching initial data.

7. **`DOMContentLoaded` Event:**
   - Ensures the initialization code runs only after the DOM is fully loaded, which avoids issues with trying to manipulate elements that aren’t yet available.

Feel free to adapt or extend this template according to your project needs!

## Server - Express.js

This document provides an overview of the endpoints and middleware for the Express.js server.

## Overview

This server handles static files, logs incoming requests, and defines several routes for different HTTP methods (GET, POST).

## Endpoints

- **GET /**  
  Returns a greeting with the current time.  
  **Example Response:**  
  `<h1>Hello, it's 12:34:56 PM</h1>`

- **GET /json**  
  Returns a JSON object.  
  **Example Response:**  
  `{ "message": "Hello" }`

- **GET /redirects**  
  Redirects to the root ("/") route.

- **GET /users/:name**  
  Returns a personalized greeting.  
  **Path Parameter:**  
  `name` - Name of the user  
  **Example Response:**  
  `<h1>Hello John</h1>`

- **POST /submit**  
  Accepts form submissions and logs them.  
  **Example Response:**  
  `"thanks for submitting"`

## Middleware

- **Static Files**: Serves files from the `public` directory.
- **Logger**: Logs each incoming request method and URL to the console.

## Error Handling

- **404 Handler**: Returns a "Not found" message for undefined routes.  
  **Response:**  
  `<h1>Not found</h1>`

## Running the Server

Run the server on port `3000` with the following command:

```bash
node server.js
```

Access the server at: `http://localhost:3000`
```

This documentation provides a brief description of each endpoint, middleware, error handling, and instructions to run the server.