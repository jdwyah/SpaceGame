
const canvas = document.getElementById('my-first-canvas');
const ctx = canvas.getContext('2d');
var screenHeight = canvas.height;
var screenWidth = canvas.width;
window.onkeyup = function(e)
	{
		switch(e.keyCode)
		{
			case 37:
       console.log("left");
       heldax -=5;
       break;
      case 40:
       console.log("down");
       helday +=5;
       break;
      case 38:
       console.log("up");
       helday -=5;
       break;
      case 39:
       console.log("right");
       heldax +=5;
       break;
      default:
        console.log(" you pressed some other key. it's number was "+e.keyCode);
    }
    e.preventDefault();
  };

// function getCursorPosition(canvas, event) {
//     const rect = canvas.getBoundingClientRect()
//     const x = event.clientX - rect.left
//     const y = event.clientY - rect.top
//     return [x, y];
// }

// window.onclick = function(e){   
//   var xy = getCursorPosition(canvas, e);
//   ctx.fillStyle = 'brown';
//   ctx.fillRect(xy[0],xy[1],10,10); 
//   console.log(" draw rectanlge ");
// }
var heldax = 10;
var helday = 10;

function render(){
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, screenWidth, screenHeight);
  ctx.fillStyle = 'brown';
  ctx.fillRect(heldax,helday,10,10); 
}
function moveHelda(){
  heldax += 1;
  helday += 1;
  if(heldax > screenWidth) {
    heldax = 0;
  }
  if(helday > screenWidth) {
    helday = 0;
  }
}
function mainLoop(){

  // ctx.fillStyle = 'green';
  // ctx.fillRect(0, 0, screenWidth, screenHeight);
  //console.log("mainLoop");
  render();
  window.requestAnimationFrame(mainLoop);
}
 window.onload = function(){
  mainLoop();
 }