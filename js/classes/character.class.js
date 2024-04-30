class Character extends Movable {
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
    ];
    characterHurtCache = [
        '../assets/images/2_character_pepe/4_hurt/H-41.png',
        '../assets/images/2_character_pepe/4_hurt/H-42.png',
        '../assets/images/2_character_pepe/4_hurt/H-43.png',
    ];
    characterDeadCache = [
        '../assets/images/2_character_pepe/5_dead/D-51.png',
        '../assets/images/2_character_pepe/5_dead/D-52.png',
        '../assets/images/2_character_pepe/5_dead/D-53.png',
        '../assets/images/2_character_pepe/5_dead/D-54.png',
        '../assets/images/2_character_pepe/5_dead/D-55.png',
        '../assets/images/2_character_pepe/5_dead/D-56.png',
        '../assets/images/2_character_pepe/5_dead/D-57.png',
    ];
    charactertoStandUnderTenSecondsCache = [
        '../assets/images/2_character_pepe/1_idle/idle/I-1.png',
        '../assets/images/2_character_pepe/1_idle/idle/I-2.png',
        '../assets/images/2_character_pepe/1_idle/idle/I-3.png',
        '../assets/images/2_character_pepe/1_idle/idle/I-4.png',
        '../assets/images/2_character_pepe/1_idle/idle/I-5.png',
        '../assets/images/2_character_pepe/1_idle/idle/I-6.png',
        '../assets/images/2_character_pepe/1_idle/idle/I-7.png',
        '../assets/images/2_character_pepe/1_idle/idle/I-8.png',
        '../assets/images/2_character_pepe/1_idle/idle/I-9.png',
        '../assets/images/2_character_pepe/1_idle/idle/I-10.png',
    ];
    charactertoStandOverTenSecondsCache = [
        '../assets/images/2_character_pepe/1_idle/long_idle/I-11.png',
        '../assets/images/2_character_pepe/1_idle/long_idle/I-12.png',
        '../assets/images/2_character_pepe/1_idle/long_idle/I-13.png',
        '../assets/images/2_character_pepe/1_idle/long_idle/I-14.png',
        '../assets/images/2_character_pepe/1_idle/long_idle/I-15.png',
        '../assets/images/2_character_pepe/1_idle/long_idle/I-16.png',
        '../assets/images/2_character_pepe/1_idle/long_idle/I-17.png',
        '../assets/images/2_character_pepe/1_idle/long_idle/I-18.png',
        '../assets/images/2_character_pepe/1_idle/long_idle/I-19.png',
        '../assets/images/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    moveSound = new Audio('../assets/audio/move.mp3');
    jumpSound = new Audio('../assets/audio/jump.mp3');
    hurtSound = new Audio('../assets/audio/hurt.mp3');
    deadSound = new Audio('../assets/audio/dead.mp3');
    bottleSound = new Audio('../assets/audio/bottle.mp3');
    snoringSound = new Audio('../assets/audio/snoring.mp3');
    x = 80;
    y = 0;
    width = 150;
    height = 350;
    world;
    speed = 2;
    toStandTime;


    constructor() {
        super();
        this.loadImage('../assets/images/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.characterWalkCache);
        this.loadImages(this.characterJumpCache);
        this.loadImages(this.characterHurtCache);
        this.loadImages(this.characterDeadCache);
        this.loadImages(this.charactertoStandUnderTenSecondsCache);
        this.loadImages(this.charactertoStandOverTenSecondsCache);
        this.animateCharacter();
        this.applyGravity();
    }



    animateCharacter() {
        setInterval(() => {
            this.moveSound.pause();
            if (this.world.keyboard.right && this.x < this.world.level.levelEndX) {
                this.moveRight();
                this.otherDirection = false;
                this.moveSound.play();
                this.toStandTime = new Date().getTime();
            }
            if (this.world.keyboard.left && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.moveSound.play();
                this.toStandTime = new Date().getTime();
            }
            if (this.world.keyboard.space && !this.isAboveGround()) {
                this.jump();
                this.jumpSound.play();
                this.toStandTime = new Date().getTime();
            }
            if (this.world.keyboard.d) {
                this.bottleSound.play();
                this.world.checkThrowCollisions();
                this.toStandTime = new Date().getTime();
            }
            this.world.cameraX = -this.x + 100;
        }, 1000 / 80);
        setInterval(() => {
            this.loadImage('../assets/images/2_character_pepe/1_idle/idle/I-1.png');
            this.toStandAnimation();
        }, 100)
        if (this.y === 0) {
            this.toStandTime = new Date().getTime();
        } else {
            this.toStandTime = 0;
        }
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.characterDeadCache);
                this.deadSound.play();
            } else if (this.isHurt()) {
                this.playAnimation(this.characterHurtCache);
                this.hurtSound.play();
            } else if (this.isAboveGround()) {
                this.playAnimation(this.characterJumpCache);
            } else if (this.world.keyboard.right || this.world.keyboard.left) {
                this.x += this.speed;
                this.playAnimation(this.characterWalkCache);
            }
        }, 50);
    }


    toStandAnimation() {
        let currentTime = new Date().getTime();
        let timepassed = currentTime - this.toStandTime;
        if (timepassed >= 15000) {
            this.playAnimation(this.charactertoStandOverTenSecondsCache);
            // this.snoringSound.play();
        }
        if (timepassed < 15000 && timepassed > 9999) {
            this.playAnimation(this.charactertoStandUnderTenSecondsCache);
        }
    }
}