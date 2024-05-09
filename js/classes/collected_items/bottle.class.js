class Bottle extends Movable {
    constructor(x, img) {
        super();
        this.loadImage(img);
        this.width = 50;
        this.height = 50;
        this.x = x + Math.random() * 500;
        this.y = 370;
    }
}