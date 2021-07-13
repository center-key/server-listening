// Mocha Specification Cases

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';

// Package
import { serverListening } from '../dist/server-listening.js';

// Setup
const options = { folder: 'spec/web-root' };
const webPath = 'sample.html';
let web;

describe('Start Web Server specification', () => {
   before(() => serverListening.startWebServer(options).then((webInst) => web = webInst));
   after(() =>  serverListening.shutdownWebServer(web));

/////////////////////////////////////////////////////////////////////////////////////
describe('The sample web page', () => {
   let page;
   before(() => serverListening.loadWebPage(web.url + webPath).then(pageInst => page = pageInst));
   after(() =>  serverListening.closeWebPage(page));

   it('has the correct URL', () => {
      const actual =   { url: page.window.location.href };
      const expected = { url: web.url + webPath };
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
