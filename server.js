//Written By Souvik Das 07/02/18
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
var request = require("request");
var fs = require("fs");
app.use(express.static(path.join(__dirname, 'dist')));

const download2 = require('download');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var set_attributes = {};
var responseObject = {};
var responseText = {};
var googleText = "";

//Your Google API Key
var googleApiKey = "AIzaSyDZ5rIF_as0p3eJW08nKkQE2c0EFdmpG1w";

//Smarty Streets AuthId
var smartyStreetsAuthId = "eff0b523-c528-0292-6685-6ad2c5a6e92a";

//Smarty Streets Auth Token
var smartyStreetsAuthToken = "V7pWleHG8yLUS8CC7NqQ";

//Default Api
app.get('/', (req, res) => {

    console.log("Hi There!!!!!")

    console.log(req.query.id);

   // res.sendFile(path.join(__dirname, 'dist/index.html'));
   res.send({"Status": "Failed.. Unable to classify VINss"});
  

});

var address;
var fbid;
var value;
var builtarea;

responseObj={};

app.get('/test', (req, res) => {

    console.log("Hi There!!!!!")

    address=req.query.address;
    fbid=req.query.fbid;
    value=req.query.value;
    builtarea=req.query.builtarea;

    var options = { method: 'GET',
  url: 'https://capyi.herokuapp.com/services/hq',
  qs: { fbid: fbid, area: builtarea, value: value },
  headers: 
   { 'postman-token': 'b5a521c0-ee33-00e0-b6c9-63e84c7c8bfa',
     'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  //responseText = JSON.parse(body);
  console.log(body);
  
  responseObj.address=address;
  responseObj.area=builtarea;
  responseObj.fbid=fbid;
  responseObj.value=value;
  responseObj.qtnum=body.qtnum;
  responseObj.premium=body.premium;
  responseObject.discount=body.discount;
});

   res.sendFile(path.join(__dirname, 'dist/index.html'));

});

app.get('/getDetails', (req, res) => {

    console.log("Hi There!!!!!")

   res.send(responseObject);
  

});




//Get port from environment and store in Express.
const port = process.env.PORT || '3009';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API is running on localhost:${port}`));
