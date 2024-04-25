class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    ctx;


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.draw();
    }


    draw() {
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        for (let i = 0; i < this.enemies.length; i++) {
            const enemie = this.enemies[i];
            const xPos = 390 + i * 100;
            this.ctx.drawImage(enemie.img, xPos, 300, 100, 150);
        }
    }
}