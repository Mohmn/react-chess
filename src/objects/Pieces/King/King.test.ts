import { King } from './King';
import Player from '../../Player';
import { makeChessBoard } from '../../ChessBoard';

describe('test King for avilable moves', () => {

  const p1 = new Player('p1');
  const p2 = new Player('p2');
  const kng = new King(5, 5, p1, 'p');

  it('should return correct avaiable Moves', () => {
    const moves = kng.availableMoves(makeChessBoard([p1, p2])).toArray();
    const expectedMoves = [
      [4, 6], [4, 4], [6, 6], [6, 4],
      [6, 5], [4, 5], [5, 6], [5, 4]
    ];
    expect(moves).toEqual(expectedMoves);
  });
});
