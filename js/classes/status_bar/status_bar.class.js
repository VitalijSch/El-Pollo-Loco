class StatusBar extends Movable {
    constructor() {
        super();
        this.width = 200;
        this.height = 50;
    }


    /**
     * Sets the status of a bar based on its percentage value.
     * @param {number} bar - The percentage value of the bar.
     * @param {object} statusCache - An object containing status information.
     * @returns {void}
     */
    setStatus(bar, statusCache) {
        this.path = statusCache[this.resolvePercentage(bar)];
        this.img = this.imageCache[this.path];
    }


    /**
     * Resolves the percentage value of a bar to determine its status.
     * @param {number} bar - The percentage value of the bar.
     * @returns {number} The index representing the status of the bar.
     */
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