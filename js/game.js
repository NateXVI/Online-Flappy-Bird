const game = {
    screen: 'titleScreen'
}
let scoreScreen = {}
let canvas;
let deltaSec;

let bronzeMedal;
let silverMedal;
let goldMedal;
let platinumMedal;
let gameOverLabel;
let scorePanel;
let newHighScoreLabel;
let backgroundImage;
let flappyLogo;
let titleScreenFont;
let scoreFont; 
const domain = 'http://flappy.stupid.fun'
function preload() {
    bronzeMedal = loadImage(domain + '/assets/medal_bronze.png');
    silverMedal = loadImage(domain + '/assets/medal_silver.png');
    goldMedal = loadImage(domain + '/assets/medal_gold.png');
    platinumMedal = loadImage(domain + '/assets/medal_platinum.png');
    game.birdSprite = loadImage(domain + '/assets/bird.png');
    game.pipeSpriteDown = loadImage(domain + '/assets/pipespritedown.png')
    game.pipeSpriteUp = loadImage(domain + '/assets/pipespriteup.png')
    backgroundImage = loadImage(domain + '/assets/background.png');
    groundImage = loadImage(domain + '/assets/ground.png');
    scorePanel = loadImage(domain + '/assets/panel_score.png');
    newHighScoreLabel = loadImage(domain + '/assets/label_new.png');
    gameOverLabel = loadImage(domain + '/assets/label_game_over.png')
    flappyLogo = loadImage(domain + '/assets/flappylogo.png');

    titleScreenFont = loadFont(domain + '/assets/Pixeled.ttf');
    scoreFont = loadFont(domain + '/assets/flappy.TTF');
}
function setup() {
    angleMode(DEGREES);
    deltaSec = 0;
    canvas = createCanvas(1920,1080);
    canvas.parent("canvas-div");
    background(0);  
    game.bird = new Bird();
    game.bird.pos.x = width/2;
    game.bird.pos.y = height/2;

    game.pipes = [];
    game.pipes.push(new Pipe);

    scoreScreen = {
        animationDuration: 800,
        pos: createVector(0, height/2),
        scale: 5,
        panel: scorePanel
    };
    flappyCookies.init();
}

function draw() {
    deltaSec = deltaTime/1000;
    // background(0);
    switch (game.screen) {
        case 'titleScreen':
            drawBackground();
            drawGround();
            drawTitleScreen();
            updateTitleScreen();
            break;
        case 'gameScreen':
            game.updateGame();
            game.drawGame();
            drawScore();
            break;
        case 'scoreScreen':
            game.bird.update();
            game.drawGame();
            updateScoreScreen();
            drawScoreScreen();
            break;
    }

    clearKeys();
}

let backgroundOffset = 0;
let backgroundSpeed = -25;
function drawBackground() {
    push();
    image(
        backgroundImage,
        backgroundOffset,
        0,
        width,
        height
    )
    image(
        backgroundImage,
        backgroundOffset + width,
        0,
        width,
        height
    )
    backgroundOffset += backgroundSpeed * deltaSec;
    if (backgroundOffset <= -width) backgroundOffset = backgroundOffset + width;
    pop();
}
function drawStaticBackground() {
    push();
    image(
        backgroundImage,
        backgroundOffset,
        0,
        width,
        height
    )
    image(
        backgroundImage,
        backgroundOffset + width,
        0,
        width,
        height
    )
    pop();
}
groundOffset = 0;
function drawGround() {
    let speed = new Pipe().speed;
    let scale = 0.25;
    let w = groundImage.width * scale;
    let h = groundImage.height * scale;
    push();
    imageMode(CORNER);
    for (let i = 0; i < 7; i++) {
        image(groundImage, (i*w)+groundOffset-i, height-90, w, h);
    }
    pop();

    if(game.bird.isAlive){
        groundOffset -= speed * deltaSec;
        if (groundOffset <= -w) groundOffset = groundOffset + w;
    }
}
let titleTextScale = 0;
function drawTitleScreen() {
    push();
    imageMode(CENTER);
    let fScale = 0.25;
    let f = createVector(flappyLogo.width, flappyLogo.height);
    image(flappyLogo, width/2, height/3, f.x * fScale, f.y * fScale);
    textFont(titleScreenFont);
    textAlign(CENTER);
    rectMode(CENTER);
    fill(255);
    stroke(0);
    strokeWeight(7 * titleTextScale + 1);
    textSize(40 * titleTextScale);
    text('press space to play', width/2, height-height/90, 1000, 900);
    titleTextScale = constrain(titleTextScale + 1 * deltaSec,0,1);
    pop();
}
function updateTitleScreen() {
    if (titleTextScale >= 0.99 && keys.space.isPressed){
        //game.screen = 'gameScreen'
        game.start();
    }
}
let keys = {
    space: {
        isPressed: false,
        isReleased: false,
        isDown: false,
        isUp: true
    }
}
function clearKeys() {
        keys.space.isPressed = false;
        // if (keys.space.isReleased == true) {
        //     console.log(keys.space);
        // }
        keys.space.isReleased = false;
}
function keyPressed() {
    let k;
    switch (keyCode) {
        case 32:
            k = "space";
            break;
    }

    if (k !== undefined) {
        keys[k].isPressed = true;
        keys[k].isReleased = false;
        keys[k].isDown = true;
        keys[k].isUp = false;
    }
}
function keyReleased() {
    let k;
    switch (keyCode) {
        case 32:
            k = "space";
            break;
    }

    if (k !== undefined) {
        keys[k].isPressed = false;
        keys[k].isReleased = true;
        keys[k].isDown = false;
        keys[k].isUp = true;
    }
}

