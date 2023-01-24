import {
  traverseDownVerticaly,
  traverseUpVerticaly,
  traverseLeftHorizontly,
  traverseRightHorizontly,
} from '../util';
import { Piece } from '../Piece';
import { IChessBoard, IChessPlayer } from '../../types';
import ArraySet from '../../ArraySet';

class Rook extends Piece {
  // representation for now is going to alphabets
  // later on it will be links to icons or images
  constructor(i: number, j: number, belongsTo: IChessPlayer, representation: string) {
    super(i, j, belongsTo, representation);
  }

  availableMoves(board: IChessBoard): ArraySet {
    const moves = new ArraySet();

    // Todp: checks to make here for checking opp players

    const horizontalLeftMoves = traverseLeftHorizontly(this.row,this.col);
    const horizontalRightMoves = traverseRightHorizontly(this.row,this.col);
    const verticalUpMoves = traverseUpVerticaly(this.row,this.col);
    const verticalDownMoves = traverseDownVerticaly(this.row,this.col);

    moves.add(
      board.validMoves(
        [
          ...this.filterAttackOnOwnPieces(horizontalLeftMoves,board),
          ...this.filterAttackOnOwnPieces(horizontalRightMoves,board),
          ...this.filterAttackOnOwnPieces(verticalUpMoves,board),
          ...this.filterAttackOnOwnPieces(verticalDownMoves,board),
        ]
        ,this)
    );

    return moves;

  }

}

export { Rook };
