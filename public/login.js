// This script is used on both the homepage and login page

document.addEventListener('DOMContentLoaded', () => {

    // Handle the login form submission on the login page
    if (document.getElementById('login-form')) {
        document.getElementById('login-form').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            // Get the username entered in the form
            const username = document.getElementById('username').value;

            // Save login info to localStorage
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('username', username);

            // Redirect to the homepage
            window.location.href = 'index.html'; // Go back to the homepage after successful login
        });
    }

    // Handle login state and display the username
    const isLoggedIn = localStorage.getItem('loggedIn'); // Use localStorage to check if the user is logged in

    if (isLoggedIn) {
        const username = localStorage.getItem('username'); // Retrieve the username from localStorage
        document.getElementById('login-link').style.display = 'none';  // Hide login link
        document.getElementById('user-dropdown').style.display = 'block';  // Show user dropdown
        document.getElementById('username-btn').textContent = username;  // Display the username
    }

    // Toggle dropdown menu
    document.getElementById('username-btn').addEventListener('click', () => {
        const menu = document.getElementById('dropdown-menu');
        menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
    });

    // Handle logout functionality
    document.getElementById('logout').addEventListener('click', () => {
        // Perform logout action (clear user session, etc.)
        console.log('Logging out...');

        // Remove login info from localStorage
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('username');

        // Hide user menu and show login link again
        document.getElementById('user-dropdown').style.display = 'none'; // Hide the dropdown
        document.getElementById('login-link').style.display = 'block';  // Show login link

        // Optionally, reload the page
        location.reload(); // Reload to reset page to the logged-out state
    });
});
