// Sounds
let foodSound = new Audio('music/food.mp3');
let gameOverSound = new Audio('music/gameover.mp3');
let moveSound = new Audio('music/move.mp3');
let musicSound = new Audio('music/music.mp3');
musicSound.loop = true;
musicSound.play();

// Variables
let inputDir = { x: 0, y: 0 };
let snake = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let score = 0;
let speed = 10;
let lastTime = 0;

// Score Elements
let scoreBox = document.getElementById("scoreBox");
let highscoreBox = document.getElementById("highscoreBox");

// High score from localStorage
let highScore = localStorage.getItem("hiscore");
if (highScore === null) {
    highScore = 0;
    localStorage.setItem("hiscore", highScore);
}
highscoreBox.innerText = "High Score: " + highScore;

// Game loop
function main(currentTime) {
    window.requestAnimationFrame(main);
    if ((currentTime - lastTime) / 1000 < 1 / speed) {
        return;
    }
    lastTime = currentTime;
    updateGame();
}

function updateGame() {
    // Collision check
    if (checkCollision()) {
        gameOverSound.play();
        musicSound.pause();
        alert("Game Over! Press any key to play again.");
        snake = [{ x: 13, y: 15 }];
        inputDir = { x: 0, y: 0 };
        score = 0;
        scoreBox.innerText = "Score: " + score;
        musicSound.play();
        return;
    }

    // Eating food
    if (snake[0].x === food.x && snake[0].y === food.y) {
        foodSound.play();
        score++;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("hiscore", highScore);
        }
        scoreBox.innerText = "Score: " + score;
        highscoreBox.innerText = "High Score: " + highScore;

        snake.unshift({ x: snake[0].x + inputDir.x, y: snake[0].y + inputDir.y });
        food = {
            x: Math.floor(Math.random() * 16) + 1,
            y: Math.floor(Math.random() * 16) + 1
        };
    }

    // Move the snake
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i] = { ...snake[i - 1] };
    }
    snake[0].x += inputDir.x;
    snake[0].y += inputDir.y;

    // Draw everything
    let board = document.getElementById("board");
    board.innerHTML = "";

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        let part = document.createElement("div");
        part.style.gridRowStart = snake[i].y;
        part.style.gridColumnStart = snake[i].x;
        if (i === 0) {
            part.classList.add("head");
        } else {
            part.classList.add("snake");
        }
        board.appendChild(part);
    }

    // Draw food
    let foodEl = document.createElement("div");
    foodEl.style.gridRowStart = food.y;
    foodEl.style.gridColumnStart = food.x;
    foodEl.classList.add("food");
    board.appendChild(foodEl);
}

function checkCollision() {
    // Wall hit
    if (
        snake[0].x <= 0 || snake[0].x >= 18 ||
        snake[0].y <= 0 || snake[0].y >= 18
    ) {
        return true;
    }

    // Snake hits itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    return false;
}

// Keyboard controls
window.addEventListener("keydown", function (e) {
    moveSound.play();
    if (e.key === "ArrowUp" && inputDir.y !== 1) {
        inputDir = { x: 0, y: -1 };
    } else if (e.key === "ArrowDown" && inputDir.y !== -1) {
        inputDir = { x: 0, y: 1 };
    } else if (e.key === "ArrowLeft" && inputDir.x !== 1) {
        inputDir = { x: -1, y: 0 };
    } else if (e.key === "ArrowRight" && inputDir.x !== -1) {
        inputDir = { x: 1, y: 0 };
    }
});

// Start the game
window.requestAnimationFrame(main);
