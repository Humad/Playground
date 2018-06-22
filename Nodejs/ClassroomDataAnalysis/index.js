
// SETUP //
const express = require("express");
const path = require('path');
const app = express();
var moment = require('moment-timezone');

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

// Postgres setup
const Pool = require('pg').Pool;

var config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: true
}

const pool = new Pool(config);


// SELECT * FROM events WHERE ts >= '2018-06-19 16:00:00' AND ts <= '2018-06-20 05:00:00' ORDER BY ts ASC;
// Time in Postgres is 7 hours ahead Pacific Time
// 09:00 in Pacific Time is 16:00 in Postgres time
// So for a normal Horizons day, we need data from (today, 16:00) to (tomorrow, 05:00)

let analyzedData;

function getDate(offset) {
    return moment().add(offset, 'days').tz("America/Los_Angeles").format();
}

function updateData(callback) {
    var todayString = getDate(0).substring(0, 10);
    var tomorrowString = getDate(1).substring(0, 10);
    let queryString = "SELECT * FROM events WHERE ts >= '" + todayString + " 16:00:00' AND ts <= '" + tomorrowString + " 05:00:00' ORDER BY ts ASC";

    pool.query(queryString, function(err, result) {
        if (err) {
            callback(err);
        } else {
            jsonData = JSON.parse(JSON.stringify(result.rows));
            analyzedData = require('./dataAnalysis')(jsonData);
            callback(null);
        }
    });
}

app.get('/', function(req, res) {
    var todayString = getDate(0).substring(0, 10);
    updateData(function(err) {
        if (err) {
            res.render('index', {
                today: todayString,
                data: [],
                averageWaitTime: -1,
                averageHelpTime: -1
            });
        } else {
            res.render('index', {
                today: todayString,
                data: analyzedData.refactoredData,
                averageWaitTime: analyzedData.averageWaitTime,
                averageHelpTime: analyzedData.averageHelpTime
            });
        }
    });
});

app.get('/student/:studentName', function(req, res) {
    if (analyzedData) {
        res.render('student', {
            data: analyzedData.studentMap[req.params.studentName]
        });
    } else {
        updateData(function(err) {
            if (err) {
                res.render('student', {
                    data: null
                });
            } else {
                res.render('student', {
                    data: analyzedData.studentMap[req.params.studentName]
                });
            }
        });
    }
});

app.get('/ta/:taName', function(req, res) {
    if (analyzedData) {
        res.render('ta', {
            data: analyzedData.taMap[req.params.taName]
        });
    } else {
        updateData(function(err) {
            if (err) {
                res.render('ta', {
                    data: null
                });
            } else {
                res.render('ta', {
                    data: analyzedData.taMap[req.params.taName]
                });
            }
        });
    }
});

app.get('/writeToFile', function(req, res) {
    if (analyzedData) {
        analyzedData.writeDataToFile();
    }
    res.redirect('/');
});