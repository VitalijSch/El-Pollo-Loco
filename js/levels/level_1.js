const level1 = new Level(
    [
        new Chicken(200),
        new SmallChicken(300),
        new Chicken(600),
        new Chicken(800),
        new SmallChicken(1000),
        new SmallChicken(1450),
        new Chicken(1600),
        new EndBoss()
    ],
    [
        new Cloud('../assets/images/5_background/layers/4_clouds/1.png'),
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
        new Collector(200, 50),
        new Collector(600, 100),
        new Collector(1100, 150),
        new Collector(1500, 200),
        new Collector(1700, 150),
    ]
);