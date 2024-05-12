class World extends Movable {
    character = new Character();
    statusHealth = new StatusHealth();
    statusCoin = new StatusCoin();
    statusBottle = new StatusBottle();
    statusBigChicken = new StatusBigChicken();
    level = level1;
    enemiesArray = [
        this.level.smallChicken,
        this.level.chicken,
        this.level.bigChicken,
    ];
    itemsArray = [
        this.level.coin,
        this.level.bottle,
    ];
    cameraX = -100;
    throwable = [];
    ctx;
    canvas;
    keyboard;
    isThrowing = false;
    animationFrameId;


    constructor(canvas, keyboard) {
        super();
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
    }


    setWorld() {
        this.character.world = this;
        this.level.bigChicken.world = this;
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
        this.addObjectsToMap(this.level.smallChicken);
        this.addObjectsToMap(this.level.chicken);
        this.addObjectsToMap(this.level.bigChicken);
        this.addObjectsToMap(this.throwable);
        this.ctx.translate(-this.cameraX, 0);
        this.animationFrameId = requestAnimationFrame(() => this.draw());
    }


    pauseAnimation() {
        cancelAnimationFrame(this.animationFrameId);
    }

    resumeAnimation() {
        this.animationFrameId = requestAnimationFrame(() => this.draw());
    }


    run() {
        setInterval(() => {
            this.checkCharacterEnemyCollisionsAndUpdateHealth();
        }, 800)
        setInterval(() => {
            this.handleCollectibleItemsCollision();
            this.checkCollisionsJump();
            this.handleBottleThrowing();
        }, 1)
        setInterval(() => {
            this.handleThrowableCollisionsWithEnemies();
            this.characterSeeBigChicken();
        }, 100)
    }


    characterSeeBigChicken() {
        this.level.bigChicken.forEach(chicken => {
            if (this.character.x >= 2000 && !chicken.hadFirstContact) {
                chicken.speedX = 0;
                chicken.bigChickenAlertAnimation();
                setTimeout(() => {
                    chicken.hadFirstContact = true;
                }, 1500);
            }
            if (this.character.isColliding(chicken) && this.character.y >= 170 && chicken.hadFirstContact) {
                chicken.speedX = 0;
                chicken.bigChickenAttackkAnimation();
            } else if (chicken.hitEnemy) {
                chicken.speedX = 0;
                chicken.bigChickenHurtAnimation();
                setTimeout(() => {
                    chicken.hitEnemy = false;
                }, 500)
            } else if (this.statusBigChicken.health === 0 && !chicken.hitEnemy) {
                chicken.speedX = 0;
                chicken.bigChickenDeadAnimation();
                this.sounds.winSound.play();
                setTimeout(() => {
                    backToHome();
                }, 3000);
            } else if (chicken.hadFirstContact) {
                if (this.character.x > chicken.x) {
                    chicken.otherDirection = true;
                    chicken.moveRight();
                } else {
                    chicken.otherDirection = false;
                    chicken.moveLeft();
                }
                chicken.speedX = 10;
                chicken.bigChickenWalkAnimation();
            }
            if (isPausedGame) {
                chicken.speedX = 0;
            } else {
                chicken.speedX = 10;
            }
        })
    }


    checkCharacterEnemyCollisionsAndUpdateHealth() {
        this.enemiesArray.forEach(enemyArray => {
            enemyArray.forEach(enemy => {
                if (this.character.isColliding(enemy) && this.character.y >= 170) {
                    this.character.hit();
                    this.statusHealth.setStatus(this.character.energy, this.statusHealth.statusHealthCache);
                }
                if (isPausedGame) {
                    enemy.speedX = 0;
                } else {
                    enemy.speedX = 0.2;
                }
            });
        });
    }


    checkCollisionsJump() {
        this.enemiesArray.forEach(enemyArray => {
            enemyArray.forEach(enemy => {
                if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.moveDown()) {
                    this.character.y = 150;
                    this.character.speedY = 20;
                    this.validateEnemy(enemy, enemyArray);
                }
            })
        })
    }


    validateEnemy(enemy, enemyArray) {
        if (enemy instanceof BigChicken) {
            return;
        } else {
            if (!soundMuted) {
                this.sounds.chickenSound.play();
            }
            enemy.isEnemyDead = true;
            enemy.speedX = 0;
            if (enemy instanceof SmallChicken) {
                enemy.playAnimation(enemy.smallChickenDeadCache);
            }
            if (enemy instanceof Chicken) {
                enemy.playAnimation(enemy.chickenDeadCache);
            }
            setTimeout(() => {
                let index = enemyArray.findIndex(findEnemy => findEnemy.id === enemy.id);
                if (index !== -1) {
                    enemyArray.splice(index, 1);
                }
            },
                500);
        }
    }


    handleCollectibleItemsCollision() {
        this.itemsArray.forEach(itemArray => {
            itemArray.forEach((item, index) => {
                if (this.character.isColliding(item)) {
                    if (item instanceof Coin) {
                        this.collectionCoin(index, itemArray);
                    } else {
                        this.collectionBottle(index, itemArray);
                    }
                }
            })
        })
    }


    collectionCoin(index, itemArray) {
        if (!soundMuted) {
            this.sounds.collectCoinSound.play();
        }
        this.statusCoin.coin += 10;
        this.statusCoin.setStatus(this.statusCoin.coin, this.statusCoin.statusCoinCache);
        itemArray.splice(index, 1);
    }


    collectionBottle(index, itemArray) {
        if (!soundMuted) {
            this.sounds.collectBottleSound.play();
        }
        this.statusBottle.bottle += 10;
        this.statusBottle.setStatus(this.statusBottle.bottle, this.statusBottle.statusBottleCache);
        itemArray.splice(index, 1);
    }


    handleBottleThrowing() {
        if (this.keyboard.d && !this.isThrowing) {
            if (this.statusBottle.bottle > 0) {
                this.statusBottle.bottle -= 10;
                this.statusBottle.setStatus(this.statusBottle.bottle, this.statusBottle.statusBottleCache);
                let offsetBottle = this.character.otherDirection ? -100 : 100;
                let bottle = new Throwable(this.character.x + offsetBottle, this.character.y, this.character.otherDirection);
                this.throwable.push(bottle);
                let bottleInterval = setInterval(() => {
                    if (bottle.isAboveGround() && !bottle.hitEnemy) {
                        if (bottle.otherDirection) {
                            bottle.x -= 6;
                        } else {
                            bottle.x += 6;
                        }
                    }
                    this.enemiesArray.forEach(enemyArray => {
                        enemyArray.forEach(enemy => {
                            if (this.statusBigChicken.health !== 0) {
                                if (bottle.isColliding(enemy)) {
                                    bottle.hitEnemy = true;
                                    bottle.isBottleSplah = true;
                                    enemy.hitEnemy = true;
                                    this.validateEnemy(enemy, enemyArray);
                                }
                                if (bottle.hitEnemy || !bottle.isAboveGround()) {
                                    bottle.speedY = 0;
                                    bottle.accelaration = 0;
                                    clearInterval(bottleInterval);
                                }
                            }
                        })
                    });
                }, 1000 / 40);
                this.isThrowing = true;
                setTimeout(() => {
                    this.isThrowing = false;
                }, 500);
                setTimeout(() => {
                    this.throwable.splice(0, 1);
                }, 1300);
            }
        }
    }


    handleThrowableCollisionsWithEnemies() {
        this.throwable.forEach(throwingBottle => {
            this.enemiesArray.forEach(enemyArray => {
                enemyArray.forEach(enemy => {
                    if (throwingBottle.isColliding(enemy)) {
                        if (throwingBottle.hitEnemy) {
                            if (enemy instanceof BigChicken) {
                                this.statusBigChicken.health -= 20;
                                this.statusBigChicken.setStatus(this.statusBigChicken.health, this.statusBigChicken.statusBigChickenCache);
                            } else {
                                let index = enemyArray.findIndex(findEnemy => findEnemy.id === enemy.id);
                                if (index !== -1) {
                                    enemyArray.splice(index, 1);
                                }
                            }
                            throwingBottle.hitEnemy = false;
                        }
                    }
                })
            })
        })
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
        // mo.drawFrameWithOffset(this.ctx);
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