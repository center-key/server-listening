# server-listening
<img src=https://centerkey.com/graphics/center-key-logo.svg align=right width=180 alt=logo>

_Simple promise to wait for server ready inside a mocha specification_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/center-key/server-listening/blob/main/LICENSE.txt)
[![npm](https://img.shields.io/npm/v/server-listening.svg)](https://www.npmjs.com/package/server-listening)
[![Vulnerabilities](https://snyk.io/test/github/center-key/server-listening/badge.svg)](https://snyk.io/test/github/center-key/server-listening)
[![Build](https://github.com/center-key/server-listening/workflows/build/badge.svg)](https://github.com/center-key/server-listening/actions/workflows/run-spec-on-push.yaml)

**server-listening** is just a little helper utility to reduce the amount of boilerplate code
needed to startup servers when running mocha specifications.

## A) Setup
Install package:
```shell
$ npm install --save-dev server-listening
```
Import package:
```javascript
import { serverListening } from 'server-listening';
```
Or if using the older CommonJS format:
```javascript
const { serverListening } = require('server-listening');  //deprecated -- use ES modules instead
```

## B) Usage
The original low-level API is described below.&nbsp;
For the newer high-level API to start a web server (`localhost`) and load a web page (`jsdom`), see
[start-web-server.spec.js](spec/start-web-server.spec.js) and
[load-web-page.spec.js](spec/load-web-page.spec.js)
(for similar functionality using Puppeteer instead, see the
[puppeteer-browser-ready](https://github.com/center-key/puppeteer-browser-ready) project).

### 1. Mocha specification file
```javascript
import { server } from '../server.js';
before(() => serverListening.ready(server));
after(() =>  serverListening.close(server));
```
Example usage:<br>
[hello-world/mocha-spec.js](hello-world/mocha-spec.js)

**NOTE**<br>
Mocha's default timeout is 2,000 milliseconds which often is not enough time for a node server to shutdown.&nbsp;
Use the `--timeout` flag to correct this problem:
```json
"scripts": {
   "test": "mocha *.spec.js --timeout 5000"
}
```

### 2. `setPort()` options
The `setPort(options)` function is just a handy way to set the environment variable for the
HTTP port.&nbsp; This function is for convenience and is not required.
```javascript
serverListening.setPort({ port: 9000 });
```
| Option    | Meaning                                                   | Default  |
| --------- | --------------------------------------------------------- | -------- |
| **port**  | Port number for server (`0` means choose an unused port). | `0`      |
| **name**  | Environment variable name to store port number.           | `'port'` |

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
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { serverListening } from 'server-listening';
import { JSDOM } from 'jsdom';

// Setup
const url = 'https://pretty-print-json.js.org/';
const jsdomOptions = { resources: 'usable', runScripts: 'dangerously' };
let dom;
const loadWebPage = () => JSDOM.fromURL(url, jsdomOptions)
   .then(serverListening.jsdomOnLoad)
   .then((jsdom) => dom = jsdom);
const closeWebPage = () => serverListening.jsdomCloseWindow(dom);

////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {
   before(loadWebPage);
   after(closeWebPage);

   it('has the correct URL -> ' + url, () => {
      const actual =   { url: dom.window.location.href };
      const expected = { url: url };
      assertDeepStrictEqual(actual, expected);
      });

   it('has exactly one header, main, and footer', () => {
      const $ = dom.window.$;
      const actual =   {
         header: $('body >header').length,
         main:   $('body >main').length,
         footer: $('body >footer').length,
         };
      const expected = { header: 1, main: 1, footer: 1 };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The document content', () => {
   before(loadWebPage);
   after(closeWebPage);

   it('has a 🚀 traveling to 🪐!', () => {
      const html = dom.window.document.documentElement.outerHTML;
      const actual =   { '🚀': !!html.match(/🚀/g), '🪐': !!html.match(/🪐/g) };
      const expected = { '🚀': true,                '🪐': true };
      assertDeepStrictEqual(actual, expected);
      });

   });
```
Above mocha test will output:
```
  The web page
    ✓ has the correct URL -> https://pretty-print-json.js.org/
    ✓ has exactly one header, main, and footer

  The document content
    ✓ has a 🚀 traveling to 🪐!
```
Example of loading a web page into jsdom from a local node server:<br>
https://github.com/dna-engine/data-dashboard/blob/main/spec/spec.js

### 5. TypeScript declarations
The **TypeScript Declaration File** file is [server-listening.d.ts](dist/server-listening.d.ts) in
the **dist** folder.

The declarations provide type information about the API, such as the options for calling
`serverListening.setPort()`::
```typescript
type ServerListeningOptions = {
   port?:  number,  //0 = find unused port
   name?:  string,  //environment variable to pass port number
   };
```

## C) Hello World Example
To try out **server-listening** locally, enter the following terminal commands:
```shell
$ git clone https://github.com/center-key/server-listening.git
$ cd server-listening/hello-world
$ npm install
$ npm test
```
<img src=https://raw.githubusercontent.com/center-key/server-listening/main/hello-world/screenshot.png
width=800 alt=screenshot>

You can also run the server locally:
```shell
$ npm start
```
and then use a browser to view the `'Hello, World!'` message at: http://localhost:3300

---
**server-listening** is open source under the [MIT License](LICENSE.txt).
