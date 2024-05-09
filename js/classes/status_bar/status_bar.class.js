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
        if (bar === 100) {
            return 5;
        }
        if (bar === 90 || bar === 80 || bar === 70) {
            return 4;
        }
        if (bar === 60 || bar >= 50) {
            return 3;
        }
        if (bar === 40 || bar >= 30) {
            return 2;
        }
        if (bar === 20 || bar >= 10) {
            return 1;
        }
        if (bar === 0) {
            return 0;
        }
    }
}