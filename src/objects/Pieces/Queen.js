import { Piece } from './Piece';

class Queen extends Piece {
  constructor (i, j, belongsTo, representation) {
    super(i, j, belongsTo, representation);
  }
}

export { Queen };
