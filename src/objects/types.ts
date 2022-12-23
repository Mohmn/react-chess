
interface ChessPlayer {

  type: string;

  updateTurn: () => void;

  firstTurn: () => boolean;

  secondTurn: () => boolean;
}

type Board = (ChessPiece | null)[][];

type PiecePos = [number, number];

interface ChessPiece {

  row: number;

  col: number;

  belongsTo: ChessPlayer;

  representation: string;

  getPos: () => PiecePos;

  getRow: () => number;

  getCol: () => number;

  setPos: (row: number, col: number) => void;

  render: () => string;

  availableMoves: (board: Board) => ArraySetType;
}

interface ArraySetType {
  add: (pos: PiecePos) => void;
  has: (pos: PiecePos) => boolean;
}

export type {

  ChessPiece,
  Board,
  ChessPlayer,
  PiecePos,
  ArraySetType

};