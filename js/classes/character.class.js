class Character extends MovableObject {
    x = 80;
    y = 90;
    width = 150;
    height = 350;
    characterWalkCache = [
        '../assets/images/2_character_pepe/2_walk/W-21.png',
        '../assets/images/2_character_pepe/2_walk/W-22.png',
        '../assets/images/2_character_pepe/2_walk/W-23.png',
        '../assets/images/2_character_pepe/2_walk/W-24.png',
        '../assets/images/2_character_pepe/2_walk/W-25.png',
        '../assets/images/2_character_pepe/2_walk/W-26.png',
    ];
    world;
    speed = 2;


    constructor() {
        super().loadImage('../assets/images/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.characterWalkCache);
        this.animateCharacterWalk();
    }


    animateCharacterWalk() {
        setInterval(() => {
            if (this.world.keyboard.right) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            if (this.world.keyboard.left) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.cameraX = -this.x;
        }, 1000 / 60);
        setInterval(() => {
            if (this.world.keyboard.right || this.world.keyboard.left) {
                this.x += this.speed;
                let i = this.currentImage % this.characterWalkCache.length;
                this.path = this.characterWalkCache[i];
                this.img = this.imageCache[this.path];
                this.currentImage++;
            }
        }, 100);
    }


    jump() {

    }
}