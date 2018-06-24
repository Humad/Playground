const moment = require('moment-timezone');
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

let dailyData;
let lastChecked;
let dataForDays = {};

getDailyData();

function getDailyData() {

    return new Promise(function(resolve, reject) {
        if (lastChecked && ((new Date()) - lastChecked) <= 300000) {
            lastChecked = new Date();
            return resolve(dailyData);
        }

        if (!lastChecked) {
            lastChecked = new Date();
        }
    
        let todayString = getDate(0);
        let tomorrowString = getDate(1);
        let queryString = "SELECT * FROM events WHERE ts >= '" + todayString + " 16:00:00' AND ts <= '" + tomorrowString + " 05:00:00' ORDER BY ts ASC";

        pool.query(queryString, function(err, result) {
            if (err) {
                return reject(err);
            } else {
                let jsonData = JSON.parse(JSON.stringify(result.rows));
                dailyData = require('./dataAnalysis')(jsonData);
                return resolve(dailyData);
            }
        });
    });
}

function getDataForDay(dayString) {

    return new Promise(function(resolve, reject) {
        let tomorrowString = moment(dayString).add(1, 'days').format('YYYY-MM-DD');
        let queryString = "SELECT * FROM events WHERE ts >= '" + dayString + " 16:00:00' AND ts <= '" + tomorrowString  + " 05:00:00' ORDER BY ts ASC";

        console.log(dayString + ", " + tomorrowString);

        if (dataForDays.hasOwnProperty(dayString)) {
            // If already have data for given day, no need to process again
            resolve(dataForDays[dayString]);
        } else {
            pool.query(queryString, function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    let jsonData = JSON.parse(JSON.stringify(result.rows));
                    dataForDays[dayString] = require('./dataAnalysis')(jsonData);
                    dataForDays[dayString].date = dayString;
                    resolve(dataForDays[dayString]);
                }
            });
        }
    });
}

function getDataForAllDays() {

    return new Promise(function(resolve, reject) {
        let allDays = getPastDays();
        let allPromises = [];

        for (var i = 0; i < allDays.length; i++) {
            let currentDay = allDays[i];
            allPromises.push(getDataForDay(currentDay));
        }

        Promise.all(allPromises).then(function(data) {
            resolve(data);
        });


    });
}

// Helper functions
function getDate(offset) {
    return moment().add(offset, 'days').format('YYYY-MM-DD');
}

function getPastDays() {
    let today = moment().tz('America/Los_Angeles');
    let pastDay = moment('2018-05-29'); // First day of summer classes

    let allDays = [];

    while (pastDay < today) {
        allDays.push(pastDay.format('YYYY-MM-DD'));
        pastDay.add(1, 'days');
    }

    return allDays;
}

module.exports = {
    getDailyData: getDailyData,
    getDataForDay: getDataForDay,
    getDataForAllDays: getDataForAllDays,
    getDate: getDate
}