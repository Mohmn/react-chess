import {
  traversRightUpDiagonaly,
  traversRightDownDiagonaly,
  traversLeftUpDiagonaly,
  traversLeftDownDiagonaly
} from '../util';
import { Piece } from '../Piece';
import { IArraySetType, IBoard, IChessBoard, IChessPlayer } from '../../types';
import ArraySet from '../../ArraySet';

class Bishop extends Piece {
  // representation for now is going to alphabets
  // later on it will be links to icons or images
  constructor(i: number, j: number, belongsTo: IChessPlayer, representation: string) {
    super(i, j, belongsTo, representation);
  }

  availableMoves(board: IChessBoard): IArraySetType {
    const rightDgnUpMoves = traversRightUpDiagonaly(this.row, this.col);
    const rightDgnDwnMoves = traversRightDownDiagonaly(this.row, this.col);
    const leftDgnUpMoves = traversLeftUpDiagonaly(this.row, this.col);
    const leftDgnDownMoves = traversLeftDownDiagonaly(this.row, this.col);

    const moves = new ArraySet();
    moves.add(
      board.validMoves(
        [
          ...rightDgnUpMoves,
          ...rightDgnDwnMoves,
          ...leftDgnUpMoves,
          ...leftDgnDownMoves,
        ],
        this)
    );
    return moves;
  }
}

export { Bishop };
