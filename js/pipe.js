class Pipe {
    constructor() {
        this.pos = createVector(width+80, random(height/4, height-height/3));
        this.scale = 0.6;
        this.width = game.pipeSpriteDown.width * this.scale;
        this.height = game.pipeSpriteDown.height * this.scale;
        this.gap = 190;
        this.speed = 400;
        this.drawHitbox = false;
        this.hitboxWidth = this.width * 0.175;
        this.previousPos = this.pos.x;
    }

    update() {
        this.previousPos = this.pos.x;
        this.pos.x -= this.speed * deltaSec;
    }

    draw() {
        push();
        imageMode(CENTER);
        rectMode(CENTER);
        fill(0,0,0,0);
        stroke(0);
        strokeWeight(3);
        image(game.pipeSpriteDown, this.pos.x, this.pos.y - this.height/2 - this.gap/2, this.width, this.height);
        image(game.pipeSpriteUp, this.pos.x, this.pos.y + this.height/2 + this.gap/2, this.width, this.height);
        if(this.drawHitbox){
            rect(this.pos.x -this.hitboxWidth/2 + 50, this.pos.y + this.gap/2, this.width, this.height);
            // rect(this.pos.x, this.pos.y - this.height/2 - this.gap/2, this.hitboxWidth, this.height);
            // rect(this.pos.x, this.pos.y + this.height/2 + this.gap/2, this.hitboxWidth, this.height);
        }
        pop();
    }
}
let pipeSpacing = 550;
function updatePipes() {
    if (abs(width + 70 - game.pipes[game.pipes.length-1].pos.x) >= pipeSpacing){
        game.pipes.push(new Pipe);
    }
    if(game.pipes[0].pos.x < -100) {
        game.pipes.shift();
    }
}