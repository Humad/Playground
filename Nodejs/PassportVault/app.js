"use strict";

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var passwordsFile = require('./passwords.hashed.json');
var models = require('./models/models.js');


// Express setup
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// MONGODB SETUP HERE
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)

// SESSION SETUP HERE
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: 'horizons-secret',
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

// PASSPORT LOCALSTRATEGY HERE
passport.use(new LocalStrategy( 
    function(username, password, done) {
        models.User.findOne({username: username}, function(error, user) {
            if (user && user.hashedPassword === hashPassword(password)) {
                console.log("authenticated");
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }
));

// PASSPORT SERIALIZE/DESERIALIZE USER HERE HERE
passport.serializeUser(function(user, done) {
    console.log("serialized");
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    models.User.findById(id, function(error, result) {
        if (error || !result) {
            done(null, false);
        } else {
            console.log("deserialized");
            done(null, result)
        }
    });
});

// PASSPORT MIDDLEWARE HERE
app.use(passport.initialize());
app.use(passport.session());

// HASHING
var crypto = require('crypto');
function hashPassword(password) {
    var hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

// YOUR ROUTES HERE

app.use(function(req, res, next) {
    if (!req.user) {
        res.redirect('/login')
    }
});

app.get('/', function(req, res) {
    if (req.user) {
        res.render('index', {user: req.user});
    } else {
        res.redirect('/login');
    }
});

app.get('/signup', function(req, res) {
    res.render('signup');
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.post('/signup', function(req, res) {
    if (req.body.username && req.body.password) {
        var newUser = new User();
        newUser.username = req.body.username;
        newUser.password = hashPassword(req.body.password);

        newUser.save({}, function(error, result) {
            if (error) {
                res.json({"Error" : error});
            } else {
                res.redirect('/login');
            }
        });
    }
});

module.exports = app;
