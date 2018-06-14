
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

const dataAnalysis = require('./dataAnalysis');
const refactoredData = dataAnalysis.refactoredData;
const studentMap = dataAnalysis.studentMap;
const taMap = dataAnalysis.taMap;
const averageWaitTime = dataAnalysis.averageWaitTime;
const averageHelpTime = dataAnalysis.averageHelpTime;

app.get('/', function(req, res) {
    res.render('index', {
        data: refactoredData,
        averageWaitTime: averageWaitTime,
        averageHelpTime: averageHelpTime
    });
});

app.get('/student/:studentName', function(req, res) {
    res.render('student', {
        data: studentMap[req.params.studentName]
    });
});

app.get('/ta/:taName', function(req, res) {
    res.render('ta', {
        data: taMap[req.params.taName]
    });
});