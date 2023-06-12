//all functions used in my game project with the exception of setup(), draw(), and preload()

function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.
    if(startKeyPressed && bossAlive){
    if (keyCode == 65 && isPlummeting == false && hasDied == false && gameChar_x > 100){
        isLeft = true;
    }
    if (keyCode == 68 && isPlummeting == false && hasDied == false){
        isRight = true;
    }
    if (keyCode == 87 && isPlummeting == false && endOfGame == false && gameChar_x >= 115){
        isJumping = true;
        gameChar_y -= 100;
        jumpSound.setVolume(1);
        jumpSound.play();
    }
    if(isJumping && isFalling == false){
        isJumping = false;
    }
    if (keyCode == 87 && isFalling == true && endOfGame == false && gameChar_x >= 115){
        gameChar_y += 100;
    }
    if (keyCode == 32 && lives < 1 && hasDied == true){
        location.reload();
    }
    if (keyCode == 32 && endOfGame == true){
        location.reload();
    }
    }
    if (keyCode == 87 && startKeyPressed == false){
        startKeyPressed = true;
        jumpSound.setVolume(0);
        jumpSound.play();
    }
    if(finalStage && keyPressedForMusic < 1){
        backgroundMusic.stop();
        keyPressedForMusic += 1;
        bossMusic.loop();
    }
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.
    if (keyCode == 65){
        isLeft = false;}
    else if (keyCode == 68){
        isRight = false;
    }
}

