class Character extends MovableObject {
    x = 80;
    y = 80;
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
    walkSound = new Audio('../assets/audio/character_walk.mp3');


    constructor() {
        super().loadImage('../assets/images/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.characterWalkCache);
        this.animateCharacterWalk();
    }


    animateCharacterWalk() {
        setInterval(() => {
            this.walkSound.pause();
            if (this.world.keyboard.right && this.x < this.world.level.levelEndX) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walkSound.play();
            }
            if (this.world.keyboard.left && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walkSound.play();
            }
            this.world.cameraX = -this.x + 100;
        }, 1000 / 60);
        setInterval(() => {
            if (this.world.keyboard.right || this.world.keyboard.left) {
                this.x += this.speed;
                this.playAnimation(this.characterWalkCache);
            }
        }, 50);
    }


    jump() {

    }
}