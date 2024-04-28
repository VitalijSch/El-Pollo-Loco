class Throwable extends Movable {
    constructor(x, y) {
        super();
        this.loadImage('../assets/images/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 60;
        this.throw(100, 150);
    }


    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}