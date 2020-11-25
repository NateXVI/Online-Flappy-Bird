class Bird {
    constructor () {
        this.pos = createVector();
        this.rotation = 0;
        this.width = 120;
        this.height = 72  ;
        this.sprite = undefined;
        this.velocity = 0;
        this.gravity = 2200;
        this.jump = 550;
        this.isAlive = true;
        this.drawHitbox = false;
        this.hitRadius = 37;
        this.previousPos = this.pos.x;
    }
    update() {
        this.velocity += this.gravity * deltaSec;
        if(keys.space.isPressed && this.isAlive) {
            this.velocity = -this.jump;
        }
        this.pos.y += this.velocity * deltaSec;

        this.pos.y = constrain(this.pos.y, this.height/2, height - this.height/2-90);
        if (this.pos.y == this.height/2 || this.pos.y == height - this.height/2-90){
            this.velocity = 0;
        }

        this.rotation = map(this.velocity, -this.jump, this.jump * 3, -40, 90);
        this.rotation = constrain(this.rotation, -45, 90);

        if (this.pos.y >= height - this.height/2-90) {
            this.isAlive = false;
            this.rotation = 90;
        }

        let dead;
        for (let i = 0; i < game.pipes.length; i++) {
            dead = checkCollision(this, game.pipes[i]);
            if (dead) break;
        }
        if (dead) this.isAlive = false;

        this.previousPos = this.pos.x;
    }
    draw() {
        push();
        stroke(0);
        strokeWeight(4);
        fill(0,0,0,0);
        imageMode(CENTER);
        translate(this.pos.x, this.pos.y);
        rotate(this.rotation);
        image(game.birdSprite, 0, 0,this.width, this.height);
        
        if(this.drawHitbox)circle(0,0,2*this.hitRadius);
        pop();
    }
    
}