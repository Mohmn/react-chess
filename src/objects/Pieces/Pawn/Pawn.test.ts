import { Pawn } from './Pawn';
import Player  from '../../Player';
import {makeChessBoard} from '../../ChessBoard';


describe('test pawn for bottow side', () => {

    const p1 = new Player('p1');
    const p2 = new Player('p2');
    const p = new Pawn(6, 6, p1, 'p');

    it('should be placed on bottmom side', () => {
        expect(p.placedOnBottomSide).toBeTruthy();
    })

    it('should return correct avaiable Moves', () => {
        const moves = p.availableMoves(makeChessBoard([p1,p2]));
        const expectedMoves = [[5, 6], [4, 6]];
        expect(moves).toEqual(expectedMoves);

    })

    // p.setPos(5,5)
})

describe('test pawn for upperside side', () => {

    const p1 = new Player('p1');
    const p2 = new Player('p2');
    const p = new Pawn(1, 1, p1, 'p');

    it('should be placed on upper side', () => {
        expect(p.placedOnBottomSide).toBeFalsy();
    })

        const moves = p.availableMoves(makeChessBoard([p1,p2]));
        const expectedMoves = [[2, 1], [3, 1]];
        expect(moves).toEqual(expectedMoves);

});
