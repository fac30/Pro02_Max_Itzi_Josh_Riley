// Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace
(() => {
    'use strict';
  
    // Constants and Variables
    const BASE_URL = 'https://api.example.com'; // Example of a constant URL for API calls
    let userData = {}; // Example of a variable to store user data
  
    // Utility Functions
    const fetchData = async (endpoint) => {
      try {
        const response = await fetch(`${BASE_URL}/${endpoint}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const showAlert = (message, type = 'info') => {
      const alertBox = document.createElement('div');
      alertBox.className = `alert alert-${type}`;
      alertBox.textContent = message;
      document.body.appendChild(alertBox);
      
      // Automatically remove the alert after 3 seconds
      setTimeout(() => alertBox.remove(), 3000);
    };
  
    // Event Listeners
    const initEventListeners = () => {
      document.getElementById('myButton').addEventListener('click', () => {
        showAlert('Button clicked!', 'success');
      });
    };
  
    // Initialization Function
    const init = () => {
      console.log('JavaScript Loaded');
      initEventListeners();
  
      // Fetch initial data (example usage)
      fetchData('users').then((data) => {
        userData = data;
        console.log('User Data:', userData);
      });
    };
  
    // Run the initialization function when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', init);
  })();  