function startGame(){
    gameChar_x = 100;
	gameChar_y = floorPos_y + 10;
    treePos_y = floorPos_y - 130;
    cameraPosX = 100 - gameChar_x;
    scrollPos = 0;
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    hasDied = false;
    endOfGame = false;
    isJumping = false;
    stage2 = false;
    finalStage = false;
    moveLeft = false;
    moveRight = true;
    bossAlive = true;
    textVisible = true;
    moveBossLeft = false;
    moveBossRight = false;
    starsFall = false;
    keyPressedForMusic = 0;
    hitBoss = false;
    healthBar = 100;
    bossEnraged = false;
    startBossFight = false;
    jumpedOnSpider = false;
    timesBossHit = 0;

    collectable = [
        {x_pos : 200, y_pos : 180, size : 50, isFound : false},
        {x_pos : 530, y_pos : 270, size : 50, isFound : false}, 
        {x_pos : 2500, y_pos : 250, size : 50, isFound : false}, 
        {x_pos : 1300, y_pos : 150, size : 50, isFound : false,},
        {x_pos : 4200, y_pos : 320, size : 50, isFound : false,},
        {x_pos : 4800, y_pos : 320, size : 50, isFound : false,},
    ]

    canyon = [
        {x_pos : 100, height : 100, y_pos : 500}, 
        {x_pos : 1446, height : 100, y_pos : 520}, 
        {x_pos : 1900, height : 100, y_pos : 520},
        {x_pos : 2446, height : 100, y_pos : 520},
        {x_pos : 2792, height : 100, y_pos : 520},
        {x_pos : 4138, height : 100, y_pos : 520},
        {x_pos : 4484, height : 100, y_pos : 520},
        {x_pos : 4830, height : 100, y_pos : 520},
        {x_pos : 5176, height : 100, y_pos : 520},
    ]

    mountains = [
        {x_pos : 150, y_pos : floorPos_y},
        {x_pos : 1250, y_pos : floorPos_y}, 
        {x_pos : 3800, y_pos : floorPos_y},
        {x_pos : 4200, y_pos : floorPos_y}
    ]

    green_ground = [
        {x_pos: -100, y_pos: floorPos_y, width: width/2 + 100, height: height - floorPos_y},
        {x_pos: 858, y_pos: floorPos_y, width: 1000, height: height - floorPos_y},
        {x_pos: 2204, y_pos: floorPos_y, width: 108, height: height - floorPos_y},
        {x_pos: 2658, y_pos: floorPos_y, width: 200, height: height - floorPos_y},
        {x_pos: 3550, y_pos: floorPos_y, width: 1000, height: height - floorPos_y},
        {x_pos: 5934, y_pos: floorPos_y, width: 2000, height: height - floorPos_y},
    ]

    flagpole = [
        {x_pos: 2260, y_pos: floorPos_y - 35, width: 5, height: 40, isReached : false},
        {x_pos: 4100, y_pos: floorPos_y - 35, width: 5, height: 40, isReached : false},
        {x_pos: 6100, y_pos: floorPos_y - 35, width: 5, height: 40, isReached : false}
    ]

    hearts = [
        {x_pos: 85, y_pos: 10, hasFallen : false},
        {x_pos: 110, y_pos: 10, hasFallen : false},
        {x_pos: 135, y_pos: 10, hasFallen : false},
    ]
    
    platform = {
        x_pos : 100,
        y_pos : 100,
    }

    finalBoss = {
        x_pos : 6500,
        y_pos : 700, 
    }

    trees_x = [20, 1100, 1700, 2220, 2700, 4000];
    last_location = [100];
    game_score = 0;
    starArray = [];
    cloudArray = [];
    platforms = [];
    movingPlatforms = [];
    enemies = [];
    bossSpiders = [];

    //stationary platforms
    platforms.push(createPlatforms(195, 410, 80, 30, 100));
    platforms.push(createPlatforms(330, 360, 80, 30, 100));
    platforms.push(createPlatforms(895, 320, 80, 30, 100));
    platforms.push(createPlatforms(1090, 420, 80, 30, 100));
    platforms.push(createPlatforms(995, 370, 80, 30, 100));
    platforms.push(createPlatforms(995, 260, 80, 30, 100));
    platforms.push(createPlatforms(1120, 260, 300, 20, 100));
    platforms.push(createPlatforms(2890, 440, 100, 30, 100));
    platforms.push(createPlatforms(3250, 350, 500, 30, 100));
    platforms.push(createPlatforms(4600, 450, 150, 50, 0));
    platforms.push(createPlatforms(4900, 450, 150, 50, 0));
    platforms.push(createPlatforms(5200, 450, 150, 50, 0));
    platforms.push(createPlatforms(5500, 450, 150, 50, 0));
    platforms.push(createPlatforms(5765, 450, 150, 50, 0));

    //moving platforms
    movingPlatforms.push(createMovingPlatforms(640, 330, 600, 320, 80, 30, 100));
    movingPlatforms.push(createMovingPlatforms(1600, 260, 1600, 260, 200, 20, 100));
    movingPlatforms.push(createMovingPlatforms(2400, 450, 2400, 260, 200, 20, 100));
    movingPlatforms.push(createMovingPlatforms(2400, 450, 2400, 260, 200, 20, 100));
    movingPlatforms.push(createMovingPlatforms(3100, 395, 3050, 395, 100, 30, 100));

    //enemies

    enemies.push(new Enemy(300, floorPos_y, 20));
    enemies.push(new Enemy(400, floorPos_y, 20));
    enemies.push(new Enemy(4990, floorPos_y - 45, 20));
    enemies.push(new Enemy(5580, floorPos_y - 45, 20));
    enemies.push(new Enemy(2780, floorPos_y, 20));
    enemies.push(new Enemy(3350, floorPos_y - 150, 20));
    enemies.push(new Enemy(3820, floorPos_y, 20));
    enemies.push(new Enemy(4185, floorPos_y, 20));
    enemies.push(new Enemy(4285, floorPos_y, 20));
    enemies.push(new Enemy(4385, floorPos_y, 20));
    enemies.push(new Enemy(915, floorPos_y, 20));
    
    //chain of spiders
    for(var i = 0; i < 400; i += 30){
        enemies.push(new Enemy(1300 + i, floorPos_y, 20));
    }
   
    for(var i = 0; i < 200; i++){
        starArray.push(new Star(random(0, 5000), random(0, 220)));
    }

    for(var i = 0; i < 20; i++){
        cloudArray.push(new Cloud(random(10, 4500), random(100, 170)));
    }
    //spiders in the final boss fight
    for(var i = 0; i < 20000; i += 100){
        bossSpiders.push(new BossSpider(6250 + i, 400));
    }
}

function Cloud(xPos, yPos){
    this.x = xPos;
    this.y = yPos;
    this.drawCloud = function(){
        
        if(stage2){fill(128, 128, 128); noStroke();}
        else{fill(255); stroke(255);}
        if(finalStage == false){ 
            ellipse(this.x, this.y, 50 * 2, 50 * 2);
            ellipse(this.x + 60, this.y, 50 * 1.4, 50 * 1.4);
            ellipse(this.x + 100, this.y, 50, 50);
        }
    }
}

