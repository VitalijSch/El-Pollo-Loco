class StatusBar extends Movable {
    constructor() {
        super();
        this.width = 200;
        this.height = 50;
    }


    setStatus(bar, statusCache) {
        this.path = statusCache[this.resolvePercentage(bar)];
        this.img = this.imageCache[this.path];
    }


    resolvePercentage(bar) {
        if (bar === 0) {
            return 0;
        }
        if (bar >= 1 && bar <= 20) {
            return 1;
        }
        if (bar >= 30 && bar <= 40) {
            return 2;
        }
        if (bar >= 50 && bar <= 60) {
            return 3;
        }
        if (bar >= 70 && bar <= 90) {
            return 4;
        }
        if (bar === 100) {
            return 5;
        }
    }
}