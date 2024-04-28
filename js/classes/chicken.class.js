class Chicken extends Movable {
    width = 60;
    height = 60;
    y = 350;
    chickenWalkCache = [
        '../assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../assets/images/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../assets/images/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];


    constructor() {
        super();
        this.loadImage('../assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.chickenWalkCache);
        this.x = 200 + Math.random() * 500;
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