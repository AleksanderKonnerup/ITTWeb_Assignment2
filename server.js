require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./FitnessApi/routes');
const app = express();
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function (req,res){

  fs.createReadStream(path.resolve(__dirname + '/src/index.html')) 
  .pipe(res);
});

const port = (process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.options('*', cors())

// app.use(function(req, res, next) {
//   res.setheader("Access-Control-Allow-Origin", 'http://localhost:4200');
//   res.setheader("Access-Control-Allow-Origin", "Origin, 'http://localhost:4200', Content-Type, Accept");
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   next()});

app.use('/api', api);

server.listen(port,function(){
  console.log("Server running on: " + port);
});

module.exports = app;