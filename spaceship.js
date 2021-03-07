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
    missiles.add(new Missile(this));
  }
  //give spaceship a boost
  accelerate(){
    this.velocity = 2;
  }

  repositionIfOffScreen(obj){
    var buffer = 10;
    if(obj.x > screenWidth + buffer){
      obj.x = -buffer;
    }
    if(obj.x < -buffer){
      obj.x = screenWidth + buffer;
    }
    if(obj.y > screenHeight + buffer){
      obj.y = -buffer;
    }
    if(obj.y < -buffer){
      obj.y = screenHeight + buffer;
    }
  }

  move(){
    //omg triginmetry! 
    this.x += this.velocity * Math.cos(this.angle);
    this.y += this.velocity * Math.sin(this.angle);

    // apply friction
    this.velocity = this.velocity * .98;
    missiles.forEach(m => m.move());

    this.repositionIfOffScreen(this);
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