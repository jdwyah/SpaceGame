class Enemy{
 constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.startingHealth = 100;
    this.alive = this.startingHealth;
    allEnemies.add(this);
  }

  render(ctx){
    if(this.alive == 10){
      ctx.fillStyle = 'blue';
    }else{
      // console.log(this.alive);
      // console.log(Math.floor((this.alive/10)));
      // console.log(Math.floor((this.alive/10)) % 2)
      if(Math.floor((this.alive/10)) % 2 == 0){
        ctx.fillStyle = 'red';
      }else{
        ctx.fillStyle = 'white';
      }
    }
    ctx.fillRect(this.x,this.y,this.size,this.size); 
  }

  move(){
    this.x += Math.floor(Math.random()*10) - 4.5;
    this.y += Math.floor(Math.random()*10) - 4.5;

    if(this.alive < this.startingHealth){
      this.alive -= 1;
    }
    if(this.alive < 0){
      allEnemies.delete(this);
    }
  }

  checkForHits(missiles){
    missiles.forEach(m => {
      if(m.collision(this.x, 
                     this.y, 
                     this.x+this.size, 
                     this.y+this.size)){
        this.alive -= 1;
      }
    });
  }
};