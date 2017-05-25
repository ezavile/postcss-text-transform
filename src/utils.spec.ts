import { error } from 'util';
import test, { TestContext } from 'ava';
import * as postcss from 'postcss';

import { IParams, processParams, transform, tokenize } from './utils';

const params = ['$text', 'uppercase', '$textTransformed'];
let afterProcess: IParams = processParams(params.toString());

test('should remove $', t => {
  const expected = ['text', 'uppercase', 'textTransformed'];

  params.map((param, i) => {
    t.is(tokenize(param), expected[i]);
  });
});

test('should get an object from the params', t => {
  t.is(afterProcess.text, 'text');
  t.is(afterProcess.transformation, 'uppercase');
  t.is(afterProcess.result, 'textTransformed');
});

test('should text become to capitalize', t => {
  afterProcess.text = 'text';
  afterProcess.transformation = 'capitalize';

  t.is(transform(afterProcess), 'Text');
});

test('should text become to camelCase', t => {
  afterProcess.text = 'some_text';
  afterProcess.transformation = 'camelCase';

  t.is(transform(afterProcess), 'someText');
});

test('should text become to lowerFirst', t => {
  afterProcess.text = 'TEXT';
  afterProcess.transformation = 'lowerFirst';

  t.is(transform(afterProcess), 'tEXT');
});

test('should text become to lowercase', t => {
  afterProcess.text = 'TEXT';
  afterProcess.transformation = 'lowerCase';

  t.is(transform(afterProcess), 'text');
});

test('should text become to uppercase', t => {
  afterProcess.text = 'text';
  afterProcess.transformation = 'upperCase';

  t.is(transform(afterProcess), 'TEXT');
});

test('should text become to upperFirst', t => {
  afterProcess.text = 'text';
  afterProcess.transformation = 'upperFirst';

  t.is(transform(afterProcess), 'Text');
});

test('should throw an error', t => {
  let afterProcessParams: IParams = processParams(params.toString());
  afterProcessParams.transformation = 'fakeTransformation';

  try {
  const textTransformed = transform(afterProcessParams);
  } catch (error) {
    t.is(error, 'It can not be transformed to fakeTransformation');
  }
});
