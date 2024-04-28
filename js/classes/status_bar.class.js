class StatusBar extends Drawable {
    statusHealthCache = [
        '../assets/images/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        '../assets/images/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        '../assets/images/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        '../assets/images/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        '../assets/images/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        '../assets/images/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ]
    percentage = 100;


    constructor() {
        super();
        this.loadImages(this.statusHealthCache);
        this.x = 0;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentage(this.percentage);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        this.path = this.statusHealthCache[this.resolvePercentage()];
        this.img = this.imageCache[this.path];
    }


    resolvePercentage() {
        if (this.percentage === 100) {
            return 5;
        }
        if (this.percentage === 80) {
            return 4;
        }
        if (this.percentage === 60) {
            return 3;
        }
        if (this.percentage === 40) {
            return 2;
        }
        if (this.percentage === 20) {
            return 1;
        }
        if (this.percentage === 0) {
            return 0;
        }
    }
}