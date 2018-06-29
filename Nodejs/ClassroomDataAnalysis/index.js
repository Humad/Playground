// SETUP //
const express = require("express");
const path = require('path');
const app = express();
const hbs = require('express-handlebars');

app.set("port", (process.env.PORT || 8000));
app.set('views', path.join(__dirname, 'views'));
app.engine("hbs", hbs({extname: "hbs", defaultLayout: "layout", layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

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
// Notes: 
// SELECT * FROM events WHERE ts >= '2018-06-19 16:00:00' AND ts <= '2018-06-20 05:00:00' ORDER BY ts ASC;
// Time in Postgres is 7 hours ahead Pacific Time
// 09:00 in Pacific Time is 16:00 in Postgres time
// So for a normal Horizons day, we need data from (today, 16:00) to (tomorrow, 05:00)

// Selecting maximum queue size for section:
// SELECT section_id, max(q_size) FROM events WHERE ts >= '2018-06-28 16:00:00' AND ts <= '2018-06-29 05:00:00' GROUP BY section_id;
// ---- //

// Initialize data retrieval and get data when server runs to avoid slow loading times for pages.
const poolParty = require('./dataRetrieval');
poolParty.getDataForAllDays().then((data) => {console.log("Got data for " + data.length + " days")});
poolParty.getDailyData().then((data) => {console.log("Got data for today")});

const appRoutes = require('./appRoutes');
const apiRoutes = require('./apiRoutes');

app.use('/', appRoutes);
app.use('/api', apiRoutes);



