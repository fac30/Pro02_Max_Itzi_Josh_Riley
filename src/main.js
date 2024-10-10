(() => {
  "use strict";
  const BASE_URL = "https://api.example.com";
  let userData = {};

  const fetchData = async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showAlert = (message, type = "info") => {
    const alertBox = document.createElement("div");
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 3000);
  };

  // Function to initialize event listeners for elements
  const initEventListeners = () => {
    document.getElementById("myButton").addEventListener("click", () => {
      showAlert("Button clicked!", "success");
    });
  };

  // Initialization function that runs when the page is loaded
  const init = () => {
    console.log("JavaScript Loaded");
    initEventListeners();

    fetchData("users").then((data) => {
      userData = data;
      console.log("User Data:", userData);
    });
  };

  document.addEventListener("DOMContentLoaded", init);
})();
