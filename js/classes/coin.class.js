class Coin extends Movable {
    coinsCache = [
        '../assets/images/8_coin/coin_1.png',
        '../assets/images/8_coin/coin_2.png',
    ];


    constructor(x, y, img) {
        super();
        this.loadImages(this.coinsCache);
        this.width = 100;
        this.height = 100;
        this.x = x + Math.random() * 500;
        this.y = y;
        this.offset.top = 25;
        this.offset.left = 25;
        this.offset.right = 25;
        this.offset.bottom = 25;
        this.img = this.imageCache[img];
    }
}