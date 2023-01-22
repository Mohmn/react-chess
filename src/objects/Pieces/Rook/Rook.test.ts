import { Rook } from './Rook';
import Player from '../../Player';
import { makeChessBoard } from '../../ChessBoard';

describe('test pawn for bottow side', () => {

  const p1 = new Player('p1');
  const p2 = new Player('p2');
  const rk = new Rook(3, 3, p1, 'p');

  it('should return correct avaiable Moves', () => {
    // const moves = rk.availableMoves(makeChessBoard([p1, p2])).toArray();
    // const expectedMoves = [
    //   [3, 2], [3, 1], [3, 0], [3, 4], [3, 5], [3, 6], [3, 7],
    //   [2, 3], [1, 3], [0, 3], [4, 3], [5, 3], [6, 3], [7, 3]
    // ];
    // expect(moves).toEqual(expectedMoves);
  });
});
