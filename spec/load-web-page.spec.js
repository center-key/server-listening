// Mocha Specification Cases

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';

// Package
import { serverListening } from '../dist/server-listening.js';

// Setup
const url = 'https://pretty-print-json.js.org/';
let page;

describe('Load Web Page specification', () => {
   before(() => serverListening.loadWebPage(url).then(pageInst => page = pageInst));
   after(() =>  serverListening.closeWebPage(page));

/////////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {

   it('has the correct URL -> ' + url, () => {
      const actual =   { url: page.window.location.href };
      const expected = { url: url };
      assertDeepStrictEqual(actual, expected);
      });

   it('title starts with "Pretty-Print JSON"', () => {
      const actual =   { title: page.title.substring(0, 'Pretty-Print JSON'.length) };
      const expected = { title: 'Pretty-Print JSON' };
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

/////////////////////////////////////////////////////////////////////////////////////
describe('The document content', () => {

   it('has a 🚀 traveling to 🪐!', () => {
      const actual =   { '🚀': !!page.html.match(/🚀/g), '🪐': !!page.html.match(/🪐/g) };
      const expected = { '🚀': true,                     '🪐': true };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////////////////////////
});
