class StatusBar extends Drawable {
    statusHealthCache = [
        '../assets/images/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        '../assets/images/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        '../assets/images/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        '../assets/images/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        '../assets/images/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        '../assets/images/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];
    statusCoinsCache = [
        '../assets/images/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        '../assets/images/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        '../assets/images/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        '../assets/images/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        '../assets/images/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        '../assets/images/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];
    statusBottlesCache = [
        '../assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        '../assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        '../assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        '../assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        '../assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        '../assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
    ];
    health = 100;
    healthImg;
    healthY = 0;
    coins = 0;
    coinsImg;
    coinsY = 50;
    bottles = 0;
    bottlesImg;
    bottlesY = 100;


    constructor() {
        super();
        this.loadImages(this.statusHealthCache);
        this.loadImages(this.statusCoinsCache);
        this.loadImages(this.statusBottlesCache);
        this.x = 0;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setHealth(this.health);
        this.setCoins(this.coins);
        this.setBottles(this.bottles);
    }


    setHealth(health) {
        this.health = health;
        this.path = this.statusHealthCache[this.resolvePercentage(health)];
        this.healthImg = this.imageCache[this.path];
    }


    setCoins(coin) {
        this.coin = coin;
        this.path = this.statusCoinsCache[this.resolvePercentage(coin)];
        this.coinsImg = this.imageCache[this.path];
    }


    setBottles(bottle) {
        this.bottle = bottle;
        this.path = this.statusBottlesCache[this.resolvePercentage(bottle)];
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
        ctx.drawImage(this.healthImg, this.x, this.y + this.healthY, this.width, this.height);
        ctx.drawImage(this.coinsImg, this.x, this.y + this.coinsY, this.width, this.height);
        ctx.drawImage(this.bottlesImg, this.x, this.y + this.bottlesY, this.width, this.height);
    }
}