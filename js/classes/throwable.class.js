class Throwable extends Movable {
    throwableCache = [
        '../assets/images/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../assets/images/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../assets/images/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../assets/images/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]


    constructor(x, y) {
        super();
        this.loadImages(this.throwableCache);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 60;
        this.throw();
    }


    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}