function createPlatforms(x, y, width, height, radius){
    var p = {
        x: x,
        y: y,
        width: width,
        height: height,
        radius: radius,
        drawPlatform: function(){
            if(finalStage == false){
                if(finalStage){fill(54, 69, 79)}
                else if(stage2){fill(53, 94, 59)}
                else fill(0, 155, 0);
                rect(this.x, this.y, this.width, this.height, this.radius);
                
                if(finalStage){fill(54, 69, 79);}
                else if(stage2){fill(128, 0, 0);}
                else{
                    fill(153, 76, 0);  
                }
                    rect(this.x + 5, this.y + 5, this.width - 10, this.height- 10, this.radius);
            }
        },
        checkContact: function(gc_x, gc_y){
            if(finalStage == false){
                if(gc_x > this.x && gc_x < this.x + this.width){
                    var d = this.y - gc_y + 20;
                    if(d >= 0 && d < 15){
                        return true;
                    }
                }
                return false;
            }
        },
    }
    return p;
}

function createMovingPlatforms(x, y, stationary_x, stationary_y, width, height, radius){
    var p = {
        x: x,
        y: y,
        stationary_x : stationary_x,
        stationary_y : stationary_y,
        width: width,
        height: height,
        radius: radius,
        drawPlatform: function(){
            if(finalStage == false){
                if(finalStage){fill(54, 69, 79)}
                else if(stage2){fill(53, 94, 59)}
                else fill(0, 155, 0);
                rect(this.x, this.y, this.width, this.height, this.radius);
                
                if(finalStage){fill(54, 69, 79);}
                else if(stage2){fill(128, 0, 0);}
                else{
                    fill(153, 76, 0);  
                }
                    rect(this.x + 5, this.y + 5, this.width - 10, this.height- 10, this.radius);
            }
            
            if(moveRight){
                this.x += 1;
            }

            if(moveLeft){
                this.x -= 1;
            }

            if(this.x >= (stationary_x + 180)){
                moveRight = false;
                moveLeft = true;
            }

            if(this.x <= (stationary_x - 180)){
                moveLeft = false;
                moveRight = true;
            }
        },
        checkContact: function(gc_x, gc_y){
            if(finalStage == false){
                if(gc_x > this.x - 10 && gc_x < this.x + this.width){
                    var d = this.y - gc_y + 20;
                    if(d >= 0 && d < 20){
                        return true;
                    }
                }
                return false;
            }
        },
    }
    return p;
}

function drawCollectable(t_collectable){
    for(var i = 0; i < collectable.length; i++){
        
        if (t_collectable[i].isFound == false){
            fill(255);
            arc(t_collectable[i].x_pos + 600, t_collectable[i].y_pos + 70, t_collectable[i].size * .3, t_collectable[i].size * .8, PI, 0, CHORD);
    
            fill(0);
            ellipse(t_collectable[i].x_pos + 597, t_collectable[i].y_pos + 60, 3, 5);
            ellipse(t_collectable[i].x_pos + 603, t_collectable[i].y_pos + 60, 3, 5);
    
            strokeWeight(2);
    
            stroke(0);
            line(t_collectable[i].x_pos + 598, t_collectable[i].y_pos + 66, t_collectable[i].x_pos + 602, t_collectable[i].y_pos + 66);
    
            fill(255);
            strokeWeight(1);
            stroke(255);
            beginShape();
            vertex(t_collectable[i].x_pos + 607, t_collectable[i].y_pos + 70);
            vertex(t_collectable[i].x_pos + 609, t_collectable[i].y_pos + 80);
            vertex(t_collectable[i].x_pos + 606, t_collectable[i].y_pos + 75);
            vertex(t_collectable[i].x_pos + 603, t_collectable[i].y_pos + 80);
            vertex(t_collectable[i].x_pos + 600, t_collectable[i].y_pos + 75);
            vertex(t_collectable[i].x_pos + 597, t_collectable[i].y_pos + 80);
            vertex(t_collectable[i].x_pos + 594, t_collectable[i].y_pos + 75);
            vertex(t_collectable[i].x_pos + 591, t_collectable[i].y_pos + 80);
            vertex(t_collectable[i].x_pos + 593, t_collectable[i].y_pos + 70);
            endShape();
    
            noStroke();
        }
    
    }
}

function checkCollectable(t_collectable){
    for(var i = 0; i < collectable.length; i++){
        if (dist(gameChar_x, gameChar_y, t_collectable[i].x_pos + 597, t_collectable[i].y_pos + 80)< 50 && t_collectable[i].isFound == false) {
            t_collectable[i].isFound = true;
            collectableSound.play();
            game_score += 1099;
        }
        else {
            isFound = false;
        }
    }
}

