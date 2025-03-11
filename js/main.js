let timer = 30;
let score = 0;
let interval;
let isActive = false;
let timeout;
let gameHistory = []

const start = document.getElementById('start');
const gameContainer = document.getElementById('gameContainer');
const nextLevelButton = document.getElementById('nextLevelButton');
const endText = document.getElementById('endText');
const bestScoreText = document.getElementById('bestScore');
const historyContainer = document.getElementById('history');

start.addEventListener('click', startGame);
nextLevelButton.addEventListener('click', nextLevel);

function startGame() {
    isActive = true;
    score = 0;
    timer = 30;
    start.style.display = 'none';
    document.getElementById('score').style.display = 'inline';
    endText.style.display = 'none';
    document.getElementById('score').textContent = `Рахунок: ${score}`;
    createCircle();
    interval = setInterval(() => {
        if (timer > 0) {
            timer--;
            document.getElementById('timer').textContent = `Таймер: ${timer}`;
        }
        if (score === 5) {
            nextLevelButton.style.display = 'inline';
            clearInterval(interval);
            stopCreatingCircles(); 
        }
        if (timer < 0) {
            endGame();
        }
    }, 1000);
}

function createCircle() {
    if (score === 5) return;
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.top = `${Math.floor(Math.random() * (gameContainer.clientHeight - 70))}px`;
    circle.style.left = `${Math.floor(Math.random() * (gameContainer.clientWidth - 70))}px`;

    timeout = setTimeout(() => {
        circle.remove();
        createCircle();
    }, 10000);

    circle.addEventListener('click', () => {
        if (isActive) {
            score++;
            document.getElementById('score').textContent = `Рахунок: ${score}`;
            circle.remove();
            clearTimeout(timeout);
            createCircle();
        }
    });

    gameContainer.appendChild(circle);
}

function nextLevel() {
    isActive = true;
    nextLevelButton.style.display = 'none';
    interval = setInterval(() => {
        if (timer > 0) {
            timer--;
            document.getElementById('timer').textContent = `Таймер: ${timer}`;
        } else {
            endGame();
        }
    }, 1000);

    createCircleNextLevel();
}

function createCircleNextLevel() {
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.top = `${Math.floor(Math.random() * (gameContainer.clientHeight - 70))}px`;
    circle.style.left = `${Math.floor(Math.random() * (gameContainer.clientWidth - 70))}px`;

    timeout = setTimeout(() => {
        circle.remove();
        createCircleNextLevel();
    }, 10000); 

    circle.addEventListener('dblclick', () => {
        if (isActive) {
            score++;
            document.getElementById('score').textContent = `Рахунок: ${score}`; 
            circle.remove(); 
            clearTimeout(timeout);
            createCircleNextLevel();
        } else{
            return
        }
    });

    gameContainer.appendChild(circle);
}

function stopCreatingCircles() {
    document.querySelectorAll('.circle').forEach(circle => circle.remove());
}

function endGame() {
    clearInterval(interval);
    clearTimeout(timeout);
    isActive = false;

    document.querySelectorAll('.circle').forEach(circle => circle.remove());

    endText.textContent = `Гра завершена. Ваш рахунок: ${score}`;
    endText.style.display = 'inline'; 

    gameHistory.push(score)
    updateHistory()

    start.style.display = 'inline';
    document.getElementById('score').style.display = 'none';
    start.addEventListener('click', startGame);
}

function updateHistory() {
    historyContainer.innerHTML = '';
    gameHistory.forEach((score, index) => {
        const gameRecord = document.createElement('div');
        gameRecord.textContent = `Гра ${index + 1}: ${score} балів`;
        historyContainer.appendChild(gameRecord);
    });
}
