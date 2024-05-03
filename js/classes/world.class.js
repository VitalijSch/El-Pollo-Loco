class World {
    character = new Character();
    statusBar = new StatusBar();
    level = level1;
    cameraX = -100;
    ctx;
    canvas;
    keyboard;
    throwable = [];




    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.collectItems);
        this.ctx.translate(-this.cameraX, 0);
        this.addToMap(this.statusBar);
        this.ctx.translate(this.cameraX, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwable);
        this.ctx.translate(-this.cameraX, 0);
        requestAnimationFrame(() => this.draw());
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 1000)
        setInterval(() => {
            this.checkThrowCollisions();
            this.checkCollections();
        }, 100)
    }


    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setHealth(this.character.energy);
            }
        })
    }


    // checkCollisionsJump() {
    //     this.level.enemies.forEach(enemy => {
    //         if (this.character.isCollidingAbove(enemy)) {
    //             console.log('Hit enemy');
    //             enemy.path = '../assets/images/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    //             enemy.img = new Image();
    //             enemy.img.src = enemy.path;
    //         }
    //     })
    // }


    checkCollections() {
        this.level.collectItems.forEach(item => {
            if (this.character.isColliding(item)) {
                if (item.path === '../assets/images/8_coin/coin_1.png') {
                    this.collectionCoin(item);
                } else {
                    this.collectionBottle(item);
                }
            }
        })
    }


    collectionCoin(item) {
        this.statusBar.coins += 20;
        this.statusBar.setCoins(this.statusBar.coins);
        item.deleteCoin();
        this.ctx.clearRect(item.x, item.y, item.width, item.height);
        this.statusBar.draw(this.ctx);
    }


    collectionBottle(item) {
        this.statusBar.bottle += 20;
        this.statusBar.setBottles(this.statusBar.bottle);
        item.deleteBottle();
        this.ctx.clearRect(item.x, item.y, item.width, item.height);
        this.statusBar.draw(this.ctx);
    }


    checkThrowCollisions() {
        if (this.keyboard.d) {
            if (this.statusBar.bottle > 0) {
                let bottle = new Throwable(this.character.x + 100, this.character.y + 100);
                this.throwable.push(bottle);
                this.statusBar.bottle -= 20;
                this.statusBar.setBottles(this.statusBar.bottle);
            }
        }
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
        mo.drawFrame(this.ctx);
        mo.draw(this.ctx);
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