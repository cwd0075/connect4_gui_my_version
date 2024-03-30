import * as t from "./connect4_module.js";
const connect4 = new t.Connect4();
var player = 1;
var state;

var gameOver = false;

var rows = 42;

window.startGame = startGame; //if using js6 modules your html events attributes won't work. in that case you must bring your function from global scope to module scope. Just add this to your javascript file: window.functionName= functionName;

startGame();

function startGame() {
  player = 1;
  state = connect4.get_initial_state();

  for (let r = 0; r < rows; r++) {
    // HTML
    let tile = document.createElement("div");
    tile.id = r.toString();
    tile.classList.add("tile");
    tile.addEventListener("click", setPiece);
    document.getElementById("board").append(tile);
  }
}

function setPiece() {
  if (gameOver) {
    return;
  }
  let coords = this.id;
  const squareId = parseInt(coords);

  const validMoves = connect4.get_valid_moves(state);
  console.log(state);
  console.log(validMoves);
  console.log(validMoves[squareId]);
  //get coords of that tile clicked
  if (validMoves[squareId]) {
    let tile = document.getElementById(squareId.toString());
    if (player == 1) {
      tile.classList.add("red-piece");
    } else {
      tile.classList.add("yellow-piece");
    }
    state = connect4.get_next_state(state, squareId, player);

    const [value, isTerminal] = connect4.get_value_and_terminated(
      state,
      squareId
    );

    if (isTerminal) {
      console.log(state);
      if (value === 1) {
        console.log(player, "won");
        declareWinner(player);
      } else {
        console.log("draw");
        declareWinner(0);
      }
    }

    player = connect4.get_opponent(player);
    //checkWinner();
  }
}

function declareWinner(won) {
  let winner = document.getElementById("winner");
  if (won == 1) {
    winner.innerText = "Red Wins";
  } else if (won == -1) {
    winner.innerText = "Yellow Wins";
  } else {
    winner.innerText = "Draw";
  }
  gameOver = true;
}