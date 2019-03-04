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
var fs = require('fs');
Tail = require('tail').Tail;

let {PythonShell} = require("python-shell");

let search_results1 = [];
let search_results2 = [];

var ejs = require('ejs'); // important view engine 

// Init App
var app = express();
app.set('port', (process.env.PORT || 5050));

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

app.get('/llogs', function(req,res,next){
    res.render('llogs', {search_results3 : []})
});

app.get('/lsearch', function(req,res,next){
    res.render('lsearch', {search_results1 : []});
});

app.get('/tstamp', function(req,res,next){
    res.render('tstamps',{search_results2 : []});
});

app.get('/Log-Analyser', function(req,res,next){
    res.render('Log');
});

// Search Queries

app.post('/lsearch', function(req,res,next){
    // Query
    var item = req.body.label;
    var options = {
    mode: 'text',
    args: item
    };
    PythonShell.run("public/python/logsch.py", options, function(err,results) {
      if (err) throw err;
      res.render('lsearch', {search_results1 : results});
      console.log("finished");
});
    
});

app.post('/tstamp', function(req,res,next){
    // Query
    var item1 = req.body.datetime1;
    var item2 = req.body.datetime2;

    console.log(item1 + "-" + item2);

    var query = item1 + ";" + item2;
    if (query ==';')
     {res.render('tstamps', {search_results2 : []});
      return;}

    var options = {
    mode: 'text',
    args: [query]
    };
    PythonShell.run("public/python/logbtw.py", options, function(err,results) {
      if (err) throw err;

      res.render('tstamps', {search_results2 : results});
      console.log("finished");
});
});

let temp = [];

app.post('/llogs', function(req,res,next){

    PythonShell.run("public/python/logstream.py", null, function(err,results) {
      if (err) throw err;
      console.log("finished");
    });

    var options= {separator: /[\r]{0,1}\n/, fromBeginning: false, fsWatchOptions: {}, follow: true, logger: console}
    tail = new Tail("public/data/myfile.txt", options);
    tail.on("line", function(data) {
      temp.push(data);
      console.log(temp);
    });
});

// ek function likh jisme app.post ho as recursive fir usse call kar app.post ko wapas jisse ek loop ban jaega app.post and tail ka