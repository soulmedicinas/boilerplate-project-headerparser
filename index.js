// server.js

const express = require('express');
const app = express();

// Enable CORS for testing purposes
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files (if needed)
app.use(express.static('public'));

// API endpoint
app.get('/api/whoami', (req, res) => {
  res.json({
    ipaddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  });
});

// Root route (optional)
app.get('/', (req, res) => {
  res.send('Request Header Parser Microservice is running!');
});

// Listen for requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});