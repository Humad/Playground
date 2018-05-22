// Require express and create an express app (Part 2.1)
var express = require('express');
var app = express();

// Require mongoose (Part 2.2)
var mongoose = require('mongoose');

// Require and setup body-parser (Part 4.1)
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Require the Player model (Part 2.3)
var Player = require('./model/player');

// Require the Roster model (Part 5.2)
var Roster = require('./model/roster');

// Ensure that there is a MONGODB_URI environment variable (source env.sh)
if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}

mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function(err) {
  console.log('Error connecting to MongoDb: ' + err);
  process.exit(1);
});

// Establish mongoose connection to the mongoDB on mlab (Part 2.2)
mongoose.connect(process.env.MONGODB_URI)


/* =====================================
        WRITE ROUTES DOWN HERE
   ===================================== */

// (Part 3.1)
app.get('/', function(req, res) {
  Player.find({}, function(error, results) {
    if (error) {
      console.log('Error: ', error);
    } else {
      res.json(results);
    }
  })
});

// (Part 4.2)
app.post('/addPlayer', function(req, res) {
  var newPlayer = new Player(req.body);
  newPlayer.save({}, function(error, results) {
    if (error) {
      res.json({"Error" : error});
    } else {
      res.json(results);
    }
  });
});

// (Part 5.3)
app.post('/addPlayerRoster', function(req, res) {
  var newRoster = new Player(req.body);
  newRoster.save({}, function(error, results) {
    if (error) {
      res.json({"Error" : error});
    } else {
      res.json({"Message" : "Success!"});
    }
  });
});

// (Part 6)
app.get("/:rosterid", function(req, res) {
  console.log(req.params.rosterid);
  Roster.findOne({_id: req.params.rosterid}, function(error, roster) {
    if (error) {
      res.json({"Error" : error});
    } else {
      Player.findOne({Name: roster.Name}, function(error, player) {
        if (error) {
          res.json({"Error" : error});
        } else {
          res.json({
            "Name": player.Name,
            "Team": roster.Team,
            "JerseyNum": roster.JerseyNum,
            "Points": player.Points,
            "Assists": player.Assists,
            "Rebounds": player.Rebounds
          });
        }
      })
    }
  });
});

// (BONUS)
app.delete('/:rosterid', function(req, res) {
  Roster.findOne({_id: req.params.rosterid}, function(error, roster) {
    if (error) {
      res.json({"Error" : error});
    } else if (roster) {
      Player.findOneAndRemove({Name: roster.Name}, function(error) {
        if (!error) {
          console.log("Deleted player");
        }
      });
    }
  });

  Roster.findOneAndRemove({_id: req.params.rosterid}, function(error) {
    if (!error) {
      res.json({"message": "Deleted roster"});
    }
  });
});



// Begin listening on port 3000 (Part 2.1)
app.listen(3000, function() {
  console.log('Listening on port 3000');
});
