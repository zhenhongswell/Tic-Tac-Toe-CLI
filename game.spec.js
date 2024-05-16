// to test game.js function
const { sum } = require("./game.js");

describe("sum", () => {
  test("1+1", () => {
    expect(sum(1, 1)).toBe(2);
  });
  test("1+2", () => {
    expect(sum(1, 2)).toBe(3);
  });
  test("-100+3", () => {
    expect(sum(-100, 3)).toBe(-97);
  });
});
