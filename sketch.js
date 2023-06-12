//Game Project - Final

var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var collectable;
var platform;
var canyon;
var green_ground;
var hasDied;
var trees_x;
var treePos_y;
var mountains;
var cameraPosX;
var endOfGame;
var flagpole;
var last_location;
var lives;
var game_score;
var hearts;
var jumpSound;
var backgroundMusic;
var startKeyPressed;
var stage2;
var finalStage;
var platforms;
var movingPlatforms;
var starArray;
var cloudArray;
var isContact;
var moveRight;
var moveLeft;
var bossAlive;
var finalBoss;
var bossFight;
var textVisible;
var enemies;
var moveBossLeft;
var moveBossRight;
var starsFall;
var keyPressedForMusic;
var bossSpiders;
var jumpedOnSpider;
var hitBoss;
var healthBar;
var bossEnraged;
var startBossFight;
var timesBossHit;

function preload()
{
    soundFormats('mp3','wav');
    //load your sounds here
    jumpSound = loadSound('assets/demonJump.wav');

    collectableSound = loadSound('assets/collectibleSound.mp3');
    collectableSound.setVolume(0.2);
    
    backgroundMusic = loadSound('assets/backgroundMusic.wav');
    backgroundMusic.setVolume(0.2);

    bossMusic = loadSound('assets/finalBossMusic.mp3');
    bossMusic.setVolume(0.3);
}

function setup()
{
	createCanvas(1024, 576);
    floorPos_y = height * 3/4 + 50;
    lives = 3;
    startKeyPressed = false;
    backgroundMusic.loop();
    startGame();
}

