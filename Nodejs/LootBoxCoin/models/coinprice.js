const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var coinPrice = new Schema({
    price: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
}); 

module.exports = mongoose.model('CoinPrice', coinPrice);

