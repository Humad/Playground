// importing playerStats.json from source folder
var passwords = require('./passwords.hashed.json').passwords;

// mongoose configuration
var mongoose = require('mongoose');
var User = require('./models/models.js').User;

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
passwords.forEach(function (user, i, arr) {
  var newUser = new User({
      username: user.username,
      hashedPassword: user.password
  });

  newUser.save(function (err) {
    if (err) {
      console.log('error', err);
    }
    if (i === arr.length - 1) {
      // close mongoose connection
      console.log('Added');
      mongoose.connection.close();
    }
  });
});
