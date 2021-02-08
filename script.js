
const canvas = document.getElementById('my-first-canvas');
const ctx = canvas.getContext('2d');
var screenHeight = canvas.height;
var screenWidth = canvas.width;
var quit = false;
window.onkeyup = function(e)
	{
    e.stopPropagation();
		switch(e.keyCode)
		{
			case 37:
       console.log("left");
       ourShip.turnLeft();
       break;
      case 40:
       console.log("down");
       break;
      case 38:
       console.log("up");
       ourShip.accelerate();
       break;
      case 39:
       console.log("right");
       ourShip.turnRight();
       break;
      case 83: // 's'
       console.log("shoot");
       ourShip.shoot();
       break;
      case 81: // 'q'
       console.log("quit");
       quit = true;
       break;
      default:
        console.log(" you pressed some other key. it's number was "+e.keyCode);
    }
    e.preventDefault();
  };


var enemies = [];
var missiles = [];
var ourShip;

class Missile {
   constructor(spaceship) {
    this.angle = spaceship.angle;
    this.x = spaceship.x;
    this.y = spaceship.y;
    this.velocity = 1;
  }
  render(ctx){
    ctx.fillStyle = 'white';
    ctx.strokeStyle = "#FF0000";
    //ctx.fillRect(this.x,this.y,5,5); 
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI, false);
    // ctx.stroke();
    ctx.fill();
  }

  move(){
    this.x += this.velocity * Math.cos(this.angle);
    this.y += this.velocity * Math.sin(this.angle);
  }
}
class Spaceship {
  
  constructor() {
    // how fast we turn on one button press
    this.turn = (Math.PI / 8); 
    this.x = 10;
    this.y = 10;
    
    // (Math.PI / 2)  = about 3.14158162.....
    // angle is a number in radians, not degrees
    // a full turn is 2PI or about 6.28 
    this.angle = 0;
    this.velocity = 0;
  }

  turnLeft(){
    this.angle -= this.turn;
  }

  turnRight(){
    this.angle += this.turn;
  }

  shoot(){
    missiles.push(new Missile(this));
  }
  //give spaceship a boost
  accelerate(){
    this.velocity = 2;
  }

  repositionIfOffScreen(){
    var buffer = 10;
    if(this.x > screenWidth + buffer){
      this.x = -buffer;
    }
    if(this.x < -buffer){
      this.x = screenWidth + buffer;
    }
    if(this.y > screenHeight + buffer){
      this.y = -buffer;
    }
    if(this.y < -buffer){
      this.y = screenHeight + buffer;
    }
  }

  move(){
    //omg triginmetry! 
    this.x += this.velocity * Math.cos(this.angle);
    this.y += this.velocity * Math.sin(this.angle);

    // apply friction
    this.velocity = this.velocity * .98;
    missiles.forEach(m => m.move());

    this.repositionIfOffScreen();
  }

  render(ctx){
    ctx.fillStyle = 'white';

   
    var length = 24;
    var wingSweepRadians = .3;

    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    var backLeftX = this.x + (length * Math.cos(this.angle + Math.PI - wingSweepRadians));
    var backLeftY = this.y + (length * Math.sin(this.angle + Math.PI - wingSweepRadians))
    var backRightX = this.x + (length * Math.cos(this.angle + Math.PI + wingSweepRadians));
    var backRightY = this.y + (length * Math.sin(this.angle + Math.PI + wingSweepRadians))
    
    ctx.lineTo(backLeftX, backLeftY);
    ctx.lineTo(backRightX, backRightY);
    ctx.fill();

    missiles.forEach(m => m.render(ctx));

  }
}
// ls --help 

class Enemy{
 constructor(x, y) {
    this.x = x;
    this.y = y;
    this.alive = true;
  }

  render(ctx){
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x,this.y,10,10); 
  }

  move(){
    this.x += Math.floor(Math.random()*10) - 4.5;
    this.y += Math.floor(Math.random()*10) - 4.5;
  }
};


function render(){

  //clear the screen
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, screenWidth, screenHeight);
  
  ourShip.render(ctx);
  enemies.forEach(e => e.render(ctx));
}

function moveEnemies(){
  enemies.forEach(e => e.move());
}

// this is the what needs to happen every loop
function mainLoop(){
  
  // move things
  moveEnemies();  
  ourShip.move();
  
  //draw things
  render();

  // wait from things to draw, then call ourselves again so it loops
  if(!quit){
    window.requestAnimationFrame(mainLoop);
  }
}

function init(){
 enemies.push(new Enemy(90,90));
 enemies.push(new Enemy(90,90));
 ourShip = new Spaceship();
}


// when the game starts, create the objects
// then start the loop
 window.onload = function(){
  init();
  mainLoop();
 }