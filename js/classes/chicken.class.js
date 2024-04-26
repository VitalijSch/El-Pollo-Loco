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
        this.speed = 0.2 + Math.random() * 0.5;
        this.loadImages(this.chickenWalkCache);
        this.animateChickenWalk();
        this.moveLeft();
    }


    animateChickenWalk() {
        setInterval(() => {
            let i = this.currentImage % this.chickenWalkCache.length;
            this.path = this.chickenWalkCache[i];
            this.img = this.imageCache[this.path];
            this.currentImage++;
        }, 200);
    }
}