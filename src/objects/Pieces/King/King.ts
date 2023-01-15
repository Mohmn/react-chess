import ArraySet from '../../ArraySet';
import { ArraySetType, Board, ChessPlayer, PiecePos } from '../../types';
import { Piece } from '../Piece';

class King extends Piece {

  constructor(i: number, j: number, belongsTo: ChessPlayer, representation: string) {
    super(i, j, belongsTo, representation);
  }

  availableMoves(board: Board): ArraySetType {
    // todo add further validation
    const moves = new ArraySet();
    moves.add(this.moves());
    return moves;
  }

  private moves(): PiecePos[] {
    const kingsAllAvailableMoves: PiecePos[] = [
      [-1, 1], [-1, -1], [1, 1], [1, -1],
      [1, 0], [-1, 0], [0, 1], [0, -1]
    ];

    const moves: PiecePos[] = [];
    for (let i = 0; i < kingsAllAvailableMoves.length; i++) {

      const pos = kingsAllAvailableMoves[i];
      const validRow = ((this.row + pos[0]) <= 7 || (this.row + pos[0]) >= 0);
      const validCol = ((this.col + pos[1]) <= 7 || (this.col + pos[1]) >= 0);

      if (validCol && validRow) {
        moves.push([this.row + pos[0], this.col + pos[1]]);
      }
    }

    return moves;
  }
}

export { King };