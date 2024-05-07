let level1 = levelOne();


function levelOne() {
    return new Level(
        [
            new Chicken(200, 0),
            new SmallChicken(300, 1),
            new Chicken(600, 2),
            new Chicken(800, 3),
            new SmallChicken(1000, 4),
            new SmallChicken(1450, 5),
            new Chicken(1600, 6),
            new EndBoss()
        ],
        [
            new Cloud('../assets/images/5_background/layers/4_clouds/1.png', -720),
            new Cloud('../assets/images/5_background/layers/4_clouds/1.png', 0),
            new Cloud('../assets/images/5_background/layers/4_clouds/1.png', 720),
            new Cloud('../assets/images/5_background/layers/4_clouds/1.png', 1440),
            new Cloud('../assets/images/5_background/layers/4_clouds/1.png', 2160),
        ],
        [
            new Background('../assets/images/5_background/layers/air.png', -719),
            new Background('../assets/images/5_background/layers/3_third_layer/2.png', -719),
            new Background('../assets/images/5_background/layers/2_second_layer/2.png', -719),
            new Background('../assets/images/5_background/layers/1_first_layer/2.png', -719),
            new Background('../assets/images/5_background/layers/air.png', 0),
            new Background('../assets/images/5_background/layers/3_third_layer/1.png', 0),
            new Background('../assets/images/5_background/layers/2_second_layer/1.png', 0),
            new Background('../assets/images/5_background/layers/1_first_layer/1.png', 0),
            new Background('../assets/images/5_background/layers/air.png', 719),
            new Background('../assets/images/5_background/layers/3_third_layer/2.png', 719),
            new Background('../assets/images/5_background/layers/2_second_layer/2.png', 719),
            new Background('../assets/images/5_background/layers/1_first_layer/2.png', 719),
            new Background('../assets/images/5_background/layers/air.png', 719 * 2),
            new Background('../assets/images/5_background/layers/3_third_layer/1.png', 719 * 2),
            new Background('../assets/images/5_background/layers/2_second_layer/1.png', 719 * 2),
            new Background('../assets/images/5_background/layers/1_first_layer/1.png', 719 * 2),
            new Background('../assets/images/5_background/layers/air.png', 719 * 3),
            new Background('../assets/images/5_background/layers/3_third_layer/2.png', 719 * 3),
            new Background('../assets/images/5_background/layers/2_second_layer/2.png', 719 * 3),
            new Background('../assets/images/5_background/layers/1_first_layer/2.png', 719 * 3),
        ],
        [
            new Bottle(200, '../assets/images/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new Coin(350, 100, '../assets/images/8_coin/coin_1.png'),
            new Bottle(600, '../assets/images/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
            new Coin(800, 250, '../assets/images/8_coin/coin_2.png'),
            new Bottle(1100, '../assets/images/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new Coin(1450, 300, '../assets/images/8_coin/coin_1.png'),
            new Bottle(1500, '../assets/images/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
            new Coin(1700, 250, '../assets/images/8_coin/coin_2.png'),
            new Bottle(1700, '../assets/images/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new Coin(2000, 100, '../assets/images/8_coin/coin_1.png'),
            new Bottle(50, '../assets/images/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new Coin(250, 100, '../assets/images/8_coin/coin_1.png'),
            new Bottle(400, '../assets/images/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
            new Coin(700, 250, '../assets/images/8_coin/coin_2.png'),
            new Bottle(900, '../assets/images/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new Coin(1350, 300, '../assets/images/8_coin/coin_1.png'),
            new Bottle(1200, '../assets/images/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
            new Coin(1600, 250, '../assets/images/8_coin/coin_2.png'),
            new Bottle(1350, '../assets/images/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new Coin(1900, 100, '../assets/images/8_coin/coin_1.png'),
        ]
    );
}