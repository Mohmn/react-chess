import {PiecePos, ArraySetType} from './types';

export default class ArraySet implements ArraySetType {

  private uniqueElms = new Set<string>();
  
  add(pos: PiecePos | PiecePos[]) {
    if(Array.isArray(pos[0])) {
      for (let i=0;i<pos.length;i++) {
        const stringfiedValue = JSON.stringify(pos[i]);
        this.uniqueElms.add(stringfiedValue);
      }
      return;
    }

    const stringfiedValue = JSON.stringify(pos);
    this.uniqueElms.add(stringfiedValue);
  }

  has(pos: PiecePos): boolean {
    const stringfiedValue = JSON.stringify(pos);
    return this.uniqueElms.has(stringfiedValue);
  }

  toArray(): Array<PiecePos> {
    const pos = [];
    for (const strPos of this.uniqueElms.values()) {
      pos.push(JSON.parse(strPos) as PiecePos);
    }
    console.log('ddd',this.uniqueElms,pos);
    return pos;
  }

}