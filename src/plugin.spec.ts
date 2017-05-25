import test, { TestContext } from 'ava';
import { readFileSync } from 'fs';
import * as postcss from 'postcss';
const path = require('path');

import * as plugin from './plugin';


function run(t: TestContext, input: {css: string, from: string}) {
  return postcss([ require('postcss-each'), plugin(), require('postcss-cssnext') ]).process(input.css, { from: input.from })
  .then((result) => {
    t.truthy(result.content.toString().includes('bgGreen'));
    t.truthy(result.content.toString().includes('bgYellow'));
    t.truthy(result.content.toString().includes('bgRed'));
  })
  .catch((error: postcss.CssSyntaxError) => {
    t.truthy(error.message.includes('It can not be transformed to fakeTransformation'));
  });
}

test('should transform the text', t => {
  const cssFile = path.join(__dirname, 'fakeStyle.css');
  const cssContent = readFileSync(cssFile, 'utf8');
  return run(t, { css: cssContent, from: cssFile });
});

test('should throw an error', t => {
  const cssFile = path.join(__dirname, 'failFakeStyle.css');
  const cssContent = readFileSync(cssFile, 'utf8');
  return run(t, { css: cssContent, from: cssFile });
});
