var _ = require('underscore');
var persist = require('./persist');
var Card = require('./card');
var Player = require('./player');
var readGame = false;

class Game {
  constructor() {
    // YOUR CODE HERE
    this.isStarted = false;
    this.players = {}; // {ID : Player}
    this.playerOrder = [];
    this.pile = [];
  }

  addPlayer(username) {
    // YOUR CODE HERE
    if (this.isStarted) {
      throw "Game has started";
    }

    if (!username.trim()) {
      throw "Please enter username";
    }

    for (var key in this.players) {
      if (username === this.players[key].username) {
        throw "Player already exists";
      }
    }

    var newPlayer = new Player(username);
    this.playerOrder.push(newPlayer.id);
    this.players[newPlayer.id] = newPlayer;
    return newPlayer.id;
  }

  startGame() {
    // YOUR CODE HERE
    if (this.isStarted === true) {
      throw "error";
    }

    if (this.playerOrder.length < 2) {
      throw "error";
    }

    this.isStarted = true;

    var deck = [];

    var arrOfSuits = ["hearts", "spades", "diamonds", "clubs"];
    for (var i = 0; i < arrOfSuits.length; i++) {
      for (var j = 1; j < 14; j++) {
        var newCard = new Card(arrOfSuits[i], j);
        deck.push(newCard);
      }
    }

    _.shuffle(deck);

    var index = 0;
    while (deck.length > 0) {
      var playerId = this.playerOrder[index]
      this.players[playerId].pile.push(deck[0]);
      deck.shift();
      index++;
      if (index === this.playerOrder.length) {
        index = 0;
      }
    }
  }

  nextPlayer() {
    // YOUR CODE HERE
    
  }

  isWinning(playerId) {
    // YOUR CODE HERE
  }

  playCard(playerId) {
    // YOUR CODE HERE
  }

  slap(playerId) {
    // YOUR CODE HERE
  }

  // PERSISTENCE FUNCTIONS
  //
  // Start here after completing Step 2!
  // We have written a persist() function for you to save your game state to
  // a store.json file.
  // =====================
  fromObject(object) {
    this.isStarted = object.isStarted;

    this.players = _.mapObject(object.players, player => {
      var p = new Player();
      p.fromObject(player);
      return p;
    });

    this.playerOrder = object.playerOrder;

    this.pile = object.pile.map(card => {
      var c = new Card();
      c.fromObject(card);
      return c;
    });
  }

  toObject() {
    return {
      isStarted: this.isStarted,
      players: _.mapObject(this.players, val => val.toObject()),
      playerOrder: this.playerOrder,
      pile: this.pile.map(card => card.toObject())
    };
  }

  fromJSON(jsonString) {
    this.fromObject(JSON.parse(jsonString));
  }

  toJSON() {
    return JSON.stringify(this.toObject());
  }

  persist() {
    if (readGame && persist.hasExisting()) {
      this.fromJSON(persist.read());
      readGame = true;
    } else {
      persist.write(this.toJSON());
    }
  }
}

module.exports = Game;
