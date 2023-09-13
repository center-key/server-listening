// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { serverListening } from '../dist/server-listening.js';

// Setup
const options = { folder: 'spec/fixtures' };
const webPath = 'sample.html';
let http;  //fields: server, terminator, folder, url, port, verbose

describe('Start Web Server specification', () => {
   before(() => serverListening.startWebServer(options).then(httpInst => http = httpInst));
   after(() =>  serverListening.shutdownWebServer(http));

/////////////////////////////////////////////////////////////////////////////////////
describe('The sample web page', () => {
   const getTags = (elems) => [...elems].map(elem => elem.nodeName.toLowerCase());
   let web;  //fields: url, dom, window, document, title, html, verbose
   before(() => serverListening.loadWebPage(http.url + webPath).then(webInst => web = webInst));
   after(() =>  serverListening.closeWebPage(web));

   it('has the correct URL', () => {
      const actual =   { url: web.window.location.href };
      const expected = { url: http.url + webPath };
      assertDeepStrictEqual(actual, expected);
      });

   it('title is "Sample Web Page"', () => {
      const actual =   { title: web.title };
      const expected = { title: 'Sample Web Page' };
      assertDeepStrictEqual(actual, expected);
      });

   it('has a body with exactly one header, main, and footer -- body.children', () => {
      const actual =   getTags(web.document.body.children);
      const expected = ['header', 'main', 'footer'];
      assertDeepStrictEqual(actual, expected);
      });

   it('has a body with exactly one header, main, and footer -- querySelectorAll()', () => {
      const actual =   getTags(web.document.querySelectorAll('body >*'));
      const expected = ['header', 'main', 'footer'];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
});
