
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
    http.get("http://helperinteractions.herokuapp.com/");
}, 300000); // 5 Minutes 

// ---- //

// SELECT * FROM events WHERE ts >= '2018-06-19 16:00:00' AND ts <= '2018-06-20 05:00:00' ORDER BY ts ASC;
// Time in Postgres is 7 hours ahead Pacific Time
// 09:00 in Pacific Time is 16:00 in Postgres time
// So for a normal Horizons day, we need data from (today, 16:00) to (tomorrow, 05:00)

const poolParty = require('./dataRetrieval');

app.get('/', function(req, res) {
    var todayString = poolParty.getDate(0);

    poolParty.getDailyData()
    .then(function(data) {
        res.render('index', {
            today: todayString,
            data: data.refactoredData,
            averageWaitTime: data.averageWaitTime,
            averageHelpTime: data.averageHelpTime
        });
    })
    .catch(function(err) {
        res.render('index', {
            today: todayString,
            data: [],
            averageWaitTime: -1,
            averageHelpTime: -1
        });
    })
});

app.get('/student/:studentName', function(req, res) {
    poolParty.getDailyData()
    .then(function(data) {
        res.render('student', {
            data: data.studentMap[req.params.studentName]
        });
    })
    .catch(function(err) {
        res.render('student', {
            data: null
        });
    })
});

app.get('/ta/:taName', function(req, res) {
    poolParty.getDailyData()
    .then(function(data) {
        res.render('ta', {
            data: data.taMap[req.params.taName]
        });
    })
    .catch(function(err) {
        res.render('ta', {
            data: null
        });
    })
});

app.get('/days', function(req, res) {
    if (req.query.date) {
        poolParty.getDataForDay(req.query.date)
        .then(function(data) {
            res.render('day', {
                data: data
            });
        })
        .catch(function(err) {
            res.send(err);
        })
    } else {
        console.log("Getting data for all days");
        poolParty.getDataForAllDays()
        .then(function(data) {
            res.render('allDays', {
                data: data
            });
        })
        .catch(function(err) {
            res.send(err);
        })
    }
});

app.get('/writeToFile', function(req, res) {
    if (analyzedData) {
        analyzedData.writeDataToFile();
    }
    res.redirect('/');
});