let backgroundSound = new Audio('../assets/audio/background.mp3');
let scriptsLoaded = false;
let soundMuted = false;
let isPausedGame = false;
let keyboard;
let canvas;
let world;


/**
 * Initializes the game by loading scripts, showing the canvas, and setting up the world if necessary.
 * @returns {void}
 */
async function init() {
    if (!scriptsLoaded) {
        await loadScripts(scriptFiles);
    }
    showCanvas();
    if (!world) {
        keyboard = new Keyboard();
        world = new World(canvas, keyboard);
    }
    touchMoves();
}


/**
 * Loads scripts dynamically.
 * @param {string[]} scriptFiles - An array of script file paths to load.
 * @returns {Promise<void>}
 */
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


/**
 * Shows the game canvas and starts background music.
 * @returns {void}
 */
function showCanvas() {
    canvas = document.getElementById('canvas');
    let content = document.querySelector('.content');
    let fullscreen = document.getElementById('fullscreen');
    document.querySelector('.pause').classList.remove('d-none');
    content.classList.add('d-none');
    canvas.classList.remove('d-none');
    fullscreen.style = '';
    backgroundSound.pause();
    backgroundSound.currentTime = 0;
    backgroundSound.play();
    backgroundSound.volume = 0.50;
}


/**
 * Sets up touch event listeners for controlling game movements.
 * @returns {void}
 */
function touchMoves() {
    let moveLeft = document.getElementById('moveLeft');
    let moveRight = document.getElementById('moveRight');
    let jumpHigh = document.getElementById('jumpHigh');
    let throwBottle = document.getElementById('throwBottle');
    movesStart(moveLeft, moveRight, jumpHigh, throwBottle);
    movesEnd(moveLeft, moveRight, jumpHigh, throwBottle);
}


/**
 * Sets up touch start event listeners for initiating movements.
 * @param {HTMLElement} moveLeft - The DOM element for moving left.
 * @param {HTMLElement} moveRight - The DOM element for moving right.
 * @param {HTMLElement} jumpHigh - The DOM element for jumping high.
 * @param {HTMLElement} throwBottle - The DOM element for throwing a bottle.
 * @returns {void}
 */
function movesStart(moveLeft, moveRight, jumpHigh, throwBottle) {
    moveLeft.addEventListener('touchstart', () => {
        world.keyboard.left = true;
    });

    moveRight.addEventListener('touchstart', () => {
        world.keyboard.right = true;
    });

    jumpHigh.addEventListener('touchstart', () => {
        world.keyboard.space = true;
    });
    throwBottle.addEventListener('touchstart', () => {
        world.keyboard.d = true;
    });
}


/**
 * Sets up touch end event listeners for stopping movements.
 * @param {HTMLElement} moveLeft - The DOM element for moving left.
 * @param {HTMLElement} moveRight - The DOM element for moving right.
 * @param {HTMLElement} jumpHigh - The DOM element for jumping high.
 * @param {HTMLElement} throwBottle - The DOM element for throwing a bottle.
 * @returns {void}
 */
function movesEnd(moveLeft, moveRight, jumpHigh, throwBottle) {
    moveLeft.addEventListener('touchend', () => {
        world.keyboard.left = false;
    });

    moveRight.addEventListener('touchend', () => {
        world.keyboard.right = false;
    });

    jumpHigh.addEventListener('touchend', () => {
        world.keyboard.space = false;
    });
    throwBottle.addEventListener('touchend', () => {
        world.keyboard.d = false;
    });
}


/**
 * Displays an information container with the specified ID and hides other elements.
 * @param {string} id - The ID of the container to be displayed.
 * @returns {void}
 */
