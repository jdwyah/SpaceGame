class Missile {
   constructor(spaceship) {
    this.angle = spaceship.angle;
    this.x = spaceship.x;
    this.y = spaceship.y;
    this.velocity = 3;
    this.size = 2;
  }
  render(ctx){
    ctx.fillStyle = 'white';
    ctx.strokeStyle = "#FF0000";
    //ctx.fillRect(this.x,this.y,5,5); 
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    // ctx.stroke();
    ctx.fill();
  }

  move(){
    this.x += this.velocity * Math.cos(this.angle);
    this.y += this.velocity * Math.sin(this.angle);
  }

  // do these two "rectangles" collide?
  // not quite perfect as is because one of them is a circle
  collision(otherX,otherY,otherH,otherW){
    if(otherX < this.x + this.size &&
       otherX + otherW > this.x &&
       otherY < this.y + this.size &&
       otherY + otherH > this.y){
       return true;
   }
   return false;
  }
}