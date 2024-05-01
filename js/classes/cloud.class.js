class Cloud extends Movable {
    width = 400;
    height = 400;
    x = 0;
    y = 0;


    constructor(imagePath) {
        super();
        this.loadImage(imagePath);
        this.x = Math.random() * 500;
        this.moveLeft();
    }
}