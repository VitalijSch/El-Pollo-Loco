class Chicken extends Movable {
    chickenWalkCache = [
        '../assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../assets/images/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../assets/images/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    width = 60;
    height = 60;
    x = 0;
    y = 350;


    constructor(x) {
        super();
        this.loadImage('../assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImage('../assets/images/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        this.loadImages(this.chickenWalkCache);
        this.x = x + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animateChickenWalk();
    }


    animateChickenWalk() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            this.playAnimation(this.chickenWalkCache);
        }, 200);
    }
}