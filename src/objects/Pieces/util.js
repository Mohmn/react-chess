const CHESSBOARDSIZE = 7;


function traverseUpVerticaly(row, col) {
    const moves = [];
    for (let i = row - 1; i >= 0; i--) {
        moves.push([i, col])
    }
    return moves;
}

function traverseDownVerticaly(row, col) {
    const moves = [];
    for (let i = row + 1; i <= CHESSBOARDSIZE; i++) {
        moves.push([i, col]);
    }
    return moves;
}

function traverseRightHorizontly(row, col) {
    const moves = [];
    for (let i = col + 1; i <= CHESSBOARDSIZE; i++) {
        moves.push([row, i])
    }
    return moves;
}

function traverseLeftHorizontly(row, col) {
    const moves = [];
    for (let i = col - 1; i >= 0; i--) {
        moves.push([row, i])
    }
    return moves;
}

function traversRightDownDiagonaly(row, col) {
    const moves = [];
    let i = row + 1, j = col + 1;
    while (i <= CHESSBOARDSIZE && j <= CHESSBOARDSIZE) {
        moves.push([i, j]);
        i++;
        j++;
    }
    return moves;

}

function traversRightUpDiagonaly(row, col) {
    const moves = [];
    let i = row - 1, j = col - 1;
    while (i >= 0 && j >= 0) {
        moves.push([i, j]);
        i--;
        j--;
    }
    return moves;
}

function traversLeftDownDiagonaly(row, col) {
    const moves = [];
    let i = row + 1, j = col - 1;
    while (i <= CHESSBOARDSIZE && j >= 0) {
        moves.push([i, j]);
        i++;
        j--;
    }
    return moves;
}

function traversLeftUpDiagonaly(row, col) {
    const moves = [];
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
    traversLeftDownDiagonaly,
}