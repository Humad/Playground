var express = require("express");
var router = express.Router();
var moment = require("moment");

// home page
router.get("/", function(req, res){
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("Hi! This is a timestamp microservice.</a>");
});

// receive a date in either UNIX or MMMM D, YYYY format
router.get("/:date", function(req, res){
    var newDate = req.params.date;

    var natural = moment.utc(newDate, "MMMM D, YYYY", true);
    var unix = moment.utc(newDate, "X", true);

    if (natural.isValid() || unix.isValid()) {
        if (natural.isValid()) {
            newDate = natural;
        } else {
            newDate = unix;
        }
        res.json({unix: newDate.format("X"), natural: newDate.format("MMMM D, YYYY")});
    } else {
        res.json({unix: null, natural: null});
    }
    res.end();
});

module.exports = router;
