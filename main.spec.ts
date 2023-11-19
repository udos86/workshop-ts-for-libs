import { getNumberOf } from './main';

describe('getNumberOf', () => {

  it('return number when number is passed', () => {
    const value1 = 41;
    const value2 = 0;
    expect(getNumberOf(value1)).toBe(value1);
    expect(getNumberOf(value2)).toBe(value2);
  });

  it('return number of characters when string is passed', () => {
    const value1 = 'Test';
    const value2 = '';
    expect(getNumberOf(value1)).toBe(value1.length);
    expect(getNumberOf(value2)).toBe(value2.length);
  });

  it('return number of elements when array is passed', () => {
    const value = [1, 2, 3, 4, 5];
    expect(getNumberOf(value)).toBe(value.length);
  });

  it('return number of items when map is passed', () => {
    const value = new Map([['test1', 1], ['test2', 2], ['test3', 3]]);
    expect(getNumberOf(value)).toBe(value.size);
  });

  it('return length when defined on object', () => {
    const value = { test: true, length: 41 };
    expect(getNumberOf(value)).toBe(value.length);
  });

  it('return size when defined on object', () => {
    const value = { test: true, size: 41 };
    expect(getNumberOf(value)).toBe(value.size);
  });
  
  it('return undefined when undefined is passed', () => {
    const value = undefined;
    expect(getNumberOf(value)).not.toBeDefined();
  });

  it('return undefined when null is passed', () => {
    const value = null;
    expect(getNumberOf(value)).not.toBeDefined();
  });

  it('return undefined when boolean is passed', () => {
    const value1 = true;
    const value2 = false;
    expect(getNumberOf(value1)).not.toBeDefined();
    expect(getNumberOf(value2)).not.toBeDefined();
  });

  it('return undefined when Symbol is passed', () => {
    const value = Symbol('test');
    expect(getNumberOf(value)).not.toBeDefined();
  });

  it('return undefined when bigint is passed', () => {
    const value1 = BigInt(Number.MAX_SAFE_INTEGER + 41);
    expect(getNumberOf(value1)).not.toBeDefined();
  });
  
  it('return undefined when object neither has length nor size', () => {
    const value = { test: true };
    expect(getNumberOf(value)).not.toBeDefined();
  });

  it('return undefined when object has both length and size', () => {
    const value = { length: 41, size: 42 };
    expect(getNumberOf(value)).not.toBeDefined();
  });
});