// Package Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import assert from 'node:assert';
import fs     from 'node:fs';

// Setup
import { serverListening } from '../dist/server-listening.js';

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
describe('Library version number', () => {

   it('follows semantic version formatting', () => {
      const version =  serverListening.version;
      const semVer =   /\d+[.]\d+[.]\d+/;
      const actual =   { version: version, valid: semVer.test(version) };
      const expected = { version: version, valid: true };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('Library module', () => {

   const module = serverListening;

   it('is exported as an object', () => {
      const actual =   { type: typeof module };
      const expected = { type: 'object' };
      assertDeepStrictEqual(actual, expected);
      });

   it('has the correct properties', () => {
      const actual = Object.keys(module).sort().map(key => [key, typeof module[key]]);
      const expected = [
         ['assertOk',          'function'],
         ['close',             'function'],
         ['closeWebPage',      'function'],
         ['jsdomCloseWindow',  'function'],
         ['jsdomOnLoad',       'function'],
         ['loadWebPage',       'function'],
         ['log',               'function'],
         ['ready',             'function'],
         ['setPort',           'function'],
         ['shutdownWebServer', 'function'],
         ['startWebServer',    'function'],
         ['version',           'string'],
         ];
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
      const actual =     { promise: serverListening.ready(mockServer) instanceof Promise };
      const expected =   { promise: true };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The close() function', () => {

   it('returns a promise when given a mock server', () => {
      const mockServer = { close: (callback) => callback() };
      const actual =     { promise: serverListening.close(mockServer) instanceof Promise };
      const expected =   { promise: true };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The jsdomOnLoad() function', () => {

   it('throws an error if the DOM is missing', () => {
      const callhandleDom = () => serverListening.jsdomOnLoad(null);
      const exception = { message: '[server-listening] Unable to load DOM: null => undefined' };
      assert.throws(callhandleDom, exception);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The jsdomCloseWindow() function', () => {

   it('runs the dom.window.close() function and returns a promise', () => {
      let status = null;
      const dom =      { window: { close: () => status = 'done' } };
      const promise =  serverListening.jsdomCloseWindow(dom);
      const actual =   { close: status, promise: promise instanceof Promise };
      const expected = { close: 'done', promise: true };
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
});