game.start = function() {
    game.screen = 'gameScreen';
    game.bird.isAlive = true;
    game.startTime = millis();
    game.bird.pos.x = width/3;
    game.bird.pos.y = height * 0.25;
    game.score = 0;
    game.pipes = [];
    game.pipes.push(new Pipe ())
    game.bird.rotation = 0;
    game.bird.velocity = 0;
}

game.end = function() {
    game.screen = 'scoreScreen';
    game.bird.isAlive = false;
    game.bird.velocity = -game.bird.jump * 1.75;
    game.endTime = millis();

    if (game.highScore == undefined) {
        game.highScore = game.score;
        if (game.score == 0){
            game.newBest = false;
        }
        else {
            game.newBest = true;
        }
    }
    else if (game.score > game.highScore) {
        game.highScore = game.score;
        game.newBest = true;
        flappyCookies.saveHighScore();
    } else {
        game.newBest = false;
    }
    leaderboard.saveScore();
}

game.updateGame = function() {
    for (let i = 0; i < game.pipes.length; i++) {
        if (game.pipes[i].pos.x < game.bird.pos.x && game.pipes[i].previousPos >= game.bird.pos.x) {
            game.score += 1;
            // console.log(this.score);

            
        }
    }

    if (millis() - game.startTime < 1200){
        game.bird.pos.x = lerp(-121, width/4, (millis() - game.startTime)/1000)
    } else {
        game.bird.update();
        for (let i = 0; i < game.pipes.length; i++){
            game.pipes[i].update();
        }
        updatePipes();
        if(!game.bird.isAlive) game.end();
        //console.log(game.bird.pos.y);
    }
}

game.drawGame = function() {
    if (game.bird.isAlive) {
        drawBackground();
    } else {
        drawStaticBackground();
    }
    
    for (let i = 0; i < game.pipes.length; i++){
        game.pipes[i].draw();
    }
    drawGround();
    game.bird.draw();
}

function drawScore () {
    push();
    fill(255);
    stroke(0);
    strokeWeight(10);
    textFont(scoreFont, 100);
    textAlign(CENTER);
    text(game.score, width / 2, 110);
    pop();
}


function updateScoreScreen() {
    if (millis() - game.endTime < scoreScreen.animationDuration) {
        scoreScreen.pos.x = lerp(-scorePanel.width * scoreScreen.scale, width/2, (millis() - game.endTime)/scoreScreen.animationDuration);
    } else {
        scoreScreen.pos.x = width/2;
        if (keys.space.isPressed) game.start();
    }
}

function drawScoreScreen() {
    push();
    textFont(scoreFont, scoreScreen.scale * 9);
    textAlign(RIGHT);
    fill(255);
    stroke(0);
    strokeWeight(scoreScreen.scale * 2);
    rectMode(CENTER);
    imageMode(CENTER);

    image(
        scorePanel, 
        scoreScreen.pos.x, 
        scoreScreen.pos.y, 
        scorePanel.width * 
        scoreScreen.scale, 
        scorePanel.height * scoreScreen.scale);
    image(
        gameOverLabel,
        scoreScreen.pos.x,
        scoreScreen.pos.y - (scoreScreen.scale * 45),
        gameOverLabel.width * scoreScreen.scale,
        gameOverLabel.height * scoreScreen.scale
    )

    text(
        game.score,
        scoreScreen.pos.x + (scoreScreen.scale * 45),
        scoreScreen.pos.y - (scoreScreen.scale * 3)
    );
    text(
        game.highScore,
        scoreScreen.pos.x + (scoreScreen.scale * 45),
        scoreScreen.pos.y + (scoreScreen.scale * 17)
    );

    textFont(titleScreenFont, scoreScreen.scale * 3);
    textAlign(CENTER);
    strokeWeight(scoreScreen.scale * 1);
    text(
        "PRESS SPACE TO RESTART",
        scoreScreen.pos.x,
        scoreScreen.pos.y + (scoreScreen.scale * 42)
    );
    if (game.newBest) {
        image(newHighScoreLabel, 
            scoreScreen.pos.x + (scoreScreen.scale * 19), 
            scoreScreen.pos.y + (scoreScreen.scale * 4), 
            newHighScoreLabel.width * scoreScreen.scale, 
            newHighScoreLabel.height * scoreScreen.scale);
    }
    if (game.score >= 10){
        let medal;
        if (game.score < 20) {
            medal = bronzeMedal;
        }
        else if (game.score < 30) {
            medal = silverMedal;
        }
        else if (game.score < 40) {
            medal = goldMedal;
        }
        else if (game.score >= 40) {
            medal = platinumMedal;
        }

        image(
            medal,
            scoreScreen.pos.x - (scoreScreen.scale * 32),
            scoreScreen.pos.y + (scoreScreen.scale * 4),
            medal.width * scoreScreen.scale,
            medal.height * scoreScreen.scale
        )
    }
    pop();
    
    
}

function checkCollision(bird, pipe) {
    let cx = bird.pos.x;
    let cy = bird.pos.y;
    let cr = bird.hitRadius;
    
    let left = pipe.pos.x - (pipe.hitboxWidth/2);
    let right = pipe.pos.x + (pipe.hitboxWidth/2);
    let top = pipe.pos.y + (pipe.gap/2);
    let bottom = height;
    
    let x = constrain(cx, left, right);
    let y = constrain(cy, top, bottom);
    
    let d = dist(cx, cy, x, y);
    
    if (d <= cr) return true;
    
    top = 0;
    bottom = pipe.pos.y - (pipe.gap/2)
    
    x = constrain(cx, left, right);
    y = constrain(cy, top, bottom);
    
    d = dist(cx, cy, x, y);
    
    if (d <= cr) return true;
}

window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  });