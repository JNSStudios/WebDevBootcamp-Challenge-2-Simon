// alert("JS connected successfully!");

// global variables
let colorsArray = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var clickPattern = [];
var level = 0;

// func for generating the next color in the sequence
function nextSequence() {
    // clear clickPattern
    clickPattern = [];

    // get the random button    
    var randNum = Math.floor(Math.random() * 4);
    var randColor = colorsArray[randNum];
    gamePattern.push(randColor);

    // animate the button with a simple fade, to distinguish from click anim
    $("#"+randColor).fadeOut(100).fadeIn(100);

    level++;
    $("#level-title").text("Level " + level);

    // play the appropriate sound effect
    playSound(randColor);

    // return gamePattern;
}

// func for clicking on a button
$(".btn").click(function() {
    // alert("Button clicked!");

    // get the color that was picked
    var pickedColor = $(this).attr("id");

    // append the color to the clickPattern array
    clickPattern.push(pickedColor);

    console.log("clickPattern: " + clickPattern);

    // play sound
    playSound(pickedColor);


    // animate the button
    pressAnimation(pickedColor);

    // check answer
    checkAnswer(clickPattern.length - 1);



});

// func for checking answer from user
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === clickPattern[currentLevel]) {
        console.log("success");
        
        // check if the user has completed the sequence
        if (clickPattern.length === gamePattern.length) {
            // call nextSequence after a delay
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        restart();

    }
}

function restart(){
    // reset the game
    gamePattern = [];
    clickPattern = [];
    level = 0;
}



// plays the appropriate sound
function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

// aniamtes the button being pressed using a defined CSS class.
function pressAnimation(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// func for starting game with keyboard press
$(document).keypress(function() {
    // alert("Key pressed!");
    // check if the game has already started
    if (gamePattern.length === 0) {
        // start the game
        nextSequence();
        $("#level-title").text("Level " + level);
    }
});