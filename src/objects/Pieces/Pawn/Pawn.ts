import { Piece } from '../Piece';
import { IBoard, IChessBoard, IChessPlayer, IPiecePos } from '../../types';
import ArraySet from '../../ArraySet';

class Pawn extends Piece {
  firstMove = true;
  placedOnBottomSide = false;
  _inc = 1;
  constructor (i: number, j: number, belongsTo: IChessPlayer, representation: string) {
    super(i, j, belongsTo, representation);
    this.placedOnBottomSide = (i === 6);
    this._inc = this.placedOnBottomSide ? -1 : 1;
  }

  // todo make consider diagonal eating pos

  availableMoves (board: IChessBoard) {
    // for now only return vertical movment
    console.log('moves', this.placedOnBottomSide);

    return this._verticalMovement();
  }

  // movent for pawn goin up
  _upLoop (initTialPos: number, finalPos: number) {
    const moves: ArraySet = new ArraySet();
    initTialPos = initTialPos + this._inc;
    // eslint-disable-next-line for-direction
    for (let i = initTialPos; i >= finalPos; i += this._inc) {
      console.log('i', i);
      moves.add([i, this.col]);
    }

    return moves;
  }

  // movent for pawn goin down
  _downLoop (initTialPos: number, finalPos: number) {
    const moves: ArraySet = new ArraySet();
    initTialPos = initTialPos + this._inc;
    for (let i = initTialPos; i <= finalPos; i += this._inc) {
      moves.add([i, this.col]);
    }

    return moves;
  }

  _verticalMovement () {
    const rowPos = this.row;
    const maxDis = this.firstMove ? ((this._inc * 2) + rowPos) : ((this._inc * 1) + rowPos);
    if (this.placedOnBottomSide) { return this._upLoop(rowPos, maxDis); }
    return this._downLoop(rowPos, maxDis);
  }
}

export { Pawn };