function showInformationContainer(id) {
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


/**
 * Closes the information container and resets related elements to their initial state.
 * @returns {void}
 */
function closeInformationContainer() {
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


/**
 * Reloads the window to navigate back to the home page.
 * @returns {void}
 */
function backToHome() {
    window.location.reload();
}


/**
 * Resets the game state by clearing relevant variables.
 * @returns {void}
 */
function resetGame() {
    keyboard = null;
    canvas = null;
    world = null;
    level1 = null;
}


/**
 * Removes all script elements from the document.
 * @returns {void}
 */
function removeScripts() {
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
        if (script.parentNode) {
            script.parentNode.removeChild(script);
        }
    });
}


/**
 * Toggles the visibility of the "You Win" screen element.
 * @returns {void}
 */
function showYouWinScreen() {
    let youWin = document.getElementById('youWin');
    youWin.classList.toggle('d-none');
}


/**
 * Opens the end game screen, hides pause elements, and displays content container.
 * @returns {void}
 */
function openEndGameScreen() {
    canvas = document.getElementById('canvas');
    let fullscreen = document.getElementById('fullscreen');
    document.querySelector('.pause').classList.add('d-none');
    document.querySelector('.pause-screen-container').classList.add('d-none');
    canvas.classList.add('d-none');
    fullscreen.style.display = 'none';
    showContentContainer();
    backgroundSound.pause();
    backgroundSound.currentTime = 0;
}


/**
 * Shows the content container and hides other elements.
 * @returns {void}
 */
function showContentContainer() {
    let content = document.querySelector('.content');
    let background = document.getElementById('background');
    let headerContainer = document.querySelector('.header-container');
    let endScreenContainer = document.querySelector('.end-screen-container');
    content.classList.remove('d-none');
    background.src = '../assets/images/5_background/first_half_background.png';
    headerContainer.classList.add('d-none');
    endScreenContainer.classList.remove('d-none');
}


/**
 * Toggles the visibility of the pause screen and its container, and adjusts game state accordingly.
 * @returns {void}
 */
function togglePauseScreen() {
    document.querySelector('.pause').classList.toggle('d-none');
    document.querySelector('.pause-screen-container').classList.toggle('d-none');
    document.getElementById('pauseScreenController').style.display = 'none';
    document.querySelector('.pause-screen-icons').style.display = '';
    isPausedGame = !isPausedGame;
    if (isPausedGame) {
        world.pauseAnimation();
    } else {
        world.resumeAnimation();
    }
}


/**
 * Toggles the visibility of the controller information.
 * @returns {void}
 */
function toggleControllerInformation() {
    document.getElementById('pauseScreenController').style.display = '';
    document.querySelector('.pause-screen-icons').style.display = 'none';
}


/**
 * Toggles the mute state of the background sound.
 * @returns {void}
 */
function toggleMutedSound() {
    let soundOn = document.getElementById('soundOn');
    let soundOff = document.getElementById('soundOff');
    soundMuted = !soundMuted;
    if (soundMuted) {
        backgroundSound.pause();
    } else {
        backgroundSound.play();
    }
    soundOn.classList.toggle('d-none');
    soundOff.classList.toggle('d-none');
}


/**
 * Requests fullscreen mode for the specified element and toggles fullscreen state.
 * @param {HTMLElement} element - The element to request fullscreen for.
 * @returns {void}
 */
function fullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
    toggleFullscreen();
    togglePauseScreen();
}


/**
 * Closes fullscreen mode and toggles fullscreen state.
 * @returns {void}
 */
function closeFullscreen() {
    exitFullscreen();
    togglePauseScreen();
    toggleFullscreen();
}


/**
 * Exits fullscreen mode if the browser supports it.
 * @returns {void}
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


/**
 * Toggles the visibility of the fullscreen control buttons.
 * @returns {void}
 */
function toggleFullscreen() {
    document.getElementById('enterFullscreen').classList.toggle('d-none');
    document.getElementById('exitFullscreen').classList.toggle('d-none');
}


/**
 * Event listener for keyboard keydown events to handle user input.
 * @param {KeyboardEvent} event - The keydown event object.
 * @returns {void}
 */
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


/**
 * Event listener for keyboard keyup events to handle user input.
 * @param {KeyboardEvent} event - The keyup event object.
 * @returns {void}
 */
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