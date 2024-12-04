console.log("Welcome to Tic Tac Toe");
let music = new Audio("music.mp3");
let AudioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isGameOver = false;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
}

// Function to check for a win
const checkWin = () => {
    let boxtexts = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    wins.forEach(e => {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) &&
            (boxtexts[e[1]].innerText === boxtexts[e[2]].innerText) &&
            (boxtexts[e[0]].innerText !== "")) {
                document.querySelector('.info').innerText = "Congratulations! Winner is " + boxtexts[e[0]].innerText;
            isGameOver = true;
            document.querySelector('.imgbox img').style.display = "block"; // Show the image
            document.querySelector('.imgbox img').style.width = "200px"; // Resize the image
            gameover.play(); // Play game over sound
        }
    });
}

// Reset function to restart the game
document.getElementById('reset').addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""; // Clear the text
    });
    turn = "X";
    isGameOver = false;
    document.querySelector('.info').innerText = "Turn for " + turn;
    document.querySelector('.imgbox img').style.display = "none"; // Hide the game over image
});

// Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxText = element.querySelector('.boxtext'); // Corrected selector
    element.addEventListener('click', () => {
        if (boxText.innerText === '' && !isGameOver) { // Check if the box is empty and game is not over
            boxText.innerText = turn; // Set the current player's turn (X or 0)
            AudioTurn.play(); // Play the turn audio
            checkWin(); // Check if anyone has won
            if (!isGameOver) {
                turn = changeTurn(); // Update the turn only if the game is not over
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn; // Update the turn information
            }
        }
    });
});

