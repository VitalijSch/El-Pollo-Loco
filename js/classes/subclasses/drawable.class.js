class Drawable {
    imageCache = {};
    currentImage = 0;
    img;
    width;
    height;
    x;
    y;


    /**
     * Loads an image from the given path.
     * @param {string} path - The path to the image.
     * @returns {void}
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Loads multiple images from an array of paths and stores them in the image cache.
     * @param {string[]} arr - An array containing paths to the images.
     * @returns {void}
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Plays an animation using an array of images.
     * @param {string[]} images - An array containing paths to the images for the animation.
     * @returns {void}
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        this.path = images[i];
        this.img = this.imageCache[this.path];
        this.currentImage++;
    }


    /**
     * Draws the image onto the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @returns {void}
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
 * Adds objects to the game map.
 * @param {Array} object - The array of objects to add to the map.
 * @returns {void}
 */
    addObjectsToMap(object) {
        object.forEach(obj => {
            this.addToMap(obj);
        });
    }


    /**
     * Adds an object to the game map and flips it if necessary.
     * @param {GameObject} mo - The game object to add to the map.
     * @returns {void}
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * Flips the image of a game object horizontally.
     * @param {GameObject} mo - The game object whose image to flip.
     * @returns {void}
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Restores the image of a game object after flipping it back to its original orientation.
     * @param {GameObject} mo - The game object whose image was flipped back.
     * @returns {void}
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}