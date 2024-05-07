class StatusBar extends Movable {
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
    statusEndBossCache = [
        '../assets/images/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        '../assets/images/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        '../assets/images/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        '../assets/images/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        '../assets/images/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        '../assets/images/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ]
    healthImg;
    coinsImg;
    bottlesImg;
    endBossImg;
    health = 100;
    healthY = 0;
    coins = 0;
    coinsY = 50;
    bottles = 0;
    bottlesY = 100;
    endBoss = 100;
    endBossX = 500;
    endBossY = 0;


    constructor() {
        super();
        this.loadImages(this.statusHealthCache);
        this.loadImages(this.statusCoinsCache);
        this.loadImages(this.statusBottlesCache);
        this.loadImages(this.statusEndBossCache);
        this.width = 200;
        this.height = 50;
        this.x = 0;
        this.y = 0;
        this.setHealth(this.health);
        this.setCoins(this.coins);
        this.setBottles(this.bottles);
        this.setEndBoss(this.endBoss);
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


    setEndBoss(endBoss) {
        this.endBoss = endBoss;
        this.path = this.statusEndBossCache[this.resolvePercentage(endBoss)];
        this.endBossImg = this.imageCache[this.path];
    }


    resolvePercentage(item) {
        if (item === 100) {
            return 5;
        }
        if (item === 90 ||item === 80 || item === 70) {
            return 4;
        }
        if (item === 60 || item === 50) {
            return 3;
        }
        if (item === 40 || item === 30) {
            return 2;
        }
        if (item === 20 || item === 10) {
            return 1;
        }
        if (item === 0) {
            return 0;
        }
    }


    draw(ctx) {
        ctx.drawImage(this.healthImg, this.x, this.y + this.healthY, this.width, this.height);
        ctx.drawImage(this.coinsImg, this.x, this.y + this.coinsY, this.width, this.height);
        ctx.drawImage(this.bottlesImg, this.x, this.y + this.bottlesY, this.width, this.height);
        ctx.drawImage(this.endBossImg, this.x + this.endBossX, this.y + this.endBossY, this.width, this.height);
    }
}