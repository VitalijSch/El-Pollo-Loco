class Character extends MovableObject {
    characterWalkCache = [
        '../assets/images/2_character_pepe/2_walk/W-21.png',
        '../assets/images/2_character_pepe/2_walk/W-22.png',
        '../assets/images/2_character_pepe/2_walk/W-23.png',
        '../assets/images/2_character_pepe/2_walk/W-24.png',
        '../assets/images/2_character_pepe/2_walk/W-25.png',
        '../assets/images/2_character_pepe/2_walk/W-26.png',
    ];
    characterJumpCache = [
        '../assets/images/2_character_pepe/3_jump/J-31.png',
        '../assets/images/2_character_pepe/3_jump/J-32.png',
        '../assets/images/2_character_pepe/3_jump/J-33.png',
        '../assets/images/2_character_pepe/3_jump/J-34.png',
        '../assets/images/2_character_pepe/3_jump/J-35.png',
        '../assets/images/2_character_pepe/3_jump/J-36.png',
        '../assets/images/2_character_pepe/3_jump/J-37.png',
        '../assets/images/2_character_pepe/3_jump/J-38.png',
        '../assets/images/2_character_pepe/3_jump/J-39.png',
    ]
    moveSound = new Audio('../assets/audio/character_move.mp3');
    x = 80;
    y = 0;
    width = 150;
    height = 350;
    world;
    speed = 2;


    constructor() {
        super().loadImage('../assets/images/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.characterWalkCache);
        this.loadImages(this.characterJumpCache);
        this.animateCharacterWalk();
        this.applyGravity();
    }


    animateCharacterWalk() {
        setInterval(() => {
            this.moveSound.pause();
            if (this.world.keyboard.right && this.x < this.world.level.levelEndX) {
                this.moveRight();
                this.otherDirection = false;
                this.moveSound.play();
            }
            if (this.world.keyboard.left && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.moveSound.play();
            }
            if (this.world.keyboard.up && !this.isAboveGround()) {
                this.jump();
            }
            this.world.cameraX = -this.x + 100;
        }, 1000 / 60);
        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.characterJumpCache);
            } else {
                if (this.world.keyboard.right || this.world.keyboard.left) {
                    this.x += this.speed;
                    this.playAnimation(this.characterWalkCache);
                }
            }
        }, 50);
    }
}