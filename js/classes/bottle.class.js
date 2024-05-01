class Bottle extends Drawable {
    bottlesCache = [
        '../assets/images/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../assets/images/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];
    bottlesImg;
    width = 50;
    height = 50;
    x = 0;
    y = 370;
    bottle = 0;
    deleted = false;


    constructor(x) {
        super();
        this.loadImages(this.bottlesCache);
        this.x = x + Math.random() * 500;
        this.setBottles(this.bottle);
    }


    setBottles(bottle) {
        this.bottle = bottle;
        this.path = this.bottlesCache[this.resolvePercentage(bottle)];
        this.bottlesImg = this.imageCache[this.path];
    }


    resolvePercentage(item) {
        if (item === 100) {
            return 5;
        }
        if (item === 80) {
            return 4;
        }
        if (item === 60) {
            return 3;
        }
        if (item === 40) {
            return 2;
        }
        if (item === 20) {
            return 1;
        }
        if (item === 0) {
            return 0;
        }
    }



    draw(ctx) {
        if (!this.deleted) {
            ctx.drawImage(this.bottlesImg, this.x, this.y, this.width, this.height);
        }
    }


    deleteBottle() {
        this.deleted = true;
    }
}