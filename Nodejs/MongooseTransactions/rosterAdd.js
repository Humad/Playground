// importing playerStats.json from source folder
var rosterInfo = require('./model/source/rosterInfo.json');

// mongoose configuration
var mongoose = require('mongoose');
var Roster = require('./model/Roster');
var fs = require('fs');

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
mongoose.connection.on('connected', function () {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function () {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
  process.exit(1);
});

mongoose.connect(process.env.MONGODB_URI);

// loop through playerStats.json and add each player and their stats to mlab
rosterInfo.forEach(function (roster, i, arr) {
  var newRoster = new Roster({
    Name: roster.Name,
    JerseyNumber: roster.Points,
    Team: roster.Team
  });

  newRoster.save(function (err) {
    if (err) {
      console.log('error', err);
    }
    if (i === arr.length - 1) {
      // close mongoose connection
      console.log('Added 5 Rosters');
      mongoose.connection.close();
    }
  });
});
