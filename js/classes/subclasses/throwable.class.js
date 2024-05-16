class Throwable extends Movable {
    bottleRotationCache = [
        './assets/images/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './assets/images/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './assets/images/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './assets/images/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    bottleSplashCache = [
        './assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './assets/images/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
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


    /**
     * Initiates a throw action by setting the object's vertical speed and applying gravity.
     * @returns {void}
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
    }


    /**
     * Initiates the animation for a throw action, alternating between bottle splash and rotation animations.
     * @returns {void}
     */
    throwAnimation() {
        setInterval(() => {
            if (this.isBottleSplash) {
                this.playAnimation(this.bottleSplashCache);
                setTimeout(() => {
                    this.isBottleSplash = false;
                }, 200);
            } else {
                this.playAnimation(this.bottleRotationCache);
            }
        }, 100);
    }
}
