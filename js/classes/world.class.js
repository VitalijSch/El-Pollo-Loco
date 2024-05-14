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


    /**
     * Sets the world for the character and big chicken objects.
     * @returns {void}
     */
    setWorld() {
        this.character.world = this;
        this.level.bigChicken.world = this;
    }


    /**
     * Draws the game elements onto the canvas.
     * @returns {void}
     */
    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.renderBackgroundAndObjects();
        this.renderStatusBar();
        this.renderCharacterAndObjects();
        this.animationFrameId = requestAnimationFrame(() => this.draw());
    }


    /**
     * Renders the background and various objects on the canvas.
     * @returns {void}
     */
    renderBackgroundAndObjects() {
        this.ctx.translate(this.cameraX, 0);
        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.cloud);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
        this.ctx.translate(-this.cameraX, 0);
    }


    /**
     * Renders the status bar on the canvas.
     * @returns {void}
     */
    renderStatusBar() {
        this.addToMap(this.statusHealth);
        this.addToMap(this.statusCoin);
        this.addToMap(this.statusBottle);
        this.addToMap(this.statusBigChicken);
    }


    /**
     * Renders the character and other game objects on the canvas.
     * @returns {void}
     */
    renderCharacterAndObjects() {
        this.ctx.translate(this.cameraX, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.smallChicken);
        this.addObjectsToMap(this.level.chicken);
        this.addObjectsToMap(this.level.bigChicken);
        this.addObjectsToMap(this.throwable);
        this.ctx.translate(-this.cameraX, 0);
    }


    /**
     * Runs the game loop by setting intervals for various game actions.
     * @returns {void}
     */
    run() {
        setInterval(() => {
            this.checkCharacterEnemyCollisionsAndUpdateHealth();
        }, 800);
        setInterval(() => {
            this.checkCollisionsJump();
            this.handleCollectibleItemsCollision();
            this.handleBottleThrowing();
        }, 1);
        this.winInterval = setInterval(() => {
            this.handleThrowableCollisionsWithEnemies();
            this.handleBigChickenInteractions();
        }, 100);
    }


    /**
     * Checks character-enemy collisions and updates health if necessary.
     * @returns {void}
     */
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


    /**
     * Checks collisions related to character jumping.
     * @returns {void}
     */
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


    /**
     * Validates the enemy object and performs actions based on its type.
     * @param {Enemy} enemy - The enemy object to validate.
     * @param {Enemy[]} enemyArray - The array containing enemy objects.
     * @returns {void}
     */
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


    /**
     * Removes an enemy object from its containing array.
     * @param {Enemy[]} enemyArray - The array containing enemy objects.
     * @param {Enemy} enemy - The enemy object to be removed.
     * @returns {void}
     */
    removeEnemyFromArray(enemyArray, enemy) {
        setTimeout(() => {
            let index = enemyArray.findIndex(findEnemy => findEnemy.id === enemy.id);
            if (index !== -1) {
                enemyArray.splice(index, 1);
            }
        }, 300);
    }


    /**
     * Handles collisions with collectible items.
     * @returns {void}
     */
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


    /**
     * Handles the collection of coins by the character.
     * @param {number} index - The index of the collected coin in the array.
     * @param {Coin[]} itemArray - The array containing coin objects.
     * @returns {void}
     */
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


    /**
     * Handles the collection of bottles by the character.
     * @param {number} index - The index of the collected bottle in the array.
     * @param {Bottle[]} itemArray - The array containing bottle objects.
     * @returns {void}
     */
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


    /**
     * Handles the throwing of bottles by the character.
     * @returns {void}
     */
    handleBottleThrowing() {
        if (this.keyboard.d && !this.isThrowing) {
            if (this.statusBottle.bottle > 0) {
                this.handleBottleThrowingProcess();
            }
        }
    }


    /**
     * Handles the process of throwing a bottle by the character.
     * @returns {void}
     */
    handleBottleThrowingProcess() {
        this.statusBottle.bottle -= 10;
        this.statusBottle.setStatus(this.statusBottle.bottle, this.statusBottle.statusBottleCache);
        let offsetBottle = this.character.otherDirection ? -100 : 100;
        let bottle = new Throwable(this.character.x + offsetBottle, this.character.y, this.character.otherDirection);
        this.throwable.push(bottle);
        this.handleBottleInterval(bottle);
        this.handleThrowing();
    }


    /**
     * Sets up an interval for handling bottle movement and collision detection.
     * @param {Throwable} bottle - The bottle object being thrown.
     * @returns {void}
     */
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
        }, 1000 / 30);
    }


    /**
     * Adjusts the position of the thrown bottle.
     * @param {Throwable} bottle - The bottle object being thrown.
     * @returns {void}
     */
    adjustBottlePosition(bottle) {
        if (bottle.isAboveGround() && !bottle.hitEnemy) {
            if (bottle.otherDirection) {
                bottle.x -= 6;
            } else {
                bottle.x += 6;
            }
        }
    }


    /**
     * Handles the collision between the thrown bottle and enemies.
     * @param {Throwable} bottle - The bottle object being thrown.
     * @param {Enemy[]} enemyArray - The array containing enemy objects.
     * @param {Enemy} enemy - The enemy object being collided with.
     * @param {number} bottleInterval - The interval ID for the bottle's movement.
     * @returns {void}
     */
    handleBottleCollision(bottle, enemyArray, enemy, bottleInterval) {
        if (bottle.isColliding(enemy)) {
            bottle.hitEnemy = true;
            bottle.isBottleSplash = true;
            enemy.hitEnemy = true;
            this.validateEnemy(enemy, enemyArray);
        }
        if (bottle.hitEnemy || !bottle.isAboveGround()) {
            bottle.speedY = 0;
            bottle.accelaration = 0;
            clearInterval(bottleInterval);
        }
    }


    /**
     * Initiates the bottle throwing action.
     * @returns {void}
     */
    handleThrowing() {
        this.isThrowing = true;
        setTimeout(() => {
            this.isThrowing = false;
        }, 500);
        setTimeout(() => {
            this.throwable.splice(0, 1);
        }, 1300);
    }


    /**
    * Handles collisions between thrown bottles and enemies.
    * @returns {void}
    */
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


    /**
     * Handles the collision between a thrown bottle and an enemy.
     * @param {Throwable} throwingBottle - The thrown bottle object.
     * @param {Enemy[]} enemyArray - The array containing enemy objects.
     * @param {Enemy} enemy - The enemy object being collided with.
     * @returns {void}
     */
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


    /**
     * Handles interactions between the character and big chickens.
     * Triggers appropriate animations based on the character's interaction with big chickens.
     * @returns {void}
     */
    handleBigChickenInteractions() {
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
        });
    }


    /**
     * Triggers an alert animation for the big chicken if the character is near and it's the first contact.
     * @param {BigChicken} chicken - The big chicken instance.
     * @returns {void}
     */
    triggerBigChickenAlert(chicken) {
        if (this.character.x >= 2000 && !chicken.hadFirstContact) {
            chicken.speedX = 0;
            chicken.bigChickenAlertAnimation();
            setTimeout(() => {
                chicken.hadFirstContact = true;
            }, 1500);
        }
    }


    /**
     * Triggers the attack animation for the big chicken.
     * @param {BigChicken} chicken - The big chicken instance.
     * @returns {void}
     */
    triggerBigChickenAttackAnimation(chicken) {
        chicken.speedX = 0;
        chicken.bigChickenAttackkAnimation();
    }


    /**
     * Triggers the hurt animation for the big chicken.
     * @param {BigChicken} chicken - The big chicken instance.
     * @returns {void}
     */
    triggerBigChickenHurtAnimation(chicken) {
        chicken.speedX = 0;
        chicken.bigChickenHurtAnimation();
        setTimeout(() => {
            chicken.hitEnemy = false;
        }, 500);
    }


    /**
     * Triggers the dead animation for the big chicken.
     * Stops background sound, plays win sound, shows win screen, and goes back to home after 3 seconds.
     * @param {BigChicken} chicken - The big chicken instance.
     * @returns {void}
     */
    triggerBigChickenDeadAnimation(chicken) {
        chicken.speedX = 0;
        chicken.bigChickenDeadAnimation();
        backgroundSound.pause();
        backgroundSound.currentTime = 0;
        this.sounds.winSound.play();
        showYouWinScreen();
        setTimeout(() => {
            this.clearAllIntervals();
            backToHome();
        }, 3000);
    }


    /**
     * Triggers the walk animation for the big chicken based on its movement direction.
     * @param {BigChicken} chicken - The big chicken instance.
     * @returns {void}
     */
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
}