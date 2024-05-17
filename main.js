const readlineSync = require("readline-sync");
const {
  createEmptyBoard,
  getInitalPlayerIndex,
  getPlayerByIndex,
  updateGame,
  checkWinner,
  getNextPlayerIndex,
  computerBestMove,
} = require("./game");

function printBoard(board) {
  console.log("------");
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    console.log(row.join(" | "));
    if (i !== board.length - 1) {
      console.log("------");
    }
  }
  console.log("------");
}

function twoPlayerGame() {
  let board = createEmptyBoard();
  let currentPlayerIndex = getInitalPlayerIndex();
  console.log("two player game");
  while (true) {
    printBoard(board);
    console.log(`It is ${getPlayerByIndex(currentPlayerIndex)}'s Turn`);
    //讓使用者輸入要下的位置
    const input = readlineSync.question(
      "Enter row and column (seperated by space): "
    );
    const position = input.split(" ");
    if (position.length !== 2) {
      console.error("Invaild input");
      continue;
    }
    const [row, col] = position.map((x) => parseInt(x));
    if (isNaN(row) || isNaN(col)) {
      console.error("Invaild input");
      continue;
    }
    // console.log(getPlayerByIndex(currentPlayerIndex) + " " + position);
    const [newBoard, sucess] = updateGame(
      getPlayerByIndex(currentPlayerIndex),
      [row, col],
      board
    );
    if (!sucess) {
      console.error("Invaild position");
      continue;
    }

    const winner = checkWinner(newBoard);
    if (winner) {
      printBoard(newBoard);
      if (winner === "draw") {
        console.log("draw!");
        break;
      }
      console.log(winner + "wins!");
      break;
    }
    board = newBoard;

    // update currentPlayer
    currentPlayerIndex = getNextPlayerIndex(currentPlayerIndex);
    // update board
    board = newBoard;
  }
}

function singlePlayerGame() {
  let board = createEmptyBoard();
  let currentPlayerIndex = getInitalPlayerIndex();
  const isPlayerFirstYN = readlineSync.question(
    "Do you want to do first? (y/n): "
  );
  const isPlayerFirst = isPlayerFirstYN === "y" ? true : false;

  while (true) {
    printBoard(board);
    console.log(`it is ${getPlayerByIndex(currentPlayerIndex)}'s turn`);

    let row = null;
    let col = null;
    //讓使用者輸入要下的位置

    if (
      (isPlayerFirst && currentPlayerIndex === 0) ||
      (!isPlayerFirst && currentPlayerIndex === 1)
    ) {
      // player's turn
      const input = readlineSync.question(
        "Enter row and column (seperated by space): "
      );
      const position = input.split(" ");
      if (position.length !== 2) {
        console.error("Invaild input");
        continue;
      }

      [row, col] = position.map((x) => parseInt(x));
      if (isNaN(row) || isNaN(col)) {
        console.error("Invaild input");
        continue;
      }
    } else {
      //AI's turn
      console.log("COMPUTER TURN!");
      [row, col] = computerBestMove(
        getPlayerByIndex(currentPlayerIndex),
        board
      );
      console.log("COMPUTER TURN! OVER");
    }
    // console.log(getPlayerByIndex(currentPlayerIndex) + " " + position);
    const [newBoard, sucess] = updateGame(
      getPlayerByIndex(currentPlayerIndex),
      [row, col],
      board
    );
    if (!sucess) {
      console.error("Invaild position");
      continue;
    }

    const winner = checkWinner(newBoard);
    if (winner) {
      printBoard(newBoard);
      if (winner === "draw") {
        console.log("draw!");
        break;
      }
      console.log(winner + "wins!");
      break;
    }
    // update board
    board = newBoard;

    // update currentPlayer
    currentPlayerIndex = getNextPlayerIndex(currentPlayerIndex);
  }
}

function main() {
  const mode = readlineSync.question(
    "Do you want to player single player? (y/n): "
  );
  if (mode === "y") {
    return singlePlayerGame();
  }
  return twoPlayerGame();
}

main();
