const express = require('express');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const request = require('request');
const path = require('path');
const app = express();
const CoinPrice = require('./models/coinprice');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mongoose setup
const mongoose = require('mongoose');
if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not in the environmental variables.");
}
  
mongoose.connection.on('connected', function() {
    console.log('Success: connected to MongoDb!');
});

mongoose.connection.on('error', function(err) {
    console.log('Error connecting to MongoDb: ' + err);
    process.exit(1);
});

mongoose.connect(process.env.MONGODB_URI);

// Keep Heroku app alive
const http = require("http");
setInterval(function() {
    http.get("https://lootboxcoinpricechecker.herokuapp.com/");
}, 300000); // 5 Minutes 

setInterval(() => {getCoinPrice(true, (price, data) => {})}, 1800000);

function getCoinPrice(shouldSave, callback) {
    console.log("Getting coin price at ", (new Date()).toDateString());

    request(lootBoxCoinURL, function(err, response, body) {
        if (!err) {
            const $ = cheerio.load(body);
            const retrievedText = $('option[value=775765]').text();
            const splitText = retrievedText.split(' ');
            const globalPrice = splitText[splitText.length - 1];   

            if (shouldSave) {
                saveCoinPrice(globalPrice.substring(1));
            }

            CoinPrice.find({}, function(err, data) {
                if (err) {
                    console.log("Error finding coin prices", err);
                } else {
                    callback(globalPrice, data);
                }
            });
        } else {
            console.log("Error: ", err);
        }
    });
}

function saveCoinPrice(price) {
    console.log("Saving coin price at ", (new Date()).toUTCString());
    var newCoinPrice = new CoinPrice();
    newCoinPrice.time = new Date();
    newCoinPrice.price = price;
    newCoinPrice.save(function(err) {
        if (err) {
            console.log("Error saving price: ", err);
        }
    });
}

const lootBoxCoinURL = 'http://www.lootboxcoin.com';

app.get('/', function(req, res) {
    getCoinPrice(false, function(price, trend) {
        res.render('index', {coinValue: price});
    });
});

app.get('/trends', function(req, res) {
    getCoinPrice(false, function(price, trend) {
        res.json(trend);
    });
});

const port = process.env.PORT || 3000;

// Start server
app.listen(port , function() {
	console.log("running on port", port);
});