var express = require("express");
var router = express.Router();

// returns the user's IP address, language, and OS
router.get("/", function(req, res){
    var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
    var lang = req.headers["accept-language"].split(',')[0];
    var OS = req.headers['user-agent'].split(') ')[0].split(' (')[1];
    
    res.json({ipaddress: ip, language: lang, software: OS});
    res.end();
});

module.exports = router;