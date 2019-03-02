var express=require("express");
var app = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var assert = require('assert');

var myPythonScriptPath = 'C:/Users/visha/Desktop/Nutanix Hackathon/hack/hello.py';

// Use python shell
let {PythonShell} = require("python-shell");

var ejs = require('ejs'); // important view engine 

// Init App
var app = express();
app.set('port', (process.env.PORT || 3000));

var server=app.listen(app.get('port'), function(){
  console.log('Server started on port '+app.get('port'));
});

app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// BodyParser Middleware
// used for handlebars data rendering with server
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// lets render various pages

app.get('/',function(req,res,next){
  res.render('index');
});

app.get('/Log-Analyser', function(req,res,next){
	res.render('Log');
	console.log("abe kuch ho raha hai kya");
	
	// PythonShell.on('message', function (message) {
	//     // received a message sent from the Python script (a simple "print" statement)
	//     console.log(message);
	// });

	// // end the input stream and allow the process to exit
	// pyshell.end(function (err) {
	//     if (err){
	//         throw err;
	//     };
	//     console.log('finished');
	// });
	var options = {
    mode: 'text',
    args: ['DBG\n']
	};
	PythonShell.run("public/python/logsearch.py", options, function(err,results) {
	  if (err) throw err;
	  console.log("%j",results);
	  console.log("finished");
});
});
