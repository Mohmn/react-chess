import { Piece } from "./Piece";

class Rook extends Piece {

    // representation for now is going to alphabets
    // later on it will be links to icons or images
    constructor(i, j, belongsTo, representation) {
        super(i, j, belongsTo, representation)  
    }

}

export { Rook };