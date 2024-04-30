class Collector extends Drawable {
    coinsCache = [
        '../assets/images/8_coin/coin_1.png',
        '../assets/images/8_coin/coin_2.png',
    ];
    bottlesCache = [
        '../assets/images/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../assets/images/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];
    width = 50;
    height = 50;
    coin = 0;
    coinsImg;
    coinsY = 250;
    bottle = 0;
    bottlesImg;
    bottlesY = 370;


    constructor(x, y) {
        super();
        this.loadImages(this.coinsCache);
        this.loadImages(this.bottlesCache);
        this.y = y;
        this.x = x + Math.random() * 500;
        this.setCoins(this.coin);
        this.setBottles(this.bottle);
    }


    setCoins(coin) {
        this.coin = coin;
        this.path = this.coinsCache[this.resolvePercentage(coin)];
        this.coinsImg = this.imageCache[this.path];
    }


    setBottles(bottle) {
        this.bottle = bottle;
        this.path = this.bottlesCache[this.resolvePercentage(bottle)];
        this.bottlesImg = this.imageCache[this.path];
    }


    resolvePercentage(array) {
        if (array === 100) {
            return 5;
        }
        if (array === 80) {
            return 4;
        }
        if (array === 60) {
            return 3;
        }
        if (array === 40) {
            return 2;
        }
        if (array === 20) {
            return 1;
        }
        if (array === 0) {
            return 0;
        }
    }


    draw(ctx) {
        ctx.drawImage(this.coinsImg, this.x, this.y + this.coinsY, this.width, this.height);
        ctx.drawImage(this.bottlesImg, this.x, this.y + this.bottlesY, this.width, this.height);
    }
}