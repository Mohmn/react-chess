import {
  traverseDownVerticaly,
  traverseUpVerticaly,
  traverseLeftHorizontly,
  traverseRightHorizontly,
} from '../util';
import { Piece } from '../Piece';
import { Board, ChessPlayer } from '../../types';
import ArraySet from '../../ArraySet';

class Rook extends Piece {
  // representation for now is going to alphabets
  // later on it will be links to icons or images
  constructor(i: number, j: number, belongsTo: ChessPlayer, representation: string) {
    super(i, j, belongsTo, representation);
  }

  availableMoves(board: Board): ArraySet {
    const moves = new ArraySet();

    // Todp: checks to make here for checking opp players

    const horizontalLeftMoves = traverseLeftHorizontly(this.row,this.col);
    const horizontalRightMoves = traverseRightHorizontly(this.row,this.col);
    const verticalUpMoves = traverseUpVerticaly(this.row,this.col);
    const verticalDownMoves = traverseDownVerticaly(this.row,this.col);

    moves.add([
      ...horizontalLeftMoves,
      ...horizontalRightMoves,
      ...verticalUpMoves,
      ...verticalDownMoves,
    ]);

    return moves;

  }
}

export { Rook };
