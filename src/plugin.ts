import * as postcss from 'postcss';
const vars = require('postcss-simple-vars');
import { IParams, processParams, transform } from './utils';

const postcssTextTransform = postcss.plugin('postcss-text-transform', (opts) => {
    return (css) => {
      css.walkAtRules('textTransform', atRule => {
        const params: IParams = processParams(atRule.params);
        try {
          const textTransformed = transform(params);
          let result: { [key: string]: string; } = {};
          result[params.result] = textTransformed;
          atRule.nodes.forEach((node) => {
            const clone = node.clone();
            const proxy = postcss.rule({ nodes: [clone] });
            vars({ only: result })(proxy);
            atRule.parent.insertBefore(atRule, clone);
          });
          atRule.remove();
        } catch (error) {
          throw atRule.error(error);
        }
      });
    };
});

export = postcssTextTransform;
