import ArraySet from '../../ArraySet';
import { IArraySetType, IChessBoard, IChessPlayer, IPiecePos } from '../../types';
import { Piece } from '../Piece';
import { traverseKingMoves } from '../util';

class King extends Piece {

  constructor(i: number, j: number, belongsTo: IChessPlayer, representation: string) {
    super(i, j, belongsTo, representation);
  }

  availableMoves(board: IChessBoard): IArraySetType {
    const moves = new ArraySet();
    moves.add(board.validMoves(traverseKingMoves(this.row, this.col), this));
    return moves;
  }

}

export { King };
