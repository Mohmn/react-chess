import ArraySet from '../../ArraySet';
import { IArraySetType, IBoard, IChessBoard, IChessPlayer, IPiecePos } from '../../types';
import { Piece } from '../Piece';

class Knight extends Piece {
  // representation for now is going to alphabets
  // later on it will be links to icons or images
  constructor(i: number, j: number, belongsTo: IChessPlayer, representation: string) {
    super(i, j, belongsTo, representation);
  }

  availableMoves(board: IChessBoard): IArraySetType {
    // todo add further validation
    const moves = new ArraySet();
    moves.add(board.validMoves(this.moves(), this));
    return moves;
  }

  private moves(): IPiecePos[] {
    const knightsAllAvailableMoves: IPiecePos[] = [
      [-2, 1], [-2, -1], [2, 1], [2, -1],
      [-1, 2], [-1, -2], [1, 2], [1, -2]
    ];

    const moves: IPiecePos[] = [];
    for (let i = 0; i < knightsAllAvailableMoves.length; i++) {

      const pos = knightsAllAvailableMoves[i];
      const validRow = ((this.row + pos[0]) < 8 && (this.row + pos[0]) > -1);
      const validCol = ((this.col + pos[1]) < 8 && (this.col + pos[1]) > -1);

      if (validCol && validRow) {
        moves.push([this.row + pos[0], this.col + pos[1]]);
      }
    }

    return moves;
  }

}

export { Knight };
