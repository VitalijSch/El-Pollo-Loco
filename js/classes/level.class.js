class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectItems;
    levelEndX = 2200;


    constructor(enemies, clouds, backgroundObjects, collectItems) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectItems = collectItems;
    }
}