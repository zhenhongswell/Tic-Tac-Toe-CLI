// to test game.js function
const {
  createEmptyBoard,
  EMPTY,
  updateGame,
  P1,
  P2,
  checkWinner,
  computerBestMove,
} = require("./game.js");

describe("createEmptyBoard", () => {
  test("create empty board", () => {
    const broad = createEmptyBoard();
    expect(broad).toEqual([
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ]);
  });
});

describe("updateGame", () => {
  test("update sucess", () => {
    const state = [
      [P1, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ];
    const [newState, sucess] = updateGame(P2, [1, 1], state);
    expect(sucess).toBe(true);
    expect(newState).toEqual([
      [P1, EMPTY, EMPTY],
      [EMPTY, P2, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ]);
  });

  test("update failure", () => {
    const state = [
      [P1, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ];
    const [newState, sucess] = updateGame(P2, [0, 0], state);
    expect(sucess).toBe(false);
    expect(newState).toEqual([
      [P1, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ]);
  });

  test("out of bounds", () => {
    const state = [
      [P1, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ];
    const [newState, sucess] = updateGame(P2, [3, 3], state);
    expect(sucess).toBe(false);
    expect(newState).toEqual([
      [P1, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ]);
  });
});

describe("checkWinner", () => {
  const state = [];
  test("Top row wins", () => {
    const state = [
      [P1, P1, P1],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ];
    const winner = checkWinner(state);
    expect(winner).toBe(P1);
  });
  test("Middle row wins", () => {
    const state = [
      [EMPTY, EMPTY, EMPTY],
      [P1, P1, P1],
      [EMPTY, EMPTY, EMPTY],
    ];
    const winner = checkWinner(state);
    expect(winner).toBe(P1);
  });
  test("Bottom row wins", () => {
    const state = [
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [P1, P1, P1],
    ];
    const winner = checkWinner(state);
    expect(winner).toBe(P1);
  });
  test("No winner 1", () => {
    const state = [
      [P1, EMPTY, EMPTY],
      [EMPTY, P2, EMPTY],
      [P1, EMPTY, P2],
    ];
    const winner = checkWinner(state);
    expect(winner).toBe(null);
  });
  test("No winner 2", () => {
    const state = [
      [P2, P1, P1],
      [EMPTY, P1, EMPTY],
      [EMPTY, EMPTY, P2],
    ];
    const winner = checkWinner(state);
    expect(winner).toBe(null);
  });
  test("No winner 3", () => {
    const state = [
      [P2, P1, P2],
      [EMPTY, P2, EMPTY],
      [P1, EMPTY, P1],
    ];
    const winner = checkWinner(state);
    expect(winner).toBe(null);
  });
  test("Diag wins 1", () => {
    const state = [
      [P1, EMPTY, EMPTY],
      [EMPTY, P1, EMPTY],
      [P2, P2, P1],
    ];
    const winner = checkWinner(state);
    expect(winner).toBe(P1);
  });
  test("Diag wins 2", () => {
    const state = [
      [EMPTY, EMPTY, P1],
      [EMPTY, P1, P2],
      [P1, P2, EMPTY],
    ];
    const winner = checkWinner(state);
    expect(winner).toBe(P1);
  });
  test("Diag wins 3", () => {
    const state = [
      [EMPTY, EMPTY, P2],
      [EMPTY, P2, P1],
      [P2, P1, P1],
    ];
    const winner = checkWinner(state);
    expect(winner).toBe(P2);
  });
  test("col 0 wins", () => {
    const state = [
      [P1, EMPTY, EMPTY],
      [P1, EMPTY, EMPTY],
      [P1, EMPTY, EMPTY],
    ];
    const winner = checkWinner(state);
    expect(winner).toBe(P1);
  });
  test("col 0 wins", () => {
    const state = [
      [P1, P2, EMPTY],
      [P1, P2, EMPTY],
      [P1, EMPTY, EMPTY],
    ];
    const winner = checkWinner(state);
    expect(winner).toBe(P1);
  });
  test("col 1 wins", () => {
    const state = [
      [P2, P1, EMPTY],
      [P2, P1, EMPTY],
      [EMPTY, P1, EMPTY],
    ];
    const winner = checkWinner(state);
    expect(winner).toBe(P1);
  });
  test("col 2 wins", () => {
    const state = [
      [EMPTY, P2, P1],
      [EMPTY, P2, P1],
      [EMPTY, EMPTY, P1],
    ];
    const winner = checkWinner(state);
    expect(winner).toBe(P1);
  });
  test("Draw", () => {
    const state = [
      [P1, P1, P2],
      [P2, P2, P1],
      [P1, P2, P1],
    ];
    const winner = checkWinner(state);
    expect(winner).toBe("draw");
  });
});

describe("computerBestMove", () => {
  test("winning move 1", () => {
    const state = [
      [P1, P1, EMPTY],
      [P2, P2, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ];
    const move = computerBestMove(P1, state);
    expect(move).toEqual([0, 2]);
  });
  test("winning move 2", () => {
    const state = [
      [P1, P2, EMPTY],
      [P1, P2, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ];
    const move = computerBestMove(P1, state);
    expect(move).toEqual([2, 0]);
  });
  test("winning move 3", () => {
    const state = [
      [P2, EMPTY, P1],
      [EMPTY, P1, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ];
    const move = computerBestMove(P2, state);
    expect(move).toEqual([2, 0]);
  });
  test("winning move 4", () => {
    const state = [
      [P2, EMPTY, P1],
      [EMPTY, P1, EMPTY],
      [P2, EMPTY, EMPTY],
    ];
    const move = computerBestMove(P1, state);
    expect(move).toEqual([1, 0]);
  });
  test("winning move 5", () => {
    const state = [
      [P2, EMPTY, P1],
      [P1, P1, EMPTY],
      [P2, EMPTY, EMPTY],
    ];
    const move = computerBestMove(P2, state);
    expect(move).toEqual([1, 2]);
  });
  test("winning move 6", () => {
    const state = [
      [P2, EMPTY, P1],
      [P1, P1, P2],
      [P2, P1, EMPTY],
    ];
    const move = computerBestMove(P2, state);
    expect(move).toEqual([0, 1]);
  });
  test("winning move 7", () => {
    const state = [
      [P2, P2, P1],
      [P1, P1, P2],
      [P2, P1, EMPTY],
    ];
    const move = computerBestMove(P1, state);
    expect(move).toEqual([2, 2]);
  });
  test("winning move 8", () => {
    const state = [
      [P1, P1, P2],
      [P1, P2, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ];
    const move = computerBestMove(P2, state);
    expect(move).toEqual([2, 0]);
  });
  test("winning move 9", () => {
    const state = [
      [P1, P1, P2],
      [EMPTY, P2, EMPTY],
      [EMPTY, EMPTY, EMPTY],
    ];
    const move = computerBestMove(P1, state);
    expect(move).toEqual([2, 0]);
  });
});
