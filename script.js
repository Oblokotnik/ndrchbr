// === УПРАВЛЕНИЕ СТРАНИЦАМИ ===
function switchPage(pageId) {
    // Скрываем все страницы
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    // Убираем активный класс у кнопок
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Показываем нужную страницу
    document.getElementById(pageId).classList.add('active');
    // Подсвечиваем кнопку
    document.querySelector(`.nav-btn[data-page="${pageId}"]`).classList.add('active');
}

// Навешиваем обработчики на кнопки навигации
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        switchPage(btn.getAttribute('data-page'));
    });
});

// === СЧЕТЧИК ДНЕЙ (LocalStorage) ===
const streakCountEl = document.getElementById('streakCount');
const resetBtn = document.getElementById('resetStreakBtn');

function getStreak() {
    const startDate = localStorage.getItem('ndr_startDate');
    if (!startDate) {
        // Если даты нет, устанавливаем сегодня
        localStorage.setItem('ndr_startDate', new Date().toISOString());
        return 0;
    }
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function updateStreakDisplay() {
    streakCountEl.textContent = getStreak();
}

resetBtn.addEventListener('click', () => {
    if(confirm('Ты уверен, что хочешь сбросить прогресс? Честность перед собой — это уже победа.')) {
        localStorage.setItem('ndr_startDate', new Date().toISOString());
        updateStreakDisplay();
        alert('Счетчик сброшен. Начинаем заново. Ты сильнее этого.');
    }
});

// Инициализация при загрузке
updateStreakDisplay();

// === ДЫХАТЕЛЬНАЯ ПРАКТИКА ===
const breathCircle = document.getElementById('breathCircle');
const breathText = document.getElementById('breathText');
const startBreathBtn = document.getElementById('startBreathBtn');
let breathingInterval;

startBreathBtn.addEventListener('click', () => {
    if (breathCircle.classList.contains('active')) {
        // Остановить
        breathCircle.classList.remove('active');
        breathText.textContent = 'Вдох';
        startBreathBtn.textContent = 'Начать практику';
        clearInterval(breathingInterval);
    } else {
        // Запустить
        breathCircle.classList.add('active');
        startBreathBtn.textContent = 'Остановить';
        
        let isInhale = true;
        breathText.textContent = 'Вдох';
        
        breathingInterval = setInterval(() => {
            isInhale = !isInhale;
            breathText.textContent = isInhale ? 'Вдох' : 'Выдох';
        }, 4000); // 4 секунды вдох, 4 секунды выдох (синхронно с CSS анимацией 8s)
    }
});

// === МИНИ-ИГРА "ТРЕНАЖЕР ВОЛИ" ===
const gameField = document.getElementById('gameField');
const startGameBtn = document.getElementById('startGameBtn');
const willpowerScoreEl = document.getElementById('willpowerScore');
const gameTimerEl = document.getElementById('gameTimer');
const gameMessage = document.getElementById('gameMessage');

let gameActive = false;
let willpower = 100;
let timeLeft = 30;
let gameInterval;
let spawnInterval;
let activeTriggers = [];

const triggerWords = ["Скука", "Стресс", "Триггер", "Усталость", "Скука", "Одиночество"];

function startGame() {
    gameActive = true;
    willpower = 100;
    timeLeft = 30;
    activeTriggers = [];
    gameField.innerHTML = ''; // Очистка поля
    gameMessage.textContent = 'Нажимай на красные кнопки, чтобы отвергнуть триггеры!';
    gameMessage.style.color = 'var(--text-main)';
    
    updateGameUI();

    // Таймер игры
    gameInterval = setInterval(() => {
        timeLeft--;
        updateGameUI();
        if (timeLeft <= 0 || willpower <= 0) {
            endGame();
        }
    }, 1000);

    // Спавн триггеров
    spawnInterval = setInterval(spawnTrigger, 1200);
}

function spawnTrigger() {
    if (!gameActive) return;

    const btn = document.createElement('button');
    btn.className = 'trigger-btn';
    btn.textContent = triggerWords[Math.floor(Math.random() * triggerWords.length)];
    
    // Случайная позиция (с отступами от краев)
    const maxX = gameField.clientWidth - 120;
    const maxY = gameField.clientHeight - 50;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';

    // Обработчик клика (успех)
    btn.addEventListener('click', () => {
        if (!gameActive) return;
        willpower = Math.min(100, willpower + 10);
        updateGameUI();
        btn.remove();
        activeTriggers = activeTriggers.filter(t => t !== btn);
    });

    gameField.appendChild(btn);
    activeTriggers.push(btn);

    // Если не нажали за 1.5 секунды - штраф
    setTimeout(() => {
        if (gameActive && btn.parentNode) {
            willpower = Math.max(0, willpower - 15);
            updateGameUI();
            btn.remove();
            activeTriggers = activeTriggers.filter(t => t !== btn);
            
            // Визуальный фидбек штрафа
            gameField.style.boxShadow = 'inset 0 0 30px var(--danger)';
            setTimeout(() => gameField.style.boxShadow = 'none', 200);
        }
    }, 1500);
}

function updateGameUI() {
    willpowerScoreEl.textContent = willpower;
    gameTimerEl.textContent = timeLeft;
    
    if (willpower < 30) {
        willpowerScoreEl.style.color = 'var(--danger)';
    } else {
        willpowerScoreEl.style.color = 'var(--success)';
    }
}

function endGame() {
    gameActive = false;
    clearInterval(gameInterval);
    clearInterval(spawnInterval);
    
    // Удаляем все оставшиеся кнопки
    activeTriggers.forEach(btn => btn.remove());
    activeTriggers = [];

    const restartBtn = document.createElement('button');
    restartBtn.className = 'start-game-btn';
    restartBtn.textContent = 'ПОПРОБОВАТЬ СНОВА';
    restartBtn.onclick = startGame;
    gameField.appendChild(restartBtn);

    if (willpower > 0) {
        gameMessage.textContent = `Испытание пройдено! Твоя воля крепка. Осталось воли: ${willpower}%`;
        gameMessage.style.color = 'var(--success)';
    } else {
        gameMessage.textContent = 'Триггеры взяли верх. В реальной жизни просто сделай глубокий вдох и смени обстановку. Ты справишься!';
        gameMessage.style.color = 'var(--danger)';
    }
}

startGameBtn.addEventListener('click', startGame);
