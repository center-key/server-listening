// Mocha Specification Cases

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { serverListening } from '../dist/server-listening.js';  //replace with: ...from 'server-listening';

// Setup
const options = { folder: 'spec/web-root' };
const webPath = 'sample.html';
let httpx;  //fields: server, terminator, folder, url, port, verbose

describe('Start Web Server specification', () => {
   before(() => serverListening.startWebServer(options).then(httpxInst => httpx = httpxInst));
   after(() =>  serverListening.shutdownWebServer(httpx));

/////////////////////////////////////////////////////////////////////////////////////
describe('The sample web page', () => {
   let page;  //fields: url, dom, window, document, title, html, $, verbose
   before(() => serverListening.loadWebPage(httpx.url + webPath).then(pageInst => page = pageInst));
   after(() =>  serverListening.closeWebPage(page));

   it('has the correct URL', () => {
      const actual =   { url: page.window.location.href };
      const expected = { url: httpx.url + webPath };
      assertDeepStrictEqual(actual, expected);
      });

   it('title is "Sample Web Page"', () => {
      const actual =   { title: page.title };
      const expected = { title: 'Sample Web Page' };
      assertDeepStrictEqual(actual, expected);
      });

   it('has exactly one header, main, and footer', () => {
      const actual = {
         header: page.$('body >header').length,
         main:   page.$('body >main').length,
         footer: page.$('body >footer').length,
         };
      const expected = { header: 1, main: 1, footer: 1 };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
});
