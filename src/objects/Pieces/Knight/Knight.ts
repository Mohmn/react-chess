import ArraySet from '../../ArraySet';
import { IArraySetType, IChessBoard, IChessPlayer, IPiecePos } from '../../types';
import { Piece } from '../Piece';
import { traverseKnightMoves } from '../util';

class Knight extends Piece {
  // representation for now is going to alphabets
  // later on it will be links to icons or images
  constructor(i: number, j: number, belongsTo: IChessPlayer, representation: string) {
    super(i, j, belongsTo, representation);
  }

  availableMoves(board: IChessBoard): IArraySetType {
    const moves = new ArraySet();
    moves.add(board.validMoves(traverseKnightMoves(this.row, this.col), this));
    return moves;
  }


}

export { Knight };
