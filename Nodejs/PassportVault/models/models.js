var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    hashedPassword: String
});

module.exports.User =  mongoose.model('User', UserSchema);
