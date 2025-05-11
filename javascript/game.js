// Global variables for round and scores
let currentRound = 1;
const totalRounds = 3;
let playerScore = 0;
let pcScore = 0;

// JavaScript code to handle home button click
function goHome() {
    window.location.href = 'home.html';  // Replace with your correct path
}

// Pause board controls
function togglePauseBoard() {
    const board = document.getElementById("pauseBoard");
    board.style.display = board.style.display === "none" ? "flex" : "none";
}

function resumeGame() {
    document.getElementById("pauseBoard").style.display = "none";
}

function restartGame() {
    alert("Restarting game...");
    location.reload(); // Better: fully reload page to restart game
}

function quitGame() {
    alert("Quitting game...");
    window.location.href = 'home.html'; // Redirect to home
}

// Optional: Close when clicking outside the board
window.addEventListener("click", function (e) {
    const board = document.getElementById("pauseBoard");
    if (board.style.display === "flex" && !board.contains(e.target) && !e.target.closest(".bubbly-pause-btn")) {
        board.style.display = "none";
    }
});

// Countdown and panel showing
window.addEventListener('load', () => {
    const countdownNum = document.getElementById('countdownNum');
    const countdownOverlay = document.getElementById('countdownOverlay');

    let count = 3;
    const countdownInterval = setInterval(() => {
        count--;
        if (count === 0) {
            countdownNum.innerText = "Let's play!";
        } else {
            countdownNum.innerText = count;
        }

        if (count < 0) {
            clearInterval(countdownInterval);
            countdownOverlay.style.display = 'none';
        }
    }, 1000);

    // Show hand panel after countdown
    setTimeout(() => {
        document.getElementById('handPanel').classList.remove('hidden');
    }, 4000);
});




document.querySelectorAll('.hand').forEach(button => {
    button.addEventListener('click', (e) => {
        const playerChoice = e.target.dataset.choice;

        // Hide hand selection panel
        document.getElementById('handPanel').style.display = 'none';

        // Show battlefield hands
        const battlefield = document.getElementById('battlefield');
        battlefield.style.display = 'flex';

        const playerHand = document.getElementById('playerHand');
        const pcHand = document.getElementById('pcHand');

        // STEP 1: Set neutral fists initially
        playerHand.src = '../assets/right-hand/rock.png';
        pcHand.src = '../assets/left-hand/rock.png';

        playerHand.style.display = 'block';
        pcHand.style.display = 'block';

        // STEP 2: Start shake animation
        playerHand.classList.add('shake');
        pcHand.classList.add('shake');

        // STEP 3: After shaking, reveal real choices
        setTimeout(() => {
            playerHand.classList.remove('shake');
            pcHand.classList.remove('shake');

            // Set final hands
            playerHand.src = `../assets/right-hand/${playerChoice}.png`;
            const pcChoice = getPCChoice();
            pcHand.src = `../assets/left-hand/${pcChoice}.png`;

            // Decide winner
            const result = decideWinner(playerChoice, pcChoice);

            // Update score and stars
            if (result === 'player') {
                playerScore++;
                fillPlayerStar(playerScore);
                showPlayerWinEffect();
            } else if (result === 'pc') {
                pcScore++;
                fillPCStar(pcScore);
            } else if (result === 'draw') {
                fillDrawStars(currentRound);
            }

            currentRound++;

            if (currentRound > totalRounds) {
                setTimeout(showFinalResult, 1500);
            } else {
                setTimeout(() => {
                    document.getElementById('handPanel').style.display = 'block';
                    battlefield.style.display = 'none';
                }, 1500);
            }
        }, 1000); // Shake time
    });
});

// Functions

function getPCChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function decideWinner(player, pc) {
    const resultText = document.getElementById('roundResult');
    

    if (player === pc) {
        // It's a draw
        resultText.textContent = "It's a Draw!";
        resultText.style.color = "red";
        return 'draw';
    }
    if (
        (player === 'rock' && pc === 'scissors') ||
        (player === 'scissors' && pc === 'paper') ||
        (player === 'paper' && pc === 'rock')
    ) {
        // Player wins
        resultText.textContent = "Me wins!";
        resultText.style.color = "gold";
        return 'player';
    }
    // PC wins
    resultText.textContent = "PC wins!";
    resultText.style.color = "gold";
    return 'pc';
}


function fillPlayerStar(score) {
    if (score >= 1 && score <= 3) {
        const playerStar = document.getElementById(`player-star-${score}`);
        if (playerStar) {
            playerStar.src = "../assets/stars/goldstar.png"; // Yellow for player win
        }
    }
}

function fillPCStar(score) {
    if (score >= 1 && score <= 3) {
        const pcStar = document.getElementById(`pc-star-${score}`);
        if (pcStar) {
            pcStar.src = "../assets/stars/goldstar.png"; // Yellow for PC win
        }
    }
}

function fillDrawStars(round) {
    if (round >= 1 && round <= 3) {
        const playerStar = document.getElementById(`player-star-${round}`);
        const pcStar = document.getElementById(`pc-star-${round}`);
        if (playerStar) {
            playerStar.src = "../assets/stars/redstar.png"; // Red for draw
        }
        if (pcStar) {
            pcStar.src = "../assets/stars/redstar.png"; // Red for draw
        }
    }
}

