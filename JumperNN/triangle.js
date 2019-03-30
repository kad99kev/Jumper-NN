class Triangle{
  constructor(){
    this.l = 30;
    this.x1 = len;
    this.x2 = this.x1+this.l;
    this.x3 = this.x1+int(this.l/2);
  	this.y1 = 275;
    this.y2 = 275;
    this.y3 = 250;
    this.group = int(random(3));
    this.maxX = 0;
    this.mid = 0;
  }
  move(){
    this.x1 -= 3 + incr;
    this.x2 -= 3 + incr;
    this.x3 -= 3 + incr;
  }

  display(){
    fill(250);
    stroke(255, 204, 0);
    for(let i = 0; i <= this.group; i++){
      triangle(this.x1+this.l*i, this.y1, this.x2+this.l*i, this.y2, this.x3+this.l*i, this.y3);
      this.maxX = this.x2+this.l*i;
      this.mid = int((this.x1 + this.maxX)/2);
    }
  }

  offScreen(){
    if(this.x2 < 0){
      return true;
    }
    else{
      return false;
    }
  }

  hits(square){
    if(this.x1 <= square.x + 25 && this.maxX >= square.x){
      if((square.y == this.y3)){
        return true;
      }
    }else if(square.y < 0){
      return true;
    }
    return false;
  }
}
