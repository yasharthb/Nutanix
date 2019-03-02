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
// var PythonShell = require('python-shell');

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
});

app.get('/name', callName); 

function callName(req, res) { 
    
    // Use child_process.spawn method from 
    // child_process module and assign it 
    // to variable spawn 
    var spawn = require("child_process").spawn; 
    
    // Parameters passed in spawn - 
    // 1. type_of_script 
    // 2. list containing Path of the script 
    // and arguments for the script 
    
    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will 
    // so, first name = Mike and last name = Will 
    var process = spawn('python',["public/python/logsearch.py", 
                            req.query.firstname, 
                            req.query.lastname] ); 

    // Takes stdout data from script which executed 
    // with arguments and send this data to res object 
    process.stdout.on('data', function(data) { 
        res.render('index');
        console.log(data.toString());
    } ) 
} 

// save code as start.js 