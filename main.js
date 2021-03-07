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
      case 32:
       console.log("space");
       ourShip.accelerate();
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

var allEnemies = new Set();
var missiles = new Set();
var ourShip;
var gameTime = 0;

function render(){

  //clear the screen
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, screenWidth, screenHeight);
  
  ourShip.render(ctx);
  allEnemies.forEach(e => e.render(ctx));
}

function moveEnemies(){
  allEnemies.forEach(e => e.move());
}

function checkForHits(){
  allEnemies.forEach(e => e.checkForHits(missiles));
}

// this is the what needs to happen every loop
function mainLoop(){
  gameTime += 1;

  // move things
  moveEnemies();  
  ourShip.move(); //also moves the missiles

  checkForHits();

  addEnemy();

  //draw things
  render();

  // wait from things to draw, then call ourselves again so it loops
  if(!quit){
    window.requestAnimationFrame(mainLoop);
  }
}

function addEnemy(){
  if(gameTime % 100 == 0){
    allEnemies.add(new Enemy(120,120));
  }
}

function init(){
 allEnemies.add(new Enemy(120,120));
 allEnemies.add(new Enemy(90,90));
 allEnemies.add(new Enemy(200,200));
 ourShip = new Spaceship();
}

// when the game starts, create the objects
// then start the loop
 window.onload = function(){
  init();
  mainLoop();
 }