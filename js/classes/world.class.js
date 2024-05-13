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
    throwable = [];
    cameraX = -100;
    isThrowing = false;
    ctx;
    canvas;
    keyboard;
    animationFrameId;
    winInterval;


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
        this.renderBackgroundAndObjects();
        this.renderStatusBar();
        this.renderCharacterAndObjects();
        this.animationFrameId = requestAnimationFrame(() => this.draw());
    }


    renderBackgroundAndObjects() {
        this.ctx.translate(this.cameraX, 0);
        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.cloud);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
        this.ctx.translate(-this.cameraX, 0);
    }


    renderStatusBar() {
        this.addToMap(this.statusHealth);
        this.addToMap(this.statusCoin);
        this.addToMap(this.statusBottle);
        this.addToMap(this.statusBigChicken);
    }


    renderCharacterAndObjects() {
        this.ctx.translate(this.cameraX, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.smallChicken);
        this.addObjectsToMap(this.level.chicken);
        this.addObjectsToMap(this.level.bigChicken);
        this.addObjectsToMap(this.throwable);
        this.ctx.translate(-this.cameraX, 0);
    }


    run() {
        setInterval(() => {
            this.checkCharacterEnemyCollisionsAndUpdateHealth();
        }, 800)
        setInterval(() => {
            this.checkCollisionsJump();
            this.handleCollectibleItemsCollision();
            this.handleBottleThrowing();
        }, 1)
        this.winInterval = setInterval(() => {
            this.handleThrowableCollisionsWithEnemies();
            this.characterSeeBigChicken();
        }, 100)
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
            enemy.speedX = 0;
            enemy.isEnemyDead = true;
            this.removeEnemyFromArray(enemyArray, enemy);
        }
    }


    removeEnemyFromArray(enemyArray, enemy) {
        setTimeout(() => {
            let index = enemyArray.findIndex(findEnemy => findEnemy.id === enemy.id);
            if (index !== -1) {
                enemyArray.splice(index, 1);
            }
        }, 300);
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
            setTimeout(() => {
                this.sounds.collectCoinSound.pause();
                this.sounds.collectCoinSound.currentTime = 0;
            }, 500);
        }
        this.statusCoin.coin += 10;
        this.statusCoin.setStatus(this.statusCoin.coin, this.statusCoin.statusCoinCache);
        itemArray.splice(index, 1);
    }


    collectionBottle(index, itemArray) {
        if (!soundMuted) {
            this.sounds.collectBottleSound.play();
            setTimeout(() => {
                this.sounds.collectBottleSound.pause();
                this.sounds.collectBottleSound.currentTime = 0;
            }, 500);
        }
        this.statusBottle.bottle += 10;
        this.statusBottle.setStatus(this.statusBottle.bottle, this.statusBottle.statusBottleCache);
        itemArray.splice(index, 1);
    }


    handleBottleThrowing() {
        if (this.keyboard.d && !this.isThrowing) {
            if (this.statusBottle.bottle > 0) {
                this.handleBottleThrowingProcess();
            }
        }
    }


    handleBottleThrowingProcess() {
        this.statusBottle.bottle -= 10;
        this.statusBottle.setStatus(this.statusBottle.bottle, this.statusBottle.statusBottleCache);
        let offsetBottle = this.character.otherDirection ? -100 : 100;
        let bottle = new Throwable(this.character.x + offsetBottle, this.character.y, this.character.otherDirection);
        this.throwable.push(bottle);
        this.handleBottleInterval(bottle);
        this.handleThrowing();
    }


    handleBottleInterval(bottle) {
        let bottleInterval = setInterval(() => {
            this.adjustBottlePosition(bottle);
            this.enemiesArray.forEach(enemyArray => {
                enemyArray.forEach(enemy => {
                    if (this.statusBigChicken.health !== 0) {
                        this.handleBottleCollision(bottle, enemyArray, enemy, bottleInterval);
                    }
                })
            });
        }, 1000 / 40);
    }


    adjustBottlePosition(bottle) {
        if (bottle.isAboveGround() && !bottle.hitEnemy) {
            if (bottle.otherDirection) {
                bottle.x -= 6;
            } else {
                bottle.x += 6;
            }
        }
    }


    handleBottleCollision(bottle, enemyArray, enemy, bottleInterval) {
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


    handleThrowing() {
        this.isThrowing = true;
        setTimeout(() => {
            this.isThrowing = false;
        }, 500);
        setTimeout(() => {
            this.throwable.splice(0, 1);
        }, 1300);
    }


    handleThrowableCollisionsWithEnemies() {
        this.throwable.forEach(throwingBottle => {
            this.enemiesArray.forEach(enemyArray => {
                enemyArray.forEach(enemy => {
                    if (throwingBottle.isColliding(enemy)) {
                        this.handleBottleEnemyCollision(throwingBottle, enemyArray, enemy);
                    }
                })
            })
        })
    }


    handleBottleEnemyCollision(throwingBottle, enemyArray, enemy) {
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


    characterSeeBigChicken() {
        this.level.bigChicken.forEach(chicken => {
            this.triggerBigChickenAlert(chicken);
            if (this.character.isColliding(chicken) && this.character.y >= 170 && chicken.hadFirstContact) {
                this.triggerBigChickenAttackAnimation(chicken);
            } else if (chicken.hitEnemy) {
                this.triggerBigChickenHurtAnimation(chicken);
            } else if (this.statusBigChicken.health === 0 && !chicken.hitEnemy) {
                this.triggerBigChickenDeadAnimation(chicken);
            } else if (chicken.hadFirstContact) {
                this.triggerBigChickenWalkAnimation(chicken);
            }
            this.adjustBigChickenSpeed(chicken);
        })
    }


    triggerBigChickenAlert(chicken) {
        if (this.character.x >= 2000 && !chicken.hadFirstContact) {
            chicken.speedX = 0;
            chicken.bigChickenAlertAnimation();
            setTimeout(() => {
                chicken.hadFirstContact = true;
            }, 1500);
        }
    }


    triggerBigChickenAttackAnimation(chicken) {
        chicken.speedX = 0;
        chicken.bigChickenAttackkAnimation();
    }


    triggerBigChickenHurtAnimation(chicken) {
        chicken.speedX = 0;
        chicken.bigChickenHurtAnimation();
        setTimeout(() => {
            chicken.hitEnemy = false;
        }, 500)
    }


    triggerBigChickenDeadAnimation(chicken) {
        chicken.speedX = 0;
        chicken.bigChickenDeadAnimation();
        backgroundSound.pause();
        backgroundSound.currentTime = 0;
        this.sounds.winSound.play();
        setTimeout(() => {
            clearInterval(this.winInterval)
            this.sounds.mutedSounds();
            openEndGameScreen('youWin');
        }, 1000);
    }


    triggerBigChickenWalkAnimation(chicken) {
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


    adjustBigChickenSpeed(chicken) {
        if (isPausedGame) {
            chicken.speedX = 0;
        } else {
            chicken.speedX = 10;
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


    pauseAnimation() {
        cancelAnimationFrame(this.animationFrameId);
    }

    resumeAnimation() {
        this.animationFrameId = requestAnimationFrame(() => this.draw());
    }
}