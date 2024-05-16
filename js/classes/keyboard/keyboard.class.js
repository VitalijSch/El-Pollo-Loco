class Keyboard {
    left = false;
    right = false;
    space = false;
    d = false;


    constructor() {
        this.bindKeyPressEvents();
        this.bindTouchPressEvents();
    }


    /**
   * Binds event handlers for keyboard keys.
   */
    bindKeyPressEvents() {
        /**
         * Handles pressing and releasing keys on the keyboard.
         * @param {number} keyCode - The ASCII code of the pressed key.
         * @param {boolean} isPressed - Indicates whether the key is pressed or released.
         */
        window.addEventListener('keydown', (e) => {
            this.handleKeyPress(e.keyCode, true);
        });
        window.addEventListener('keyup', (e) => {
            this.handleKeyPress(e.keyCode, false);
        });
    }


    /**
     * Binds event handlers for touch inputs.
     */
    bindTouchPressEvents() {
        this.addTouchEvent('moveLeft', 'left');
        this.addTouchEvent('moveRight', 'right');
        this.addTouchEvent('jumpHigh', 'space');
        this.addTouchEvent('throwBottle', 'd');
    }


    /**
     * Adds an event handler for touch inputs.
     * @param {string} buttonId - The ID of the HTML element triggering the touch input.
     * @param {string} action - The action to be performed upon touch input.
     */
    addTouchEvent(buttonId, action) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this[action] = true;
            });
            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                this[action] = false;
            });
        } else {
            // Error handling in case the element is not found.
        }
    }


    /**
     * Handles keyboard inputs.
     * @param {number} keyCode - The ASCII code of the pressed key.
     * @param {boolean} isPressed - Indicates whether the key is pressed or released.
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