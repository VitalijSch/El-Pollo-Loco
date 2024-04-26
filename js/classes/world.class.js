class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud('../assets/images/5_background/layers/4_clouds/1.png'),
        new Cloud('../assets/images/5_background/layers/4_clouds/2.png'),
    ];
    backgroundObjects = [
        new BackgroundObjects('../assets/images/5_background/layers/air.png'),
        new BackgroundObjects('../assets/images/5_background/layers/3_third_layer/1.png'),
        new BackgroundObjects('../assets/images/5_background/layers/2_second_layer/1.png'),
        new BackgroundObjects('../assets/images/5_background/layers/1_first_layer/1.png'),
    ];
    ctx;
    canvas;


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        requestAnimationFrame(() => this.draw());
    }


    addObjectsToMap(object) {
        object.forEach(obj => {
            this.addToMap(obj);
        })
    }


    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}