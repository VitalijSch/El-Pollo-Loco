class World {
    character = new Character();
    movable = new Movable(this.character);
    drawable = new Drawable();
    statusBar = new StatusBar();
    level = level1;
    cameraX = -100;
    throwable = [];
    bottleThrowSound = new Audio('../assets/audio/bottle.mp3');
    coinSound = new Audio('../assets/audio/coin.mp3');
    bottleSound = new Audio('../assets/audio/collect_bottle.mp3');
    chickenSound = new Audio('../assets/audio/chicken.mp3');
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
            this.checkCollisionsJump();
        }, 100)
        setInterval(() => {
            this.checkCollisionThrow();
        }, 700);
    }


    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setHealth(this.character.energy);
            }
        })
    }


    checkCollisionThrow() {
        this.throwable.forEach(throwable => {
            this.level.enemies.forEach(enemy => {
                if (throwable.isColliding(enemy)) {
                    if (enemy instanceof EndBoss) {
                        enemy.isHit = true;
                        enemy.energy -= 10;
                        enemy.hit();
                        this.statusBar.setEndBoss(enemy.energy);
                        enemy.endBossHurtAnimation();
                        if (enemy.energy === 0) {
                            enemy.endBossDeadAnimation();
                        }
                    } else {
                        let index = this.level.enemies.findIndex(findEnemy => findEnemy.id === enemy.id);
                        if (index !== -1) {
                            this.level.enemies.splice(index, 1);
                        }
                    }
                } else {
                    enemy.isHit = false;
                }
            })
        })
    }


    checkCollisionsJump() {
        this.level.enemies.forEach(enemy => {
            if (this.character.speedY < 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelaration;
                if (this.character.isColliding(enemy)) {
                    this.chickenSound.play();
                    let path;
                    if (enemy instanceof SmallChicken) {
                        path = '../assets/images/3_enemies_chicken/chicken_small/2_dead/dead.png';
                    } else if (enemy instanceof Chicken) {
                        path = '../assets/images/3_enemies_chicken/chicken_normal/2_dead/dead.png';
                    } else {
                        return;
                    }
                    enemy.img = new Image();
                    enemy.img.src = path;
                    setTimeout(() => {
                        let index = this.level.enemies.findIndex(findEnemy => findEnemy.id === enemy.id);
                        if (index !== -1) {
                            this.level.enemies.splice(index, 1);
                        }
                    }, 150);
                }
            }
        });
    }



    checkCollections() {
        this.level.collectItems.forEach((item, index) => {
            if (this.character.isColliding(item)) {
                if (item.imageCache['../assets/images/8_coin/coin_1.png'] ||
                    item.imageCache['../assets/images/8_coin/coin_2.png']) {
                    this.collectionCoin(index);
                } else {
                    this.collectionBottle(index);
                }
            }
        })
    }


    collectionCoin(index) {
        this.coinSound.play();
        this.statusBar.coins += 10;
        this.statusBar.setCoins(this.statusBar.coins);
        this.statusBar.draw(this.ctx);
        this.level.collectItems.splice(index, 1);
    }


    collectionBottle(index) {
        this.bottleSound.play();
        this.statusBar.bottle += 10;
        this.statusBar.setBottles(this.statusBar.bottle);
        this.statusBar.draw(this.ctx);
        this.level.collectItems.splice(index, 1);
    }


    checkThrowCollisions() {
        if (this.keyboard.d) {
            if (this.statusBar.bottle > 0) {
                this.bottleThrowSound.play();
                this.statusBar.bottle -= 10;
                this.statusBar.setBottles(this.statusBar.bottle);
                let bottle = new Throwable(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
                this.throwable.push(bottle);
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
        // mo.drawFrame(this.ctx);
        mo.drawFrameWithOffset(this.ctx);
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