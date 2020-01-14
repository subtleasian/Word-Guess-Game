var wins = 0;
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var words = ["uneven", "general", "travel", "zonked", "frantic", "degree", "deserve", "shape", "utopian", "knowing", "slim", "violet", "gaze", "rabbit", "expert", "plug", "wash", "strange", "stiff", "woman", "alive", "horse", "worry", "license", "many"];
var word = words[Math.floor(Math.random() * words.length)];

var wordGame = {
    numGuesses: 15,
    remainingLetters: word.length,
    guessArray: [],
    lettersGuessed: [],
    newGame: function() {
        $("#num-wins").text(wins);
        word = words[Math.floor(Math.random()*words.length)];
        this.remainingLetters = word.length;
        this.numGuesses = 15;
        this.lettersGuessed = [];
        this.guessArray = [];
        for (var i=0; i < word.length; i++) {
            this.guessArray[i] = "__";
        }
        $("#word-here").text(this.guessArray.join("  "));
        $("#letters-guessed").text(this.lettersGuessed.join(" "));
        $("#guesses-remaining").text(this.numGuesses);
    },

    isLetter: function(userGuess) {
    return letters.includes(userGuess);
    },

    uniqueGuess: function(userGuess) {
    return this.lettersGuessed.includes(userGuess);
    },

    letterMatch: function(userGuess) {
    for (var i=0; i < word.length; i++) {
        if (word[i].toUpperCase() === userGuess) {
            this.guessArray[i] = userGuess;
            this.remainingLetters--;
        }
    }
    },

    validGuess: function(userGuess) {
    this.numGuesses = this.numGuesses - 1;
    this.lettersGuessed.push(userGuess);
    $("#word-here").text(this.guessArray.join(" "));
    $("#letters-guessed").text(this.lettersGuessed.join(" "));
    $("#guesses-remaining").text(this.numGuesses);
    }
};

$(document).ready(function() {
    // Once document is ready, grab random word from words array, split each letter into letters array,  replace each letter with "__  ", and dispaly in #word-here element
    wordGame.newGame();

    // On key-up, assign upppercase event.key to userGuess
    document.onkeyup = function(event) {
        var userGuess = event.key.toUpperCase();

        // if userGuess is a letter, check if it is on the lettersGuessed list, there are remainingLetters, and numGuesses >0, then continuE
        if (wordGame.isLetter(userGuess) === true) {
            if (wordGame.uniqueGuess(userGuess) === false) {
                wordGame.letterMatch(userGuess);
                wordGame.validGuess(userGuess);
            }
        }

        if (wordGame.numGuesses > 0) {
            if (wordGame.remainingLetters === 0) {
            alert("You win! The word was " + word +"!");
            wins++;
            wordGame.newGame();
            }
        } else {
            alert("You are out of guesses. You Lose. Please try again.")
            wordGame.newGame();
        }
    }
});