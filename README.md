# postcss-text-transform

[![Travis](https://img.shields.io/travis/ezavile/postcss-text-transform.svg?style=flat-square)](https://travis-ci.org/ezavile/postcss-text-transform)
[![Codecov](https://img.shields.io/codecov/c/github/ezavile/postcss-text-transform.svg?style=flat-square)](https://codecov.io/gh/ezavile/postcss-text-transform)
[![npm](https://img.shields.io/npm/v/postcss-text-transform.svg?style=flat-square)](https://www.npmjs.com/package/postcss-text-transform)
[![MIT License](https://img.shields.io/npm/l/postcss-text-transform.svg?style=flat-square)](http://opensource.org/licenses/MIT)

A [PostCSS] plugin to transform the text.

## Installation
```
npm install postcss-text-transform
```

What is this? For example, you have the following CSS file (I'm using [postcss-each] and [postcss-cssnext]):

**backgrounds.css**
```css
.u {
  @each $color in green, yellow, red {
    @textTransform $color, upperFirst, $colorTransformed {
      &-bg$(colorTransformed) {
        background-color: $color;
      }
    }
  }
}
```

And the plugin will give you:
```css
.u-bgGreen {
  background-color: green
}

.u-bgYellow {
  background-color: yellow
}

.u-bgRed {
  background-color: red
}
```

## Usage

### JavaScript
```javascript
postcss([
   require('postcss-text-transform')
]);
```

## TypeScript
```js
import * as postcssTextTransform from 'postcss-text-transform';

postcss([ postcssTextTransform() ]);
```

```css
@textTransform $text, transformation, $textTransformed { ... }
```

**Transformations**
* camelCase - Converts to camel case.
* capitalize - Converts the first character of string to upper case and the remaining to lower case.
* lowerCase - Converts string, as space separated words, to lower case.
* lowerFirst - Converts the first character of string to lower case.
* upperCase - Converts string, as space separated words, to upper case.
* upperFirst - Converts the first character of string to upper case.

## Testing
This will build scripts, run tests and generate a code coverage report. Anything less than 100% coverage will throw an error.

```javascript
npm test
```

See [PostCSS] docs for examples for your environment.

## Contributing
* ⇄ Pull requests and ★ Stars are always welcome.
* For bugs and feature requests, please create an issue.
* Pull requests must be accompanied by passing automated tests (`npm test`).

[MIT License]

[PostCSS]: https://github.com/postcss/postcss
[postcss-each]: https://github.com/outpunk/postcss-each
[postcss-cssnext]: https://github.com/MoOx/postcss-cssnext
[MIT License]: https://github.com/ezavile/postcss-typescript-css/blob/master/LICENSE
