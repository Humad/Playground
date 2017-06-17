var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var path = require("path");

app.set("view engine", "ejs");

// routes
app.use("/", require("./routes/header-parser"));


app.listen(port, function(){
    console.log("Listening on port " + port);
});


