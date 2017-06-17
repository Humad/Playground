var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');

// needed to receive post query parameters
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // parses incoming request bodies to JSON
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');


/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */
/* xxxxxxx  DB STUFF xxxxxxxxxxxxxxx */
var mongoose = require('mongoose');
var dbURI = process.env.MONGOLAB_URI;
var iNeedSleep = mongoose.createConnection(dbURI);

iNeedSleep.on('connected', function(){
    console.log('Mongoose connected to ' + dbURI);
});

iNeedSleep.on('error', function(err){
    console.log('Mongoose connection error: ' + err);
});

iNeedSleep.on('disconnected', function(){
    console.log('Mongoose disconnected');
});

// to close mongoose connection when application closes
var intoOblivion = function(msg, callback){
    // close mongoose connection, passing through an
    // anonymous function to run when closed
    iNeedSleep.close(function(){
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

// listen for SIGINT emitted on application termination
process.on('SIGINT', function(){
    intoOblivion('app termination', function(){
        process.exit(0);
    });
});

// listen for SIGTERM emitted when Heroku shuts down process
process.on('SIGTERM', function(){
    intoOblivion('heroku app shutdown', function(){
        process.exit(0);
    });
});

var urlschema = new mongoose.Schema({url: String, digits: Number});
var urlmodel = iNeedSleep.model('url', urlschema, 'url');



/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */
/* xxxxxxxxx APP STUFF xxxxxxxxxxx */

// pre: takes request and response
// post: adds new URL to database
function addURL(req, res){
    var newData = new urlmodel();
    newData.url = req.body.url;
    urlmodel.find({}, function(err, data){
        if (err){
            console.log('something went wrong...');
            console.log(err);
        } else {
            var digits;
            if (!data){ // db is empty
                newData.digits = 0;
                digits = 0;
            } else {
                newData.digits = data.length;
                digits = data.length;
            }
            newData.save();
            res.json({value: digits});
        }
    });
}


// horribly designed home page
app.get('/', function(req, res){
    console.log('rendering home page');
    res.render('index');
});

// posting a url to the home page
app.post('/', function(req, res){
    urlmodel.find({"url" : req.body.url}).exec(function(err, data){
        if (data.length == 0){ // if url doesn't exist in db
            addURL(req, res);
        } else if (err){
            console.log(err);
        } else {
            res.json({value: data[0].digits});
        }
    });
});

// redirects to corresponding url
app.get('/:digits', function(req, res){

    console.log('getting full url from database');
    console.log('parameters: ' + req.params);
    urlmodel.findOne({"digits": req.params.digits}).exec(function(err, data){
        if (err){
            console.log('Could not retrieve data...');
            //console.log(err);
        } else if (!data) {
            console.log('no exist, sorry bruh');
            res.send('This does not exist in the database :(')
        } else {
            var link = decodeURIComponent(data.url);
            res.redirect(link);
        }
    });
});

app.listen(port, function(){
    console.log('Listening on port ' + port);
});
