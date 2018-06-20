
// SETUP //
const express = require("express");
const path = require('path');
const app = express();

app.set("port", (process.env.PORT || 8000));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Start server
app.listen(app.get("port"), function() {
	console.log("running on port", app.get("port"));
});

// Keep Heroku app alive
const http = require("http");
setInterval(function() {
    http.get("http://motivate-bot.herokuapp.com/");
}, 300000); // 5 Minutes 

// ---- //

const analyzedData = require('./dataAnalysis')(require('./raw_data/every_day/6-18.json'));

app.get('/', function(req, res) {
    res.render('index', {
        today: '6/18',
        data: analyzedData.refactoredData,
        averageWaitTime: analyzedData.averageWaitTime,
        averageHelpTime: analyzedData.averageHelpTime
    });
});

app.get('/student/:studentName', function(req, res) {
    res.render('student', {
        data: analyzedData.studentMap[req.params.studentName]
    });
});

app.get('/ta/:taName', function(req, res) {
    res.render('ta', {
        data: analyzedData.taMap[req.params.taName]
    });
});

app.get('/writeToFile', function(req, res) {
    analyzedData.writeDataToFile();
    res.redirect('/');
});