function drawCanyon(canyon){
    for(var i = 0; i < canyon.length; i++){
        if(finalStage){
            fill(227, 66, 52); 
            noStroke();
        }
        else if(stage2){
            fill(145, 56, 49);
            noStroke();
        }
        else fill(124, 48, 48); noStroke();                           
        rect(canyon[i].x_pos + 412, canyon[i].y_pos + 10, 346, canyon[i].height);
    }
}

function checkCanyon(canyon){
    for(var i = 0; i < canyon.length; i++){
        if ((gameChar_x >= canyon[i].x_pos + 412 && gameChar_x < canyon[i].x_pos + 758) && (gameChar_y <= 495 && gameChar_y >= 491)){ 
            gameChar_y = canyon[i].y_pos + 10;
            isPlummeting = true;
            hasDied = true;
        }
    } 
}

function drawTrees(){
    for(var i = 0; i < trees_x.length; i++){
        //tree trunk
        if(finalStage){fill(53, 94, 59)}
        else if(stage2){fill(128, 0, 0);}
        else fill(160, 82, 45);
         rect(trees_x[i], treePos_y, 40, 150);

         //branches
         if(finalStage){fill(128, 0, 0)}
         else if(stage2){fill(53, 94, 59);}
         else fill(0, 155, 0);
         triangle(trees_x[i] + 18, treePos_y - 38, trees_x[i] + 100, treePos_y + 44, trees_x[i] - 60, treePos_y + 44);
         triangle(trees_x[i] + 18, treePos_y - 88, trees_x[i] + 100, treePos_y - 8, trees_x[i] - 60, treePos_y - 8);
     }
}

function drawMountains(){
    for(var i = 0; i < mountains.length; i++){
        noStroke();
        fill(119, 136, 153, 150);
        beginShape();
        vertex(mountains[i].x_pos - 70, mountains[i].y_pos);
        vertex(mountains[i].x_pos + 80, mountains[i].y_pos - 200);
        vertex(mountains[i].x_pos + 97, mountains[i].y_pos - 180);
        vertex(mountains[i].x_pos + 150, mountains[i].y_pos - 250);
        vertex(mountains[i].x_pos + 300, mountains[i].y_pos);
        endShape();
    
        fill(255, 200);
        beginShape();
        vertex(mountains[i].x_pos + 65, mountains[i].y_pos - 180);
        vertex(mountains[i].x_pos + 70.25, mountains[i].y_pos - 175);
        vertex(mountains[i].x_pos + 75.25, mountains[i].y_pos - 180);
        vertex(mountains[i].x_pos + 80.25, mountains[i].y_pos - 175);
        vertex(mountains[i].x_pos + 85.25, mountains[i].y_pos - 180);
        vertex(mountains[i].x_pos + 90.25, mountains[i].y_pos - 175);
        vertex(mountains[i].x_pos + 96.5, mountains[i].y_pos - 180);
        vertex(mountains[i].x_pos + 80, mountains[i].y_pos - 200);
        vertex(mountains[i].x_pos + 65, mountains[i].y_pos - 180);
        endShape();
    
        fill(255, 230);
        beginShape();
        vertex(mountains[i].x_pos + 139, mountains[i].y_pos - 235);
        vertex(mountains[i].x_pos + 141, mountains[i].y_pos - 230);
        vertex(mountains[i].x_pos + 143, mountains[i].y_pos - 235);
        vertex(mountains[i].x_pos + 145, mountains[i].y_pos - 230);
        vertex(mountains[i].x_pos + 147, mountains[i].y_pos - 235);
        vertex(mountains[i].x_pos + 149, mountains[i].y_pos - 230);
        vertex(mountains[i].x_pos + 151, mountains[i].y_pos - 235);
        vertex(mountains[i].x_pos + 153, mountains[i].y_pos - 230);
        vertex(mountains[i].x_pos + 155, mountains[i].y_pos - 235);
        vertex(mountains[i].x_pos + 157, mountains[i].y_pos - 230);
        vertex(mountains[i].x_pos + 159, mountains[i].y_pos - 235);
        vertex(mountains[i].x_pos + 150, mountains[i].y_pos - 250);
        vertex(mountains[i].x_pos + 139, mountains[i].y_pos - 235);
        endShape();
    }
}

function drawGround(){
    for(var i = 0; i < green_ground.length; i++){
        noStroke();
        if(finalStage){fill(54, 69, 79)}
        else if(stage2){fill(53, 94, 59);}
        else fill(0,155,0);
	    rect(green_ground[i].x_pos, green_ground[i].y_pos, green_ground[i].width, green_ground[i].height);
    }
}

