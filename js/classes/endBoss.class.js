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
    ]


    constructor() {
        super();
        this.loadImage('../assets/images/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.endBossAnimation);
        this.loadImages(this.endBossMove);
        this.width = 250;
        this.height = 350;
        this.x = 2500;
        this.y = 90;
        this.speedX = 0.30 + Math.random() * 0.7;
        this.offset.top = 50;
        this.offset.left = 50;
        this.offset.right = 50;
        this.offset.bottom = 50;
    }
}