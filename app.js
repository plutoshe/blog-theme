var express = require("express");
var app     = express();
var path    = require("path");
var ejs     = require('ejs');
var showdown  = require('showdown'),
    converter = new showdown.Converter();
    


function portfolioRender(req,res){
    //console.log(path.join(__dirname + '/src/portfolio.ejs'));
    res.render(path.join(__dirname + '/src/portfolio'));
    
    //ejs.renderFi
}
function portfolioHtmlRender(req,res) {
    res.sendFile(path.join(__dirname+'/src/portfolio.html'));
}

function aboutRender(req,res){
}
    

var blogRender = [];
for (var i = 0; i < 2; i++) {
    var j = i;
    let text = '# blog content!' + j;
    let html = converter.makeHtml(text);
    blogRender[j] = function (req, res) {
        console.log(html);
        res.render(path.join(__dirname+'/src/blog'), {
            additional_css: '<link rel="stylesheet" type="text/css" href="/assets/css/blog.css">',
            blog_content: html,
        });
    }
    
    app.get('/blog/test' + i, blogRender[i]);
}


app.get('/', portfolioRender);

app.get('/portfolio', portfolioHtmlRender);

app.get('/about', aboutRender);

app.use("/assets", express.static(__dirname+"/assets"));
app.use("/src", express.static(__dirname+"/src"));
app.engine('.html', require('ejs').__express);
app.set("view engine","ejs");
//app.set('view engine', 'html');
app.listen(3000);

console.log("Running at Port 3000");
