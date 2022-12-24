import { Bishop } from './Bishop';
import Player from '../../Player';
import { makeChessBoard } from '../../ChessBoard';

describe('test Bishop for avilable moves', () => {

  const p1 = new Player('p1');
  const p2 = new Player('p2');
  const b = new Bishop(3, 3, p1, 'p');

  it('should return correct avaiable Moves', () => {
    const moves = b.availableMoves(makeChessBoard([p1, p2])).toArray();
    const expectedMoves = [
      [2, 4], [1, 5], [0, 6], [4, 4], [5, 5], [6, 6], [7, 7],
      [2, 2], [1, 1], [0, 0], [4, 2], [5, 1], [6, 0],
    ];
    expect(moves).toEqual(expectedMoves);
  });
});
