class Cloud extends Movable {
    constructor(imagePath) {
        super();
        this.loadImage(imagePath);
        this.width = 400;
        this.height = 400;
        this.x = Math.random() * 500;
        this.y = 0;
        this.moveLeft();
    }
}