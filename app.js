var express  = require("express");
var app      = express();
var path     = require("path");
var ejs      = require('ejs');
var fs       = require("fs");
var yaml     = require('yaml')
var protobuf = require("protobufjs");
var showdown = require('showdown');

var converter = new showdown.Converter();

function portfolioRender(req,res){
    //console.log(path.join(__dirname + '/src/portfolio.ejs'));
    res.render(path.join(__dirname + '/src/portfolio'));
    
    //ejs.renderFi
}
function portfolioHtmlRender(req,res) {
    res.sendFile(path.join(__dirname+'/src/portfolio.html'));
}

function aboutRender(req,res){
    res.render(path.join(__dirname + '/src/about'));
}
    
var walkSync = function(dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {    
            filelist = walkSync(dir + file + '/', filelist);
        }
        else {
            if (file.substr(file.length - 5) == ".yaml") {
                filelist.push(path.join(dir, file));
                console.log(file);
            }
        }
    });
    return filelist;
};
var blog_yaml_list = walkSync("assets/blogs");
var blog_list = [];
var blog_list_from_file;
for (var i = 0; i < blog_yaml_list.length; i++) {
    console.log(blog_yaml_list[i]);
    try {
        blog_list_from_file = yaml.parse(fs.readFileSync(blog_yaml_list[i], 'utf8'));
    } catch(err) {
    } finally {
        blog_list = blog_list.concat(blog_list_from_file);
    }
}
const default_md_path = "assets/blogs/"
var blogRender = [];
for (var i = 0; i < blog_list.length; i++) {
    var j = i;
    var md_path = default_md_path;
    if (blog_list[i].md_path != '')
        md_path = blog_list[i].md_path;
    md_path = path.join(md_path, blog_list[i].md_name);
    let text = fs.readFileSync(md_path).toString();
    let html = converter.makeHtml(text);
    blogRender[j] = function (req, res) {
        console.log(html);
        res.render(path.join(__dirname+'/src/blog'), {
            additional_css: '<link rel="stylesheet" type="text/css" href="/assets/css/blog.css">',
            blog_content: html,
        });
    }
    app.get('/blog/' + blog_list[i].title, blogRender[i]);
}


app.get('/', portfolioRender);
app.get('/portfolio', portfolioRender);
app.get('/about', aboutRender);

app.use("/assets", express.static(__dirname+"/assets"));
app.use("/src", express.static(__dirname+"/src"));
app.engine('.html', require('ejs').__express);
app.set("view engine","ejs");
//app.set('view engine', 'html');
app.listen(3000);

console.log("Running at Port 3000");
