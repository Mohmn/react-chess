import { ChessPlayer } from './types';

class Player implements ChessPlayer {

  private _turnType = {
    first: 'first',
    second: 'second',
  };

  private _turn: string;
  type: string;

  constructor(type: string) {
    this._turn = this._turnType.first;
    this.type = type;
  }

  firstTurn () {
    return this._turn === this._turnType.first;
  }

  secondTurn () {
    return this._turn === this._turnType.second;
  }

  updateTurn () {
    this._turn = this.firstTurn() ? this._turnType.second : this._turnType.first;
  }

  // pieceSelected(piece) {}
}

export default Player;
