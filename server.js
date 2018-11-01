require('dotenv').config();
const express = require('express');
const api = require('./FitnessApi/routes');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/src')));
app.use('/api', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //res.header('Content-Type', 'application/json');
  next();
});

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use('/api/', api)
app.all('*', function(req, res) {
  res.status(200).sendFile(__dirname + '/src/index.html');
});
const port = (process.env.PORT || 8080);

server.listen(port,function(){
  console.log("Server running on: " + port);
});

module.exports = app;