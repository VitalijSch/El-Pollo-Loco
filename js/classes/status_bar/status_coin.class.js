class StatusCoin extends StatusBar {
    statusCoinCache = [
        '../assets/images/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        '../assets/images/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        '../assets/images/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        '../assets/images/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        '../assets/images/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        '../assets/images/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ];
    coin = 0;


    constructor() {
        super();
        this.loadImage(this.statusCoinCache[0]);
        this.loadImages(this.statusCoinCache);
        this.x = 0;
        this.y = 50;
        this.setStatus(this.coin, this.statusCoinCache);
    }
}