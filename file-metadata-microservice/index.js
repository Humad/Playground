var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var path = require('path');
var port = process.env.PORT || 3000;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index');
});

app.post('/beamMeUp', upload.single('fileToUpload'), function(req, res){
    res.json({size: req.file.size});
});

app.listen(port, function(){
    console.log('Listening on port ' + port);
});
