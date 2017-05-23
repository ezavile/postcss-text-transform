import test from 'ava';
import hi from '../';

test('should return hi', t => {
  t.is(hi(), 'hi');
});