function renderFlagpole(){
    var count = 0;
    for(var i = 0; i < flagpole.length; i++){
        if(flagpole[i].isReached == true){
            fill(255);
            count += 1;
            if(count == 1){
                stage2 = true;
                starsFall = true;
            }
            if(count == 2){
                stage3 = true;
            }
            if(count == 3){
                finalStage = true;
            }
        }
        else{
            fill(255, 0, 0);
        }
        triangle(flagpole[i].x_pos + 15, flagpole[i].y_pos + 15, flagpole[i].x_pos - 10, flagpole[i].y_pos - 5, flagpole[i].x_pos - 10, flagpole[i].y_pos + 15);
            fill(50, 50, 50);
            rect(flagpole[i].x_pos - 10, flagpole[i].y_pos + 15, flagpole[i].width, flagpole[i].height);
    }
}

function checkFlagpole(flagpole){
    for(var i = 0; i < flagpole.length; i++){
        if(abs(gameChar_x - flagpole[i].x_pos) < 10 && (abs(gameChar_y - flagpole[i].y_pos) && flagpole[i].isReached == false)){
            flagpole[i].isReached = true;
            if(i == 2){
                last_location.splice(0, 1, flagpole[i].x_pos - 150);
            }
            else{
                last_location.splice(0, 1, flagpole[i].x_pos + 20);
            }
        }
    }
}

function gameCharacterLocation(){
    gameChar_x = last_location[0];
    gameChar_y = floorPos_y;
    for(var i = 0; i < flagpole.length; i++){
        if(flagpole[i].isReached){
            cameraPosX = 100 - last_location[0];
            break;
        } 
        else{
            cameraPosX = 100 - last_location[0];
        }
    }
    isPlummeting = false;
    hasDied = false;
}

//makes lives (hearts) disappear whenever a player loses a life
function playerHearts(){
    fill(255);
    stroke(255);
    textSize(17);
    if(lives >= 1){
        text("Lives left: ", 10, 23);
    }
    if(lives == 0){
        text("The King's embrace grows near...", 10, 23);
    }

    for(var i = 0; i < hearts.length; i++){
        if(hearts[i].hasFallen == false){
            fill(255, 0, 0);
            noStroke();
            beginShape();
            vertex(hearts[i].x_pos, hearts[i].y_pos - 1);
            vertex(hearts[i].x_pos + 10, hearts[i].y_pos + 4);
            vertex(hearts[i].x_pos + 20, hearts[i].y_pos - 1);
            vertex(hearts[i].x_pos + 10, hearts[i].y_pos + 20);
            vertex(hearts[i].x_pos, hearts[i].y_pos - 1);
            endShape();
        }    
    }   
}

//decreases lives if a player falls in a canyon or is killed by an enemy
function checkPlayerDie(){
    for(var i = 0; i < hearts.length; i++){ 
        if(gameChar_y >= height + 250 && lives > 0){
            lives -= 1;
            hearts[lives].hasFallen = true;
            setTimeout(gameCharacterLocation(), 5000);
        } 
    }
}

function loadAssets(){
    fill(255);
    stroke(255);
    textSize(23);
    text("Press w to Escape Carcosa...", 380, 258);
}

function Star(xPos, yPos){
    this.x = xPos;
    this.y = yPos;
    this.drawStar = function(){
        if(stage2){
            fill(0);
            stroke(0);
        }
        else{
            fill(255, 215, 0);
            stroke(255, 215, 0);
        }   
        triangle(this.x, this.y - 8, this.x + 4, this.y , this.x - 4 , this.y );
        triangle(this.x + 8, this.y, this.x, this.y + 4, this.x, this.y - 4);
        triangle(this.x, this.y + 8, this.x + 4 , this.y, this.x - 4 , this.y);
        triangle(this.x - 8, this.y, this.x, this.y + 4, this.x, this.y - 4);
    }
}

