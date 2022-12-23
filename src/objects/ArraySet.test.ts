import ArraySet from './ArraySet';

describe('test ArraySet', () => {

  const aSet = new ArraySet();

  it('should have [1,1]', () => {
    aSet.add([1, 1]);
    expect(aSet.has([1, 1])).toBeTruthy();
  });

  it('should not have [1,2]', () => {
    aSet.add([1, 2]);
    expect(aSet.has([1, 2])).toBeTruthy();

  });

});
