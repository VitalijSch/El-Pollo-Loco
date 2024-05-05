let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    let content = document.querySelector('.content');
    content.classList.add('d-none');
    canvas.classList.remove('d-none');
    world = new World(canvas, keyboard);
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