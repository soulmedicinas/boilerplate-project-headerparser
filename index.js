// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
var os = require('os');
const networkInterfaces = os.networkInterfaces();
let localIpAddress = '';
var ipv6MappedIPv4 = `::ffff:${localIpAddress}`;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

function formatAcceptLanguage(header) {
  if (!header) return null;
  const languages = header.split(',').map((lang, index) => {
      const parts = lang.split(';q=');
      const language = parts[0].trim();
      const q = parts[1] ? parseFloat(parts[1]) : (index === 0 ? 1 : 0.5 / (index + 1));
      return `${language}${q !== 1 ? `;q=${q.toFixed(1)}` : ''}`;
  });

  return languages.join(',');
}

app.get('/api/whoami', function(req, res) {

  //ipaddress
  for (const interfaceName in networkInterfaces) {
    for (const address of networkInterfaces[interfaceName]) {
        if (address.family === 'IPv4' && !address.internal) {
            localIpAddress = address.address;
            break; // Exit the loop once the first non-internal IPv4 address is found
        }
    }
    if (localIpAddress) break; // Exit the outer loop if IP address is found
  }

  const acceptLanguage = req.headers['accept-language'];
  const formattedLanguages = formatAcceptLanguage(acceptLanguage);
  const agent = req.headers['user-agent'];

  res.json({"ipaddress":ipv6MappedIPv4, "language": formattedLanguages, "software": agent });
});




// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
//  console.log("Platform: " + os.platform());
//  console.log("Architecture: " + os.arch());

});
