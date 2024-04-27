class Chicken extends MovableObject {
    width = 80;
    height = 80;
    y = 350;
    chickenWalkCache = [
        '../assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../assets/images/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../assets/images/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];


    constructor() {
        super().loadImage('../assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.loadImages(this.chickenWalkCache);
        this.animateChickenWalk();
    }


    animateChickenWalk() {
        this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.chickenWalkCache);
        }, 200);
    }
}