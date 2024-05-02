class Drawable {
    imageCache = {};
    img;
    width = 100;
    height = 150;
    x = 120;
    y = 300;
    currentImage = 0;


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


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Coin || this instanceof Bottle || this instanceof Throwable || this instanceof EndBoss) {
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}