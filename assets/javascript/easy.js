const cards = document.querySelectorAll('.game-card')
const countDownTimer = document.getElementById('timeElapsed')
const moveCounter = document.getElementById('movesUsed')

let moves = 0;
let time;
let seconds = 60;
let countDownStart = false;
let turnedCards = false;
let timeOutBoard = false;
let firstCard, secondCard;

let matched = [];



// Function for the timer to run

function countDown() {
    time = setInterval(function() {
        seconds--;
        countDownTimer.innerHTML = seconds;
        if (seconds <= 0 || seconds < 1) {
            stopTime();
        };     
    }, 1000);
};

// Function to stopTime
function stopTime() {
        clearInterval(time);
    } 


// Function to count the moves

function countMoves() {
    moves++; 
    moveCounter.innerHTML = moves;

    if (moves == 1) {
        seconds = 60;
        countDown();
    }
}

// function for flipping cards
function flipCard() {
    if (timeOutBoard) return; // Blocks additional cards from flipping when function is already running
    if (this === firstCard) return; //Prevents double clicking
    this.classList.add('visible');
    
    if (!turnedCards) {
        //First card chosen
        turnedCards = true;
        firstCard = this;

        return; //Closes function early to return to the top
    } else {
        //Second card chosen
        turnedCards = false;
        secondCard = this;
        countMoves();
        checkForMatch();
    }
}

// Function to check whether cards match
function checkForMatch() {
    //Variable that holds statement to check whether cards match
    let cardsMatch = firstCard.dataset.pokemon === secondCard.dataset.pokemon;
    //Ternary operator that checks whether the condition is true or false
    cardsMatch ? correctMatch() : resetCards();
}

// Keeps cards open if they are a match
function correctMatch() {
    firstCard.removeEventListener('click', [flipCard]);
    secondCard.removeEventListener('click', [flipCard]);
    matched.push([flipCard]);
    removeCard();
    resetGame();
}


// Remove Cards function

function removeCard() {
    firstCard.style = "display:none;"
    secondCard.style = "display:none;"
}


// Reset cards if they are not a match
function resetCards() {
    timeOutBoard = true; //Times out the board
    setTimeout(() => {
        firstCard.classList.remove('visible');
        secondCard.classList.remove('visible');

        resetGame();
    }, 1000);
}

function resetGame() {
    [flipCard, timeOutBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Immediately invoked function expression 
// Function that shuffles cards based on css order 
(function shuffle() {
    cards.forEach(card => {
        let randomize = Math.floor(Math.random() * 10);
        card.style.order = randomize;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));