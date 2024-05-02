class Movable extends Drawable {
    otherDirection = false;
    lastKey = false;
    speed = 0.2;
    speedY = 0;
    accelaration = 2.5;
    energy = 100;
    lastHit = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };


    moveLeft() {
        this.x -= this.speed;
    }


    moveRight() {
        this.x += this.speed;
    }


    jump() {
        this.speedY = 30;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        this.path = images[i];
        this.img = this.imageCache[this.path];
        this.currentImage++;
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
            return true;
        } else {
            return this.y < 170;
        }
    }


    // isColliding(mo) {
    //     if (mo.deleted) {
    //         return false;
    //     }
    //     return (this.x + this.width) >= mo.x &&
    //         this.x <= (mo.x + mo.width) &&
    //         (this.y + this.height) >= mo.y &&
    //         this.y <= (mo.y + mo.height)
    // }


    isColliding(mo) {
        if (mo.deleted) {
            return false;
        }
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.height - mo.offset.bottom
    }


    isCollidingAbove(mo) {
        return (this.y + this.height) >= mo.y &&
            (this.y + this.height) <= (mo.y + mo.height)
    }


    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
            this.characterDead();
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
}