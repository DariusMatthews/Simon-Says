var userClickPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;

$(document).keypress(function() {
  //!started same as started === false
  if (started === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");

  userClickPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  //passing in the index(array value) of the last answer in the user's sequence.
  checkAnswer(userClickPattern.length-1);
});

function checkAnswer(currentLevel) {
  //check if the most recent user answer is the same as the game pattern by matching array index's
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    console.log("success");
    //check that they have finished their sequence. if so, call sequence after delay
    if (gamePattern.length === userClickPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function nextSequence() {
  //reset user array with each sequence
  userClickPattern = [];

  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
  animatePress(randomChosenColor);
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
