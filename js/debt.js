var fs = require('fs');
var defaultJsonName = 'debt.json';
var defaultNameList = ["Jim", "Anglela", "Pluto"];
var currentDebtList = { "sum":[0,0,0], "datalist":[]};

var defaultCommentOption = [
"星期一早车费","星期一晚车费",
"星期二早车费","星期二晚车费",
"星期三早车费","星期三晚车费",
"星期四早车费","星期四晚车费",
"星期五早车费","星期五晚车费",
"星期六早车费","星期六晚车费"];

function loadDebtList(filename) {
	fs.readFile(filename, 'utf8', function readFileCallback(err, data){
	    if (err){
	        console.log(err);
	    } else {
	    currentDebtList =  JSON.parse(data); 
		}
	})
}

function saveDebtList(currentDebtList, filename) {
	var json = JSON.stringify(currentDebtList);
	fs.writeFile(filename, json, 'utf8', function(err) {
    if (err) throw err;
    console.log('complete');
    });
}
loadDebtList(defaultJsonName);
if (!defaultJsonName)
	currentDebtList = { "sum":[0,0,0], "datalist":[]};
//currentDebtList =loadDebtList(defaultJsonName);

//currentDebtList.loadFromJson(defaultJsonName);

function renderDebt(req,res) {
	var html = 0;
	var path = require("path");
    //console.log(blog_list);
    console.log(__dirname + '/../src/plugins/debt');
    res.render(path.join(__dirname + '/../src/plugins/debt'), {
        debtlist: currentDebtList,
        comment_option: defaultCommentOption,
    });
    console.log(currentDebtList);
    console.log(defaultCommentOption);
}
function strip(number, precision) {
    return (parseFloat(number).toPrecision(precision));
}

function addNewDebt(req,res) {
	console.log(req.body);
	//res.status(200);
	console.log(req.body.lend);
	console.log(req.body.borrow);
	console.log(req.body.loanAmount);
	if (req.body.lend && req.body.borrow && req.body.loanAmount) {
		
		var debtItem = {
			"value": [0,0,0],
			"comment": req.body.comment,
		};
		debtItem.value[parseInt(req.body.lend, 10)] = req.body.loanAmount * 1.0;
		var num = req.body.borrow.length;
		for (var i = 0; i < req.body.borrow.length; i++)
			debtItem.value[parseInt(req.body.borrow[i], 10)] -= req.body.loanAmount * 1.0 / num;
		for (var i = 0; i < 3; i++) {
			// console.log(debtItem.value[i], strip(debtItem.value[i], 4));
			debtItem.value[i] = 1.0 * strip(debtItem.value[i], 4);
		}
		debtItem.value[0] = -(debtItem.value[1] + debtItem.value[2]);
		
		currentDebtList.datalist.push(debtItem);
		for (var i = 0; i < 3; i++) {
			currentDebtList.sum[i] += debtItem.value[i];
		}
		console.log(debtItem);
		// console.log(currentDebtList);
		//res.redirect('back');
		saveDebtList(currentDebtList, defaultJsonName);
		res.sendStatus(200);
		return;
	}

	res.sendStatus(500);
	
}


module.exports.render = renderDebt;
module.exports.dataPost = addNewDebt;