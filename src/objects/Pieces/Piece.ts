import {
  Board,
  ChessPiece,
  ChessPlayer,
  PiecePos,
  ArraySetType
} from '../types';

abstract class Piece implements ChessPiece {

  row: number;
  col: number;
  belongsTo: ChessPlayer;
  representation: string;

  constructor(row: number, col: number, belongsTo: ChessPlayer, representation: string) {
    this.row = row;
    this.col = col;
    this.belongsTo = belongsTo;
    this.representation = representation;
  }

  // abstract makeNoise(): void;

  abstract availableMoves(board: Board): ArraySetType;

  render() {
    return this.representation;
  }

  getPos(): PiecePos {
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

  validMoves(moves: PiecePos[], board: Board): PiecePos[] {

    // later on addCheck checks too
    return moves.filter(move => {
      const boardInfo = board[move[0]][move[1]];
      if (!boardInfo) return true;
      return boardInfo.belongsTo !== this.belongsTo;
    });
  }

  name() {
    return this.constructor.name;
  }
  // check(board)

}

export { Piece };