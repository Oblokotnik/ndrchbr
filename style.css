:root {
    --bg-dark: #121212;
    --bg-card: #1e1e1e;
    --bg-hover: #2d2d2d;
    --text-main: #e0e0e0;
    --text-muted: #888888;
    --accent: #ffb300;
    --accent-glow: rgba(255, 179, 0, 0.3);
    --danger: #cf6679;
    --success: #4caf50;
    --sith-color: #ff1744;
    --jedi-color: #00e5ff;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Montserrat', sans-serif;
    background-color: var(--bg-dark);
    color: var(--text-main);
    overflow-x: hidden;
    min-height: 100vh;
}

/* Фоновые эффекты */
.bg-grid {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    z-index: -2;
    pointer-events: none;
}

.bg-glow {
    position: fixed;
    top: -20%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
    z-index: -1;
    pointer-events: none;
    opacity: 0.5;
}

/* Живой 3D-наблюдатель */
.watcher-3d {
    position: fixed;
    top: 100px;
    right: 50px;
    width: 120px;
    height: 120px;
    z-index: 50;
    pointer-events: none;
    animation: float 3s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

.watcher-head {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
    border-radius: 50%;
    position: relative;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    transition: transform 0.1s ease;
}

.watcher-eye {
    position: absolute;
    width: 35px;
    height: 35px;
    background: #fff;
    border-radius: 50%;
    top: 35%;
    overflow: hidden;
    box-shadow: inset 0 2px 5px rgba(0,0,0,0.3);
}

.watcher-eye.left { left: 20%; }
.watcher-eye.right { right: 20%; }

.pupil {
    position: absolute;
    width: 18px;
    height: 18px;
    background: #000;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.1s ease;
}

/* Навигация */
.main-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 3rem;
    background: rgba(18, 18, 18, 0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #333;
    position: sticky;
    top: 0;
    z-index: 100;
}

.nav-logo {
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: 2px;
}

.nav-logo .accent {
    color: var(--accent);
}

.nav-links {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.nav-btn {
    background: transparent;
    border: 1px solid transparent;
    color: var(--text-muted);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-family: inherit;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.nav-btn:hover, .nav-btn.active {
    color: var(--accent);
    background: var(--bg-card);
    border-color: var(--accent);
}

.streak-display {
    text-align: right;
}

.streak-label {
    display: block;
    font-size: 0.8rem;
    color: var(--text-muted);
}

.streak-count {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--accent);
    text-shadow: 0 0 10px var(--accent-glow);
}

/* Управление страницами */
.page {
    display: none;
    padding: 3rem;
    animation: fadeIn 0.5s ease;
}

.page.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.content-wrapper.single-column {
    grid-template-columns: 1fr;
    text-align: center;
}

/* Главная страница */
.main-title {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
}

.main-title .accent {
    color: var(--accent);
    display: block;
}

.subtitle {
    font-size: 1.1rem;
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 2.5rem;
}

.stats-row {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 2.5rem;
}

.stat-box {
    background: var(--bg-card);
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid #333;
    flex: 1;
}

.stat-box h3 {
    color: var(--accent);
    margin-bottom: 0.5rem;
}

.stat-box p {
    font-size: 0.85rem;
    color: var(--text-muted);
}

.cta-btn {
    background: var(--accent);
    color: #000;
    border: none;
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 800;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.cta-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px var(--accent-glow);
}

/* 3D КУБ */
.scene-3d {
    width: 300px;
    height: 300px;
    perspective: 1000px;
    margin: 0 auto;
}

.cube {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    animation: rotateCube 15s infinite linear;
}

.cube__face {
    position: absolute;
    width: 300px;
    height: 300px;
    border: 2px solid var(--accent);
    background: rgba(30, 30, 30, 0.85);
    color: var(--accent);
    font-size: 2.5rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 30px rgba(255, 179, 0, 0.1) inset;
    backdrop-filter: blur(5px);
}

.cube__face--front  { transform: rotateY(  0deg) translateZ(150px); }
.cube__face--right  { transform: rotateY( 90deg) translateZ(150px); }
.cube__face--back   { transform: rotateY(180deg) translateZ(150px); }
.cube__face--left   { transform: rotateY(-90deg) translateZ(150px); }
.cube__face--top    { transform: rotateX( 90deg) translateZ(150px); }
.cube__face--bottom { transform: rotateX(-90deg) translateZ(150px); }

@keyframes rotateCube {
    0% { transform: rotateX(-15deg) rotateY(0deg); }
    100% { transform: rotateX(-15deg) rotateY(360deg); }
}

/* Дополнительные 3D-объекты */
.floating-objects {
    position: fixed;
    bottom: 50px;
    left: 50px;
    z-index: 40;
    pointer-events: none;
}

.pyramid-3d {
    width: 80px;
    height: 80px;
    position: relative;
    transform-style: preserve-3d;
    animation: rotatePyramid 10s infinite linear;
    margin-bottom: 30px;
}

.pyramid-face {
    position: absolute;
    width: 0;
    height: 0;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    border-bottom: 70px solid var(--accent);
    opacity: 0.7;
}

.pyramid-face.front { transform: rotateY(0deg) translateZ(40px); }
.pyramid-face.back { transform: rotateY(180deg) translateZ(40px); }
.pyramid-face.left { transform: rotateY(-90deg) translateZ(40px); }
.pyramid-face.right { transform: rotateY(90deg) translateZ(40px); }

@keyframes rotatePyramid {
    0% { transform: rotateY(0deg); }
    100% { transform: rotateY(360deg); }
}

.sphere-3d {
    width: 60px;
    height: 60px;
    background: radial-gradient(circle at 30% 30%, var(--accent), #000);
    border-radius: 50%;
    animation: bounce 2s ease-in-out infinite;
    box-shadow: 0 0 20px var(--accent-glow);
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-30px); }
}

/* Гайд */
.section-title {
    font-size: 2.5rem;
    margin-bottom: 2rem;
}

.guide-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    text-align: left;
}

