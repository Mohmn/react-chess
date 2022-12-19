import { Pawn } from "./Pawn";
import Player from "../../Player";

describe("test pawn for bottow side", () => {
  const pl = new Player("t1");
  const p = new Pawn(6, 6, pl, "p");

  it("should be placed on bottmom side", () => {
    expect(p.placedOnBottomSide).toBeTruthy();
  });

  it("should return correct avaiable Moves", () => {
    const board = []; // for now
    const moves = p.availableMoves(board);
    const expectedMoves = [[5, 6], [4, 6]];
    expect(moves).toEqual(expectedMoves);
  });

  // p.setPos(5,5)
});

describe("test pawn for upperside side", () => {
  const pl = new Player("t1");
  const p = new Pawn(1, 1, pl, "p");

  it("should be placed on upper side", () => {
    expect(p.placedOnBottomSide).toBeFalsy();
  });

  const board = []; // for now
  const moves = p.availableMoves(board);
  const expectedMoves = [[2, 1], [3, 1]];
  expect(moves).toEqual(expectedMoves);
});
