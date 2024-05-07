class Drawable {
    imageCache = {};
    currentImage = 0;
    img;
    width;
    height;
    x;
    y;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        this.path = images[i];
        this.img = this.imageCache[this.path];
        this.currentImage++;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    // drawFrame(ctx) {
    //     if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Coin || this instanceof Bottle || this instanceof Throwable || this instanceof EndBoss) {
    //         ctx.beginPath();
    //         ctx.lineWidth = 5;
    //         ctx.strokeStyle = 'blue';
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //     }
    // }


    drawFrameWithOffset(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Coin || this instanceof Bottle || this instanceof Throwable || this instanceof EndBoss) {
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'red';
            ctx.rect(
                this.x + (this.offset.left || 0),
                this.y + (this.offset.top || 0),
                this.width - (this.offset.left || 0) - (this.offset.right || 0),
                this.height - (this.offset.top || 0) - (this.offset.bottom || 0)
            );
            ctx.stroke();
        }
    }
}