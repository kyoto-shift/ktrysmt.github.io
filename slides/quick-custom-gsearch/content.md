## who am i | awk '{print $1}'

<img style="border: none;
    border-radius: 20px;
    width: 128px;
    height: 128px;
    float: right;" data-src="https://avatars3.githubusercontent.com/u/6156742?v=3&s=460">

Kotaro Yoshimatsu / age 30

<https://twitter/ktrysmt>

a.k.a. JSおじさん :older_man:

---

## What's this

- [Quick Custom GSearch \- Chrome ウェブストア](https://chrome.google.com/webstore/detail/quick-custom-gsearch/dcdmfmmmmpjgfaffnaokjpifnihmhaon)

You can access the control panel to manage interval quickly, just one click.

---

## Screenshot

![capture](https://raw.githubusercontent.com/ktrysmt/quick-custom-gsearch/master/capture.png)

---

## Why now develop chrome extensions

---

## Stand on the shoulders of chrome

- You can limit the scope to chrome.
- You can use stable and fulfilling Javascript ecosystem.
- Advanced technology APIs are available.
- No need Babel.

---

## How did I implement it

---

## Omitting basic practice ...

Ref:

- [Getting Started: Building a Chrome Extension \- Google Chrome](https://developer.chrome.com/extensions/getstarted)

Topics:

- Understand manifest.json
- Proprietary API in Google Chrome
- Option mechanism (if necessary)

---

dir tree (simplified)

```
.eslintrc
dist/
package.json
readme.md
src/
├── main.js
├── model.js
├── parser.js
└── view.js
test/
├── model.spec.js
├── parser.spec.js
├── setup.js
└── view.spec.js
webpack.config.js
yarn.lock
```

---

package.json

```json
{
  "devDependencies": {
    "chai": "^3.5.0",
    "eslint": "^3.13.0",
    "eslint-config-airbnb-base": "^11.0.0",
    "eslint-plugin-import": "^2.2.0",
    "jsdom": "^9.9.1",
    "mocha": "^3.2.0",
    "uglify-js": "git://github.com/mishoo/UglifyJS2#harmony",
    "webpack": "beta"
  },
  "scripts": {
    "start": "webpack -d -w",
    "lint": "eslint --fix src/*.js",
    "test": "mocha --require test/setup.js test/*.spec.js",
    "build:dev": "webpack -d",
    "build:prod": "webpack"
  }
}
```

---

.eslintrc

```
{
  "extends": "airbnb-base",
  "env": { "browser": true },
  "rules": {
    "no-restricted-syntax": "off",
    "no-plusplus": "off",
    "no-unused-expressions": "off",
  }
}
```

---

webpack.config.js

```Javascript
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    script: './src/main.js',
  },
  output: {
    path: path.resolve('dist/'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
};
```

---

## References

- [ググったあとワンクリックで期間指定ができるChrome拡張を作った \- Qiita](http://qiita.com/ktrysmt/items/87370a3ef4b5234e6e09)
- [github.com/ktrysmt/quick-custom-gsearch](https://github.com/ktrysmt/quick-custom-gsearch)
- [github.com/acvetkov/sinon-chrome](https://github.com/acvetkov/sinon-chrome)
