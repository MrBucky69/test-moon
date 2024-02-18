// timeout.js

// Function to redirect the user to the login page
function redirectToLoginPage() {
    window.location.href = 'index.html'; // Change 'index.html' to your login page URL
}

// Set a timeout to call the redirectToLoginPage function after 2 minutes (120,000 milliseconds)
setTimeout(redirectToLoginPage, 120000);
