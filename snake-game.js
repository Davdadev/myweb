const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const scoreDisplay = document.getElementById('score');
const snakeColorInput = document.getElementById('snake-color');
const levelSelect = document.getElementById('level');

let snake;
let food;
let direction;
let score;
let gameLoop;
let snakeColor;
let canvasSize;
let isPaused = false;

function initGame() {
    resetGameVariables();
    setCanvasSize(parseInt(levelSelect.value));
    placeFood();
    draw();
    startScreen.classList.remove('active');
    endScreen.classList.remove('active');
    canvas.style.display = 'block';
    document.addEventListener('keydown', handleKeydown);
    gameLoop = setInterval(update, 100);
}

function resetGameVariables() {
    snake = [{ x: canvas.width / 2, y: canvas.height / 2 }];
    direction = { x: 10, y: 0 };
    score = 0;
    snakeColor = snakeColorInput.value;
    isPaused = false;
}

function setCanvasSize(level) {
    switch (level) {
        case 1:
            canvasSize = 400;
            break;
        case 2:
            canvasSize = 600;
            break;
        case 3:
            canvasSize = 800;
            break;
        default:
            canvasSize = 400;
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
}

function update() {
    if (isPaused) return;

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

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);

    ctx.fillStyle = snakeColor;
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 10, 10));
}

function handleKeydown(event) {
    if (event.keyCode === 32) { // Space key for pause/resume
        togglePause();
        return;
    }

    const keyPressed = event.keyCode;
    const goingUp = direction.y === -10;
    const goingDown = direction.y === 10;
    const goingRight = direction.x === 10;
    const goingLeft = direction.x === -10;

    if (keyPressed === 37 && !goingRight) { direction = { x: -10, y: 0 }; }
    if (keyPressed === 38 && !goingDown) { direction = { x: 0, y: -10 }; }
    if (keyPressed === 39 && !goingLeft) { direction = { x: 10, y: 0 }; }
    if (keyPressed === 40 && !goingUp) { direction = { x: 0, y: 10 }; }
}

function togglePause() {
    isPaused = !isPaused;
}

function endGame() {
    clearInterval(gameLoop);
    document.removeEventListener('keydown', handleKeydown);
    endScreen.classList.add('active');
    scoreDisplay.textContent = `Score: ${score}`;
}

startButton.addEventListener('click', initGame);
restartButton.addEventListener('click', initGame);
