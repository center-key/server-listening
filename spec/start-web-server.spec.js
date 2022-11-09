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
   let web;  //fields: url, dom, window, document, title, html, $, verbose
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

   it('has exactly one header, main, and footer', () => {
      const actual = {
         header: web.$('body >header').length,
         main:   web.$('body >main').length,
         footer: web.$('body >footer').length,
         };
      const expected = { header: 1, main: 1, footer: 1 };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
});
