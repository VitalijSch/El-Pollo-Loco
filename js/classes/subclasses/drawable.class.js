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
}