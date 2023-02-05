import ArraySet from '../ArraySet';
import { IChessPlayer, IChessBoard, IArraySetType } from '../types';
import { Piece } from './Piece';
import {
  traversRightUpDiagonaly,
  traversRightDownDiagonaly,
  traversLeftUpDiagonaly,
  traversLeftDownDiagonaly,
  traverseLeftHorizontly,
  traverseRightHorizontly,
  traverseUpVerticaly,
  traverseDownVerticaly
} from './util';

class Queen extends Piece {

  constructor(i: number, j: number, belongsTo: IChessPlayer, representation: string) {
    super(i, j, belongsTo, representation);
  }

  availableMoves(board: IChessBoard): IArraySetType {
    
    const rightDgnUpMoves = traversRightUpDiagonaly(this.row, this.col);
    const rightDgnDwnMoves = traversRightDownDiagonaly(this.row, this.col);
    const leftDgnUpMoves = traversLeftUpDiagonaly(this.row, this.col);
    const leftDgnDownMoves = traversLeftDownDiagonaly(this.row, this.col);
    const horizontalLeftMoves = traverseLeftHorizontly(this.row, this.col);
    const horizontalRightMoves = traverseRightHorizontly(this.row, this.col);
    const verticalUpMoves = traverseUpVerticaly(this.row, this.col);
    const verticalDownMoves = traverseDownVerticaly(this.row, this.col);

    const moves = new ArraySet();
    moves.add(
      board.validMoves(
        [
          ...this.filterAttackOnOwnPieces(rightDgnUpMoves, board),
          ...this.filterAttackOnOwnPieces(rightDgnDwnMoves, board),
          ...this.filterAttackOnOwnPieces(leftDgnUpMoves, board),
          ...this.filterAttackOnOwnPieces(leftDgnDownMoves, board),
          ...this.filterAttackOnOwnPieces(horizontalLeftMoves, board),
          ...this.filterAttackOnOwnPieces(horizontalRightMoves, board),
          ...this.filterAttackOnOwnPieces(verticalUpMoves, board),
          ...this.filterAttackOnOwnPieces(verticalDownMoves, board),
        ],
        this
      )
    );
    return moves;
  }
}

export { Queen };
