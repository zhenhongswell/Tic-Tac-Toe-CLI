const EMPTY = "";
const P1 = "X";
const P2 = "O";
const PLAYERS = [P1, P2];
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

function getInitalPlayerIndex() {
  return 0;
}

function getPlayerByIndex(index) {
  return PLAYERS[index];
}

function getNextPlayer(player) {
  return player === P1 ? P2 : P1;
}

function getNextPlayerIndex(playerIndex) {
  return playerIndex === 0 ? 1 : 0;
}

function computerBestMove(player, board) {
  const moves = getPossibleMoves(board);
  const scores = moves.map(([i, j]) => {
    const [newBoard, success] = updateGame(player, [i, j], board);
    return computerScore(player, 0, newBoard);
  });
  const bestScore = player === P1 ? Math.max(...scores) : Math.min(...scores);
  const bestScoreIndex = scores.indexOf(bestScore);
  return moves[bestScoreIndex];
}

function computerScore(player, depth, board) {
  // 先寫終止條件
  const winner = checkWinner(board);
  if (winner === P1) {
    // P1 要分數越高越好
    return 10 - depth;
  }
  if (winner === P2) {
    // P2 要分數越低越好 (負)
    return depth - 10;
  }
  if (winner === "draw") {
    return 0;
  }

  // 看下一步的分數
  const moves = getPossibleMoves(board);
  const nextPlayer = getNextPlayer(player);
  const scores = moves.map(([i, j]) => {
    const [newBoard, success] = updateGame(nextPlayer, [i, j], board);
    return computerScore(nextPlayer, depth + 1, newBoard);
  });
  // 如果下個玩家是P2,最小化分數 (假設對手是聰明的,下最佳化的一步)
  if (nextPlayer === P2) {
    return Math.min(...scores);
  }
  // 如果下個玩家是P1,最大化分數
  if (nextPlayer === P1) {
    return Math.max(...scores);
  }
}

function getPossibleMoves(board) {
  const moves = [];
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    for (let j = 0; j < row.length; j++) {
      if (board[i][j] === EMPTY) {
        moves.push([i, j]);
      }
    }
  }
  return moves;
}

module.exports = {
  createEmptyBoard,
  updateGame,
  checkWinner,
  EMPTY,
  P1,
  P2,
  getInitalPlayerIndex,
  getPlayerByIndex,
  getNextPlayerIndex,
  computerBestMove,
};
