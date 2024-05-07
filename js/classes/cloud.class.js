class Cloud extends Movable {
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.width = 400;
        this.height = 400;
        this.x = x + Math.random() * 500;
        this.y = 0;
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 30);
    }
}