var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var path = require("path");
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

var dbURI = 'mongodb://localhost/imagesearch';

if (process.env.NODE_ENV === 'production'){
    dbURI = process.env.MONGOLAB_URI;
}

var mainDB = mongoose.createConnection(dbURI);

var urlSchema = new mongoose.Schema({
    searchQuery: {type: String, required: true},
    time: {type: Date, "default": Date.now}
});

var urlModel = mongoose.model('imageurl', urlSchema);

app.get('/', function(req, res){
    urlModel.find({}, function(err, data){
        if (err){
            res.send(err);
        } else {
            res.json(data);
        }
    });
    res.send('nothing found');
});

app.post('/', function(req, res){
    if (req.body.query){
        var qry = req.body.query;
        var ofst = req.body.offset || 10;

        // save query data to database
        var data = {
            "searchQuery" : qry,
        };
        urlMode.create(data, function(err, d){
            if (err){
                res.send(err);
            }
        });

        var search = new Search(process.env.API_KEY);
        search.images(qry, {top: ofst}, function(err, d){
            if (err){
                res.send(err);
            } else {
                res.send(d);
            }
        });

    } else {
        res.send('Error - need query');
    }
});

app.listen(port, function(){
    console.log('Listening on ' + port);
});
