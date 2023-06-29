// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { serverListening } from '../dist/server-listening.js';
import assert from 'assert';
import fs from 'fs';

describe('Package specification', () => {

////////////////////////////////////////////////////////////////////////////////
describe('The "dist" folder', () => {

   it('contains the correct files', () => {
      const actual =   fs.readdirSync('dist').sort();
      const expected = [
         'server-listening.d.ts',
         'server-listening.js'
         ];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The server-listening package', () => {

   it('is exported as an object', () => {
      const actual =   { type: typeof serverListening };
      const expected = { type: 'object' };
      assertDeepStrictEqual(actual, expected);
      });

   it('contains the expected functions', () => {
      const names = ['setPort', 'ready', 'close', 'jsdomOnLoad', 'jsdomCloseWindow',
         'log', 'startWebServer', 'shutdownWebServer', 'loadWebPage', 'closeWebPage'];
      const actual =   { functions: Object.keys(serverListening).sort() };
      const expected = { functions: names.sort() };
      assertDeepStrictEqual(actual, expected);
      });

   it('functions are the correct type', () => {
      const valueTypes = Object.values(serverListening).map(value => typeof value);
      const actual =   { types: valueTypes };
      const expected = { types: [...valueTypes].fill('function') };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The setPort() function', () => {

   it('sets a specified environment variable to a specified port number', () => {
      serverListening.setPort({ port: 12345, name: 'mockPort'});
      const actual =   { port: process.env.mockPort };
      const expected = { port: '12345' };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The ready() function', () => {

   it('returns a promise when given a mock server', () => {
      const mockServer = { listening: true };
      const actual =   { promise: serverListening.ready(mockServer) instanceof Promise };
      const expected = { promise: true };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The close() function', () => {

   it('returns a promise when given a mock server', () => {
      const mockServer = { close: (callback) => callback() };
      const actual =   { promise: serverListening.close(mockServer) instanceof Promise };
      const expected = { promise: true };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The jsdomOnLoad() function', () => {

   it('throws an error if the DOM is missing', () => {
      const callhandleDom = () => serverListening.jsdomOnLoad(null);
      const exception = { message: '[server-listening] Unable to load DOM: null => null' };
      assert.throws(callhandleDom, exception);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The jsdomCloseWindow() function', () => {

   it('runs the dom.window.close() function and returns a promise', () => {
      let status = null;
      const dom = { window: { close: () => status = 'done' } };
      const promise = serverListening.jsdomCloseWindow(dom);
      const actual =   { close: status, promise: promise instanceof Promise };
      const expected = { close: 'done', promise: true };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
});
