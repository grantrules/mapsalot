import { dateformat } from '../../utils/date';

describe('date', () => {
  test('test', () => {
    const result = dateformat(1568446475244);
    expect(result).toEqual('Sat Sep 14, 2019 3:34 AM');
  });
});
