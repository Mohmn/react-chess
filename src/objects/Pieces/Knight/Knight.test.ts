import { Knight } from './Knight';
import Player from '../../Player';
import { makeChessBoard } from '../../ChessBoard';

describe('test Knight for avilable moves', () => {

  const p1 = new Player('p1');
  const p2 = new Player('p2');
  const knt = new Knight(5, 5, p1, 'p');

  it('should return correct avaiable Moves', () => {
    const moves = knt.availableMoves(makeChessBoard([p1, p2])).toArray();
    const expectedMoves = [
      [3, 6], [3, 4], [7, 6], [7, 4],
      [4, 7], [4, 3], [6, 7], [6, 3]
    ];
    expect(moves).toEqual(expectedMoves);
  });
});
