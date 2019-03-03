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

let {PythonShell} = require("python-shell");

let search_results1 = [];
let search_results2 = [];

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

app.get('/llogs', function(req,res,next){
    res.render('llogs');
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

    // Function to call the Logs for the relateable search
    //...........

    // rendering the page with the data crunched in a list format like ["gshgjs","hskgdjs"]....list ka naam search_results
    search_results1 = ['2019-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data','2020-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data',
    '2019-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data','2020-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data',
    '2019-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data','2020-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data',
    '2019-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data','2020-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data',
    '2019-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data','2020-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data',
    '2019-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data','2020-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data',
    '2019-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data','2020-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data']
    res.render('lsearch', {search_results1 : search_results1});
});

app.post('/tstamp', function(req,res,next){
    // Query
    var item = req.body.label;

    // Function to call the Logs for the relateable search
    //...........

    // rendering the page with the data crunched in a list format like ["gshgjs","hskgdjs"]....list ka naam search_results
    search_results2 = ['2019-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data','2020-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data',
    '2019-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data','2020-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data',
    '2019-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data','2020-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data',
    '2019-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data','2020-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data',
    '2019-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data','2020-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data',
    '2019-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data','2020-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data',
    '2019-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data','2020-03-03 00:56:18.539346 INFO http_handler.py:391 Gathering node data']
    res.render('tstamps', {search_results2 : search_results2});
});