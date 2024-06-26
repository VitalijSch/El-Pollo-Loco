class SmallChicken extends Movable {
    smallChickenWalkCache = [
        './assets/images/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './assets/images/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './assets/images/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    smallChickenDeadCache = [
        './assets/images/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];


    constructor(x, id) {
        super();
        this.loadImage(this.smallChickenWalkCache[0]);
        this.loadImages(this.smallChickenWalkCache);
        this.loadImages(this.smallChickenDeadCache);
        this.width = 45;
        this.height = 45;
        this.x = x + Math.random() * 250;
        this.y = 365;
        this.speedX = 0.10 + Math.random() * 0.25;
        this.id = id;
        this.enemyMove();
        this.enemyAnimation(this.smallChickenDeadCache, this.smallChickenWalkCache);
    }
}