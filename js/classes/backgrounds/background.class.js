class Background extends Drawable {
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.width = 720;
        this.height = 480;
        this.x = x;
        this.y = 0;
    }
}