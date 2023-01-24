import { IChessPiece, IChessPlayer, IBoard, IPiecePos, IChessBoard } from './types';
import { Pawn, Knight, King, Queen, Rook, Bishop } from './Pieces';
import {
  traverseDownVerticaly,
  traverseUpVerticaly,
  traverseLeftHorizontly,
  traverseRightHorizontly,
  traversRightUpDiagonaly,
  traversRightDownDiagonaly,
  traversLeftUpDiagonaly,
  traversLeftDownDiagonaly,
  traverseKnightMoves,
  traverseKingMoves,
  IsValidMove
} from './Pieces/util';

function makePiece(pos: number[], belongsTo: IChessPlayer, type: string): IChessPiece {

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

function makeChessBoard(players: IChessPlayer[]): IBoard {

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

class ChessBoard implements IChessBoard {

  private _board: IBoard;
  player1: IChessPlayer;
  player2: IChessPlayer;
  kingPos: IPiecePos[];

  constructor(players: IChessPlayer[]) {
    this.player1 = players[0];
    this.player2 = players[1];
    this._board = makeChessBoard(players);
    this.kingPos = [];
    for (let i = 0; i < this._board.length; i++) {
      for (let j = 0; j < this._board.length; j++) {
        const piece = this._board[i][j];
        if (piece && piece.constructor.name === 'King') {
          this.kingPos.push([i, j]);
        }
      }
    }
  }

  validMoves(moves: IPiecePos[], attackingPiece: IChessPiece): IPiecePos[] {

    // later on addCheck checks too
    return moves.filter((move) => {
      const [row, col] = move;
      const [aRow, aCol] = attackingPiece.getPos();
      const currentPiece = this.getPiece(row, col);
      this.movePiece(row, col, attackingPiece);
      this.movePiece(aRow, aCol, null);
      const moveWouldCauseCheck = this.moveWouldCauseCheck(attackingPiece);
      this.movePiece(row, col, currentPiece);
      this.movePiece(aRow,aCol,attackingPiece);
      return !moveWouldCauseCheck;
    });
  }

  private moveWouldCauseCheck(attackingPiece: IChessPiece) {
    // let that move happen
    // after that check for is king in danger
    // king in danger means
    // diagonaly must contain opp qn,bsp
    // vertaill must constain opp qn, rook
    // then check for opp knight
    // immediate diagonles pwn 
    let check = false;

    const callBack = (movePos: IPiecePos, piecesToLookOutFor: string[], checkEveyMove = false) => {
      const [exists, oppPiece] = this.IsOppPiece(...movePos, attackingPiece);
      if (!exists) return true;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (piecesToLookOutFor.includes(oppPiece!.name())) {
        check = true;
        return false;
      } else {
        // here it would mean that piece countered its own piece
        if (!checkEveyMove) return false;
      }
    };
    const [row, col] = this.IsOppPiece(...this.kingPos[0], attackingPiece)[0] ? this.kingPos[1] : this.kingPos[0];
    console.log('king row col', row, col);
    traversLeftDownDiagonaly(row, col).every((move) => callBack(move, ['Queen', 'Bishop']));
    if (check) return true;
    traversRightDownDiagonaly(row, col).every((move) => callBack(move, ['Queen', 'Bishop']));
    if (check) return true;
    traversLeftUpDiagonaly(row, col).every((move) => callBack(move, ['Queen', 'Bishop']));
    if (check) return true;
    traversRightUpDiagonaly(row, col).every((move) => callBack(move, ['Queen', 'Bishop']));
    if (check) return true;

    traverseDownVerticaly(row, col).every((move) => callBack(move, ['Queen', 'Rook']));
    if (check) return true;
    traverseUpVerticaly(row, col).every((move) => callBack(move, ['Queen', 'Rook']));
    if (check) return true;
    traverseLeftHorizontly(row, col).every((move) => callBack(move, ['Queen', 'Rook']));
    if (check) return true;
    traverseRightHorizontly(row, col).every((move) => callBack(move, ['Queen', 'Rook']));
    if (check) return true;

    // [1,-1],[1,1]
    // immediate upperpawns
    [[-1 + row, -1 + col], [-1 + row, 1 + col]].filter(mv => IsValidMove(mv[0], mv[1]))
      .every((movePos) => {

        // this code here checks if kings immediate diagonlas are opp pawns and can it the king
        const [exists, oppPiece] = this.IsOppPiece(...movePos as IPiecePos, attackingPiece);
        if (!exists) return true;

        if (oppPiece?.name() === 'Pawn') {
          if (!(oppPiece as Pawn).placedOnBottomSide) {
            check = true;
            return false;
          }
        }
      });
    if (check) return true;

    // this code here checks if kings immediate diagonlas are opp pawns and can it the king
    [[1 + row, -1 + col], [1 + row, 1 + col]].filter(mv => IsValidMove(mv[0], mv[1]))
      .every((movePos) => {

        const [exists, oppPiece] = this.IsOppPiece(...movePos as IPiecePos, attackingPiece);
        if (!exists) return true;

        if (oppPiece?.name() === 'Pawn') {
          if ((oppPiece as Pawn).placedOnBottomSide) {
            check = true;
            return false;
          }
        }
      });
    if (check) return true;

    traverseKnightMoves(row, col).every((move) => callBack(move, ['Knight'], true));
    if (check) return true;

    traverseKingMoves(row, col).every((move) => callBack(move, ['Knight'], true));
    if (check) return true;

    return false;
  }

  public get board() {
    return this._board;
  }

  public set board(board: IBoard) {
    this._board = board;
  }

  getPiece(row: number, col: number): IChessPiece | null {
    if (!IsValidMove(row,col)) {
      throw new Error(`row${row} or col${col} values cant exede chess board size limit `);
    }

    return this._board[row][col];
  }

  IsOppPiece(row: number, col: number, piece: IChessPiece): [boolean, IChessPiece | null] {
    const pieceToCheck = this.getPiece(row, col);
    if (!pieceToCheck) return [false, pieceToCheck];
    return [pieceToCheck.belongsTo !== piece.belongsTo, pieceToCheck];
  }
  
  movePiece(row: number, col: number, piece: IChessPiece | null) {
    this._board[row][col] = piece;
    if(piece) piece.setPos(row,col);
  }
}
export { makeChessBoard, makePiece, ChessBoard };