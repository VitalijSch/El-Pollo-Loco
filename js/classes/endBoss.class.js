class EndBoss extends Movable {
    endBossWalk = [
        '../assets/images/4_enemie_boss_chicken/2_alert/G5.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G6.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G7.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G8.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G9.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G10.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G11.png',
        '../assets/images/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    width = 250;
    height = 400;
    y = 50;


    constructor() {
        super();
        this.loadImage(this.endBossWalk[0]);
        this.loadImages(this.endBossWalk);
        this.x = 2500;
        this.animateEndBossWalk();
    }


    animateEndBossWalk() {
        setInterval(() => {
            this.playAnimation(this.endBossWalk);
        }, 200);
    }
}