.guide-card {
    background: var(--bg-card);
    padding: 2rem;
    border-radius: 12px;
    border-left: 4px solid var(--accent);
    transition: transform 0.3s;
}

.guide-card:hover {
    transform: translateX(10px);
    background: var(--bg-hover);
}

.card-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.guide-card h3 {
    margin-bottom: 0.5rem;
    color: var(--text-main);
}

.guide-card p {
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.5;
}

/* Философия Ситхов и Джедаев */
.subtitle-center {
    font-size: 1.2rem;
    color: var(--text-muted);
    margin-bottom: 3rem;
}

.philosophy-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 2rem;
    align-items: center;
    margin-bottom: 3rem;
}

.side-card {
    padding: 2rem;
    border-radius: 16px;
    text-align: left;
}

.side-card.sith {
    background: linear-gradient(135deg, rgba(255, 23, 68, 0.1) 0%, rgba(0,0,0,0.3) 100%);
    border: 2px solid var(--sith-color);
}

.side-card.jedi {
    background: linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(0,0,0,0.3) 100%);
    border: 2px solid var(--jedi-color);
}

.side-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.side-card h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
}

.side-card.sith h3 { color: var(--sith-color); }
.side-card.jedi h3 { color: var(--jedi-color); }

.side-card ul {
    list-style: none;
    margin-bottom: 1.5rem;
}

.side-card ul li {
    padding: 0.5rem 0;
    color: var(--text-main);
    position: relative;
    padding-left: 1.5rem;
}

.side-card ul li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--accent);
}

.side-quote {
    font-style: italic;
    color: var(--text-muted);
    border-top: 1px solid #333;
    padding-top: 1rem;
    margin-top: 1rem;
}

.vs-divider {
    font-size: 2rem;
    font-weight: 900;
    color: var(--accent);
    text-align: center;
}

.philosophy-quote {
    background: var(--bg-card);
    padding: 2rem;
    border-radius: 12px;
    border-left: 4px solid var(--accent);
    font-size: 1.1rem;
    font-style: italic;
    color: var(--text-main);
}

/* Дыхание */
.breathing-container {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem 0;
}

.breathing-circle {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 1.2rem;
    color: #000;
    opacity: 0.5;
}

.breathing-circle.active {
    animation: breathe 8s infinite ease-in-out;
}

@keyframes breathe {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(2.5); opacity: 1; box-shadow: 0 0 50px var(--accent); }
}

.danger-btn {
    background: transparent;
    border: 1px solid var(--danger);
    color: var(--danger);
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-family: inherit;
    margin-top: 2rem;
    transition: all 0.3s;
}

.danger-btn:hover {
    background: var(--danger);
    color: #fff;
}

/* Расскажи друзьям */
.share-methods {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
}

.share-card {
    background: var(--bg-card);
    padding: 2rem;
    border-radius: 12px;
    text-align: left;
}

.share-card h3 {
    margin-bottom: 1rem;
    color: var(--accent);
}

.share-card p {
    color: var(--text-muted);
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.share-btn {
    background: var(--accent);
    color: #000;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 700;
    transition: transform 0.2s;
}

.share-btn:hover {
    transform: translateY(-2px);
}

.motivation-block {
    background: var(--bg-card);
    padding: 2rem;
    border-radius: 12px;
    text-align: left;
    margin-bottom: 2rem;
}

.motivation-block h3 {
    color: var(--accent);
    margin-bottom: 1rem;
}

.motivation-block ul {
    list-style: none;
}

.motivation-block ul li {
    padding: 0.5rem 0;
    color: var(--text-main);
}

.secret-link {
    margin-top: 2rem;
    font-size: 0.9rem;
    color: var(--text-muted);
}

.secret-link a {
    color: var(--danger);
    text-decoration: none;
}

.secret-link a:hover {
    text-decoration: underline;
}

/* Мини-игра */
.game-area {
    background: var(--bg-card);
    border-radius: 16px;
    padding: 2rem;
    margin-top: 2rem;
    border: 1px solid #333;
}

.game-ui {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-weight: 800;
    font-size: 1.2rem;
}

.game-field {
    height: 300px;
    position: relative;
    background: #151515;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.start-game-btn, .trigger-btn {
    padding: 1rem 2rem;
    font-size: 1.2rem;
    font-weight: 800;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-family: inherit;
}

.start-game-btn {
    background: var(--accent);
    color: #000;
}

.trigger-btn {
    position: absolute;
    background: var(--danger);
    color: #fff;
    animation: popIn 0.2s ease;
    box-shadow: 0 0 15px rgba(207, 102, 121, 0.5);
}

@keyframes popIn {
    from { transform: scale(0); }
    to { transform: scale(1); }
}

.game-message {
    margin-top: 1rem;
    font-size: 1.2rem;
    font-weight: 600;
    min-height: 1.5em;
}

.text-center { text-align: center; }

/* СЕКРЕТНАЯ СТРАНИЦА - СКРИМЕР */
.secret-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 9999;
    display: none;
    overflow: hidden;
}

