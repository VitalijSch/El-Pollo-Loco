class Chicken extends MovableObject {
    width = 80;
    height = 80;
    y = 350;


    constructor() {
        super().loadImage('../assets/images/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500;
    }
}