class Piece {


	constructor(row, col, belongsTo, representation) {
		this.row = row;
		this.col = col;
		this.belongsTo = belongsTo;
		this.representation = representation;
	}

	render() {
		return this.representation;
	}

	getPos() {
		return [this.row, this.col]
	}

	getRow() {
		return this.row;
	}

	getCol() {
		return this.col;
	}

	setPos(row, col) {
		this.row = row;
		this.col = col;
	}

	// render() {

	// }

}

export { Piece };