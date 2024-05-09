class World {
    character = new Character();
    drawable = new Drawable();
    statusHealth = new StatusHealth();
    statusCoin = new StatusCoin();
    statusBottle = new StatusBottle();
    statusBigChicken = new StatusBigChicken();
    level = level1;
    cameraX = -100;
    throwable = [];
    bottleThrowSound = new Audio('../assets/audio/bottle_throw.mp3');
    bottleSplashSound = new Audio('../assets/audio/bottle_splash.mp3');
    collectCoinSound = new Audio('../assets/audio/collect_coin.mp3');
    collectBottleSound = new Audio('../assets/audio/collect_bottle.mp3');
    chickenSound = new Audio('../assets/audio/chicken.mp3');
    ctx;
    canvas;
    keyboard;
    isThrowing = false;


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
        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.cloud);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
        this.ctx.translate(-this.cameraX, 0);
        this.addToMap(this.statusHealth);
        this.addToMap(this.statusCoin);
        this.addToMap(this.statusBottle);
        this.addToMap(this.statusBigChicken);
        this.ctx.translate(this.cameraX, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwable);
        this.addObjectsToMap(this.level.smallChicken);
        this.addObjectsToMap(this.level.chicken);
        this.addObjectsToMap(this.level.bigChicken);
        this.ctx.translate(-this.cameraX, 0);
        requestAnimationFrame(() => this.draw());
    }


    run() {
        setInterval(() => {
            this.checkCharacterEnemyCollisionsAndUpdateHealth(this.level.smallChicken);
            this.checkCharacterEnemyCollisionsAndUpdateHealth(this.level.chicken);
            this.checkCharacterEnemyCollisionsAndUpdateHealth(this.level.bigChicken);
        }, 1000)
        setInterval(() => {
            this.handleBottleThrowing(this.level.smallChicken);
            this.handleBottleThrowing(this.level.chicken);
            this.handleBottleThrowing(this.level.bigChicken);
            this.handleCollectibleItemsCollision(this.level.coin);
            this.handleCollectibleItemsCollision(this.level.bottle);
            this.checkCollisionsJump(this.level.smallChicken);
            this.checkCollisionsJump(this.level.chicken);
            this.checkCollisionsJump(this.level.bigChicken);
        }, 100)
        setInterval(() => {
            this.handleThrowableCollisionsWithEnemies(this.level.smallChicken);
            this.handleThrowableCollisionsWithEnemies(this.level.chicken);
            this.handleThrowableCollisionsWithEnemies(this.level.bigChicken);
        }, 700);
    }


    checkCharacterEnemyCollisionsAndUpdateHealth(enemyArray) {
        enemyArray.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusHealth.setStatus(this.character.energy, this.statusHealth.statusHealthCache);
            }
        });
    }


    handleThrowableCollisionsWithEnemies(enemyArray) {
        this.throwable.forEach(throwable => {
            enemyArray.forEach(enemy => {
                if (throwable.isColliding(enemy)) {
                    if (enemy instanceof BigChicken) {
                        enemy.isBigChickenHit = true;
                        enemy.energy -= 20;
                        enemy.hit();
                        this.statusBigChicken.setStatus(enemy.energy, this.statusBigChicken.statusBigChickenCache);
                        enemy.bigChickenHurtAnimation();
                        if (enemy.energy === 0) {
                            enemy.bigChickenDeadAnimation();
                        }
                    } else {
                        let index = enemyArray.findIndex(findEnemy => findEnemy.id === enemy.id);
                        console.log(index)
                        if (index !== -1) {
                            enemyArray.splice(index, 1);
                        }
                    }
                } else {
                    enemy.isBigChickenHit = false;
                }
            })
        })
    }


    checkCollisionsJump(enemyArray) {
        enemyArray.forEach(enemy => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                this.character.speedY = 20;
                this.validateEnemy(enemy, enemyArray);
            }
        });
    }


    validateEnemy(enemy, enemyArray) {
        let path;
        if (enemy instanceof SmallChicken) {
            this.chickenSound.play();
            enemy.loadImage('../assets/images/3_enemies_chicken/chicken_small/2_dead/dead.png');
            enemy.isDead = true;
        } else if (enemy instanceof Chicken) {
            this.chickenSound.play();
            enemy.loadImage('../assets/images/3_enemies_chicken/chicken_normal/2_dead/dead.png');
            enemy.isDead = true;
        } else {
            return;
        }
        setTimeout(() => {
            let index = enemyArray.findIndex(findEnemy => findEnemy.id === enemy.id);
            if (index !== -1) {
                enemyArray.splice(index, 1);
            }
        }, 150);
    }


    handleCollectibleItemsCollision(itemArray) {
        itemArray.forEach((item, index) => {
            if (this.character.isColliding(item)) {
                if (item instanceof Coin) {
                    this.collectionCoin(index, itemArray);
                } else {
                    this.collectionBottle(index, itemArray);
                }
            }
        })
    }


    collectionCoin(index, itemArray) {
        this.collectCoinSound.play();
        this.statusCoin.coin += 10;
        this.statusCoin.setStatus(this.statusCoin.coin, this.statusCoin.statusCoinCache);
        itemArray.splice(index, 1);
    }


    collectionBottle(index, itemArray) {
        this.collectBottleSound.play();
        this.statusBottle.bottle += 10;
        this.statusBottle.setStatus(this.statusBottle.bottle, this.statusBottle.statusBottleCache);
        itemArray.splice(index, 1);
    }


    handleBottleThrowing(enemyArray) {
        if (this.keyboard.d && !this.isThrowing) {
            if (this.statusBottle.bottle > 0) {
                this.statusBottle.bottle -= 10;
                this.statusBottle.setStatus(this.statusBottle.bottle, this.statusBottle.statusBottleCache);
                let bottle = new Throwable(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
                this.throwable.push(bottle);
                setInterval(() => {
                    if (bottle.isAboveGround() && !bottle.hitEnemy) {
                        if (bottle.otherDirection) {
                            bottle.x -= 6;
                        } else {
                            bottle.x += 6;
                        }
                    }
                    enemyArray.forEach(enemy => {
                        if (bottle.isColliding(enemy)) {
                            bottle.hitEnemy = true;
                            bottle.x = enemy.x - 100;
                            bottle.y = enemy.y - 100;
                            this.validateEnemy(enemy, enemyArray);
                        }
                    });
                }, 1000 / 40);
                this.isThrowing = true;
                setTimeout(() => {
                    this.isThrowing = false;
                }, 1000);
                setTimeout(() => {
                    this.throwable.splice(0, 1);
                }, 2000);
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