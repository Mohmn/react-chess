import { Piece } from '../Piece';
import { IChessBoard, IChessPlayer, IPiecePos } from '../../types';
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

  availableMoves(board: IChessBoard) {
    // for now only return vertical movment
    console.log('moves', this.placedOnBottomSide);
    const moves: ArraySet = new ArraySet();
    const vMoves = this.verticalMovement().filter(move => !board.getPiece(...move));
    // const filteredMoves = this.filterAttackOnOwnPieces(this.verticalMovement(), board,true);
    moves.add(board.validMoves(vMoves, this));
    return moves;
  }

  // movent for pawn goin up
  private upLoop (initTialPos: number, finalPos: number) {
    const moves: IPiecePos[] = [];
    initTialPos = initTialPos + this._inc;
    // eslint-disable-next-line for-direction
    for (let i = initTialPos; i >= finalPos; i += this._inc) {
      moves.push([i, this.col]);
    }

    return moves;
  }

  // movent for pawn goin down
  private downLoop (initTialPos: number, finalPos: number) {
    const moves: IPiecePos[] = [];
    initTialPos = initTialPos + this._inc;
    for (let i = initTialPos; i <= finalPos; i += this._inc) {
      moves.push([i, this.col]);
    }

    return moves;
  }

  private verticalMovement () {
    const rowPos = this.row;
    const maxDis = this.firstMove ? ((this._inc * 2) + rowPos) : ((this._inc * 1) + rowPos);
    this.firstMove = false;
    if (this.placedOnBottomSide) { return this.upLoop(rowPos, maxDis); }
    return this.downLoop(rowPos, maxDis);
  }

}

export { Pawn };
