import { IPiecePos } from '../types';

const CHESSBOARDSIZE = 7;

const knightsAllAvailableMoves: IPiecePos[] = [
  [-2, 1], [-2, -1], [2, 1], [2, -1],
  [-1, 2], [-1, -2], [1, 2], [1, -2]
];

const kingsAllAvailableMoves: IPiecePos[] = [
  [-1, 1], [-1, -1], [1, 1], [1, -1],
  [1, 0], [-1, 0], [0, 1], [0, -1]
];

function traverseUpVerticaly(row: number, col: number): IPiecePos[] {
  const moves: IPiecePos[] = [];
  for (let i = row - 1; i >= 0; i--) {
    moves.push([i, col]);
  }
  return moves;
}

function traverseDownVerticaly(row: number, col: number): IPiecePos[] {
  const moves: IPiecePos[] = [];
  for (let i = row + 1; i <= CHESSBOARDSIZE; i++) {
    moves.push([i, col]);
  }
  return moves;
}

function traverseRightHorizontly(row: number, col: number): IPiecePos[] {
  const moves: IPiecePos[] = [];
  for (let i = col + 1; i <= CHESSBOARDSIZE; i++) {
    moves.push([row, i]);
  }
  return moves;
}

function traverseLeftHorizontly(row: number, col: number): IPiecePos[] {
  const moves: IPiecePos[] = [];
  for (let i = col - 1; i >= 0; i--) {
    moves.push([row, i]);
  }
  return moves;
}

function traversRightDownDiagonaly(row: number, col: number): IPiecePos[] {
  const moves: IPiecePos[] = [];
  let i = row + 1, j = col + 1;
  while (i <= CHESSBOARDSIZE && j <= CHESSBOARDSIZE) {
    moves.push([i, j]);
    i++;
    j++;
  }
  return moves;

}

function traversLeftUpDiagonaly(row: number, col: number): IPiecePos[] {
  const moves: IPiecePos[] = [];
  let i = row - 1, j = col - 1;
  while (i >= 0 && j >= 0) {
    moves.push([i, j]);
    i--;
    j--;
  }
  return moves;
}

function traversLeftDownDiagonaly(row: number, col: number): IPiecePos[] {
  const moves: IPiecePos[] = [];
  let i = row + 1, j = col - 1;
  while (i <= CHESSBOARDSIZE && j >= 0) {
    moves.push([i, j]);
    i++;
    j--;
  }
  return moves;
}

function traversRightUpDiagonaly(row: number, col: number): IPiecePos[] {
  const moves: IPiecePos[] = [];
  let i = row - 1, j = col + 1;
  while (i >= 0 && j <= CHESSBOARDSIZE) {
    moves.push([i, j]);
    i--;
    j++;
  }
  return moves;
}

function traverseKnightMoves(row: number, col: number): IPiecePos[] {

  const moves: IPiecePos[] = [];
  for (let i = 0; i < knightsAllAvailableMoves.length; i++) {

    const pos = knightsAllAvailableMoves[i];
    const validRow = IsValidMove(row + pos[0], row + pos[0]);
    const validCol = IsValidMove(col + pos[1], col + pos[1]);

    if (validCol && validRow) {
      moves.push([row + pos[0], col + pos[1]]);
    }
  }

  return moves;
}

function traverseKingMoves(row: number, col: number): IPiecePos[] {

  const moves: IPiecePos[] = [];
  for (let i = 0; i < kingsAllAvailableMoves.length; i++) {

    const pos = kingsAllAvailableMoves[i];
    const validRow = IsValidMove(row + pos[0], row + pos[0]);
    const validCol = IsValidMove(col + pos[1], col + pos[1]);

    if (validCol && validRow) {
      moves.push([row + pos[0], col + pos[1]]);
    }
  }

  return moves;
}

function IsValidMove(row: number, col: number): boolean {
  const validRow = (row < 8 && row > - 1);
  const validCol = (col < 8 && col > -1);
  return validRow && validCol;
}

function arePosEqual(pos1: IPiecePos | null, pos2: IPiecePos | null) {
  if (!pos1 || !pos2) return false;
  return (pos1[0] === pos2[0]) && (pos1[1] === pos2[1]);
}

export {
  IsValidMove, 
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
  arePosEqual,
};
