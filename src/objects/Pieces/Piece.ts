import {
	Board,
	ChessPiece,
	ChessPlayer,
	PiecePos,
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

	abstract availableMoves(board: Board): PiecePos[];

	render() {
		return this.representation;
	}

	getPos(): PiecePos {
		return [this.row, this.col]
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

}

export { Piece };