//draws boss (the King's messenger)
function drawBoss(){
    if(bossEnraged == false){
        var bossMovementValue = 1;
    }
    else if(bossEnraged == true){
        var bossMovementValue = 3;
    }
   
    if(finalBoss.y_pos == 149){
        startBossFight = true;
    }
    if(bossAlive == false){
        finalBoss.x_pos += 2;
        finalBoss.y_pos -= 2;
    }
    if(finalStage){
        if(bossAlive){
            if(finalBoss.x_pos >= 6500 && finalBoss.y_pos == 149){
                moveBossLeft = true;
                moveBossRight = false;
            }
            if(finalBoss.x_pos <= 6200 && finalBoss.y_pos == 149){
                moveBossLeft = false;
                moveBossRight = true;
            }

            if(moveBossLeft){
                finalBoss.x_pos -= bossMovementValue;
            }
            if(moveBossRight){
                finalBoss.x_pos += bossMovementValue;   
            }

            if(bossAlive){
                var d = abs(gameChar_x - finalBoss.x_pos);
                if(d < 20){
                    isPlummeting = true;
                    if(lives < 1){
                        hasDied = true;
                    }
                }
            }
        }
        if(bossEnraged == false){
            fill(143, 146, 33);
        }
        if(bossEnraged){
            fill(220, 20, 60)
        }
        
        stroke(0);
        rect(finalBoss.x_pos, finalBoss.y_pos + 80, 50, 180, 100);
        ellipse(finalBoss.x_pos, finalBoss.y_pos, 105, 135);

        //neck
        beginShape();
        vertex(finalBoss.x_pos + 2, finalBoss.y_pos + 68);
        vertex(finalBoss.x_pos + 10, finalBoss.y_pos + 85);
        vertex(finalBoss.x_pos + 30, finalBoss.y_pos + 80);
        vertex(finalBoss.x_pos + 20, finalBoss.y_pos + 63);
        vertex(finalBoss.x_pos + 2, finalBoss.y_pos + 68);
        endShape();
        
        //eye
        fill(255);
        stroke(255);
        ellipse(finalBoss.x_pos - 22, finalBoss.y_pos + 5, 20, 30);
        if(bossEnraged){
            fill(0);
            stroke(0);
        }
        else{
            fill(255, 0, 0);
            stroke(255, 0, 0);
        }
        ellipse(finalBoss.x_pos - 25, finalBoss.y_pos + 10, 10, 15);
        if(bossEnraged == false){
            fill(0);
            stroke(255, 0, 0);
        }
        else{
            fill(255, 0, 0);
            stroke(0);
        }
        ellipse(finalBoss.x_pos - 26, finalBoss.y_pos + 14, 5, 7);
        line(finalBoss.x_pos - 30, finalBoss.y_pos - 7, finalBoss.x_pos - 8, finalBoss.y_pos - 22);

        //horn
        fill(90, 90, 90);
        stroke(0);
        triangle(finalBoss.x_pos, finalBoss.y_pos - 40, finalBoss.x_pos - 25, finalBoss.y_pos - 20, finalBoss.x_pos - 65, finalBoss.y_pos - 70);
        
        //big wing
        fill(90, 90, 90);
        beginShape();
        vertex(finalBoss.x_pos + 45, finalBoss.y_pos + 90);
        vertex(finalBoss.x_pos + 135, finalBoss.y_pos + 40);
        vertex(finalBoss.x_pos + 190, finalBoss.y_pos + 125);
        vertex(finalBoss.x_pos + 145, finalBoss.y_pos + 80);
        vertex(finalBoss.x_pos + 175, finalBoss.y_pos + 135);
        vertex(finalBoss.x_pos + 125, finalBoss.y_pos + 90);
        vertex(finalBoss.x_pos + 160, finalBoss.y_pos + 145);
        vertex(finalBoss.x_pos + 110, finalBoss.y_pos + 100);
        vertex(finalBoss.x_pos + 145, finalBoss.y_pos + 155);
        vertex(finalBoss.x_pos + 95, finalBoss.y_pos + 110);
        vertex(finalBoss.x_pos + 130, finalBoss.y_pos + 165);
        vertex(finalBoss.x_pos + 80, finalBoss.y_pos + 120);
        vertex(finalBoss.x_pos + 50, finalBoss.y_pos + 140);
        vertex(finalBoss.x_pos + 45, finalBoss.y_pos + 90);
        endShape();

        //small wing
        fill(130, 130, 130);
        beginShape();
        vertex(finalBoss.x_pos + 45, finalBoss.y_pos + 105);
        vertex(finalBoss.x_pos + 125, finalBoss.y_pos + 60);
        vertex(finalBoss.x_pos + 165, finalBoss.y_pos + 135);
        vertex(finalBoss.x_pos + 120, finalBoss.y_pos + 90);
        vertex(finalBoss.x_pos + 150, finalBoss.y_pos + 145);
        vertex(finalBoss.x_pos + 105, finalBoss.y_pos + 100);
        vertex(finalBoss.x_pos + 135, finalBoss.y_pos + 155);
        vertex(finalBoss.x_pos + 90, finalBoss.y_pos + 110);
        vertex(finalBoss.x_pos + 120, finalBoss.y_pos + 165);
        vertex(finalBoss.x_pos + 75, finalBoss.y_pos + 120);
        vertex(finalBoss.x_pos + 105, finalBoss.y_pos + 175);
        vertex(finalBoss.x_pos + 60, finalBoss.y_pos + 130);
        vertex(finalBoss.x_pos + 50, finalBoss.y_pos + 140);
        vertex(finalBoss.x_pos + 45, finalBoss.y_pos + 105);
        endShape();

        //arm
        rect(finalBoss.x_pos + 15, finalBoss.y_pos + 110, 20, 110, 100);

        //leg + foot
        rect(finalBoss.x_pos + 15, finalBoss.y_pos + 250, 20, 50, 100);
        rect(finalBoss.x_pos + 2, finalBoss.y_pos + 290, 35, 20, 100);

        //boss emerges from the underground
        if(finalBoss.y_pos >= 150 ){
            finalBoss.y_pos -= 1;
        }
        if(finalBoss.y_pos <= 250){
            textVisible = false;
            bossFight = true;
        }
    }
}

