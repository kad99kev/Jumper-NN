
function nextGeneration(){

  calculateFitness();

  for(let i = 0; i < TOTAL; i++){
    squares[i] = pickOne();
  }
  squares_backup = [];
}

function pickOne(){

  let index = 0;

  let r = random(1);


  while (r > 0) {
    r -= squares_backup[index].fitness;

    index += 1;
  }

  index -= 1;

  return squares_backup[index].copy();
}

function calculateFitness(){
  let sum = 0;

  for(let square of squares_backup){
    sum += square.score;
  }

  for(let square of squares_backup){
    square.fitness = square.score / sum;
  }

}
