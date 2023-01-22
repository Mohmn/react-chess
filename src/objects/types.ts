interface IChessPlayer {

  type: string;

  updateTurn: () => void;

  firstTurn: () => boolean;

  secondTurn: () => boolean;
}

type IBoard = (IChessPiece | null)[][];

type IPiecePos = [number, number];

interface IChessPiece {

  row: number;

  col: number;

  belongsTo: IChessPlayer;

  representation: string;

  getPos: () => IPiecePos;

  getRow: () => number;

  getCol: () => number;

  setPos: (row: number, col: number) => void;

  render: () => string;

  availableMoves: (board: IChessBoard) => IArraySetType;

  name(): string;
}

interface IChessBoard {
  board: IBoard;
  player1: IChessPlayer;
  player2: IChessPlayer;
  kingPos: IPiecePos[];
  validMoves: (moves: IPiecePos[], attackingPiece: IChessPiece) => IPiecePos[];
  getPiece: (row: number, col: number) => IChessPiece | null;
  IsOppPiece: (row: number, col: number, piece: IChessPiece) => [boolean, IChessPiece | null];
  movePiece: (row: number, col: number, piece: IChessPiece | null) => void;
}

interface IArraySetType {
  add: (pos: IPiecePos | IPiecePos[]) => void;
  has: (pos: IPiecePos) => boolean;
  toArray(): Array<IPiecePos>;
}

export type {
  IChessPiece,
  IBoard,
  IChessPlayer,
  IPiecePos,
  IArraySetType,
  IChessBoard
};