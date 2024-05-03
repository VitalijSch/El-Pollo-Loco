class Chicken extends Movable {
    chickenWalkCache = [
        '../assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../assets/images/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../assets/images/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];


    constructor(x) {
        super();
        this.loadImage('../assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.chickenWalkCache);
        this.width = 55;
        this.height = 55;
        this.x = x + Math.random() * 500;
        this.y = 350;
        this.speedX = 0.15 + Math.random() * 0.5;
        this.enemyMove(this.chickenWalkCache);
    }
}