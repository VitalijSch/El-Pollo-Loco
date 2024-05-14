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
        '../assets/images/2_character_pepe/3_jump/J-33.png',
        '../assets/images/2_character_pepe/3_jump/J-34.png',
        '../assets/images/2_character_pepe/3_jump/J-35.png',
        '../assets/images/2_character_pepe/3_jump/J-36.png',
        '../assets/images/2_character_pepe/3_jump/J-37.png',
        '../assets/images/2_character_pepe/3_jump/J-38.png',
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
    characterIdleCache = [
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
    characterLongIdleCache = [
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
    idleStartTime;
    timepassed;


    constructor() {
        super();
        this.loadAllImages();
        this.width = 100;
        this.height = 250;
        this.x = 80;
        this.y = 170;
        this.speedX = 3;
        this.offset.top = 100;
        this.offset.left = 15;
        this.offset.right = 15;
        this.offset.bottom = 10;
        this.beginCharacterActionInterval();
        this.applyGravity();
    }


    loadAllImages() {
        this.loadImage('../assets/images/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.characterWalkCache);
        this.loadImages(this.characterJumpCache);
        this.loadImages(this.characterHurtCache);
        this.loadImages(this.characterDeadCache);
        this.loadImages(this.characterIdleCache);
        this.loadImages(this.characterLongIdleCache);
    }


    beginCharacterActionInterval() {
        this.checkAndUpdateIdleStartTime();
        setInterval(() => {
            this.handleCharacterMoves();
        }, 1000 / 60);
        setInterval(() => {
            this.updateStandAnimationBasedOnIdleTime();
            this.handleCharacterAnimation();
            this.handleCharacterDeadSound();
        }, 100)
        this.characterSounds();
    }


    checkAndUpdateIdleStartTime() {
        if (this.y === 170) {
            this.idleStartTime = new Date().getTime();
        }
    }


    updateStandAnimationBasedOnIdleTime() {
        this.loadImage('../assets/images/2_character_pepe/1_idle/idle/I-1.png');
        let currentTime = new Date().getTime();
        this.timepassed = currentTime - this.idleStartTime;
    }


    handleCharacterMoves() {
        this.characterMoveRight();
        this.characterMoveLeft();
        this.characterJump();
        this.characterThrow();
        this.handleCamera();
    }


    characterMoveRight() {
        if (this.world.keyboard.right && this.x < this.world.level.levelEndX) {
            this.moveRight();
            this.otherDirection = false;
            this.idleStartTime = new Date().getTime();
        }
    }


    characterMoveLeft() {
        if (this.world.keyboard.left && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.idleStartTime = new Date().getTime();
        }
    }


    characterJump() {
        if (this.world.keyboard.space && !this.isAboveGround()) {
            this.jump();
            this.idleStartTime = new Date().getTime();
        }
    }


    characterThrow() {
        if (this.world.keyboard.d) {
            this.idleStartTime = new Date().getTime();
        }
    }


    handleCamera() {
        if (this.x < 2200) {
            this.world.cameraX = -this.x + 100;
        } else {
            this.world.cameraX = -2200 + 100;
        }
    }


    handleCharacterAnimation() {
        if (this.isDead()) {
            this.characterIsDead();
        } else if (this.isHurt()) {
            this.playAnimation(this.characterHurtCache);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.characterJumpCache);
        } else if (this.world.keyboard.right || this.world.keyboard.left) {
            this.playAnimation(this.characterWalkCache);
        } else if (this.timepassed < 15000 && this.timepassed > 9999) {
            this.playAnimation(this.characterIdleCache);
        } else if (this.timepassed >= 15000) {
            this.playAnimation(this.characterLongIdleCache);
        }
    }


    characterIsDead() {
        this.playAnimation(this.characterDeadCache);
        setTimeout(() => {
            openEndGameScreen();
            this.clearAllIntervals();
        }, 500);
    }


    characterSounds() {
        setInterval(() => {
            this.handleCharacterHurtSound();
        }, 500);
        setInterval(() => {
            this.handleCharacterJumpSound();
        }, 900);
        setInterval(() => {
            this.handleCharacterMoveSounds();
        }, 300);
        setInterval(() => {
            this.handleCharacterSleepingSound();
        }, 2000);
    }


    handleCharacterMoveSounds() {
        if (this.world.keyboard.right || this.world.keyboard.left) {
            this.sounds.playSound(this.sounds.moveSound);
        }
    }


    handleCharacterJumpSound() {
        if (this.isAboveGround()) {
            this.sounds.playSound(this.sounds.jumpSound);
        }
    }


    handleCharacterSleepingSound() {
        if (this.timepassed >= 15000) {
            this.sounds.playSound(this.sounds.longIdleSound);
        }
    }


    handleCharacterHurtSound() {
        if (this.isHurt()) {
            this.sounds.playSound(this.sounds.hurtSound);
        }
    }


    handleCharacterDeadSound() {
        if (this.isDead()) {
            this.sounds.playSound(this.sounds.deadSound);
        }
    }
}