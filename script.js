// === УПРАВЛЕНИЕ СТРАНИЦАМИ ===
function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(pageId).classList.add('active');
    document.querySelector(`.nav-btn[data-page="${pageId}"]`).classList.add('active');
}

document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        switchPage(btn.getAttribute('data-page'));
    });
});

// === ЖИВОЙ 3D-НАБЛЮДАТЕЛЬ (следит за курсором) ===
const watcher = document.getElementById('watcher');
const pupils = document.querySelectorAll('.pupil');

document.addEventListener('mousemove', (e) => {
    const watcherRect = watcher.getBoundingClientRect();
    const watcherCenterX = watcherRect.left + watcherRect.width / 2;
    const watcherCenterY = watcherRect.top + watcherRect.height / 2;
    
    const deltaX = e.clientX - watcherCenterX;
    const deltaY = e.clientY - watcherCenterY;
    const angle = Math.atan2(deltaY, deltaX);
    const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 50);
    
    const moveX = Math.cos(angle) * (distance / 5);
    const moveY = Math.sin(angle) * (distance / 5);
    
    pupils.forEach(pupil => {
        pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
    });
    
    // Легкий наклон головы
    const rotateX = (deltaY / window.innerHeight) * 20;
    const rotateY = (deltaX / window.innerWidth) * 20;
    watcher.querySelector('.watcher-head').style.transform = 
        `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
});

// === СЧЕТЧИК ДНЕЙ ===
const streakCountEl = document.getElementById('streakCount');
const resetBtn = document.getElementById('resetStreakBtn');

function getStreak() {
    const startDate = localStorage.getItem('ndr_startDate');
    if (!startDate) {
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

updateStreakDisplay();

// === ДЫХАТЕЛЬНАЯ ПРАКТИКА ===
const breathCircle = document.getElementById('breathCircle');
const breathText = document.getElementById('breathText');
const startBreathBtn = document.getElementById('startBreathBtn');
let breathingInterval;

startBreathBtn.addEventListener('click', () => {
    if (breathCircle.classList.contains('active')) {
        breathCircle.classList.remove('active');
        breathText.textContent = 'Вдох';
        startBreathBtn.textContent = 'Начать практику';
        clearInterval(breathingInterval);
    } else {
        breathCircle.classList.add('active');
        startBreathBtn.textContent = 'Остановить';
        
        let isInhale = true;
        breathText.textContent = 'Вдох';
        
        breathingInterval = setInterval(() => {
            isInhale = !isInhale;
            breathText.textContent = isInhale ? 'Вдох' : 'Выдох';
        }, 4000);
    }
});

// === МИНИ-ИГРА ===
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

const triggerWords = ["Скука", "Стресс", "Триггер", "Усталость", "Одиночество", "Лень"];

function startGame() {
    gameActive = true;
    willpower = 100;
    timeLeft = 30;
    activeTriggers = [];
    gameField.innerHTML = '';
    gameMessage.textContent = 'Нажимай на красные кнопки, чтобы отвергнуть триггеры!';
    gameMessage.style.color = 'var(--text-main)';
    
    updateGameUI();

    gameInterval = setInterval(() => {
        timeLeft--;
        updateGameUI();
        if (timeLeft <= 0 || willpower <= 0) {
            endGame();
        }
    }, 1000);

    spawnInterval = setInterval(spawnTrigger, 1200);
}

function spawnTrigger() {
    if (!gameActive) return;

    const btn = document.createElement('button');
    btn.className = 'trigger-btn';
    btn.textContent = triggerWords[Math.floor(Math.random() * triggerWords.length)];
    
    const maxX = gameField.clientWidth - 120;
    const maxY = gameField.clientHeight - 50;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';

    btn.addEventListener('click', () => {
        if (!gameActive) return;
        willpower = Math.min(100, willpower + 10);
        updateGameUI();
        btn.remove();
        activeTriggers = activeTriggers.filter(t => t !== btn);
    });

    gameField.appendChild(btn);
    activeTriggers.push(btn);

    setTimeout(() => {
        if (gameActive && btn.parentNode) {
            willpower = Math.max(0, willpower - 15);
            updateGameUI();
            btn.remove();
            activeTriggers = activeTriggers.filter(t => t !== btn);
            
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

// === ФУНКЦИИ ДЛЯ СТРАНИЦЫ "РАССКАЗАТЬ ДРУЗЬЯМ" ===
function copyShareText() {
    const text = "Я участвую в Недрочабре 2026! Это челлендж по силе воли и дисциплине. Присоединяйся! 💪";
    navigator.clipboard.writeText(text).then(() => {
        showMessage('Текст скопирован! Поделись с друзьями');
    }).catch(() => {
        showMessage('Не удалось скопировать. Попробуй вручную');
    });
}

function showMessage(msg) {
    alert(msg);
}

// === СЕКРЕТНАЯ СТРАНИЦА ДЛЯ МАКСА ===
function goToSecret(event) {
    event.preventDefault();
    const secretPage = document.getElementById('secret');
    secretPage.classList.add('active');
    
    // Запускаем скример-последовательность
    setTimeout(() => startScreamerSequence(), 500);
}

function startScreamerSequence() {
    const secretPage = document.getElementById('secret');
    const scratchMarks = document.getElementById('scratchMarks');
    const monster = document.getElementById('monster');
    const title = document.getElementById('secretTitle');
    const text = document.getElementById('secretText');
    
    // Фаза 1: Постепенное покраснение фона (0-3 секунды)
    let redIntensity = 0;
    const redInterval = setInterval(() => {
        redIntensity += 5;
        secretPage.style.background = `rgb(${redIntensity}, 0, 0)`;
        
        if (redIntensity >= 100) {
            clearInterval(redInterval);
        }
    }, 150);
    
    // Фаза 2: Царапины (1-4 секунды)
    setTimeout(() => {
        scratchMarks.style.opacity = '1';
        createScratches();
    }, 1000);
    
    // Фаза 3: Появление монстра (3 секунды)
    setTimeout(() => {
        monster.classList.add('emerge');
        playScreamerSound();
    }, 3000);
    
    // Фаза 4: Тряска экрана (4-6 секунд)
    setTimeout(() => {
        secretPage.style.animation = 'shake 0.5s ease-in-out infinite';
    }, 4000);
}

function createScratches() {
    const scratchMarks = document.getElementById('scratchMarks');
    const scratchCount = 15;
    
    for (let i = 0; i < scratchCount; i++) {
        setTimeout(() => {
            const scratch = document.createElement('div');
            scratch.className = 'scratch';
            scratch.style.left = Math.random() * 100 + '%';
            scratch.style.top = Math.random() * 100 + '%';
            scratch.style.transform = `rotate(${Math.random() * 360}deg)`;
            scratchMarks.appendChild(scratch);
            
            // Звук царапины
            playScratchSound();
        }, i * 200);
    }
}

function playScreamerSound() {
    // Создаем жуткий звук через Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Низкий гул
    const oscillator1 = audioContext.createOscillator();
    oscillator1.type = 'sawtooth';
    oscillator1.frequency.setValueAtTime(50, audioContext.currentTime);
    oscillator1.frequency.exponentialRampToValueAtTime(20, audioContext.currentTime + 2);
    
    const gain1 = audioContext.createGain();
    gain1.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
    
    oscillator1.connect(gain1);
    gain1.connect(audioContext.destination);
    oscillator1.start();
    oscillator1.stop(audioContext.currentTime + 2);
    
    // Высокий визг
    const oscillator2 = audioContext.createOscillator();
    oscillator2.type = 'square';
    oscillator2.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator2.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 1);
    
    const gain2 = audioContext.createGain();
    gain2.gain.setValueAtTime(0.2, audioContext.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator2.connect(gain2);
    gain2.connect(audioContext.destination);
    oscillator2.start();
    oscillator2.stop(audioContext.currentTime + 1);
}

function playScratchSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(Math.random() * 1000 + 500, audioContext.currentTime);
    
    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0.1, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Добавляем анимацию тряски в CSS через JS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translate(0, 0); }
        10% { transform: translate(-10px, -10px); }
        20% { transform: translate(10px, 10px); }
        30% { transform: translate(-10px, 10px); }
        40% { transform: translate(10px, -10px); }
        50% { transform: translate(-5px, 5px); }
        60% { transform: translate(5px, -5px); }
        70% { transform: translate(-5px, -5px); }
        80% { transform: translate(5px, 5px); }
        90% { transform: translate(-5px, 5px); }
    }
`;
document.head.appendChild(style);

// === 3D-КУБ РЕАГИРУЕТ НА МЫШЬ ===
const mainCube = document.getElementById('mainCube');
if (mainCube) {
    document.addEventListener('mousemove', (e) => {
        const rotateX = (e.clientY / window.innerHeight - 0.5) * 30;
        const rotateY = (e.clientX / window.innerWidth - 0.5) * 30;
        mainCube.style.animation = 'none';
        mainCube.style.transform = `rotateX(${-15 + rotateX}deg) rotateY(${rotateY}deg)`;
    });
}
