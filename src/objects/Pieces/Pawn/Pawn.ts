import { Piece } from "../Piece";
import { Board, ChessPlayer, PiecePos } from "../../types";

class Pawn extends Piece {

    firstMove = true;
    placedOnBottomSide = false;
    _inc = 1;
    constructor(i: number, j: number, belongsTo: ChessPlayer, representation: string) {

        super(i, j, belongsTo, representation)
        this.placedOnBottomSide = (i === 6);
        this._inc = this.placedOnBottomSide ? -1 : 1;

    }

    // todo make consider diagonal eating pos


    availableMoves(board: Board) {

        // for now only return vertical movment
        console.log('moves',this.placedOnBottomSide);

        return this._verticalMovement();

    }

    // movent for pawn goin up
    _upLoop(initTialPos: number, finalPos: number) {
        const moves: PiecePos[] = [];
        console.log(initTialPos,finalPos,this._inc)
        initTialPos = initTialPos + this._inc;
        for (let i = initTialPos; i >= finalPos; i += this._inc) {
            console.log('i',i)
            moves.push([i, this.col]);
        }

        return moves;
    }

    // movent for pawn goin down
    _downLoop(initTialPos: number, finalPos: number) {
        const moves: PiecePos[] = [];
        initTialPos = initTialPos + this._inc;
        for (let i = initTialPos; i <= finalPos; i += this._inc) {
            moves.push([i, this.col]);
        }

        return moves;

    }

    _verticalMovement() {
        const rowPos = this.row;
        const maxDis = this.firstMove ? ((this._inc * 2) + rowPos) : ((this._inc * 1) + rowPos);
        if (this.placedOnBottomSide)
            return this._upLoop(rowPos, maxDis);
        return this._downLoop(rowPos, maxDis);
    }

    

}

export { Pawn };