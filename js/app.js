

'use strict';
 var returnRandomValue = function(possibleValues){
    var randomPlace = Math.floor(Math.random() * possibleValues.length);
    return possibleValues[randomPlace];
};
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = returnRandomValue([60, 145, 230]);
    this.speed = returnRandomValue([60, 145, 230]);
	

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

   
    if (this.x >= 505) {
        this.x = 0;
    }

    // Check for collision with enemies or barrier-walls
    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(speed) {
    this.x = returnRandomValue([66, 180, 200]);
    this.y = 350;
    this.speed=speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
	if (this.y + 63 <= 0) {        
        this.x = 202.5;
        this.y = 383;
        

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);
       allEnemies.length = 0;
	   for (var i = 0; i <= 3; i++) {
        var enemy = new Enemy();
        
        allEnemies.push(enemy);
    }
        

    }

  
    if (this.y > 383 ) {
        this.y = 383;
    }
    if (this.x > 402.5) {
        this.x = 402.5;
    }
    if (this.x < 2.5) {
        this.x = 2.5;
    }
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);


};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        this.x -= this.speed;
    }
    if (keyPress == 'up') {
        this.y -= this.speed - 20;
    }
    if (keyPress == 'right') {
        this.x += this.speed;
    }
    if (keyPress == 'down') {
        this.y += this.speed - 20;
    }
    
};





// check for collision between enemy and player
Enemy.prototype.checkCollision = function () {
      if (player.y + 131 >= this.y + 90
        && player.x + 25 <= this.x + 88
        && player.y + 73 <= this.y + 135
        && player.x + 76 >= this.x + 11) {
        
        player.x = 202.5;
        player.y = 383;
    }

    
    
};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Enemy randomly placed vertically within section of canvas
// Declare new score and gameLevel variables to store score and level
var allEnemies = [];
var enemy = new Enemy();

allEnemies.push(enemy);
var player = new Player(50);





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(allowedKeys[e.keyCode]);
});
