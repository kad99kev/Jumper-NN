/*class Triangle{
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
    if(counter%2 == 0){
      fill(0);
    }
    else{
      fill(250);
    }

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

  hits(sq){
    if(this.x1 <= sq.x + 25 && this.maxX >= sq.x){
      if((sq.y == this.y3)){
        return true;
      }
    }else if(sq.y < 0){
      return true;
    }
    return false;
  }
}*/


/*class Square{
  constructor(){
		this.x = int(len/4);
  	this.y = 250;
    this.lift = -15;
		this.gravity = 0.7;
    this.velocity = 0;
    this.score = 0;
  }

  move(){
    this.velocity += this.gravity;
    this.y += this.velocity;
    if(this.y >= 250){
      this.y = 250;
      this.velocity = 0;
    }
  }

  jump(){
    this.velocity += this.lift;
  }

  display(){
    if(counter%2 == 0){
      fill(0);
    }
    else{
      fill(250);
    }
    stroke(255, 204, 0);
    rect(this.x, this.y, 25, 25);
    this.score += 1;
  }

}*/

const TOTAL = 100;

let len = 1000;
let brd = 400;

let squares = [];
let squares_backup = [];
let tri_arr = [];

let value = 250;
let counter = 0;
let tri_count = 0;

let max = 0;
let incr = 0;
let highScore = 0;


let img;
function preload() {
  img = loadImage('game_over.jpg');
}

function setup() {
    createCanvas(len, brd).parent('sketch-holder');
    for(let i = 0; i < TOTAL; i++){
      square = new Square();
      squares[i] = square;
      squares_backup[i] = square;
    }
    highScoreSpan = select('#hs');
    currentScoreSpan = select('#cs');
    let button = createButton('Reset').parent('button');
    button.position(len-55);
    button.class("badge badge-pill badge-dark");
    button.mousePressed(resetSketch);

}

function draw(){
  background(value);
  createLine();

  for(let i = tri_arr.length - 1; i >= 0; i--) {
    tri_arr[i].move();
    if (tri_arr[i].offScreen()) {
      tri_arr.splice(i, 1);
    }
  }

  for(let i = squares.length - 1; i >= 0; i--){
    let square = squares[i];
    square.think(tri_arr);
    square.move();

    for (let j = 0; j < tri_arr.length; j++) {
      if (tri_arr[j].hits(squares[i])) {
        squares.splice(i, 1);
        break;
      }
    }
  }

  if (tri_count % int(76 - 5*incr) == 0) {
    tri_arr.push(new Triangle());
  }

  tri_count += 1;
  if(incr <= 3){
    incr += 0.001;
  }

  for(let i = squares.length - 1; i >= 0; i--){
    if(squares[i].score > highScore){
      currentScoreSpan.html(squares[i].score);
      highScore = squares[i].score;
      highScoreSpan.html(highScore);
    }
  }

  for (let i = 0; i < tri_arr.length; i++) {
    tri_arr[i].display();
}

  for (let i = 0; i < squares.length; i++) {
    squares[i].display();
  }

  if(squares.length == 0){
    nextGeneration();
    resetSketch();
  }

}

/*function keyTyped() {
  if(key == ' ' && counter%2 == 0){
    value = 0;
  }
  else if(key == ' ' && counter%2 != 0){
    value = 250;
  }
  if(sq.y == 250){
    sq.jump();
  }
  counter += 1;
}*/

function createLine(){
	stroke(255, 204, 0);
	strokeWeight(2);
	line(0, 275, len, 275);
}

function resetSketch(){
  for(let i = 0; i < TOTAL; i++){
    square = new Square();
    squares[i] = square;
    squares_backup[i] = square;
  }
  value = 250;
  counter = 0;
  tri_count = 0;
  tri_arr = [];
  max = 0;
  incr = 0;
  background(value);
  createLine();
  loop();
}
