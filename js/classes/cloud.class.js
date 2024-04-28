class Cloud extends Movable {
    y = 0;
    width = 400;
    height = 400;


    constructor(imagePath) {
        super();
        this.loadImage(imagePath);
        this.x = Math.random() * 500;
        this.moveLeft();
    }
}