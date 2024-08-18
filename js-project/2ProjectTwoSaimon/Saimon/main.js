let arrRound = [];
let gameCounter; // Game counter 
let userCounter;

// function (A)
function initGame() {
    console.clear();
    gameCounter = userCounter = 1;
    arrRound = [];
    console.log('Game initiated...');
}

// function (B)
function playRound() {
    // 1. Crete step and add as a last element to the array 
    const newStep = createStep();
    arrRound.push(newStep)
    console.log(newStep);

    //deteremine that computer's turn is finished , and waiting for user input
    //?? 

    userTurn();
}

function userTurn() {
    // Get input from user
    const input = prompt("please enter your guess")
    // Compare input with
}

// function (C)
// 1. Creates a random number from 1 to 4 
// 2. Returns the result and/or the color (צבע שמייצג את המספר);
function createStep() {
    return Math.floor(Math.random() * 4) + 1;
}

function eventHandler() {

}

initGame();
document.getElementById('btnStart').addEventListener('click', playRound);