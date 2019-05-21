# server-listening
<img src=https://centerkey.com/graphics/center-key-logo.svg align=right width=180 alt=logo>

_Simple promise to wait for server ready inside a mocha specification_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/center-key/server-listening/blob/master/LICENSE.txt)
[![npm](https://img.shields.io/npm/v/server-listening.svg)](https://www.npmjs.com/package/server-listening)
[![Dependencies](https://david-dm.org/center-key/server-listening/status.svg)](https://david-dm.org/center-key/server-listening)
[![Vulnerabilities](https://snyk.io/test/github/center-key/server-listening/badge.svg)](https://snyk.io/test/github/center-key/server-listening)
[![Build](https://travis-ci.org/center-key/server-listening.svg)](https://travis-ci.org/center-key/server-listening)

**server-listening** is just a little helper utility to reduce the amount of boilerplate code
needed to startup servers when running multiple mocha files.

## A) Setup
Install package:
```shell
$ npm install --save-dev server-listening
```
Import package:
```javascript
const serverListening = require('server-listening');
```

## B) Usage

### 1. Mocha specification file
```javascript
const server = require('../server');
before(() => serverListening.ready(server));
after(() =>  serverListening.close(server));
```
Example usage:
[hello-world/mocha-spec.js](hello-world/mocha-spec.js)

### 2. `setPort()` options
The `setPort(options)` function is just a handy way to set the environment variable for the
HTTP port and to flush the server package so the mocha test gets a fresh server.&nbsp; This
function is just for convenience and is not required.
```javascript
serverListening.setPort({ flush: require.resolve('../server') });
```
| Option    | Meaning                                                   | Default  |
| --------- | --------------------------------------------------------- | -------- |
| **port**  | Port number for server (`0` means choose an unused port). | `0`      |
| **name**  | Environment variable name to store port number.           | `'port'` |
| **flush** | Flush cache to get fresh server (use `require.resolve()`) | null     |

### 3. Leveraging promises
The `ready(server)` and `close(server)` functions return a
[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises), enabling
chaining of operations.

For example, a `port` variable could be set **after** the server is ready using:
```javascript
let port;
before(() => serverListening.ready(server).then(() => port = server.address().port));
```

### 4. jsdom support
The two helper functions `jsdomOnLoad()` and `jsdomCloseWindow()` can be used with the
`JSDOM.fromURL()` function to load a web page before the mocha tests run and then close the window
when the tests are finished.

```javascript
// Imports
const assert =          require('assert').strict;
const { JSDOM } =       require('jsdom');
const serverListening = require('server-listening');

// Setup
const url = 'https://pretty-print-json.js.org/';
let dom;
before(() => JSDOM.fromURL(url, { resources: 'usable', runScripts: 'dangerously' })
   .then(serverListening.jsdomOnLoad)
   .then((jsdom) => dom = jsdom)
   );
after(() => serverListening.jsdomCloseWindow(dom));

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {

   it('has the correct URL -> ' + url, () => {
      const actual =   { url: dom.window.location.href };
      const expected = { url: url };
      assert.deepEqual(actual, expected);
      });

   it('has exactly one header, main, and footer', () => {
      const actual =   {
         header: dom.window.$('body >header').length,
         main:   dom.window.$('body >main').length,
         footer: dom.window.$('body >footer').length
         };
      const expected = { header: 1, main: 1, footer: 1 };
      assert.deepEqual(actual, expected);
      });

   });
```
Above mocha test will output:
```
  The web page
    ✓ has the correct URL -> https://pretty-print-json.js.org/
    ✓ has exactly one header, main, and footer
```
Example of loading a page into jsdom from a local node server:
https://github.com/dnajs/data-dashboard/blob/master/spec/spec.js

## C) Hello World example
To try out **server-listening** locally, enter the following terminal commands:
```shell
$ git clone https://github.com/center-key/server-listening.git
$ cd server-listening/hello-world
$ npm install
$ npm test
```
<img src=https://raw.githubusercontent.com/center-key/server-listening/master/hello-world/screenshot.png
width=800 alt=screenshot>

You can also run the server locally:
```shell
$ npm start
```
and then use a browser to view the `'Hello, World!'` message at: http://localhost:3300

---
**server-listening** is open source under the [MIT License](LICENSE.txt).
