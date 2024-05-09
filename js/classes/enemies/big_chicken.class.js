class BigChicken extends Movable {
    bigChickenAlertCache = [
        '../assets/images/4_enemie_boss_chicken/2_alert/G5.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G6.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G7.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G8.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G9.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G10.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G11.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    bigChickenWalkCache = [
        '../assets/images/4_enemie_boss_chicken/1_walk/G1.png',
        '../assets/images/4_enemie_boss_chicken/1_walk/G2.png',
        '../assets/images/4_enemie_boss_chicken/1_walk/G3.png',
        '../assets/images/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    bigChickenHurtCache = [
        '../assets/images/4_enemie_boss_chicken/4_hurt/G21.png',
        '../assets/images/4_enemie_boss_chicken/4_hurt/G22.png',
        '../assets/images/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    bigChickenDeadCache = [
        '../assets/images/4_enemie_boss_chicken/5_dead/G24.png',
        '../assets/images/4_enemie_boss_chicken/5_dead/G25.png',
        '../assets/images/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    bigChickenSound = new Audio('../assets/audio/big_chicken.mp3');
    isBigChickenHit = false;


    constructor() {
        super();
        this.loadImage(this.bigChickenAlertCache[0]);
        this.loadImages(this.bigChickenAlertCache);
        this.loadImages(this.bigChickenWalkCache);
        this.loadImages(this.bigChickenHurtCache);
        this.loadImages(this.bigChickenDeadCache);
        this.width = 250;
        this.height = 350;
        this.x = 2500;
        this.y = 90;
        this.speedX = 0.30 + Math.random() * 0.7;
        this.offset.top = 25;
        this.offset.left = 25;
        this.offset.right = 25;
        this.offset.bottom = 25;
    }


    bigChickenAlertAnimation() {
        setInterval(() => {
            this.bigChickenSound.play();
            this.playAnimation(this.bigChickenAlertCache);
        }, 150);
    }

    bigChickenHurtAnimation() {
        setInterval(() => {
            this.bigChickenSound.play();
            this.playAnimation(this.bigChickenHurtCache);
        }, 150);
    }


    bigChickenDeadAnimation() {
        setInterval(() => {
            this.playAnimation(this.bigChickenDeadCache);
        }, 150);
    }
}