function draw()
{   
	///////////DRAWING CODE//////////
    push();
    translate(cameraPosX, 0);
    if(finalStage){
        background(53, 57, 53);
    }
    else if(stage2){
        background(204, 85, 0); //background color if player dies once
    }
    else{
        background(0, 0, 102); //default background color
    }
    
    //draws stars at random locations every time the game is reloaded
    for(var i = 0; i < starArray.length; i++){
        starArray[i].drawStar();
        if(starsFall && starArray[i].x >= 2000 && starArray[i].x <= 3500){
            starArray[i].y += 5;
        }
    }

    //draws clouds
    for(var i = 0; i < cloudArray.length; i++){
        cloudArray[i].drawCloud();
    }
   
    if(startKeyPressed == false){
        loadAssets();
    }

	drawGround(); //draw some green ground

    pop();

    if(stage2){
        fill(136, 8, 8);
    }
    else{
        fill(255, 255, 143);
    }
      
    push();
    translate(cameraPosX, 0);
    //conditional code to move the camera left and right
    if (isRight && gameChar_x < 8220){
        cameraPosX -= 5;
    }
    if (isLeft && gameChar_x > 100){
        cameraPosX += 5;
    }

     //draw mountains
    drawMountains();

    //draw trees
    drawTrees();

	//draw the canyon
    drawCanyon(canyon);
    checkCanyon(canyon);
    
    noStroke();

    //draw the collectable
    drawCollectable(collectable);
    checkCollectable(collectable);

    //draw the flagpole
    if(startBossFight == false){
        renderFlagpole();
        for(var i = 0; i < flagpole.length; i++){
            if(flagpole[i].isReached == false){
                checkFlagpole(flagpole);
            }
        }
    }
    
    //draw platforms
    for(var i = 0; i < platforms.length; i++){
        platforms[i].drawPlatform();
    }
    
    //draw moving platforms
    for(var i = 0; i < movingPlatforms.length; i++){
        movingPlatforms[i].drawPlatform();
    }

    //draw enemies
    for(var i = 0; i < enemies.length; i++){
        enemies[i].draw();
        var isContact = enemies[i].checkContact(gameChar_x, gameChar_y);
        if(isContact){
            isPlummeting = true;
            if(lives < 1){
                hasDied = true;
            }
        }
    }

    //draw final boss helper spiders
    for(var i = 0; i < bossSpiders.length; i++){
        bossSpiders[i].draw();
        var isContact = bossSpiders[i].checkContact(gameChar_x, gameChar_y);
        if(isContact){
            isPlummeting = true;
            if(lives < 1){
                hasDied = true;
            }
        }
    }
    
    //draw final boss
    drawBoss();
    //draw final boss health bar
    bossHealthBar();
        
    noStroke();
	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
        fill(245, 95, 77);
        ellipse(gameChar_x, gameChar_y - 50, 18, 22);

        fill(53, 30, 30, 230);
        triangle(gameChar_x + 5, gameChar_y - 51, gameChar_x + 7, gameChar_y - 64, gameChar_x + 1, gameChar_y - 56);
        triangle(gameChar_x - 5, gameChar_y - 51, gameChar_x - 7, gameChar_y - 64, gameChar_x - 1, gameChar_y - 56);

        fill(255);
        ellipse(gameChar_x - 3, gameChar_y - 45, 5, 8);
        ellipse(gameChar_x + 3, gameChar_y - 45, 5, 8);
        fill(0);
        ellipse(gameChar_x - 3, gameChar_y - 43.3, 2, 4);
        ellipse(gameChar_x + 3, gameChar_y - 43.3, 2, 4);
        fill(255);
        ellipse(gameChar_x -3, gameChar_y - 42, 1, 2);
        ellipse(gameChar_x + 3, gameChar_y - 42, 1, 2);

        //torso
        fill(245, 95, 77);
        rect(gameChar_x - 4, gameChar_y - 40, 8, 20);

        stroke(238, 75, 43);
        fill(238, 75, 43);
        beginShape();
        vertex(gameChar_x, gameChar_y - 36);
        vertex(gameChar_x - 12, gameChar_y - 30);
        vertex(gameChar_x - 11, gameChar_y - 28);
        vertex(gameChar_x, gameChar_y - 33);
        vertex(gameChar_x, gameChar_y - 36);
        endShape();

        stroke(245, 95, 77);
        fill(245, 95, 77);
        beginShape();
        vertex(gameChar_x - 1, gameChar_y - 21);
        vertex(gameChar_x - 8, gameChar_y - 12);
        vertex(gameChar_x - 4.5, gameChar_y - 12);
        vertex(gameChar_x + 2.5, gameChar_y -21);
        endShape();

        //foot
        noStroke();
        fill(0);
        ellipse(gameChar_x - 7, gameChar_y - 11, 5.5, 3);

        //demon tail
        noFill();
        stroke(170, 159, 176);
        beginShape();
        vertex(gameChar_x + 3, gameChar_y - 26);
        vertex(gameChar_x + 10, gameChar_y - 33);
        vertex(gameChar_x + 14, gameChar_y - 28);
        vertex(gameChar_x + 16, gameChar_y - 32);
        endShape();
        fill(245, 95, 77);
        triangle(gameChar_x + 14, gameChar_y - 33, gameChar_x + 18, gameChar_y - 37, gameChar_x + 18.5, gameChar_y - 32);

	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        
        fill(245, 95, 77);
        ellipse(gameChar_x, gameChar_y - 50, 18, 22);

        fill(53, 30, 30, 230);
        triangle(gameChar_x + 5, gameChar_y - 51, gameChar_x + 7, gameChar_y - 64, gameChar_x + 1, gameChar_y - 56);
        triangle(gameChar_x - 5, gameChar_y - 51, gameChar_x - 7, gameChar_y - 64, gameChar_x - 1, gameChar_y - 56);

        fill(255);
        ellipse(gameChar_x - 3, gameChar_y - 45, 5, 8);
        ellipse(gameChar_x + 3, gameChar_y - 45, 5, 8);
        fill(0);
        ellipse(gameChar_x - 3, gameChar_y - 43.3, 2, 4);
        ellipse(gameChar_x + 3, gameChar_y - 43.3, 2, 4);
        fill(255);
        ellipse(gameChar_x -3, gameChar_y - 42, 1, 2);
        ellipse(gameChar_x + 3, gameChar_y - 42, 1, 2);

        //torso
        fill(245, 95, 77);
        rect(gameChar_x - 4, gameChar_y - 40, 8, 20);
        
        stroke(238, 75, 43);
        fill(238, 75, 43);
        beginShape();
        vertex(gameChar_x, gameChar_y - 36);
        vertex(gameChar_x + 12, gameChar_y - 30);
        vertex(gameChar_x + 11, gameChar_y - 28);
        vertex(gameChar_x, gameChar_y - 33);
        vertex(gameChar_x, gameChar_y - 36);
        endShape();

        stroke(245, 95, 77);
        fill(245, 95, 77);
        beginShape();
        vertex(gameChar_x + 1, gameChar_y - 21);
        vertex(gameChar_x + 8, gameChar_y - 12);
        vertex(gameChar_x + 4.5, gameChar_y - 12);
        vertex(gameChar_x - 2.5, gameChar_y -21);
        endShape();

        //foot
        noStroke();
        fill(0);
        ellipse(gameChar_x + 7, gameChar_y - 11, 5.5, 3);

        //demon tail
        noFill();
        stroke(170, 159, 176);
        beginShape();
        vertex(gameChar_x - 3, gameChar_y - 26);
        vertex(gameChar_x - 10, gameChar_y - 33);
        vertex(gameChar_x - 14, gameChar_y - 28);
        vertex(gameChar_x - 16, gameChar_y - 32);
        endShape();
        fill(245, 95, 77);
        triangle(gameChar_x - 14, gameChar_y - 33, gameChar_x - 18, gameChar_y - 37, gameChar_x - 18.5, gameChar_y - 32);

	}
	else if(isLeft)
	{
		// add your walking left code
        //head
        fill(245, 95, 77);
        ellipse(gameChar_x, gameChar_y - 45, 15, 22);

        //horn
        fill(53, 30, 30, 230);
        triangle(gameChar_x + 4, gameChar_y - 50, gameChar_x + 7, gameChar_y - 63, gameChar_x, gameChar_y - 55);

        //eye
        fill(255);
        ellipse(gameChar_x - 4, gameChar_y - 45, 5, 8);
        fill(0);
        ellipse(gameChar_x - 4.5, gameChar_y - 45, 2, 4);
        fill(255);
        ellipse(gameChar_x - 4.5, gameChar_y - 45, 1, 1);

        //torso
        fill(245, 95, 77);
        rect(gameChar_x - 4, gameChar_y - 35, 8, 20);

        //arm
        fill(128, 128, 128, 100);
        rect(gameChar_x - 2, gameChar_y - 31, 3.5, 10);

        //leg
        noStroke();
        fill(245, 95, 77);
        rect(gameChar_x - 2, gameChar_y - 15, 4, 12);

        //foot
        fill(0);
        ellipse(gameChar_x - .5, gameChar_y - 3, 5.5, 3);

        //demon tail
        noFill();
        stroke(170, 159, 176);
        beginShape();
        vertex(gameChar_x + 3, gameChar_y - 21);
        vertex(gameChar_x + 10, gameChar_y - 28);
        vertex(gameChar_x + 14, gameChar_y - 23);
        vertex(gameChar_x + 16, gameChar_y - 27);
        endShape();

        fill(245, 95, 77);
        triangle(gameChar_x + 14, gameChar_y - 28, gameChar_x + 18, gameChar_y - 32, gameChar_x + 18.5, gameChar_y - 27);
        

	}
	else if(isRight)
	{
		// add your walking right code
        
        fill(245, 95, 77);
        ellipse(gameChar_x, gameChar_y - 45, 15, 22);

        fill(53, 30, 30, 230);
        triangle(gameChar_x - 4, gameChar_y - 50, gameChar_x - 7, gameChar_y - 63, gameChar_x, gameChar_y - 55);

        fill(255);
        ellipse(gameChar_x + 4, gameChar_y - 45, 5, 8);
        fill(0);
        ellipse(gameChar_x + 4.5, gameChar_y - 45, 2, 4);
        fill(255);
        ellipse(gameChar_x + 4.5, gameChar_y - 45, 1, 1);

        fill(245, 95, 77);
        rect(gameChar_x - 4, gameChar_y - 35, 8, 20);
        fill(128, 128, 128, 100);
        rect(gameChar_x - 2, gameChar_y - 31, 3.5, 10);

        noStroke();
        fill(245, 95, 77);
        rect(gameChar_x - 2, gameChar_y - 15, 4, 12);

        fill(0);
        ellipse(gameChar_x + .5, gameChar_y - 3, 5.5, 3);

         noFill();
        stroke(170, 159, 176);
        beginShape();
        vertex(gameChar_x - 3, gameChar_y - 21);
        vertex(gameChar_x - 10, gameChar_y - 28);
        vertex(gameChar_x - 14, gameChar_y - 23);
        vertex(gameChar_x - 16, gameChar_y - 27);
        endShape();

        fill(245, 95, 77);
        triangle(gameChar_x - 14, gameChar_y - 28, gameChar_x - 18, gameChar_y - 32, gameChar_x - 18.5, gameChar_y - 27);

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        
        fill(245, 95, 77);
        ellipse(gameChar_x, gameChar_y - 50, 18, 22);

        fill(53, 30, 30, 230);
        triangle(gameChar_x + 5, gameChar_y - 51, gameChar_x + 7, gameChar_y - 64, gameChar_x + 1, gameChar_y - 56);
        triangle(gameChar_x - 5, gameChar_y - 51, gameChar_x - 7, gameChar_y - 64, gameChar_x - 1, gameChar_y - 56);

        fill(255);
        ellipse(gameChar_x - 3, gameChar_y - 45, 5, 8);
        ellipse(gameChar_x + 3, gameChar_y - 45, 5, 8);
        fill(0);
        ellipse(gameChar_x - 3, gameChar_y - 43.3, 2, 4);
        ellipse(gameChar_x + 3, gameChar_y - 43.3, 2, 4);
        fill(255);
        ellipse(gameChar_x -3, gameChar_y - 42, 1, 2);
        ellipse(gameChar_x + 3, gameChar_y - 42, 1, 2);

        fill(245, 95, 77);
        rect(gameChar_x - 5.8, gameChar_y - 40, 12, 17);

        stroke(245, 95, 77);
        beginShape();
        vertex(gameChar_x - 5.5, gameChar_y - 37);
        vertex(gameChar_x - 15, gameChar_y - 55);
        vertex(gameChar_x - 15, gameChar_y - 50);
        vertex(gameChar_x - 5.5, gameChar_y - 32);
        endShape();

        beginShape();
        vertex(gameChar_x + 5.5, gameChar_y - 37);
        vertex(gameChar_x + 15, gameChar_y - 55);
        vertex(gameChar_x + 15, gameChar_y - 50);
        vertex(gameChar_x + 5.5, gameChar_y - 32);
        endShape();

        noStroke();
        fill(245, 95, 77);
        rect(gameChar_x - 5.5, gameChar_y - 23, 4, 12);
        rect(gameChar_x + 1.5, gameChar_y - 23, 4, 12);

        fill(0);
        noStroke();
        fill(0, 0, 0);
        ellipse(gameChar_x - 3.5, gameChar_y - 10.5, 6, 4);
        ellipse(gameChar_x + 3.5, gameChar_y - 10.5, 6, 4);

	}
	else
	{
		// add your standing front facing code
        fill(245, 95, 77);
    
        //head
        ellipse(gameChar_x, gameChar_y - 50, 18, 22);

        //horns
        fill(53, 30, 30, 230);
         triangle(gameChar_x + 5, gameChar_y - 55, gameChar_x + 7, gameChar_y - 68, gameChar_x + 1, gameChar_y - 60);
        triangle(gameChar_x - 5, gameChar_y - 55, gameChar_x - 7, gameChar_y - 68, gameChar_x - 1, gameChar_y - 60);

        //eyes
        fill(255);
        ellipse(gameChar_x - 3, gameChar_y - 50, 5, 8);
        ellipse(gameChar_x + 3, gameChar_y - 50, 5, 8);
        fill(0);
        ellipse(gameChar_x - 3, gameChar_y - 49, 2, 4);
        ellipse(gameChar_x + 3, gameChar_y - 49, 2, 4);
        fill(255);
        ellipse(gameChar_x -3, gameChar_y - 48.5, 1, 1.5);
        ellipse(gameChar_x + 3, gameChar_y - 48.5, 1, 1.5);

        //torso
        fill(245, 95, 77);
        rect(gameChar_x - 6, gameChar_y - 41, 12, 20);

        //arms
        fill(245, 95, 77);
        stroke(245, 95, 77);
        beginShape();
        vertex(gameChar_x - 6, gameChar_y - 38);
        vertex(gameChar_x - 13, gameChar_y - 20);
        vertex(gameChar_x - 10, gameChar_y - 22);
        vertex(gameChar_x - 6, gameChar_y - 30);
        endShape();  

        fill(245, 95, 77);
        noStroke();
        stroke(245, 95, 77);
        beginShape();
        vertex(gameChar_x + 6, gameChar_y - 38);
        vertex(gameChar_x + 13, gameChar_y - 20);
        vertex(gameChar_x + 10, gameChar_y - 22);
        vertex(gameChar_x + 6, gameChar_y - 30);
        endShape();

        noStroke();
        //legs
        fill(245, 95, 77);
        rect(gameChar_x - 5.5, gameChar_y - 22, 4, 12);
        rect(gameChar_x + 1.5, gameChar_y - 22, 4, 12);

        //feet
        noStroke();
        fill(0, 0, 0);
        ellipse(gameChar_x - 3.5, gameChar_y - 9, 6, 4);
        ellipse(gameChar_x + 3.5, gameChar_y - 9, 6, 4);

	}

    //text that displays when user has reached the final stage
    if(finalStage && textVisible && bossAlive){
        fill(255);
        stroke(255);
        textSize(25);
        text("The King in Carcosa awaits...", 6000, 100);
        text("But first, you must defeat his messenger", 6200, 150);
    }

    if(stage2){
        fill(255);
        stroke(255);
        textSize(20);
        text("Escape is near...", 2320, 270);
    }

    if(lives == 3 && startKeyPressed){
        fill(255);
        stroke(255);
        textSize(17);
        text("Jump on the spider's head to kill it", 150, 350);
    }

    if(gameChar_x >= 1150 && gameChar_y >= floorPos_y + 10 && lives > 1){
        fill(255);
        stroke(255);
        textSize(20);
        text("Too many spiders here, find another way through", 1200, 350);
    }
    
    pop();

    stroke(255);
    fill(255);
    textSize(15);
    text("Score: " + game_score, 10, 50);

    //displays player's remaining lives
    playerHearts();

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here

    if(gameChar_x >= 6250 && finalBoss.y_pos > floorPos_y + 100){
        isRight = false; 
    }
    
    if (isPlummeting){
        gameChar_y += 4;
    }

    for(var i = 0; i < canyon.length; i++){
        if(abs(gameChar_x - (canyon[i].x_pos + 758)) <= 20  && hasDied){
            gameChar_x -= 5;
            cameraPosX = 100 - gameChar_x;
        }
        if(abs(gameChar_x - (canyon[i].x_pos + 412)) <= 20  && hasDied){
            gameChar_x += 5;
            cameraPosX = 100 - gameChar_x;
        }
    }
    
    //displays text when the character falls through the canyon and has run out of lives
    if (hasDied && gameChar_y >= height + 250 && lives < 1){
        fill(112, 41, 99);
        rect(0, 0, width, height);
        fill(0);
        stroke(0);
        textSize(30);
        text("You are in the King's embrace now.", width/2 - 220, height/2);
        text("Press space to restart", width/2 - 145, height/2 + 50);
    }

    // //reset game character location to last known location or 0 if user still has lives. setTimeout to reset the location after 5 seconds;
    
    checkPlayerDie();

    //code to make the character fall back to the ground 
    if (gameChar_y < floorPos_y + 10){
        for(var i = 0; i < platforms.length; i++){
            var isContact = false;
            if(platforms[i].checkContact(gameChar_x, gameChar_y)){
                isContact = true;
                isFalling = false;
                break;
            }
        }
        for(var i = 0; i < movingPlatforms.length; i++){
            if(movingPlatforms[i].checkContact(gameChar_x, gameChar_y)){
                isContact = true;
                isFalling = false;
                if((isRight == false || isLeft == false) && moveRight && hasDied == false){
                    gameChar_x += 1; // makes character stay on the moving platform
                }
                if((isRight == false || isLeft == false) && moveLeft){
                    gameChar_x -= 1; // makes character stay on the moving platform
                }
                break;
            }
        }
        if(isContact == false){
            gameChar_y +=3;
            isFalling = true;  
        }
    }
    else {
        isFalling = false;
    }
    
    //code to move the character left and prevent the character from moving past its starting position
    if (isLeft && gameChar_x >= 100){
        gameChar_x -= 5;
    }
    
    //code to move the character right and prevent it from going past a certain point
    if (isRight && gameChar_x <= 8220){
        gameChar_x += 5;
    }
   
    //text that displays after the user has reached the end of the game
    if (bossAlive == false){
        fill(255);
        stroke(255);
        textSize(30);
        text("You have defeated The Messenger,", width/2 - 350, height/2 - 50);
        text("The King awaits you in Part Two", width/2 - 350, height/2 + 30);
        textSize(20);
        text("Final Score: " + game_score, width/2 - 350, height/2 + 100);
    }

    // prevents player from pressing down on left and right key at the same time and scrolling the background without moving the character
    if(gameChar_x <= 95){
        isLeft = false;
    }
}





