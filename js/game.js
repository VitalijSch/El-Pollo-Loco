const scriptFiles = [
    './js/classes/world.class.js',
    './js/classes/drawable.class.js',
    './js/classes/movable.class.js',
    './js/classes/status_bar.class.js',
    './js/classes/bottle.class.js',
    './js/classes/coin.class.js',
    './js/classes/throwable.class.js',
    './js/classes/background.class.js',
    './js/classes/cloud.class.js',
    './js/classes/character.class.js',
    './js/classes/chicken.class.js',
    './js/classes/small_chicken.class.js',
    './js/classes/endBoss.class.js',
    './js/classes/level.class.js',
    './js/classes/keyboard.class.js',
    './js/levels/level_1.js'
];
let scriptsLoaded = false;
let keyboard;
let canvas;
let world;


async function loadScripts(scriptFiles) {
    for (let i = 0; i < scriptFiles.length; i++) {
        const src = scriptFiles[i];
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }
    scriptsLoaded = true;
}

async function init() {
    try {
        if (!scriptsLoaded) {
        await loadScripts(scriptFiles);
        }
        canvas = document.getElementById('canvas');
        let content = document.querySelector('.content');
        content.classList.add('d-none');
        canvas.classList.remove('d-none');
        if (!world) {
        keyboard = new Keyboard();
        world = new World(canvas, keyboard);
        }
    } catch (error) {
        console.error('Error loading scripts:', error);
    }
}



function showInformation(id) {
    let background = document.getElementById('background');
    let arrowBack = document.querySelector('.arrow-back');
    let headerContainer = document.querySelector('.header-container');
    let storyContainer = document.querySelector('.story-container');
    let container = document.getElementById(id);
    background.src = '../assets/images/5_background/first_half_background.png';
    arrowBack.classList.remove('d-none');
    headerContainer.classList.add('d-none');
    storyContainer.classList.remove('d-none');
    container.classList.remove('d-none');
}


function closeInformation() {
    let background = document.getElementById('background');
    let arrowBack = document.querySelector('.arrow-back');
    let headerContainer = document.querySelector('.header-container');
    let storyContainer = document.querySelector('.story-container');
    let informationContainer = document.querySelectorAll('.close-information');
    background.src = '../assets/images/9_intro_outro_screens/start/startscreen_2.png';
    arrowBack.classList.add('d-none');
    headerContainer.classList.remove('d-none');
    storyContainer.classList.add('d-none');
    informationContainer.forEach(container => container.classList.add('d-none'));
}


function backToHome() {
    window.location.reload();
}


function playAgain() {
    resetGame();
    removeScripts();
    level1 = levelOne();
    init();
}


function openEndGameScreen() {
    canvas = document.getElementById('canvas');
    let content = document.querySelector('.content');
    let background = document.getElementById('background');
    let headerContainer = document.querySelector('.header-container');
    let endScreenContainer = document.querySelector('.end-screen-container');
    background.src = '../assets/images/5_background/first_half_background.png';
    canvas.classList.add('d-none');
    content.classList.remove('d-none');
    headerContainer.classList.add('d-none');
    endScreenContainer.classList.remove('d-none');
}


function removeScripts() {
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
        if (script.parentNode) {
            script.parentNode.removeChild(script);
        }
    });
}


function resetGame() {
    keyboard = null;
    canvas = null;
    world = null;
    level1 = null;
}


document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft') {
        keyboard.left = true;
    }
    if (event.code === 'ArrowRight') {
        keyboard.right = true;
    }
    if (event.code === 'ArrowUp') {
        keyboard.up = true;
    }
    if (event.code === 'ArrowDown') {
        keyboard.down = true;
    }
    if (event.code === 'Space') {
        keyboard.space = true;
    }
    if (event.code === 'KeyD') {
        keyboard.d = true;
    }
});


document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowLeft') {
        keyboard.left = false;
    }
    if (event.code === 'ArrowRight') {
        keyboard.right = false;
    }
    if (event.code === 'ArrowUp') {
        keyboard.up = false;
    }
    if (event.code === 'ArrowDown') {
        keyboard.down = false;
    }
    if (event.code === 'Space') {
        keyboard.space = false;
    }
    if (event.code === 'KeyD') {
        keyboard.d = false;
    }
});