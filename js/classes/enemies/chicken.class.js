class Chicken extends Movable {
    chickenWalkCache = [
        '../assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../assets/images/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../assets/images/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    chickenDeadCache = [
        '../assets/images/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    constructor(x, id) {
        super();
        this.loadImage(this.chickenWalkCache[0]);
        this.loadImages(this.chickenWalkCache);
        this.loadImages(this.chickenDeadCache);
        this.width = 55;
        this.height = 55;
        this.x = x + Math.random() * 500;
        this.y = 360;
        this.speedX = 0.25 + Math.random() * 0.5;
        this.id = id;
        this.enemyMove();
        this.enemyAnimation(this.chickenDeadCache, this.chickenWalkCache);
    }
}