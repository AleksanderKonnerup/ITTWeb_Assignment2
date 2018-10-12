require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./FitnessApi/routes');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');

const port = (process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api, function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('content-type', 'application/json');
  next();
});
app.all('*', function(req, res) {
  res.status(200).sendFile(path.resolve(__dirname + '/src/index.html'));
});

server.listen(port,function(){
  console.log("Server running on: " + port);
});

module.exports = app;