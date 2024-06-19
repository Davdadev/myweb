const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const scoreDisplay = document.getElementById('score');
const snakeColorInput = document.getElementById('snake-color');
const levelSelect = document.getElementById('level');
const upgradeButton = document.getElementById('upgrade-button');
const paymentModal = document.getElementById('payment-modal');
const paymentForm = document.getElementById('payment-form');
const cardNumberInput = document.getElementById('card-number');
const expiryInput = document.getElementById('expiry');
const cvvInput = document.getElementById('cvv');
const modalClose = document.querySelector('.close');

let snake;
let food;
let direction;
let score;
let gameLoop;
let snakeColor;
let canvasSize;
let isSnakeGold = false;

function initGame() {
    const level = parseInt(levelSelect.value);
    setCanvasSize(level);
    
    snake = [{ x: canvas.width / 2, y: canvas.height / 2 }];
    direction = { x: 10, y: 0 }; // Initial direction
    score = 0;
    placeFood();
    snakeColor = snakeColorInput.value;
    document.addEventListener('keydown', changeDirection);
    gameLoop = setInterval(update, 100);
    startScreen.classList.remove('active');
    endScreen.classList.remove('active');
    canvas.style.display = 'block';
    console.log('Game initialized');
}

function setCanvasSize(level) {
    switch (level) {
        case 1:
            canvasSize = 400; // Small canvas
            break;
        case 2:
            canvasSize = 600; // Medium canvas
            break;
        case 3:
            canvasSize = 800; // Large canvas
            break;
        default:
            canvasSize = 400; // Default to small canvas
            break;
    }
    canvas.width = canvasSize;
    canvas.height = canvasSize;
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
        y: Math.floor(Math.random() * (canvas.height / 10)) * 10
    };
    console.log('Food placed at:', food);
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        placeFood();
    } else {
        snake.pop();
    }

    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);

    // Draw snake
    ctx.fillStyle = snakeColor;
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
    console.log('Snake drawn:', snake);
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    const goingUp = direction.y === -10;
    const goingDown = direction.y === 10;
    const goingRight = direction.x === 10;
    const goingLeft = direction.x === -10;

    if (keyPressed === 37 && !goingRight) { // left arrow
        direction = { x: -10, y: 0 };
    }
    if (keyPressed === 38 && !goingDown) { // up arrow
        direction = { x: 0, y: -10 };
    }
    if (keyPressed === 39 && !goingLeft) { // right arrow
        direction = { x: 10, y: 0 };
    }
    if (keyPressed === 40 && !goingUp) { // down arrow
        direction = { x: 0, y: 10 };
    }
}

function endGame() {
    clearInterval(gameLoop);
    document.removeEventListener('keydown', changeDirection);
    endScreen.classList.add('active');
    scoreDisplay.textContent = `Score: ${score}`;
    console.log('Game over');
}

startButton.addEventListener('click', () => {
    initGame();
});

restartButton.addEventListener('click', () => {
    initGame();
});