function showFinalResult() {
    const resultPanel = document.getElementById('resultPanel');
    const gameResult = document.getElementById('gameResult');

    // Show the result panel
    resultPanel.style.display = 'block';

    // Display win/lose/draw message inside the result board
    if (playerScore > pcScore) {
        gameResult.innerHTML = '<h2>You Win!</h2>';
        
        triggerCelebrationEffect(); // Add this inside final win condition

    } else if (pcScore > playerScore) {
        gameResult.innerHTML = '<h2>PC Wins!</h2>';
        showSadRain(); 
    } else {
        gameResult.innerHTML = "<h2>It's a Draw!</h2>";
    }
}



let playerStars = [document.getElementById("player-star-1"), document.getElementById("player-star-2"), document.getElementById("player-star-3")];
let pcStars = [document.getElementById("pc-star-1"), document.getElementById("pc-star-2"), document.getElementById("pc-star-3")];

let resultPanel = document.getElementById("resultPanel");
let countdownOverlay = document.getElementById("countdownOverlay");
let countdownNum = document.getElementById("countdownNum");
let handPanel = document.getElementById("handPanel");
let battlefield = document.getElementById("battlefield");
let roundResult = document.getElementById("roundResult");
let gameResult = document.getElementById("gameResult");

function playAgain() {
    // Reset game state
    currentRound = 1;
    playerScore = 0;
    pcScore = 0;
  
    // Reset stars and game UI
    resetStars(playerStars);
    resetStars(pcStars);
    roundResult.innerHTML = '';
  
    // Hide the result panel and reset the design
    resultPanel.style.display = 'none';
  
    // Ensure the hand panel is hidden at first
    handPanel.style.display = 'none';
    battlefield.style.display = 'none';  // Optional: Hide battlefield

    // Start the countdown animation from the beginning
    startCountdown();
    
    // Reset the animation state for hands (remove shake if it was active)
    resetHandAnimation();
}

function startCountdown() {
    const countdownOverlay = document.getElementById('countdownOverlay');
    const countdownNum = document.getElementById('countdownNum');
    const handPanel = document.getElementById('handPanel');

    let count = 3;
    countdownOverlay.style.display = 'flex';
    countdownNum.innerText = count;

    // Hide hand panel during countdown
    handPanel.classList.add('hidden');

    const countdownInterval = setInterval(() => {
        count--;
        if (count === 0) {
            countdownNum.innerText = "Let's play!";
        } else {
            countdownNum.innerText = count;
        }

        if (count < 0) {
            clearInterval(countdownInterval);
            countdownOverlay.style.display = 'none';  // Hide countdown overlay
            handPanel.classList.remove('hidden');    // Show hand panel
            handPanel.style.display = 'block';       // Ensure it's visible
        }
    }, 1000);
}




// Function to reset the stars (to empty state)
function resetStars(starsArray) {
    starsArray.forEach(star => {
        star.src = "../assets/stars/greystar.png"; // Reset to greystar
    });
}
  
function startRound() {
    // Show the hand selection panel for the player
    handPanel.style.display = 'block';
    
    // Reset round result and animate the hands (as per your design)
    roundResult.innerHTML = '';  // Clear previous round results
}
function showPlayerWinEffect() {
    const effectContainer = document.getElementById("playerWinEffect");
    effectContainer.innerHTML = ""; // Clear previous effects
    effectContainer.style.display = "block";

    for (let i = 0; i < 20; i++) {
        const cloud = document.createElement("div");
        cloud.classList.add("smoke-cloud");

        // Random position
        cloud.style.left = Math.random() * 100 + "vw";
        cloud.style.top = Math.random() * 100 + "vh";

        effectContainer.appendChild(cloud);
    }

    // Optional: Hide the effect after 3 seconds
    setTimeout(() => {
        effectContainer.style.display = "none";
        effectContainer.innerHTML = "";
    }, 3000);
}


function triggerCelebrationEffect() {
  const wrapper = document.getElementById("confetti-wrapper");
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // ✅ backticks
    confetti.style.animationDelay = Math.random() * 2 + "s";
    wrapper.appendChild(confetti);

    // Remove after animation
    setTimeout(() => wrapper.removeChild(confetti), 3000);
  }
}

function showSadRain() {
  const rainContainer = document.getElementById("rainEffect");
  rainContainer.innerHTML = ""; // Clear previous drops if any
  rainContainer.style.display = "block";

  for (let i = 0; i < 150; i++) {
    const drop = document.createElement("div");
    drop.classList.add("raindrop");
    drop.style.left = `${Math.random() * 100}%`; // ✅ backticks
    drop.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`; // ✅ backticks
    drop.style.animationDelay = `${Math.random() * 2}s`; // ✅ backticks
    rainContainer.appendChild(drop);
  }

  // Remove after 4s
  setTimeout(() => {
    rainContainer.innerHTML = "";
    rainContainer.style.display = "none";
  }, 4000);
}

window.onload = function() { 
  const playerName = localStorage.getItem("playerName");

  if (playerName) {
    document.getElementById("playerNameText").textContent = ` ${playerName}`;
    document.getElementById("playerStar-label").textContent = ` ${playerName}`;
  } else {
    document.getElementById("playerNameText").textContent = " You";
    document.getElementById("playerStar-label").textContent = " You";
  }
};
