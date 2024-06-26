class BigChicken extends Movable {
    bigChickenAlertCache = [
        './assets/images/4_enemie_boss_chicken/2_alert/G5.png',
        './assets/images/4_enemie_boss_chicken/2_alert/G6.png',
        './assets/images/4_enemie_boss_chicken/2_alert/G7.png',
        './assets/images/4_enemie_boss_chicken/2_alert/G8.png',
        './assets/images/4_enemie_boss_chicken/2_alert/G9.png',
        './assets/images/4_enemie_boss_chicken/2_alert/G10.png',
        './assets/images/4_enemie_boss_chicken/2_alert/G11.png',
        './assets/images/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    bigChickenWalkCache = [
        './assets/images/4_enemie_boss_chicken/1_walk/G1.png',
        './assets/images/4_enemie_boss_chicken/1_walk/G2.png',
        './assets/images/4_enemie_boss_chicken/1_walk/G3.png',
        './assets/images/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    bigChickenAttackCache = [
        './assets/images/4_enemie_boss_chicken/3_attack/G13.png',
        './assets/images/4_enemie_boss_chicken/3_attack/G14.png',
        './assets/images/4_enemie_boss_chicken/3_attack/G15.png',
        './assets/images/4_enemie_boss_chicken/3_attack/G16.png',
        './assets/images/4_enemie_boss_chicken/3_attack/G17.png',
        './assets/images/4_enemie_boss_chicken/3_attack/G18.png',
        './assets/images/4_enemie_boss_chicken/3_attack/G19.png',
        './assets/images/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    bigChickenHurtCache = [
        './assets/images/4_enemie_boss_chicken/4_hurt/G21.png',
        './assets/images/4_enemie_boss_chicken/4_hurt/G22.png',
        './assets/images/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    bigChickenDeadCache = [
        './assets/images/4_enemie_boss_chicken/5_dead/G24.png',
        './assets/images/4_enemie_boss_chicken/5_dead/G25.png',
        './assets/images/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    hadFirstContact = false;


    constructor() {
        super();
        this.loadImage(this.bigChickenAlertCache[0]);
        this.loadImages(this.bigChickenAlertCache);
        this.loadImages(this.bigChickenWalkCache);
        this.loadImages(this.bigChickenAttackCache);
        this.loadImages(this.bigChickenHurtCache);
        this.loadImages(this.bigChickenDeadCache);
        this.width = 250;
        this.height = 350;
        this.x = 2500;
        this.y = 90;
        this.speedX = 20;
        this.offset.top = 100;
        this.offset.left = 60;
        this.offset.right = 60;
        this.offset.bottom = 60;
    }


    /**
     * Initiates the animation for big chicken alert, accompanied by sound effects.
     * @returns {void}
     */
    bigChickenAlertAnimation() {
        this.sounds.playAudio(this.sounds.bigChickenSound);
        this.playAnimation(this.bigChickenAlertCache);
    }


    /**
     * Initiates the animation for big chicken walking.
     * @returns {void}
     */
    bigChickenWalkAnimation() {
        this.playAnimation(this.bigChickenWalkCache);
    }


    /**
     * Initiates the animation for big chicken attacking.
     * @returns {void}
     */
    bigChickenAttackkAnimation() {
        this.playAnimation(this.bigChickenAttackCache);
    }


    /**
     * Initiates the animation for big chicken being hurt, accompanied by sound effects.
     * @returns {void}
     */
    bigChickenHurtAnimation() {
        this.sounds.playAudio(this.sounds.bigChickenSound);
        this.playAnimation(this.bigChickenHurtCache);
    }


    /**
     * Initiates the animation for big chicken being dead.
     * @returns {void}
     */
    bigChickenDeadAnimation() {
        this.playAnimation(this.bigChickenDeadCache);
    }
}