function Enemy(x, y, range){
    this.x = x;
    this.y = y;
    this.range = range;
    this.isAlive = true;

    this.currentX = x;
    this.inc = 1;

    this.update = function(){
        this.currentX += this.inc;

        if(this.currentX >= this.x + this.range){
            this.inc -= 1;
        }
        else if(this.currentX < this.x){
            this.inc = 1;
        }
    }

    this.draw = function(){
        this.update();
        if(this.isAlive && finalStage == false){
            fill(0, 0, 0);
            ellipse(this.currentX, this.y, 25, 20);
            fill(130, 130, 130);
            noFill();
            stroke(0);

            //first pair of legs
            beginShape();
            vertex(this.currentX + 5, this.y - 5);
            vertex(this.currentX + 18, this.y - 12);
            vertex(this.currentX + 32, this.y + 16);
            endShape();

            beginShape();
            vertex(this.currentX + 5, this.y - 1);
            vertex(this.currentX + 15, this.y - 5);
            vertex(this.currentX + 25, this.y + 16);
            endShape();

            beginShape();
            vertex(this.currentX + 5, this.y + 3);
            vertex(this.currentX + 12, this.y + 1);
            vertex(this.currentX + 20, this.y + 16);
            endShape();

            beginShape();
            vertex(this.currentX + 5, this.y + 5);
            vertex(this.currentX + 9, this.y + 4);
            vertex(this.currentX + 15, this.y + 16);
            endShape();
            
            //second pair of legs
            beginShape();
            vertex(this.currentX - 5, this.y - 5);
            vertex(this.currentX - 18, this.y - 12);
            vertex(this.currentX - 32, this.y + 16);
            endShape();
            
            beginShape();
            vertex(this.currentX - 5, this.y - 1);
            vertex(this.currentX - 15, this.y - 5);
            vertex(this.currentX - 25, this.y + 16);
            endShape();

            beginShape();
            vertex(this.currentX - 5, this.y + 3);
            vertex(this.currentX - 12, this.y + 1);
            vertex(this.currentX - 20, this.y + 16);
            endShape();

            beginShape();
            vertex(this.currentX - 5, this.y + 5);
            vertex(this.currentX - 9, this.y + 4);
            vertex(this.currentX - 15, this.y + 16);
            endShape();
        }
    }

    this.checkContact = function(gc_x, gc_y){
        var d = dist(gc_x, gc_y, this.currentX - 25, this.y + 16);
        var e = dist(gc_x, gc_y, this.currentX + 25, this.y + 16);
        var f = dist(gc_x, gc_y, this.currentX, this.y);

        if(f < 15){
            this.isAlive = false;
            return false;    
        }
        
        if(this.isAlive){
            if(d < 15 || e < 15){
                return true;
            }
        }
       return false; 
    }
}

