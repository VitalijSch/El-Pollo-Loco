class Level {
    levelEndX = 2700;
    smallChicken;
    chicken;
    bigChicken;
    background;
    cloud;
    coin;
    bottle;


    constructor(background, cloud, smallChicken, chicken, bigChicken, coin, bottle) {
        this.smallChicken = smallChicken;
        this.chicken = chicken;
        this.bigChicken = bigChicken;
        this.background = background;
        this.cloud = cloud;
        this.coin = coin;
        this.bottle = bottle;
    }
}