class Background extends Drawable {
    width = 720;
    height = 480;
    x = 0;
    y = 0;


    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.x = x;
    }
}