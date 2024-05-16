const EMPTY = "";
const P1 = "X";
const P2 = "O";
const boardSize = 2;
const currentPlayer = "";
const state = [[], [], []];
const position = { row: null, col: null };
function createEmptyBoard() {
  return [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
  ];
}

function updateGame(player, position, state) {
  // default
  const i = position[0];
  const j = position[1];
  let sucess = false;
  if (i < 0 || i >= state.length) {
    return [state, false];
  }
  if (j < 0 || j > state[0].length) {
    return [state, false];
  }
  if (state[i][j] !== EMPTY) {
    return [state, false];
  }
  const newState = state.map((row, rowIndex) => {
    if (rowIndex === i) {
      return row.map((cell, cellIndex) => {
        if (cellIndex === j) {
          return player;
        }
        return cell;
      });
    }
    return row;
  });

  return [newState, true];
}

function checkWinner(state) {
  const winner = checkRows(state) || checkCols(state) || checkDiags(state);
  if (winner !== null) {
    return winner;
  }
  if (isBoardFull(state)) {
    return "draw";
  }
  return null;
}

function checkRows(state) {
  for (let i = 0; i < state.length; i++) {
    const row = state[i];
    const winner = checkRow(row);
    if (winner !== null) {
      return winner;
    }
  }
  return null;
}
function checkRow(row) {
  const first = row[0];
  if (first === EMPTY) {
    return null;
  }
  for (const cell of row) {
    if (cell !== first) {
      return null;
    }
  }
  return first;
}

function checkCols(state) {
  for (let i = 0; i < state.length; i++) {
    const col = state.map((row) => {
      return row[i];
    });
    const winner = checkRow(col);
    if (winner !== null) {
      return winner;
    }
  }
  return null;
}

function checkDiags(state) {
  const diag1 = state.map((row, rowIndex) => {
    return row[rowIndex];
  });
  const diag2 = state.map((row, rowIndex) => {
    return row[row.length - 1 - rowIndex];
  });
  return checkRow(diag1) || checkRow(diag2);
}

function isBoardFull(state) {
  for (const row of state) {
    for (const col of row) {
      if (col === EMPTY) {
        return false;
      }
    }
  }
  return true;
}

// function checkCols(state){
//   for
// }

module.exports = {
  createEmptyBoard,
  updateGame,
  checkWinner,
  EMPTY,
  P1,
  P2,
};
