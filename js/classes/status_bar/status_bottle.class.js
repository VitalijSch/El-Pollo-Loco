class StatusBottle extends StatusBar {
    statusBottleCache = [
        '../assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        '../assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        '../assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        '../assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        '../assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        '../assets/images/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];
    bottle = 0;


    constructor() {
        super();
        this.loadImage(this.statusBottleCache[0]);
        this.loadImages(this.statusBottleCache);
        this.x = 0;
        this.y = 100;
        this.setStatus(this.bottle, this.statusBottleCache);
    }
}