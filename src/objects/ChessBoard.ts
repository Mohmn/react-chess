import { ChessPiece, ChessPlayer } from './types';
import { Pawn, Knight, King, Queen, Rook, Bishop } from './Pieces';

function makePiece(pos: number[], belongsTo: ChessPlayer, type: string): ChessPiece {

  const representation = type.toLowerCase();

  switch (representation) {
    case 'r':
      return new Rook(pos[0], pos[1], belongsTo, type);
    case 'p':
      return new Pawn(pos[0], pos[1], belongsTo, type);
    case 'k':
      return new King(pos[0], pos[1], belongsTo, type);
    case 'n':
      return new Knight(pos[0], pos[1], belongsTo, type);
    case 'q':
      return new Queen(pos[0], pos[1], belongsTo, type);
    case 'b':
      return new Bishop(pos[0], pos[1], belongsTo, type);
    default:
      throw new Error(`Invalid Piece type ${type}`);
  }
}

function makeChessBoard(players: ChessPlayer[]): (ChessPiece | null)[][] {

  const [p1, p2] = players;

  return [
    [
      makePiece([0, 0], p1, 'R'), makePiece([0, 1], p1, 'N'), makePiece([0, 2], p1, 'B'),
      makePiece([0, 3], p1, 'Q'), makePiece([0, 4], p1, 'K'), makePiece([0, 5], p1, 'B'),
      makePiece([0, 6], p1, 'N'), makePiece([0, 7], p1, 'R')
    ],
    [
      makePiece([1, 0], p1, 'p'), makePiece([1, 1], p1, 'p'), makePiece([1, 2], p1, 'p'),
      makePiece([1, 3], p1, 'p'), makePiece([1, 4], p1, 'p'), makePiece([1, 5], p1, 'p'),
      makePiece([1, 6], p1, 'p'), makePiece([1, 7], p1, 'p')
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
      makePiece([6, 0], p2, 'p'), makePiece([6, 1], p2, 'p'), makePiece([6, 2], p2, 'p'),
      makePiece([6, 3], p2, 'p'), makePiece([6, 4], p2, 'p'), makePiece([6, 5], p2, 'p'), 
      makePiece([6, 6], p2, 'p'), makePiece([6, 7], p2, 'p')
    ],
    [ 
      makePiece([7, 0], p2, 'R'), makePiece([7, 1], p2, 'N'), makePiece([7, 2], p2, 'B'), 
      makePiece([7, 3], p2, 'Q'), makePiece([7, 4], p2, 'K'), makePiece([7, 5], p2, 'B'), 
      makePiece([7, 6], p2, 'N'), makePiece([7, 7], p2, 'R')
    ],
  ];
}

export { makeChessBoard, makePiece };