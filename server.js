require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = {origin: process.env.CORS};
const api = require('./FitnessApi/routes');
const app = express();
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function (req,res){
  res.writeHead(200, {"Content-Type": "text/html"});

  fs.createReadStream(path.resolve(__dirname + '/src/index.html')) 
  .pipe(res);
});
const port = (process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.use('/api', api);

server.listen(port,function(){
  console.log("Server running on: " + port);
});

module.exports = app;