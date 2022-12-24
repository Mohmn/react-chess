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

    const itr = this.uniqueElms.values() ;
    let strPos = itr.next();
    while(!strPos.done){
      pos.push(JSON.parse(strPos.value) as PiecePos);
      strPos = itr.next();
    }
    return pos;
  }

}