class StatusHealth extends StatusBar {
    statusHealthCache = [
        './assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        './assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        './assets/images/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        './assets/images/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './assets/images/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './assets/images/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];
    health = 100;


    constructor() {
        super();
        this.loadImage(this.statusHealthCache[0]);
        this.loadImages(this.statusHealthCache);
        this.x = 0;
        this.y = 0;
        this.setStatus(this.health, this.statusHealthCache);
    }
}