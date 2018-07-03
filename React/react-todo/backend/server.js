const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dbRoutes = require('./routes/databaseAccess');
const mongoose = require('mongoose');

app.use(express.static('build'));

app.use('/db', dbRoutes);

mongoose.connect(process.env.MLAB_URI);

mongoose.connection.on('connected', function() {
    console.log("Connected to mlab!")
});





app.listen(port, function() {
    console.log("React todo server listening on port", port);
})