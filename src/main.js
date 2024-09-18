// Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace
(() => {
    'use strict';
  
    // Constants and Variables
    const BASE_URL = 'https://api.example.com'; // Example of a constant URL for API calls
    let userData = {}; // Example of a variable to store user data
  
  // utility functions
// This function is used to fetch data from a given API endpoint asynchronously.
const fetchData = async (endpoint) => {
  try {
    // Perform a fetch request to the API, constructing the full URL using BASE_URL and the provided endpoint.
    const response = await fetch(`${BASE_URL}/${endpoint}`);

    // If the response is not OK (i.e., status code is not in the range 200-299), throw an error.
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // If the response is successful, parse and return the JSON data.
    return await response.json();
  } catch (error) {
    // Catch and log any errors that occur during the fetch or JSON parsing process.
    console.error('Error fetching data:', error);
  }
};
  
   // Function to show an alert on the page
   const showAlert = (message, type = 'info') => {
    // Create a new div element to hold the alert
    const alertBox = document.createElement('div');

    // Set the class for styling the alert (Bootstrap alert classes are assumed)
    alertBox.className = `alert alert-${type}`;

    // Set the text inside the alert box
    alertBox.textContent = message;

    // Append the alert to the body of the document
    document.body.appendChild(alertBox);
    
    // Automatically remove the alert after 3 seconds
    setTimeout(() => alertBox.remove(), 3000);
  };

  // Function to initialize event listeners for elements
  const initEventListeners = () => {
    // Add a click event listener to the button with ID 'myButton'
    document.getElementById('myButton').addEventListener('click', () => {
      // Show a success alert when the button is clicked
      showAlert('Button clicked!', 'success');
    });
  };

  // Initialization function that runs when the page is loaded
  const init = () => {
    // Log a message to the console indicating that the JavaScript is loaded
    console.log('JavaScript Loaded');
    
    // Initialize event listeners
    initEventListeners();

    // Example data fetching function (fetchData needs to be defined elsewhere)
    fetchData('users').then((data) => {
      // Store the fetched data in userData (assumes userData is defined elsewhere)
      userData = data;

      // Log the fetched data to the console
      console.log('User Data:', userData);
    });
  };

  // Run the initialization function when the DOM content is fully loaded
  document.addEventListener('DOMContentLoaded', init);
})();