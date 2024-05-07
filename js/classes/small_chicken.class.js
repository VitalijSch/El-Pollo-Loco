class SmallChicken extends Movable {
    smallChickenWalkCache = [
        '../assets/images/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../assets/images/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../assets/images/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];


    constructor(x, id) {
        super();
        this.loadImage('../assets/images/3_enemies_chicken/chicken_small/2_dead/dead.png');
        this.loadImage('../assets/images/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.smallChickenWalkCache);
        this.width = 45;
        this.height = 45;
        this.x = x + Math.random() * 250;
        this.y = 365;
        this.speedX = 0.10 + Math.random() * 0.25;
        this.id = id;
        this.enemyMove(this.smallChickenWalkCache);
    }
}