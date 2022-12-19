import {
    traverseDownVerticaly,
    traverseUpVerticaly,
    traverseLeftHorizontly,
    traverseRightHorizontly,
    traversRightUpDiagonaly,
    traversRightDownDiagonaly,
    traversLeftUpDiagonaly,
    traversLeftDownDiagonaly,
} from './util';


describe('test util traversing funcs', () => {

    it('horizontal traverse right test', () => {
        const moves = traverseRightHorizontly(3, 5);
        const expectedMoves = [[3, 6], [3, 7]];
        expect(moves).toEqual(expectedMoves);
    })

    it('horizontal traverse left test', () => {
        const moves = traverseLeftHorizontly(3, 5);
        const expectedMoves = [[3, 4], [3, 3], [3, 2], [3, 1], [3, 0]];
        expect(moves).toEqual(expectedMoves);
    })

    it('vertical traverse up test', () => {
        const moves = traverseUpVerticaly(2, 5);
        const expectedMoves = [[1, 5], [0, 5]];
        expect(moves).toEqual(expectedMoves);
    })

    it('vertical traverse down test', () => {
        const moves = traverseDownVerticaly(2, 5);
        const expectedMoves = [[3, 5], [4, 5], [5, 5], [6, 5], [7, 5]];
        expect(moves).toEqual(expectedMoves);
    })

    it('diagonal traverse right down test', () => {
        const moves = traversRightDownDiagonaly(3, 3);
        const expectedMoves = [[4, 4], [5, 5], [6, 6], [7, 7]];
        expect(moves).toEqual(expectedMoves);
    })

    it('diagonal traverse right up test', () => {
        const moves = traversRightUpDiagonaly(3, 5);
        const expectedMoves = [[2, 4], [1, 3],[0,2]];
        expect(moves).toEqual(expectedMoves);
    })

    it('diagonal traverse left down test', () => {
        const moves = traversLeftDownDiagonaly(3, 5);
        const expectedMoves = [[4, 4], [5, 3], [6, 2],[7,1]];
        expect(moves).toEqual(expectedMoves);
    })

    it('diagonal traverse left up test', () => {
        const moves = traversLeftUpDiagonaly(3, 5);
        const expectedMoves = [[2, 6], [1, 7]];
        expect(moves).toEqual(expectedMoves);
    })

})