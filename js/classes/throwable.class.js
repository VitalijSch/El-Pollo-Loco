class Throwable extends Movable {
    throwableCache = [
        '../assets/images/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../assets/images/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../assets/images/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../assets/images/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];


    constructor(x, y, otherDirection) {
        super();
        this.loadImage('../assets/images/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.throwableCache);
        this.width = 50;
        this.height = 60;
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.throw();
        this.throwAnimation();
    }


    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            if (this.otherDirection) {
                this.x -= 6;
            } else {
                this.x += 6;
            }
        }, 25);
    }


    throwAnimation() {
        setInterval(() => {
            this.playAnimation(this.throwableCache);
        }, 1000 / 30);
    }
}