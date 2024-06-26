let scriptsLoaded = false;
let soundMuted = false;
let isPausedGame = false;
let keyboard;
let canvas;
let world;
let sounds;


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
    sounds = new Sounds();
    sounds.playAudio(sounds.backgroundSound);
}


/**
 * Handles the transition back to the home screen.
 * This function hides various game elements and displays the start screen.
 * It also pauses and resets the background sound if it's currently playing.
 */
function backToHome() {
    let canvas = document.getElementById('canvas');
    let fullscreen = document.getElementById('fullscreen');
    document.querySelector('.pause').classList.add('d-none');
    document.querySelector('.pause-screen-container').classList.add('d-none');
    document.getElementById('youWin').classList.add('d-none');
    canvas.classList.add('d-none');
    fullscreen.style.display = 'none';
    showStartScreenContainer();
    if (sounds.playSound) {
        sounds.backgroundSound.src = '';
    }
    resetGame();
    removeScripts();
    level1 = levelOne();
}


/**
 * Displays the start screen container.
 * This function shows the start screen elements and hides the end screen elements.
 */
function showStartScreenContainer() {
    let content = document.querySelector('.content');
    let background = document.getElementById('background');
    let headerContainer = document.querySelector('.header-container');
    let endScreenContainer = document.querySelector('.end-screen-container');
    content.classList.remove('d-none');
    background.src = './assets/images/9_intro_outro_screens/start/startscreen_2.png';
    headerContainer.classList.remove('d-none');
    endScreenContainer.classList.add('d-none');
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
    background.src = './assets/images/5_background/first_half_background.png';
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
    background.src = './assets/images/9_intro_outro_screens/start/startscreen_2.png';
    arrowBack.classList.add('d-none');
    headerContainer.classList.remove('d-none');
    storyContainer.classList.add('d-none');
    informationContainer.forEach(container => container.classList.add('d-none'));
}


/**
 * Starts a new game by resetting the game state, removing any dynamically loaded scripts,
 * initializing the first level, and starting the game.
 */
function playAgain() {
    resetGame();
    removeScripts();
    level1 = levelOne();
    init();
}


/**
 * Resets the game state by clearing relevant variables.
 * @returns {void}
 */
function resetGame() {
    keyboard = null;
    sounds = null;
    canvas = null;
    world.pauseAnimation();
    world.clearAllIntervals();
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
    if (sounds.playSound) {
        sounds.backgroundSound.src = '';
    }
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
    background.src = './assets/images/5_background/first_half_background.png';
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
        if (sounds.playSound) {
            sounds.backgroundSound.pause();
        }
    } else {
        sounds.playAudio(sounds.backgroundSound);
    }
    soundOn.classList.toggle('d-none');
    soundOff.classList.toggle('d-none');
}


/**
 * Funktion, um das angegebene Element in den Vollbildmodus zu versetzen.
 * 
 * @param {HTMLElement} element - Das HTMLElement, das in den Vollbildmodus versetzt werden soll.
 * @returns {void}
 */
function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
}


/**
 * Requests fullscreen mode for the specified element and toggles fullscreen state.
 * @param {HTMLElement} element - The element to request fullscreen for.
 * @returns {void}
 */
function enterFullscreen(element) {
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