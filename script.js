
const canvas = document.getElementById('my-first-canvas');
const ctx = canvas.getContext('2d');
var screenHeight = canvas.height;
var screenWidth = canvas.width;
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
      default:
        console.log(" you pressed some other key. it's number was "+e.keyCode);
    }
    e.preventDefault();
  };

class Spaceship {
  
  constructor() {
    
    // how fast we turn on one button press
    this.turn = 0.2;
    this.x = 10;
    this.y = 10;

    // angle is a number in radians, not degrees
    this.angle = 0;

    this.velocity = 0;
  }

  turnLeft(){
    this.angle -= this.turn;
  }

  turnRight(){
    this.angle += this.turn;
  }

  //give spaceship a boost
  accelerate(){
    this.velocity = 2;
  }

  move(){
    //omg triginmetry! 
    this.x += this.velocity * Math.cos(this.angle);
    this.y += this.velocity * Math.sin(this.angle);

    // apply friction
    this.velocity = this.velocity * .98;
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
    var BackRightY = this.y + (length * Math.sin(this.angle + Math.PI + wingSweepRadians))
    
    ctx.lineTo(backLeftX, backLeftY);
    ctx.lineTo(backRightX, BackRightY);

    // console.log("backLeftX: "+backLeftX+" backLeftY:"+backLeftY+" backRightX:"+backRightX+" BackRightY:"+BackRightY+" "+this.angle + Math.PI + 1)
    ctx.fill();

  }
}
// ls --help 

class Enemy{
 constructor(x, y) {
    this.x = x;
    this.y = y;
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
var enemies = [];
var ourShip;

Math.random()
Math.floor(Math.random()*100)
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
  window.requestAnimationFrame(mainLoop);
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