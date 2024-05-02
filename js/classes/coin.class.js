class Coin extends Drawable {
    coinsCache = [
        '../assets/images/8_coin/coin_1.png',
        '../assets/images/8_coin/coin_2.png',
    ];
    coinsImg;
    width = 100;
    height = 100;
    x = 0;
    y = 0;
    coin = 0;
    deleted = false;
    offset = {
        top: 25,
        left: 25,
        right: 25,
        bottom: 25
    }


    constructor(x, y) {
        super();
        this.loadImages(this.coinsCache);
        this.y = y;
        this.x = x + Math.random() * 500;
        this.setCoins(this.coin);
    }

    setCoins(coin) {
        this.coin = coin;
        this.path = this.coinsCache[this.resolvePercentage(coin)];
        this.coinsImg = this.imageCache[this.path];
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
            ctx.drawImage(this.coinsImg, this.x, this.y, this.width, this.height);
        }
    }


    deleteCoin() {
        this.deleted = true;
    }
}