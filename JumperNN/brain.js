
function nextGeneration(){
  resetSketch();
  normalizeFitness(squares_backup);
  squares = generate(squares_backup);
  squares_backup = squares.slice();
}


function pickOne(squares_backup){
  let index = 0;
  let r = random(1);

  while (r > 0) {
    r -= squares_backup[index].fitness;
    index += 1;
  }
  index -= 1;
  return squares_backup[index].copy();
}

function generate(squares_backup){
  let newSquares = [];

  for(let i = 0; i < squares_backup.length; i++){
    let square = pickOne(squares_backup);
    newSquares[i] = square;
  }
  return newSquares;
}

//Normalizing the fitness of all squares
function normalizeFitness(squares_backup){
  //Making it exponentially better
  for(let i = 0; i < squares_backup.length; i++){
    squares_backup[i].score = pow(squares_backup[i].score, 2);
  }
  //Adding all scores and dividing by sum to calculate fitness
  let sum = 0;
  for(let square of squares_backup){
    sum += square.score;
  }
  for(let square of squares_backup){
    square.fitness = square.score / sum;
  }
}
