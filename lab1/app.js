const express = require('express');
const app = express();
const configRoutes = require('./routes');
const static = express.static(__dirname + '/public');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

let totalRequests = 0;
let arr = [];

app.use('*', function(req, res, next) {
  totalRequests++;
  let check = false;
  for (let obj in arr){
    if (arr[obj].urlpath == req.originalUrl){
      arr[obj].numOfReq++;
      check = true;
    }
  }
  if (!check){
    arr.push({urlpath: req.originalUrl, numOfReq: 1});
  }
  console.log("______________LOG__________________");
  console.log("[" + new Date().toUTCString() + "] " + "\nTotal Requests: " + totalRequests + "\n\n Request Method: " + req.method + "\n Request Body: " + JSON.stringify(req.body) + " \n Request url: " + req.originalUrl);
  console.log("\n \nRequests per URL: ");
  for (let urlf in arr){
    console.log(arr[urlf].urlpath + ": " + arr[urlf].numOfReq);
  }
  console.log("___________________________________");
  next();
})


configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});