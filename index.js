// Import required modules
const express = require('express');
const cors = require('cors');

// Initialize the app
const app = express();
const port = 3000;

// Middleware
app.use(cors());

// Serve the root route
app.get('/', (req, res) => {
  res.send('Request Header Parser Microservice');
});

// API endpoint for /api/whoami
app.get('/api/whoami', (req, res) => {
  res.json({
    ipaddress: req.ip || req.socket.remoteAddress,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
