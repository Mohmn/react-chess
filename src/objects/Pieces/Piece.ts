import {
  IChessPiece,
  IChessPlayer,
  IPiecePos,
  IArraySetType,
  IChessBoard
} from '../types';

abstract class Piece implements IChessPiece {

  row: number;
  col: number;
  belongsTo: IChessPlayer;
  representation: string;

  constructor(row: number, col: number, belongsTo: IChessPlayer, representation: string) {
    this.row = row;
    this.col = col;
    this.belongsTo = belongsTo;
    this.representation = representation;
  }

  // abstract makeNoise(): void;

  abstract availableMoves(board: IChessBoard): IArraySetType;

  render() {
    return this.representation;
  }

  getPos(): IPiecePos {
    return [this.row, this.col];
  }

  getRow() {
    return this.row;
  }

  getCol() {
    return this.col;
  }

  setPos(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  name() {
    return this.constructor.name;
  }
  
  protected filterAttackOnOwnPieces(moves: IPiecePos[], board: IChessBoard, checkEachMove = false) {
    const filterdMoves: IPiecePos[] = [];
    for (let i = 0; i < moves.length; i++) {
      const move = [moves[i][0], moves[i][1]];
      const piece = board.getPiece(move[0], move[1]);
      if (!piece) filterdMoves.push([move[0], move[1]]);
      else {
        const oppPiece = piece.belongsTo !== this.belongsTo;
        if (oppPiece) {
          filterdMoves.push([move[0], move[1]]);
        }
        if(!checkEachMove) break;
      }
    }
    return filterdMoves;
  }

}

export { Piece };