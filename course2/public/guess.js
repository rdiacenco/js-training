// guess the word module
let guessTheWord = function(){
  // "config" options
  const MAX_FAILS = 6;
  const BONUS_PER_LETTER = 5; // bitcoins
  const TIMER = 25; // seconds
  // TODO declare an object for "word list"
  const WORD_LIST = ['JavaScript', 'Office', 'Ness'];
  // TODO keep a reference for the currently selected word
  let selectedWord;
  // TODO declare an object for the current state of the word
  let currentGameState;
  let nrFails, score;
  // TODO declare a function that generates a random integer between two numbers
  let getRandomWordPosition = function() {
    return Math.floor(Math.random() * Math.floor(WORD_LIST.length));
  };
  
  // initialize the guessing game
  let init = function() {
    // TODO implement this function
    // reset game state
    currentGameState = '';
    nrFails = 0;
    score = 0;
    // randomly pick a word from the word list
    selectedWord = WORD_LIST[getRandomWordPosition()];
    // return the current state of the word
    currentGameState = new Array(selectedWord.length);
    currentGameState = currentGameState.fill('_').join('');

    return currentGameState;
  };

  // will receive a letter as argument and will return the updated state
  let guessLetter = function(letter) {
    // TODO implement this function
    let letterMatch = new RegExp(letter, 'ig');
    let matches = selectedWord.match(letterMatch);
    if(null === matches) {
      nrFails++;
      return false;
    } else {
      // get first match
      var match = letterMatch.exec(selectedWord);
      while(match) {
        currentGameState = currentGameState.slice(0, match.index)
        + letter.toUpperCase()
        + currentGameState.slice(match.index + 1);
        score += BONUS_PER_LETTER;
        // get next match
        match = letterMatch.exec(selectedWord)
      }
      return true;
    }
  };

  let isValidLetter = function(letter) {
    // TODO implement this function
    return /^[a-zA-Z]$/.test(letter);
  };

  let getLeftFailTries = function() {
    return MAX_FAILS - nrFails;
  };

  let countdown = function () {
    var timer = setInterval(function(){
      let seconds = parseInt($('#timer').text());
      seconds--;
      $('#timer').text(String(seconds));
      if(seconds === 0) {
        clearInterval(timer);
        $(".game-over").css('color', 'red').text("TIME EXPIRED!").show();
        $('#guess').prop('disabled', true);
      }
    },1000);
    return timer;
  };

  // return an object with the functions we want exposed
  return {
    init,
    guessLetter,
    isValidLetter,
    getCurrentStateWord: function () {
      return currentGameState;
    },
    getLeftFailTries,
    getScore: function () {
      return score;
    },
    getTimer: function () {
      return TIMER;
    },
    countdown
  };
};

// when the page is initialized, init the game and
$(document).ready(function(){

  // declare the game variable
  let game = guessTheWord();

  // initialize the game
  let initialWordState = game.init();

  // update the view with the initial word state
  updateWord(initialWordState);

  // update the fail tries count
  updateFailTriesCount(game.getLeftFailTries());

  // update score
  updateScore(game.getScore());

  // update timer
  $('#timer').html(game.getTimer());

  // start counting down
  game.countdown();

  startGame(game);
});