.secret-page.active {
    display: block;
}

.secret-content {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.scratch-marks {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0;
}

.scratch {
    position: absolute;
    width: 3px;
    background: linear-gradient(to bottom, transparent, #8b0000, transparent);
    animation: scratchAnim 0.3s ease-out;
}

@keyframes scratchAnim {
    0% { height: 0; opacity: 0; }
    100% { height: 200px; opacity: 1; }
}

.monster-3d {
    position: absolute;
    width: 400px;
    height: 400px;
    transform-style: preserve-3d;
    opacity: 0;
    transition: all 1s ease;
}

.monster-3d.emerge {
    opacity: 1;
    animation: monsterEmerge 2s ease-out forwards;
}

@keyframes monsterEmerge {
    0% {
        transform: translateZ(-1000px) rotateY(180deg);
        opacity: 0;
    }
    50% {
        transform: translateZ(-200px) rotateY(90deg);
        opacity: 0.5;
    }
    100% {
        transform: translateZ(0) rotateY(0deg);
        opacity: 1;
    }
}

.monster-head {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle at 30% 30%, #2d0000, #000);
    border-radius: 50%;
    position: relative;
    margin: 0 auto;
    box-shadow: 0 0 50px rgba(139, 0, 0, 0.8);
    animation: monsterPulse 1s ease-in-out infinite;
}

@keyframes monsterPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.monster-eye {
    position: absolute;
    width: 60px;
    height: 60px;
    background: #ff0000;
    border-radius: 50%;
    top: 30%;
    box-shadow: 0 0 30px #ff0000;
    animation: eyeGlow 0.5s ease-in-out infinite alternate;
}

@keyframes eyeGlow {
    0% { box-shadow: 0 0 20px #ff0000; }
    100% { box-shadow: 0 0 50px #ff0000, 0 0 80px #ff0000; }
}

.monster-eye.left { left: 25%; }
.monster-eye.right { right: 25%; }

.monster-pupil {
    position: absolute;
    width: 30px;
    height: 30px;
    background: #000;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.monster-mouth {
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 80px;
    background: #000;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 0 20px #8b0000;
}

.teeth {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background: repeating-linear-gradient(
        90deg,
        #fff 0px,
        #fff 10px,
        #000 10px,
        #000 15px
    );
    animation: teethMove 0.3s ease-in-out infinite;
}

@keyframes teethMove {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
}

.monster-body {
    width: 200px;
    height: 300px;
    background: linear-gradient(to bottom, #1a0000, #000);
    margin: -50px auto 0;
    border-radius: 50% 50% 0 0;
    position: relative;
    z-index: -1;
}

.secret-title {
    font-size: 4rem;
    font-weight: 900;
    color: #ff0000;
    text-shadow: 0 0 30px #ff0000;
    z-index: 10;
    opacity: 0;
    animation: titleAppear 1s ease-out 1s forwards;
}

@keyframes titleAppear {
    0% { opacity: 0; transform: scale(0.5); }
    100% { opacity: 1; transform: scale(1); }
}

.secret-text {
    font-size: 1.5rem;
    color: #ff6666;
    z-index: 10;
    opacity: 0;
    animation: textAppear 1s ease-out 2s forwards;
}

@keyframes textAppear {
    0% { opacity: 0; }
    100% { opacity: 1; }
}

/* Адаптив */
@media (max-width: 768px) {
    .content-wrapper {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    .main-nav {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
    }
    .nav-links {
        justify-content: center;
    }
    .scene-3d {
        width: 200px;
        height: 200px;
    }
    .cube__face {
        width: 200px;
        height: 200px;
        font-size: 1.5rem;
    }
    .cube__face--front  { transform: rotateY(  0deg) translateZ(100px); }
    .cube__face--right  { transform: rotateY( 90deg) translateZ(100px); }
    .cube__face--back   { transform: rotateY(180deg) translateZ(100px); }
    .cube__face--left   { transform: rotateY(-90deg) translateZ(100px); }
    .cube__face--top    { transform: rotateX( 90deg) translateZ(100px); }
    .cube__face--bottom { transform: rotateX(-90deg) translateZ(100px); }
    .watcher-3d {
        width: 80px;
        height: 80px;
        top: 80px;
        right: 20px;
    }
    .philosophy-grid {
        grid-template-columns: 1fr;
    }
    .vs-divider {
        margin: 1rem 0;
    }
}
