class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud('../assets/images/5_background/layers/4_clouds/1.png'),
    ];
    backgroundObjects = [
        new BackgroundObjects('../assets/images/5_background/layers/air.png', -719),
        new BackgroundObjects('../assets/images/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObjects('../assets/images/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObjects('../assets/images/5_background/layers/1_first_layer/2.png', -719),
        new BackgroundObjects('../assets/images/5_background/layers/air.png', 0),
        new BackgroundObjects('../assets/images/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObjects('../assets/images/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObjects('../assets/images/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObjects('../assets/images/5_background/layers/air.png', 719),
        new BackgroundObjects('../assets/images/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObjects('../assets/images/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObjects('../assets/images/5_background/layers/1_first_layer/2.png', 719),
        new BackgroundObjects('../assets/images/5_background/layers/air.png', 719*2),
        new BackgroundObjects('../assets/images/5_background/layers/3_third_layer/1.png', 719*2),
        new BackgroundObjects('../assets/images/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgroundObjects('../assets/images/5_background/layers/1_first_layer/1.png', 719*2),
        new BackgroundObjects('../assets/images/5_background/layers/air.png', 719*3),
        new BackgroundObjects('../assets/images/5_background/layers/3_third_layer/2.png', 719*3),
        new BackgroundObjects('../assets/images/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgroundObjects('../assets/images/5_background/layers/1_first_layer/2.png', 719*3),
    ];
    ctx;
    canvas;
    keyboard;
    cameraX = -100;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }


    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.ctx.translate(-this.cameraX, 0);
        requestAnimationFrame(() => this.draw());
    }


    addObjectsToMap(object) {
        object.forEach(obj => {
            this.addToMap(obj);
        })
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1; 
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}