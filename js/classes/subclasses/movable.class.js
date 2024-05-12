class Movable extends Drawable {
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    sounds = new Sounds();
    speedX = 0.2;
    speedY = 0;
    accelaration = 2.5;
    energy = 100;
    lastHit = 0;
    hitEnemy = false;
    otherDirection = false;
    isEnemyDead = false;
    id;
    enemyMoveInterval;


    moveLeft() {
        this.x -= this.speedX;
    }


    moveRight() {
        this.x += this.speedX;
    }


    jump() {
        this.speedY = 30;
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelaration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof Throwable) {
            return this.y < 370;
        } else {
            return this.y < 170;
        }
    }


    moveDown() {
        return this.speedY < 0;
    }


    isColliding(mo) {
        return this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
            this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom
    }


    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    isDead() {
        return this.energy === 0;
    }


    enemyMove() {
        this.enemyMoveInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }


    enemyAnimation(enemyDead, enemyWalk) {
        setInterval(() => {
            if (this.speedX === 0 && this.isEnemyDead) {
                this.playAnimation(enemyDead)
            } else {
                this.playAnimation(enemyWalk);
            }
        }, 200);
    }
}