function BossSpider(x, y){
    this.x = x;
    this.y = y;
    this.jumpedOnSpider = false;
    this.disappear = false;
    this.alreadyHit = 0;
    this.isHit = 0;
    this.bossIsDead = 0;

    this.update = function(){
        if(startBossFight){
            if(this.jumpedOnSpider == false && isPlummeting == false){
                this.x -= 1;
            }
            if(this.x <= 5910){
                this.disappear = true;
                this.y += 1;
            }
            if(this.y <= floorPos_y && this.jumpedOnSpider == false){
                this.y += 1;
            }
            if(this.jumpedOnSpider){
                this.x += 2;
                this.y -= 2;
                count = 0;
                var d = abs(this.x - finalBoss.x_pos);
                var g = abs(this.y - finalBoss.y_pos + 50);
                if(d < 20 && g < 200){
                    this.disappear = true;
                    this.alreadyHit += 1;
                    if(this.alreadyHit < 2){
                        timesBossHit += 1;
                    }
                }    
            }
            var g = dist(gameChar_x, gameChar_y, this.x - 25, this.y + 16);
            var h = dist(gameChar_x, gameChar_y, this.x + 25, this.y + 16);
            if(g < 15 || h < 15){
                this.isHit += 1;
            }   
        }
    }
    
    var f = dist(this.x, this.y, finalBoss.x_pos, finalBoss.y_pos + 130);
    if(f < 25){
        hitBoss = true;
    }
    this.draw = function(){
        this.update();
        if(startBossFight && this.disappear == false && bossAlive){
            if(hitBoss == false){
                fill(0, 0, 0);
                ellipse(this.x, this.y, 25, 20);
                fill(130, 130, 130);
                noFill();
                stroke(0);

                //first pair legs
                beginShape();
                vertex(this.x + 5, this.y - 5);
                vertex(this.x + 18, this.y - 12);
                vertex(this.x + 32, this.y + 16);
                endShape();

                beginShape();
                vertex(this.x + 5, this.y - 1);
                vertex(this.x + 15, this.y - 5);
                vertex(this.x + 25, this.y + 16);
                endShape();

                beginShape();
                vertex(this.x + 5, this.y + 3);
                vertex(this.x + 12, this.y + 1);
                vertex(this.x + 20, this.y + 16);
                endShape();

                beginShape();
                vertex(this.x + 5, this.y + 5);
                vertex(this.x + 9, this.y + 4);
                vertex(this.x + 15, this.y + 16);
                endShape();
                
                //second pair of legs
                beginShape();
                vertex(this.x - 5, this.y - 5);
                vertex(this.x - 18, this.y - 12);
                vertex(this.x - 32, this.y + 16);
                endShape();
                
                beginShape();
                vertex(this.x - 5, this.y - 1);
                vertex(this.x - 15, this.y - 5);
                vertex(this.x - 25, this.y + 16);
                endShape();

                beginShape();
                vertex(this.x - 5, this.y + 3);
                vertex(this.x - 12, this.y + 1);
                vertex(this.x - 20, this.y + 16);
                endShape();

                beginShape();
                vertex(this.x - 5, this.y + 5);
                vertex(this.x - 9, this.y + 4);
                vertex(this.x - 15, this.y + 16);
                endShape();
            }
        }
        (timesBossHit);
        if(startBossFight){
            if(timesBossHit == 1){
                healthBar = 90;
            }
            if(timesBossHit == 2){
                healthBar = 80;
            }
            if(timesBossHit == 3){
                healthBar = 60;
            }
            if(timesBossHit == 4){
                healthBar = 50;
                bossEnraged = true;
            }
            if(timesBossHit == 5){
                healthBar = 40;
            }
            if(timesBossHit == 6){
                healthBar = 30;
            }
            if(timesBossHit == 7){
                healthBar = 20;  
            }
            if(timesBossHit == 8){
                healthBar = 10;
            }
            if(timesBossHit == 9){
                healthBar = 0;
                bossEnraged = false;
                bossAlive = false;
                this.bossIsDead += 1;
            }
            if(bossAlive == false && this.bossIsDead < 2){
                game_score += 35;
            }
            fill(255, 0, 0);
            rect(finalBoss.x_pos - 50, finalBoss.y_pos - 100, healthBar, 8)
        }
    }
    

    this.checkContact = function(gc_x, gc_y){
        var d = dist(gc_x, gc_y, this.x - 25, this.y + 16);
        var e = dist(gc_x, gc_y, this.x + 25, this.y + 16);
        var f = dist(gc_x, gc_y, this.x, this.y);
        
        if(bossAlive){
            if(f < 15){
                this.jumpedOnSpider = true;
                return false;    
            }
    
            if(this.jumpedOnSpider == false && startBossFight && this.isHit < 2){
                if(d < 15 || e < 15){
                    return true;
                }
            }
        }
        
    }
            
        }
function bossHealthBar(){

        
}
