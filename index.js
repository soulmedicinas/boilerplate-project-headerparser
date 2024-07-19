// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

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

app.get('/api/whoami', function (req, res){
  const ipaddress = req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress;
  const cleanIp = ipaddress.startsWith('::ffff:') ? ipaddress : `::ffff:${ipaddress}`;

  console.log('IP Address:', cleanIp);
  console.log('Language:', req.headers['accept-language']);
  console.log('Software:', req.headers['user-agent']);

  res.json({ ipaddress: cleanIp, language: req.headers['accept-language'], software: req.headers['user-agent'] });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 4000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
