var express  = require("express");
var app      = express();
var path     = require("path");
var ejs      = require('ejs');
var fs       = require("fs");
var yaml     = require('yaml')
var protobuf = require("protobufjs");
var showdown = require('showdown');

var converter = new showdown.Converter();

function aboutRender(req,res){
    let text = fs.readFileSync("assets/content/about.md").toString();
    let html = converter.makeHtml(text);
    //res.render(path.join(__dirname + '/src/about'));
    res.render(path.join(__dirname + '/src/about'), {
        additional_css: '<link rel="stylesheet" type="text/css" href="/assets/css/blog.css">',
        content: html,
    });
}
    
var walkSync = function(dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {    
            filelist = walkSync(dir + '/' +file + '/', filelist);
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
var blog_yaml_list = walkSync("assets/content/blogs");
var blog_list = [];
var blog_list_from_file;
//console.log(blog_yaml_list);
for (var i = 0; i < blog_yaml_list.length; i++) {
    blog_list_from_file = [];
    try {
        blog_list_from_file = yaml.parse(fs.readFileSync(blog_yaml_list[i], 'utf8'));
    } catch(err) {
    } finally {
        if (blog_list_from_file != null)
            blog_list = blog_list.concat(blog_list_from_file);
    }
}
const default_md_path = "assets/content/blogs/"
//const default_img_path = "assets/img/"
var blogRender = [];
for (var i = 0; i < blog_list.length; i++) {
    var md_path = blog_list[i].md_path? blog_list[i].md_path : default_md_path;
    blog_list[i].md_path = path.join(md_path, blog_list[i].md_name);

    var img_path = blog_list[i].img_path? blog_list[i].img_path : md_path;
    blog_list[i].img_path = path.join(img_path, blog_list[i].img_name);
}

for (var i = 0; i < blog_list.length; i++) {
    let text = fs.readFileSync(blog_list[i].md_path).toString();
    let html = converter.makeHtml(text);
    let blog_title = blog_list[i].title;
    blogRender[i] = function (req, res) {
        
        res.render(path.join(__dirname+'/src/blog'), {
            blog_title: blog_title,
            additional_css: '<link rel="stylesheet" type="text/css" href="/assets/css/blog.css">',
            blog_content: html,
        });
    }
    blog_list[i].url = '/blog/' + encodeURI(blog_list[i].title.split(" ").join("")); //
   // console.log(blog_list[i].url);
    app.get(blog_list[i].url, blogRender[i]);
}

function portfolioRender(req,res){
    //console.log(path.join(__dirname + '/src/portfolio.ejs'));
    var html = 0;
    //console.log(blog_list);
    res.render(path.join(__dirname + '/src/portfolio'), {
        bloglist: blog_list,
    });
    
    //ejs.renderFi
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
