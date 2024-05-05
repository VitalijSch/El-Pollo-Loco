class World {
    throwable = [];
    character = new Character();
    movable = new Movable(this.character);
    drawable = new Drawable();
    statusBar = new StatusBar();
    level = level1;
    cameraX = -100;
    bottleThrowSound = new Audio('../assets/audio/bottle.mp3');
    coinSound = new Audio('../assets/audio/coin.mp3');
    bottleSound = new Audio('../assets/audio/collect_bottle.mp3');
    ctx;
    canvas;
    keyboard;


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
        this.addObjectsToMap(this.throwable);
        this.addObjectsToMap(this.level.enemies);
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
        this.checkCollisionsJump();
    }


    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setHealth(this.character.energy);
            }
        })
    }


    checkCollisionsJump() {
        this.level.enemies.forEach(enemy => {
            setInterval(() => {
                if (this.character.y < 170 || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.accelaration;
                    if (this.character.isColliding(enemy)) {
                        console.log(enemy)
                        enemy.path = '../assets/images/3_enemies_chicken/chicken_normal/2_dead/dead.png';
                        enemy.img = new Image();
                        enemy.img.src = enemy.path;
                        if (!this.drawable.deleted) {
                            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
                        }
                    }
                }
            }, 1000 / 30);
        });
    }



    checkCollections() {
        this.level.collectItems.forEach(item => {
            if (this.character.isColliding(item)) {
                if (item.imageCache['../assets/images/8_coin/coin_1.png'] ||
                    item.imageCache['../assets/images/8_coin/coin_2.png']) {
                    this.collectionCoin(item);
                } else {
                    this.collectionBottle(item);
                }
            }
        })
    }


    collectionCoin(item) {
        this.coinSound.play();
        this.statusBar.coins += 20;
        this.statusBar.setCoins(this.statusBar.coins);
        item.deleteItem();
        this.ctx.clearRect(item.x, item.y, item.width, item.height);
        this.statusBar.draw(this.ctx);
    }


    collectionBottle(item) {
        this.bottleSound.play();
        this.statusBar.bottle += 20;
        this.statusBar.setBottles(this.statusBar.bottle);
        item.deleteItem();
        this.ctx.clearRect(item.x, item.y, item.width, item.height);
        this.statusBar.draw(this.ctx);
    }


    checkThrowCollisions() {
        if (this.keyboard.d) {
            if (this.statusBar.bottle > 0) {
                this.bottleThrowSound.play();
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