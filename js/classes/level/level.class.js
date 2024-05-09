class Level {
    smallChicken;
    chicken;
    bigChicken;
    background;
    cloud;
    coin;
    bottle;
    levelEndX = 2700;


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