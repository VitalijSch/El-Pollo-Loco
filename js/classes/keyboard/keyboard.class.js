class Keyboard {
    left = false;
    right = false;
    space = false;
    d = false;


    constructor() {
        this.bindKeyPressEvents();
        this.bindTouchPressEventsOnDOMReady();
    }


    /**
    * Binds touch press events when the DOM is ready.
    */
    bindTouchPressEventsOnDOMReady() {
        if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
            this.bindTouchPressEvents();
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                this.bindTouchPressEvents();
            });
        }
    }


    /**
     * Binds key press events to the window object.
     */
    bindKeyPressEvents() {
        window.addEventListener('keydown', (e) => {
            this.handleKeyPress(e.keyCode, true);
        });
        window.addEventListener('keyup', (e) => {
            this.handleKeyPress(e.keyCode, false);
        });
    }


    /**
     * Binds touch press events to specified actions.
     */
    bindTouchPressEvents() {
        this.addTouchEvent('moveLeft', 'left');
        this.addTouchEvent('moveRight', 'right');
        this.addTouchEvent('jumpHigh', 'space');
        this.addTouchEvent('throwBottle', 'd');
    }


    /**
     * Adds a touch event listener to a button element.
     * 
     * @param {string} buttonId - The ID of the button element.
     * @param {string} action - The action to perform when the button is pressed.
     */
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


    /**
     * Handles key press events and updates the corresponding action state.
     * 
     * @param {number} keyCode - The key code of the pressed key.
     * @param {boolean} isPressed - The state of the key press (true for pressed, false for released).
     */
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