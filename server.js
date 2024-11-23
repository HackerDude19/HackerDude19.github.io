const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Set up session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set to true if using https
}));

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to handle login form submission
app.post('/login', (req, res) => {
    const { username } = req.body;
    req.session.username = username;  // Store username in session
    res.redirect('/');  // Redirect to home after login
});

// Route to handle logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Failed to log out");
        }
        res.redirect('/');  // Redirect to home page after logout
    });
});

// Route to fetch session data (check if user is logged in)
app.get('/session', (req, res) => {
    if (req.session.username) {
        res.json({ username: req.session.username });
    } else {
        res.json({ username: null });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
