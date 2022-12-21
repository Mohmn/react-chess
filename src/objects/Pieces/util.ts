import { PiecePos } from '../types';

const CHESSBOARDSIZE = 7;

function traverseUpVerticaly(row: number, col: number): PiecePos[] {
  const moves: PiecePos[] = [];
  for (let i = row - 1; i >= 0; i--) {
    moves.push([i, col]);
  }
  return moves;
}

function traverseDownVerticaly(row: number, col: number): PiecePos[] {
  const moves: PiecePos[] = [];
  for (let i = row + 1; i <= CHESSBOARDSIZE; i++) {
    moves.push([i, col]);
  }
  return moves;
}

function traverseRightHorizontly(row: number, col: number): PiecePos[] {
  const moves: PiecePos[] = [];
  for (let i = col + 1; i <= CHESSBOARDSIZE; i++) {
    moves.push([row, i]);
  }
  return moves;
}

function traverseLeftHorizontly(row: number, col: number): PiecePos[] {
  const moves: PiecePos[] = [];
  for (let i = col - 1; i >= 0; i--) {
    moves.push([row, i]);
  }
  return moves;
}

function traversRightDownDiagonaly(row: number, col: number): PiecePos[] {
  const moves: PiecePos[] = [];
  let i = row + 1, j = col + 1;
  while (i <= CHESSBOARDSIZE && j <= CHESSBOARDSIZE) {
    moves.push([i, j]);
    i++;
    j++;
  }
  return moves;

}

function traversRightUpDiagonaly(row: number, col: number): PiecePos[] {
  const moves: PiecePos[] = [];
  let i = row - 1, j = col - 1;
  while (i >= 0 && j >= 0) {
    moves.push([i, j]);
    i--;
    j--;
  }
  return moves;
}

function traversLeftDownDiagonaly(row: number, col: number): PiecePos[] {
  const moves: PiecePos[] = [];
  let i = row + 1, j = col - 1;
  while (i <= CHESSBOARDSIZE && j >= 0) {
    moves.push([i, j]);
    i++;
    j--;
  }
  return moves;
}

function traversLeftUpDiagonaly(row: number, col: number): PiecePos[] {
  const moves: PiecePos[] = [];
  let i = row - 1, j = col + 1;
  while (i >= 0 && j <= CHESSBOARDSIZE) {
    moves.push([i, j]);
    i--;
    j++;
  }
  return moves;
}

export {
  traverseDownVerticaly,
  traverseUpVerticaly,
  traverseLeftHorizontly,
  traverseRightHorizontly,
  traversRightUpDiagonaly,
  traversRightDownDiagonaly,
  traversLeftUpDiagonaly,
  traversLeftDownDiagonaly
};
