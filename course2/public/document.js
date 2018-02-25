// this file holds functions used for manipulating document objects (input, button, etc)

// function to update a word
let updateWord = function(word){
  let wordLetters = '';
  word.split('').forEach((letter) => {
    wordLetters += `<span class="badge badge-secondary">${letter}</span>\n`;
  });
  $('#word').html(wordLetters);
};

// function to update score function
let updateScore = function(newScore){
    $('#staticScore').val(newScore);
};
// function to update fail tries function
let updateFailTriesCount = function(fails){
  if(fails >= 0) {
    $('#staticTries').val(fails);
  }
};

// function to show a popover
let showPopover = function($element, message) {
  $element.popover({
    trigger: 'manual',
    placement: 'top',
    content: message
  }).popover('show');
  setTimeout(() => {
    $element.popover('hide');
  }, 5000);
};

let guessLetter = function(game){

  let guessedLetter = $('#inputLetter').val();
  // check the input of the letter
  if (game.isValidLetter(guessedLetter)) {
    // TODO guess letter
    let letterIsGuessed = game.guessLetter(guessedLetter);
    if (letterIsGuessed) {
      // TODO update the view with the new word state
      showPopover($('#word'), 'Word updated!');
      updateWord(game.getCurrentStateWord());
      $('#inputLetter').val('').focus();
      // TODO update the score
      updateScore(game.getScore());
    } else {
      // TODO update the trial count
      updateFailTriesCount(game.getLeftFailTries());
      showPopover($('#inputLetter'), 'The letter was incorrect!');
      $('#inputLetter').focus().select();
    }
    let wordIsGuessed = false; // TODO check if the word is guessed
    let gameIsOver = false; // TODO check if the game is over
    if(game.getLeftFailTries() === 0) {
      gameIsOver = true;
    }

    if(game.getCurrentStateWord().indexOf('_') === -1) {
      wordIsGuessed = true;
    }

    if (wordIsGuessed) {
      clearInterval(game.countdown());
      $(".game-over").css('color', 'green').text("YOU GUESSED THE WORD!").show();
      $('#guess').prop('disabled', true);
    } else if (gameIsOver) {
      $(".game-over").css('color', 'red').text("GAME OVER!").show();
      $('#guess').prop('disabled', true);
    }

  } else {
    showPopover($('#inputLetter'), 'The input is not a valid letter');
    $('#inputLetter').focus().select();
  }
};

function startGame(game) {
  // guess button click handler
  $('#guess').click(function(){
    guessLetter(game);

  });
  // keyup event on the input (detect enter)
  $('#inputLetter').keyup(function(e){
    if (13 === e.keyCode) {
      // enter detected
      guessLetter(game);
    }
  });
}
