class Square{
  constructor(brain){

    this.x = int(len/4);
  	this.y = 250;

    this.lift = -15;
		this.gravity = 0.7;
    this.velocity = 0;

    this.score = 0;
    this.fitness = 0;

    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
      //this.brain.mutate(mutate);
    } else {
      this.brain = new NeuralNetwork(3, 8, 2);
    }

  }

  copy(){
    return new Square(this.brain);
  }

  think(triangles){

    let closest = null; //Closest triangle group
    let next = null; //Next triangle group
    let record = Infinity;

    for(let i = 0; i < tri_arr.length; i++){
      let diff = tri_arr[i].x1 - this.x + 25;
      if(diff > 0 && diff < record){
        record = diff;
        closest = tri_arr[i];
        next = tri_arr[i+1];
      }
    }

    if(closest != null && next != null){
      let inputs = [];

      // x position of closest triangle group
      inputs[0] = map(closest.x1, this.x, width, 0 , 1);
      // x position of furthest triangle group
      inputs[1] = map(closest.maxX, this.x, width, 0, 1);
      // x position of next triangle group
      inputs[2] = map(next.x1, this.x, width, 0, 1);

      let action = this.brain.predict(inputs);

      if(action[1] < action[0] && this.y == 250){
        this.jump();
      }
    }
  }

  /*mutate(){
    this.brain.mutate(0.1);
  }*/

  jump(){
    this.velocity += this.lift;
    if(counter%2 == 0){
      value = 0;
    }
    else if(counter%2 != 0){
      value = 250;
    }
    counter += 1;
  }

  move(){
    this.velocity += this.gravity;
    this.y += this.velocity;
    if(this.y >= 250){
      this.y = 250;
      this.velocity = 0;
    }
    this.score += 1;
  }

  display(){
    if(counter%2 == 0){
      fill(0, 50);
    }
    else{
      fill(250, 50);
    }
    stroke(255, 204, 0);
    rect(this.x, this.y, 25, 25);
  }

}