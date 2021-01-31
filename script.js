
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
       heldax -=5;
       break;
      case 40:
       console.log("down");
       helday +=5;
       break;
      case 38:
       console.log("up");
       ourShip.accelerate();
       helday -=5;
       break;
      case 39:
       console.log("right");
       ourShip.turnRight();
       heldax +=5;
       break;
      default:
        console.log(" you pressed some other key. it's number was "+e.keyCode);
    }
    e.preventDefault();
  };

var heldax = 10;
var helday = 10;

class Spaceship {
  
  constructor() {
    this.turn = 0.2;
    this.x = 10;
    this.y = 10;
    this.angle = 0;
    this.velocity = 0;
  }

  turnLeft(){
    this.angle -= this.turn;
  }

  turnRight(){
    this.angle += this.turn;
  }

  accelerate(){
    this.velocity = 2;
  }

  move(){
    this.x += this.velocity * Math.cos(this.angle);
    this.y += this.velocity * Math.sin(this.angle);

    // apply friction
    this.velocity = this.velocity * .98;
  }

  render(ctx){
    ctx.fillStyle = 'white';

    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    var bx1 = this.x + (20 * Math.cos(this.angle + Math.PI - 1));
    var by1 = this.y + (20 * Math.sin(this.angle + Math.PI - 1))
    var bx2 = this.x + (20 * Math.cos(this.angle + Math.PI + 1));
    var by2 = this.y + (20 * Math.sin(this.angle + Math.PI + 1))
    
    ctx.lineTo(bx1, by1);
    ctx.lineTo(bx2, by2);

    // console.log("bx1: "+bx1+" by1:"+by1+" bx2:"+bx2+" by2:"+by2+" "+this.angle + Math.PI + 1)
    ctx.fill();

    // ctx.fillRect(this.x,this.y,10,10); 
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
var ourShip = new Spaceship();


Math.random()
Math.floor(Math.random()*100)
function render(){
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, screenWidth, screenHeight);
  // ctx.fillStyle = 'brown';
  // ctx.fillRect(heldax,helday,10,10); 

  ourShip.render(ctx);
  enemies.forEach(e => e.render(ctx));
}

function moveEnemies(){
  enemies.forEach(e => e.move());
}

function mainLoop(){
  moveEnemies();  

  ourShip.move();

  // ctx.fillStyle = 'green';
  // ctx.fillRect(0, 0, screenWidth, screenHeight);
  //console.log("mainLoop");

  render();
  window.requestAnimationFrame(mainLoop);
}

function init(){
 enemies.push(new Enemy(90,90));
 enemies.push(new Enemy(90,90));
}

 window.onload = function(){
  init();
  mainLoop();
 }