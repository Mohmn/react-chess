import {
  IBoard,
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
  // check(board)

}

export { Piece };