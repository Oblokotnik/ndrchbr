// Игровые переменные
let gameState = {
    food: 10,
    water: 5,
    health: 100,
    day: 1,
    waterLevel: 0,
    crankProgress: 0,
    hatchOpen: false,
    sleptOnDay3: false
};

// Переключение экранов
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Начало игры
function startGame() {
    showScreen('gameScreen');
    updateUI();
    showAction('Вы просыпаетесь в подвале. Рядом трое людей. Что будете делать?');
    
    // Монстры начинают ломиться со 2 дня
    setTimeout(() => {
        if (gameState.day >= 2) {
            document.getElementById('monstersShadow').classList.add('active');
        }
    }, 1000);
}

// Обновление UI
function updateUI() {
    document.getElementById('foodCount').textContent = gameState.food;
    document.getElementById('waterCount').textContent = gameState.water;
    document.getElementById('healthCount').textContent = gameState.health;
    document.getElementById('dayCount').textContent = gameState.day;
    
    // Обновление индикатора воды в бойлере
    document.getElementById('waterIndicator').style.height = gameState.waterLevel + '%';
}

// Показать действие
function showAction(text, buttons = []) {
    document.getElementById('actionText').textContent = text;
    const buttonsContainer = document.getElementById('actionButtons');
    buttonsContainer.innerHTML = '';
    
    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.className = 'action-btn';
        button.textContent = btn.text;
        button.onclick = btn.action;
        buttonsContainer.appendChild(button);
    });
}

// Взаимодействие с люком
function interactHatch() {
    if (gameState.day === 3 && !gameState.hatchOpen) {
        gameState.hatchOpen = true;
        showAction('Люк открыт... Но снаружи тихо. Слишком тихо.', [
            { text: 'Оглянуться', action: () => showAction('Никого не видно. Странно...') },
            { text: 'Вернуться', action: () => showAction('Вы отошли от люка') }
        ]);
    } else if (gameState.hatchOpen) {
        showAction('Люк уже открыт. Но выходить страшно.', [
            { text: 'Вернуться', action: () => {} }
        ]);
    } else {
        showAction('Люк закрыт. Слишком опасно открывать.', [
            { text: 'Вернуться', action: () => {} }
        ]);
    }
}

// Взаимодействие с бойлером
function interactBoiler() {
    if (gameState.day === 3 && gameState.hatchOpen && !gameState.sleptOnDay3) {
        // СКРИМЕР СЦЕНА
        startScreamerSequence();
    } else {
        // Обычное кручение бойлера
        startCranking();
    }
}

// Кручение бойлера
function startCranking() {
    const crankIndicator = document.getElementById('crankIndicator');
    const crankProgress = document.getElementById('crankProgress');
    crankIndicator.classList.add('active');
    
    gameState.crankProgress = 0;
    let clicks = 0;
    const requiredClicks = 20;
    
    showAction('Крутите колесо! Кликайте быстро!');
    
    const clickHandler = () => {
        clicks++;
        gameState.crankProgress = (clicks / requiredClicks) * 100;
        crankProgress.style.transform = `rotate(${gameState.crankProgress * 3.6}deg)`;
        
        // Вращение колеса
        const wheel = document.getElementById('boilerWheel');
        wheel.style.transform = `translateX(-50%) rotate(${clicks * 30}deg)`;
        
        if (clicks >= requiredClicks) {
            document.removeEventListener('click', clickHandler);
            crankIndicator.classList.remove('active');
            gameState.waterLevel = Math.min(100, gameState.waterLevel + 30);
            gameState.water++;
            updateUI();
            showAction('Вода наполнена! +1 вода', [
                { text: 'Продолжить', action: () => {} }
            ]);
        }
    };
    
    setTimeout(() => {
        document.addEventListener('click', clickHandler);
    }, 100);
}

// Взаимодействие с кроватью
function interactBed() {
    showAction('Вы хотите поспать?', [
        { text: 'Да', action: () => goToSleep() },
        { text: 'Нет', action: () => showAction('Вы решили не спать') }
    ]);
}

// Сон
function goToSleep() {
    showScreen('sleepScreen');
    
    setTimeout(() => {
        gameState.day++;
        gameState.food--;
        
        // Проверка на 3 день
        if (gameState.day === 3) {
            gameState.sleptOnDay3 = true;
        }
        
        // Проверка ресурсов
        if (gameState.food <= 0 || gameState.water <= 0) {
            endGame('Вы погибли от голода или жажды...');
        } else if (gameState.day > 5) {
            endGame('Вы продержались 5 дней. Спасение прибыло!');
        } else {
            showScreen('gameScreen');
            updateUI();
            showAction(`День ${gameState.day}. Вы проснулись. Ресурсы заканчиваются...`, [
                { text: 'Осмотреться', action: () => {} }
            ]);
            
            // Монстры на 2+ день
            if (gameState.day >= 2) {
                document.getElementById('monstersShadow').classList.add('active');
            }
        }
    }, 3000);
}

// СКРИМЕР ПОСЛЕДОВАТЕЛЬНОСТЬ
function startScreamerSequence() {
    showScreen('screamerScreen');
    
    // Звук скримера
    playScreamerSound();
    
    // Через 2 секунды монстр вылезает
    setTimeout(() => {
        document.getElementById('monsterEmerge').classList.add('active');
    }, 2000);
    
    // Вспышка
    setTimeout(() => {
        document.getElementById('screamerFlash').classList.add('active');
    }, 3000);
    
    // Конец
    setTimeout(() => {
        endGame('Монстр схватил вас. Вы не должны были крутить бойлер...');
    }, 5000);
}

// Звук скримера
function playScreamerSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Низкий гул
    const osc1 = audioContext.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(50, audioContext.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(20, audioContext.currentTime + 3);
    
    const gain1 = audioContext.createGain();
    gain1.gain.setValueAtTime(0.5, audioContext.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 3);
    
    osc1.connect(gain1);
    gain1.connect(audioContext.destination);
    osc1.start();
    osc1.stop(audioContext.currentTime + 3);
    
    // Высокий визг
    const osc2 = audioContext.createOscillator();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(1000, audioContext.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 2);
    
    const gain2 = audioContext.createGain();
    gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
    
    osc2.connect(gain2);
    gain2.connect(audioContext.destination);
    osc2.start();
    osc2.stop(audioContext.currentTime + 2);
}

// Конец игры
function endGame(text) {
    showScreen('endScreen');
    document.getElementById('endText').textContent = text;
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    // Добавляем случайные звуки шагов монстров
    setInterval(() => {
        if (gameState.day >= 2 && document.getElementById('gameScreen').classList.contains('active')) {
            if (Math.random() > 0.7) {
                playMonsterSound();
            }
        }
    }, 5000);
});

function playMonsterSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioContext.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.5);
    
    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0.2, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start();
    osc.stop(audioContext.currentTime + 0.5);
}
