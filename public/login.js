document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting

        // Get the username and password input values
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Send a POST request to the server for login validation
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Login successful!');
                // Redirect to another page or handle successful login here
                // window.location.href = 'dashboard.html'; // Example redirection
            } else {
                alert('Invalid username or password. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');
        });
    });
});
