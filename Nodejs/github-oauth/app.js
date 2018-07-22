var express = require('express');
var path = require('path');

var app = express();

app.set('view engine', 'hbs');

var session = require('cookie-session');
app.use(session({keys: ['blah-some-key']}));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./routes'));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server running, listening on port:', port);
});