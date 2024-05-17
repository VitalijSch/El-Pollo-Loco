class Keyboard {
    left = false;
    right = false;
    space = false;
    d = false;


    constructor() {
        this.bindKeyPressEvents();
        this.bindTouchPressEventsOnDOMReady();
    }


    bindTouchPressEventsOnDOMReady() {
        if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
            this.bindTouchPressEvents();
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                this.bindTouchPressEvents();
            });
        }
    }


    bindKeyPressEvents() {
        window.addEventListener('keydown', (e) => {
            this.handleKeyPress(e.keyCode, true);
        });
        window.addEventListener('keyup', (e) => {
            this.handleKeyPress(e.keyCode, false);
        });
    }


    bindTouchPressEvents() {
        this.addTouchEvent('moveLeft', 'left');
        this.addTouchEvent('moveRight', 'right');
        this.addTouchEvent('jumpHigh', 'space');
        this.addTouchEvent('throwBottle', 'd');
    }


    addTouchEvent(buttonId, action) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('touchstart', () => {
                this[action] = true;
            }, { passive: true });

            button.addEventListener('touchend', () => {
                this[action] = false;
            }, { passive: true });
        }
    }


    handleKeyPress(keyCode, isPressed) {
        switch (keyCode) {
            case 37:
                this.left = isPressed;
                break;
            case 39:
                this.right = isPressed;
                break;
            case 32:
                this.space = isPressed;
                break;
            case 68:
                this.d = isPressed;
                break;
        }
    }
}