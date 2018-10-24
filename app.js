var express = require("express");
var app     = express();
var path    = require("path");

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/src/portfolio.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/portfolio',function(req,res){
  res.sendFile(path.join(__dirname+'/src/portfolio.html'));
});

app.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/src/about.html'));
});

app.use("/assets", express.static(__dirname+"/assets"));
app.use("/src", express.static(__dirname+"/src"));
app.listen(3000);

console.log("Running at Port 3000");
