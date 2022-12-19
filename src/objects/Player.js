class Player {
  _turnType = {
    first: "first",
    second: "second"
  };

  constructor (type) {
    this._turn = this._turnType.first;
    this.type = type;
  }

  updateTurn () {
    this._turn = this.firstTurn() ? this._turnType.second : this._turnType.first;
  }

  firstTurn () {
    return this._turn === this._turnType.first;
  }

  secondTurn () {
    return this._turn === this._turnType.second;
  }

  // pieceSelected(piece) {}
}

export default Player;
