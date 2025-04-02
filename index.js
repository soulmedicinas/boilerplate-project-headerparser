// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.set('trust proxy', true); // Enable for accurate IP behind proxies
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Header parser endpoint
app.get('/api/whoami', (req, res) => {
  res.json({
    ipaddress: req.ip, // Extracts IP (handles proxies via Express trust proxy)
    language: req.headers['accept-language'], // Gets language preference
    software: req.headers['user-agent'] // Gets browser/OS info
  });
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
