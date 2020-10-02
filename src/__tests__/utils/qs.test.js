import qs from '../../utils/qs';

describe('qs', () => {
  test('simple query string', () => {
    const q = { a: 1, b: 'abc' };
    expect(qs(q)).toEqual('a=1&b=abc');
  });

  test('params with undefined and empty values', () => {
    const q = {
      a: 1, b: 'abc', c: undefined, d: '',
    };
    expect(qs(q)).toEqual('a=1&b=abc&d=');
  });

  test('params with weird characters', () => {
    const q = { a: 1, b: 'abc', 'c%': '%' };
    expect(qs(q)).toEqual('a=1&b=abc&c%25=%25');
  });
});
