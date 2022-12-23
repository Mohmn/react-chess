
import {PiecePos, ArraySetType} from './types';

export default class ArraySet implements ArraySetType {

  private uniqueElms = new Set<string>();
  
  add(pos: PiecePos) {
    const stringfiedValue = JSON.stringify(pos);
    this.uniqueElms.add(stringfiedValue);
  }

  has(pos: PiecePos): boolean {
    const stringfiedValue = JSON.stringify(pos);
    return this.uniqueElms.has(stringfiedValue);
  }

}