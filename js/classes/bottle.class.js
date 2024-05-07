class Bottle extends Movable {
    bottlesCache = [
        '../assets/images/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../assets/images/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];


    constructor(x, img) {
        super();
        this.loadImages(this.bottlesCache);
        this.width = 50;
        this.height = 50;
        this.x = x + Math.random() * 500;
        this.y = 370;
        this.img = this.imageCache[img];
    }
}