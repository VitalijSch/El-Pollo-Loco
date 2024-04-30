class SmallChicken extends Movable {
    smallChickenWalkCache = [
        '../assets/images/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../assets/images/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../assets/images/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    width = 60;
    height = 60;
    y = 350;


    constructor(x) {
        super();
        this.loadImage('../assets/images/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.smallChickenWalkCache);
        this.x = x + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animateSmallChickenWalk();
    }


    animateSmallChickenWalk() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            this.playAnimation(this.smallChickenWalkCache);
        }, 200);
    }
}