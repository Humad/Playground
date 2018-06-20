const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cons = require('consolidate');
const dust = require('dustjs-helpers');
const pg = require('pg');
const app = express();

// DB connect string
const connect = 'postgres://postgres:dbpass@localhost/recipe'

// Assign dust engine to .dust files
app.engine('dust', cons.dust);

// Set default ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Routes
app.get('/', function(req, res) {
    res.render('index');
});



// Server
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Running on port", port);
});

