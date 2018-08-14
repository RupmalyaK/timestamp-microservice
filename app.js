// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) =>   res.sendFile(__dirname + '/views/index.html'));


// your first API endpoint... 
app.get("/api/whoami", (req, res) => {
    const ipAdress = req.headers['x-forwarded-for'].split(',')[0] || req.connection.remoteAdress;
    res.status(200).json({
    "ipadress":ipAdress,
    "software":req.headers["user-agent"]
    });
});

app.get('*', (req , res) => {
  res.status(404).send('<html><head></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">Not Found</pre></body></html>');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, () =>  console.log('Your app is listening on port ' + listener.address().port)
);
