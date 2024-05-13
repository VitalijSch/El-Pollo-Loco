class StatusBigChicken extends StatusBar {
    statusBigChickenCache = [
        '../assets/images/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        '../assets/images/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        '../assets/images/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        '../assets/images/7_statusbars/2_statusbar_endboss/green/green60.png',
        '../assets/images/7_statusbars/2_statusbar_endboss/green/green80.png',
        '../assets/images/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ];
    health = 100;


    constructor() {
        super();
        this.loadImage(this.statusBigChickenCache[0]);
        this.loadImages(this.statusBigChickenCache);
        this.x = 500;
        this.y = 0;
        this.setStatus(this.health, this.statusBigChickenCache);
    }
}