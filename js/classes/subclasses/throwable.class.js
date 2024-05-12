class Throwable extends Movable {
    bottleRotationCache = [
        '../assets/images/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../assets/images/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../assets/images/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../assets/images/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    bottleSplashCache = [
        '../assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];
    isBottleSplash;


    constructor(x, y, otherDirection) {
        super();
        this.loadImage(this.bottleRotationCache[0]);
        this.loadImages(this.bottleRotationCache);
        this.loadImages(this.bottleSplashCache);
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
    }


    throwAnimation() {
        setInterval(() => {
            if (this.isBottleSplah) {
                this.playAnimation(this.bottleSplashCache);
                this.isBottleSplash = false;
            } else {
                this.playAnimation(this.bottleRotationCache);
            }
        }, 100)
    }
}
