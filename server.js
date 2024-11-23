const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON requests
app.use(express.json());

// Route to handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Read the login.txt file to get the correct username and password
    fs.readFile(path.join(__dirname, 'login.txt'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading login.txt:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }

        // Split the file content into username and password
        const [storedUsername, storedPassword] = data.trim().split(':');

        // Validate the input credentials against the file
        if (username === storedUsername && password === storedPassword) {
            return res.json({ success: true, message: 'Login successful' });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});