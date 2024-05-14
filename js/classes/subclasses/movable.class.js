class Movable extends Drawable {
    intervalArray = [];
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    sounds = new Sounds();
    speedX = 0.2;
    speedY = 0;
    accelaration = 2.5;
    energy = 100;
    lastHit = 0;
    hitEnemy = false;
    otherDirection = false;
    isEnemyDead = false;
    id;
    enemyMoveInterval;


    /**
     * Moves the object to the left by decrementing its x-coordinate.
     * @returns {void}
     */
    moveLeft() {
        this.x -= this.speedX;
    }


    /**
     * Moves the object to the right by incrementing its x-coordinate.
     * @returns {void}
     */
    moveRight() {
        this.x += this.speedX;
    }


    /**
     * Initiates a jump action by setting the object's vertical speed.
     * @returns {void}
     */
    jump() {
        this.speedY = 30;
    }


    /**
     * Applies gravity to the object by decreasing its y-coordinate based on its vertical speed.
     * @returns {void}
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelaration;
            }
        }, 1000 / 25);
    }


    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof Throwable) {
            return this.y < 370;
        } else {
            return this.y < 170;
        }
    }


    /**
     * Checks if the object is moving downwards.
     * @returns {boolean} True if the object is moving downwards, false otherwise.
     */
    moveDown() {
        return this.speedY < 0;
    }


    /**
     * Checks if the object is colliding with another object.
     * @param {Object} mo - The other object to check collision with.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
            this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom;
    }


    /**
     * Handles the object being hit by reducing its energy and updating last hit time.
     * @returns {void}
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Checks if the object is currently hurt based on the last hit time.
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    /**
     * Checks if the object is dead based on its energy level.
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy === 0;
    }


    /**
     * Initiates movement for an enemy object by moving it to the left at a set interval.
     * @returns {void}
     */
    enemyMove() {
        this.enemyMoveInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }


    /**
     * Initiates animation for an enemy object based on its state.
     * @param {string[]} enemyDead - Array of paths for dead state animation.
     * @param {string[]} enemyWalk - Array of paths for walking state animation.
     * @returns {void}
     */
    enemyAnimation(enemyDead, enemyWalk) {
        setInterval(() => {
            if (this.speedX === 0 && this.isEnemyDead) {
                this.playAnimation(enemyDead)
            } else {
                this.playAnimation(enemyWalk);
            }
        }, 200);
    }


    /**
   * Adjusts the speed of the big chicken based on the game's pause state.
   * @param {BigChicken} chicken - The big chicken instance.
   * @returns {void}
   */
    adjustBigChickenSpeed(chicken) {
        if (isPausedGame) {
            chicken.speedX = 0;
        } else {
            chicken.speedX = 10;
        }
    }


    /**
     * Clears all active intervals.
     * @returns {void}
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }


    /**
     * Pauses the animation loop.
     * @returns {void}
     */
    pauseAnimation() {
        cancelAnimationFrame(this.animationFrameId);
    }


    /**
     * Resumes the animation loop.
     * @returns {void}
     */
    resumeAnimation() {
        this.animationFrameId = requestAnimationFrame(() => this.draw());
    }
}