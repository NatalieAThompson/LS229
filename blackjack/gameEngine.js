// Twenty-One is a card game consisting of a dealer and a player,
// where the participants try to get as close to 21 as possible going over.

// Here is an overview of the game:
// - Both participants are initially dealt 2 cards from a 52-card deck.
// - The player takes the first turn, and can "hit" or "stay".
// - If the player busts, he loses. If he stays, it's the dealer's turn.
// - The dealer must hit until his cards add up to at least 17.
// - If he busts, the player wins. If both player and dealer stays,
// then the highest total wins.
// - If both totals are equal, then it's a tie, and nobody wins.

/*
Game Engine:
  - play

Players
  - Computer (Dealer)
    - must hit until cards add up to at least 17.
  - User
  - hit
  - stay (change turns)
  - bust (loses)

Deck
  - 52 cards

Board

*/
const readline = require('readline-sync');
const valid = require('./valid');

const GameEngine = function() {
  let username;

  function welcome() {
    console.log(`Welcome to BlackJack`);
    username = readline.question("How should I refer to you?\n");
    console.log(`Hello, ${username}`);
    let answer = valid.yesNo(readline.question(`The game plays to ${GameEngine.winningValue} would you like to update that? (Y/N)`));
    if (answer === 'y') {
      GameEngine.winningValue = valid.num("What score would you like to play till?");
    }
  }

  return {
    play() {
      welcome();
      // dealcards()
      // playersTurn()
      // dealersTurn()
      // displayWinner()
    },
    displayRules() {
      GameEngine.displayRules();
    },
  };
};

GameEngine.play = function() {
  GameEngine().play();
};

GameEngine.displayRules = function() {
  console.log(`------- Rules For BlackJack -------`);
  console.log(`The player and dealer are given ${this.startingHandAmount} cards`);
  console.log(`You can choose to draw more cards or not.`);
  console.log(`Then the dealer will draw or stay`);
  console.log(`The higest total but not over ${this.winningValue} wins.`);
};

GameEngine.winningValue = 21;
GameEngine.startingHandAmount = 2;

module.exports = { GameEngine };