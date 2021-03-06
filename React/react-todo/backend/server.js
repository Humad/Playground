const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dbRoutes = require('./routes/databaseAccess');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json());

app.use(express.static('build'));

app.use('/db', dbRoutes);

mongoose.connect(process.env.MLAB_URI);

mongoose.connection.on('connected', function() {
    console.log("Connected to mlab!")
});

app.listen(port, function() {
    console.log("React todo server listening on port", port);
})