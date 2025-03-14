let timer = 30;
let score = 0;
let interval;
let isActive = false;
let timeouts = [];
let gameHistory = []
let bestScore = 0;

const start = document.getElementById('start');
const gameContainer = document.getElementById('gameContainer');
const nextLevelButton = document.getElementById('nextLevelButton');
const nextLevel2Button = document.getElementById('nextLevel2Button');
const nextLevel3Button = document.getElementById('nextLevel3Button');
const endText = document.getElementById('endText');
const bestScoreText = document.getElementById('bestScore');
const historyContainer = document.getElementById('history');

start.addEventListener('click', startGame);
nextLevelButton.addEventListener('click', nextLevel);
nextLevel2Button.addEventListener('click', nextLevel2);
nextLevel3Button.addEventListener('click', nextLevel3);

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

        if (score === 10) {
            clearInterval(interval);
            nextLevel2Button.style.display = 'inline';
            stopCreatingCircles();
        }
        if (score === 15) {
            clearInterval(interval);
            nextLevel3Button.style.display = 'inline';
            stopCreatingCircles();
        }
        if (timer <= 0) {
            endGame();
        }

    }, 1000);
}

function createCircle() {
    if (score === 5 || score === 10 || score === 15) return;
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.top = `${Math.floor(Math.random() * (gameContainer.clientHeight - 70))}px`;
    circle.style.left = `${Math.floor(Math.random() * (gameContainer.clientWidth - 70))}px`;

    let timeout = setTimeout(() => {
        circle.remove();
        createCircle();
    }, 1000);

    timeouts.push(timeout); 

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

function stopCreatingCircles() {
    document.querySelectorAll('.circle').forEach(circle => circle.remove());
    timeouts.forEach(timeout => clearTimeout(timeout)); 
    timeouts = [];
}

function nextLevel() {
    isActive = true;
    nextLevelButton.style.display = 'none';
    interval = setInterval(() => {
        if (timer > 0) {
            timer--;
            document.getElementById('timer').textContent = `Таймер: ${timer}`;
        }
        if (score === 10) {
            clearInterval(interval);
            nextLevel2Button.style.display = 'inline';
            stopCreatingCircles();
        } 
        else if (timer <= 0) {
            endGame();
        }
    }, 1000);
    createCircleNextLevel();
}

function nextLevel2() {
    isActive = true;
    nextLevel2Button.style.display = 'none';
    interval = setInterval(() => {
        if (timer > 0) {
            timer--;
            document.getElementById('timer').textContent = `Таймер: ${timer}`;
        } 
        if (score === 15) {
            clearInterval(interval);
            nextLevel3Button.style.display = 'inline';
            stopCreatingCircles();
        } 
        else if (timer <= 0) {
            endGame();
        }
    }, 1000);
    createCircleNextLevel2();
}

function nextLevel3() {
    isActive = true;
    nextLevel3Button.style.display = 'none';
    interval = setInterval(() => {
        if (timer > 0) {
            timer--;
            document.getElementById('timer').textContent = `Таймер: ${timer}`;
        } else {
            endGame();
        }
    }, 1000);
    createCircleNextLevel3();
}

function createCircleNextLevel() {
    if (score === 10) return;
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.top = `${Math.floor(Math.random() * (gameContainer.clientHeight - 70))}px`;
    circle.style.left = `${Math.floor(Math.random() * (gameContainer.clientWidth - 70))}px`;

    let timeout = setTimeout(() => {
        circle.remove();
        createCircleNextLevel();
    }, 10000);

    timeouts.push(timeout);

    circle.addEventListener('dblclick', () => {
        if (isActive) {
            score++;
            document.getElementById('score').textContent = `Рахунок: ${score}`;
            circle.remove();
            clearTimeout(timeout);
            createCircleNextLevel();
        }
    });

    gameContainer.appendChild(circle);
}

function createCircleNextLevel2() {
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.top = `${Math.floor(Math.random() * (gameContainer.clientHeight - 70))}px`;
    circle.style.left = `${Math.floor(Math.random() * (gameContainer.clientWidth - 70))}px`;

    let timeout = setTimeout(() => {
        circle.remove();
        createCircleNextLevel2();
    }, 1000);

    timeouts.push(timeout);
    circle.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        if (isActive) {
            score++;
            document.getElementById('score').textContent = `Рахунок: ${score}`;
            circle.remove();
            clearTimeout(timeout);
            createCircleNextLevel2();
        }
    });

    gameContainer.appendChild(circle);
}

function createCircleNextLevel3() {
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.top = `${Math.floor(Math.random() * (gameContainer.clientHeight - 70))}px`;
    circle.style.left = `${Math.floor(Math.random() * (gameContainer.clientWidth - 70))}px`;

    let timeout = setTimeout(() => {
        circle.remove();
        createCircleNextLevel3();
    }, 1000);

    timeouts.push(timeout);
    let clickCount = 0;
    let clickTimer;

    circle.addEventListener("mousedown", (event) => {
        if (event.button === 2) { // Правий клік
            event.preventDefault(); // Блокуємо контекстне меню
            clickCount++;

            if (clickCount === 1) {
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 300); // Таймер для очікування другого кліку
            } else if (clickCount === 2) {
                clearTimeout(clickTimer);
                if (isActive) {
                    score++;
                    document.getElementById('score').textContent = `Рахунок: ${score}`;
                    circle.remove();
                    clearTimeout(timeout);
                    createCircleNextLevel3();
                }
                clickCount = 0;
            }
        }
    });

    gameContainer.appendChild(circle);
}

document.addEventListener("contextmenu", (event) => event.preventDefault());

function endGame() {
    clearInterval(interval);
    clearTimeouts();
    isActive = false;

    document.querySelectorAll('.circle').forEach(circle => circle.remove());

    endText.textContent = `Гра завершена. Ваш рахунок: ${score}`;
    endText.style.display = 'inline';

    gameHistory.push(score);
    updateHistory();

    if (score > bestScore) {
        bestScore = score;
    }
    bestScoreText.textContent = `Найкращий результат: ${bestScore}`;

    start.style.display = 'inline';
    document.getElementById('score').style.display = 'none';
}

function clearTimeouts() {
    timeouts.forEach(timeout => clearTimeout(timeout));
    timeouts = [];
}

function updateHistory() {
    historyContainer.innerHTML = '';
    const historyTitle = document.createElement('h3');
    historyTitle.textContent = 'Історія ігор:';
    historyContainer.appendChild(historyTitle);
    gameHistory.forEach((score, index) => {
        const gameRecord = document.createElement('div');
        gameRecord.textContent = `Гра ${index + 1}: ${score} балів`;
        historyContainer.appendChild(gameRecord);
    });
}
