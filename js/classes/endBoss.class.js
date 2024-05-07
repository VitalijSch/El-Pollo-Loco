class EndBoss extends Movable {
    endBossAnimation = [
        '../assets/images/4_enemie_boss_chicken/2_alert/G5.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G6.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G7.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G8.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G9.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G10.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G11.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    endBossMove = [
        '../assets/images/4_enemie_boss_chicken/1_walk/G1.png',
        '../assets/images/4_enemie_boss_chicken/1_walk/G2.png',
        '../assets/images/4_enemie_boss_chicken/1_walk/G3.png',
        '../assets/images/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    endBossHurt = [
        '../assets/images/4_enemie_boss_chicken/4_hurt/G21.png',
        '../assets/images/4_enemie_boss_chicken/4_hurt/G22.png',
        '../assets/images/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    endBossDead = [
        '../assets/images/4_enemie_boss_chicken/5_dead/G24.png',
        '../assets/images/4_enemie_boss_chicken/5_dead/G25.png',
        '../assets/images/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    isHit = false;


    constructor() {
        super();
        this.loadImage('../assets/images/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImage('../assets/images/4_enemie_boss_chicken/4_hurt/G21.png');
        this.loadImage('../assets/images/4_enemie_boss_chicken/5_dead/G24.png');
        this.loadImage('../assets/images/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.endBossAnimation);
        this.loadImages(this.endBossMove);
        this.loadImages(this.endBossHurt);
        this.loadImages(this.endBossDead);
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


    animationEndBoss() {
        setInterval(() => {
            this.playAnimation(this.endBossAnimation);
        }, 150);
    }

    endBossHurtAnimation() {
        setInterval(() => {
            this.playAnimation(this.endBossHurt);
        }, 150);
    }


    endBossDeadAnimation() {
        setInterval(() => {
            this.playAnimation(this.endBossDead);
        }, 200);
    }
}