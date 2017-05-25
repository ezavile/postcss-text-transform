import * as postcss from 'postcss';
import * as _ from 'lodash';

const SEPARATOR = ',';

export function tokenize(str: string): string {
  return postcss.list.comma(str).map(s => s.replace(/^\$/, ''))[0];
}

export interface IParams {
  text: string;
  transformation: string;
  result: string;
}

export function processParams(params: string): IParams {
  const [ text, transformation, result ] = params.split(SEPARATOR).map(tokenize);
  return {
    text,
    transformation,
    result,
  };
}

export function transform(params: IParams): string {
  const { text, transformation } = params;
  switch (transformation) {
    case 'capitalize':
      return _.capitalize(text);
    case 'camelCase':
      return _.camelCase(text);
    case 'lowerFirst':
      return _.lowerFirst(text);
    case 'lowerCase':
      return _.lowerCase(text);
    case 'upperCase':
      return _.upperCase(text);
    case 'upperFirst':
      return _.upperFirst(text);
    default:
      throw `It can not be transformed to ${transformation  }`;
  }
}
