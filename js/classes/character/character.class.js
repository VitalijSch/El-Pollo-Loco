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
    actionInterval;
    animationInterval;
    hurtInterval;


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
        this.characterAnimation();
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


    characterAnimation() {
        this.checkAndUpdateIdleStartTime();
        this.actionInterval = setInterval(() => {
            this.handleCharacterMoves();
        }, 1000 / 60);
        this.animationInterval = setInterval(() => {
            this.updateStandAnimationBasedOnIdleTime();
            this.handleCharacterAnimation();
        }, 100)
        this.hurtInterval = setInterval(() => {
            this.characterIsHurt();
        }, 380)
    }


    checkAndUpdateIdleStartTime() {
        if (this.y === 170) {
            this.idleStartTime = new Date().getTime();
        }
    }


    handleCharacterMoves() {
        this.sounds.moveSound.pause();
        this.sounds.moveSound.currentTime = 0;
        this.characterMoveRight();
        this.characterMoveLeft();
        this.characterJump();
        this.characterThrow();
        this.handleCamera();
    }


    characterMoveRight() {
        if (this.world.keyboard.right && this.x < this.world.level.levelEndX) {
            if (!soundMuted) {
                this.sounds.moveSound.play();
                setTimeout(() => {
                    this.sounds.moveSound.pause();
                    this.sounds.moveSound.currentTime = 0;
                }, 500);
            }
            this.moveRight();
            this.otherDirection = false;
            this.idleStartTime = new Date().getTime();
        }
    }


    characterMoveLeft() {
        if (this.world.keyboard.left && this.x > 0) {
            if (!soundMuted) {
                this.sounds.moveSound.play();
                setTimeout(() => {
                    this.sounds.moveSound.pause();
                    this.sounds.moveSound.currentTime = 0;
                }, 500);
            }
            this.moveLeft();
            this.otherDirection = true;
            this.idleStartTime = new Date().getTime();
        }
    }


    characterJump() {
        if (this.world.keyboard.space && !this.isAboveGround()) {
            if (!soundMuted) {
                this.sounds.jumpSound.play();
                setTimeout(() => {
                    this.sounds.jumpSound.pause();
                    this.sounds.jumpSound.currentTime = 0;
                }, 500);
            }
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


    updateStandAnimationBasedOnIdleTime() {
        this.loadImage('../assets/images/2_character_pepe/1_idle/idle/I-1.png');
        let currentTime = new Date().getTime();
        let timepassed = currentTime - this.idleStartTime;
        this.characterSnoring(timepassed);
        this.characterIdle(timepassed);
    }


    characterSnoring(timepassed) {
        if (timepassed >= 15000) {
            if (!soundMuted) {
                this.sounds.longIdleSound.play();
                setTimeout(() => {
                    this.sounds.longIdleSound.pause();
                    this.sounds.longIdleSound.currentTime = 0;
                }, 2000);
            }
            this.playAnimation(this.characterLongIdleCache);
        }
    }


    characterIdle(timepassed) {
        if (timepassed < 15000 && timepassed > 9999) {
            this.playAnimation(this.characterIdleCache);
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
        }
    }


    characterIsDead() {
        if (!soundMuted) {
            this.sounds.deadSound.play();
            setTimeout(() => {
                this.sounds.deadSound.pause();
                this.sounds.deadSound.currentTime = 0;
            }, 1000);
        }
        this.playAnimation(this.characterDeadCache);
        setTimeout(() => {
            openEndGameScreen('gameOver');
        }, 1000);
        this.pauseCharacterInterval();
    }


    pauseCharacterInterval() {
        clearInterval(this.actionInterval);
        clearInterval(this.animationInterval);
        clearInterval(this.hurtInterval);
    }


    characterIsHurt() {
        if (this.isHurt()) {
            if (!soundMuted) {
                this.sounds.hurtSound.play();
                setTimeout(() => {
                    this.sounds.hurtSound.pause();
                    this.sounds.hurtSound.currentTime = 0;
                }, 500);
            }
        }
    }
}