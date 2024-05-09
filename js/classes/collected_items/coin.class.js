class Coin extends Movable {
    constructor(x, y, img) {
        super();
        this.loadImage(img);
        this.width = 100;
        this.height = 100;
        this.x = x + Math.random() * 500;
        this.y = y;
        this.offset.top = 25;
        this.offset.left = 25;
        this.offset.right = 25;
        this.offset.bottom = 25;
    }
}